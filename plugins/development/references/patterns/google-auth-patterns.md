# Google Authentication Patterns

구글 OAuth 인증 구현 패턴 가이드입니다.

## 개요

구글 인증은 사용자가 별도의 회원가입 없이 기존 구글 계정으로 로그인할 수 있게 해주는 소셜 로그인 방식입니다. 1인 창업자에게 다음과 같은 이점을 제공합니다:

- **빠른 온보딩**: 회원가입 절차 간소화로 이탈률 감소
- **보안 위임**: 구글의 보안 인프라 활용
- **개발 시간 단축**: 비밀번호 관리, 이메일 인증 등 구현 불필요

---

## 사전 준비

### 1. Google Cloud Console 설정

```
1. Google Cloud Console (https://console.cloud.google.com) 접속
2. 프로젝트 생성 또는 선택
3. APIs & Services > OAuth consent screen
   - User Type: External 선택
   - 앱 이름, 사용자 지원 이메일 입력
   - 개발자 연락처 정보 입력
4. APIs & Services > Credentials
   - Create Credentials > OAuth client ID
   - Application type: Web application
   - Authorized JavaScript origins 추가:
     - http://localhost:3000 (개발용)
     - https://your-domain.com (프로덕션)
   - Authorized redirect URIs 추가:
     - http://localhost:3000/auth/callback (개발용)
     - https://your-domain.com/auth/callback (프로덕션)
     - Supabase 사용 시: https://<project-ref>.supabase.co/auth/v1/callback
5. Client ID와 Client Secret 저장
```

### 2. 환경 변수 설정

```bash
# .env.local
# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Supabase (Supabase 사용 시)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 패턴 1: Supabase + Google OAuth (권장)

가장 빠르고 간단한 구현 방법입니다.

### Supabase 대시보드 설정

```
1. Supabase Dashboard > Authentication > Providers
2. Google 활성화
3. Client ID, Client Secret 입력
4. Redirect URL 확인: https://<project-ref>.supabase.co/auth/v1/callback
   (이 URL을 Google Console의 Authorized redirect URIs에 추가)
```

### Server Action 구현

```typescript
// src/lib/actions/google-auth.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signInWithGoogle() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.error('Google 로그인 에러:', error.message)
    return { error: error.message }
  }

  if (data.url) {
    redirect(data.url)
  }
}

// 구글 계정 연결 해제
export async function unlinkGoogleAccount() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '로그인이 필요합니다' }
  }

  // 구글 identity 제거
  const googleIdentity = user.identities?.find(
    (identity) => identity.provider === 'google'
  )

  if (googleIdentity) {
    const { error } = await supabase.auth.unlinkIdentity(googleIdentity)
    if (error) {
      return { error: error.message }
    }
  }

  return { success: true }
}
```

### OAuth Callback Route

```typescript
// src/app/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // 에러 처리
  if (error) {
    console.error('OAuth 에러:', error, errorDescription)
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(errorDescription || error)}`
    )
  }

  if (code) {
    const supabase = createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (!exchangeError) {
      return NextResponse.redirect(`${origin}${next}`)
    }

    console.error('세션 교환 에러:', exchangeError.message)
  }

  return NextResponse.redirect(`${origin}/login?error=인증에 실패했습니다`)
}
```

### Google 로그인 버튼 컴포넌트

```typescript
// src/components/auth/GoogleLoginButton.tsx
'use client'

import { signInWithGoogle } from '@/lib/actions/google-auth'
import { useState } from 'react'

export function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const result = await signInWithGoogle()
      if (result?.error) {
        console.error(result.error)
        // 에러 토스트 표시
      }
    } catch (error) {
      console.error('Google 로그인 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
    >
      <GoogleIcon />
      {isLoading ? '로그인 중...' : 'Google로 계속하기'}
    </button>
  )
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}
```

### 로그인 페이지 통합

```typescript
// src/app/(auth)/login/page.tsx
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton'
import { signIn } from '@/lib/actions/auth'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">로그인</h1>
          <p className="mt-2 text-gray-600">계정에 로그인하세요</p>
        </div>

        {/* 소셜 로그인 */}
        <div className="space-y-3">
          <GoogleLoginButton />
        </div>

        {/* 구분선 */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">또는</span>
          </div>
        </div>

        {/* 이메일 로그인 폼 */}
        <form action={signIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  )
}
```

---

## 패턴 2: NextAuth.js + Google OAuth

NextAuth.js를 사용한 구현 방법입니다.

### 설치

```bash
npm install next-auth
```

### NextAuth 설정

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // 세션에 추가 정보 포함
      if (session.user) {
        session.user.id = token.sub!
      }
      return session
    },
    async jwt({ token, account, profile }) {
      // 최초 로그인 시 추가 정보 저장
      if (account && profile) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
})

export { handler as GET, handler as POST }
```

### SessionProvider 설정

```typescript
// src/app/providers.tsx
'use client'

import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
```

```typescript
// src/app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### NextAuth Google 로그인 버튼

```typescript
// src/components/auth/GoogleLoginButton.tsx
'use client'

import { signIn } from 'next-auth/react'

export function GoogleLoginButton() {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
    >
      <GoogleIcon />
      Google로 계속하기
    </button>
  )
}
```

### 세션 사용

```typescript
// 서버 컴포넌트에서
import { getServerSession } from 'next-auth'

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return <div>Welcome, {session.user?.name}</div>
}

// 클라이언트 컴포넌트에서
'use client'

import { useSession } from 'next-auth/react'

export function UserInfo() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>Loading...</div>
  if (!session) return <div>Not signed in</div>

  return <div>Welcome, {session.user?.name}</div>
}
```

---

## 패턴 3: Firebase + Google OAuth

Firebase Authentication을 사용한 구현 방법입니다.

### Firebase 설정

```typescript
// src/lib/firebase/config.ts
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
export const auth = getAuth(app)
```

### Google 로그인 구현

```typescript
// src/lib/firebase/auth.ts
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from './config'

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return { user: result.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}
```

### Auth Context

```typescript
// src/contexts/AuthContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

---

## 사용자 프로필 동기화

구글 로그인 후 사용자 프로필을 데이터베이스에 저장하는 패턴입니다.

### Supabase Trigger (자동 동기화)

```sql
-- Supabase SQL Editor에서 실행
-- 사용자 프로필 테이블
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS 활성화
alter table public.profiles enable row level security;

-- 사용자는 자신의 프로필만 읽기/수정 가능
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 새 사용자 생성 시 자동으로 프로필 생성
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 프로필 조회 함수

```typescript
// src/lib/actions/profile.ts
'use server'

import { createClient } from '@/lib/supabase/server'

export async function getProfile() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '로그인이 필요합니다' }
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    return { error: error.message }
  }

  return { profile }
}

export async function updateProfile(formData: FormData) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '로그인이 필요합니다' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      name: formData.get('name') as string,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
```

---

## 에러 처리

### 공통 에러 메시지

```typescript
// src/lib/auth/errors.ts
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  // Google OAuth 에러
  'access_denied': '로그인이 취소되었습니다',
  'popup_closed_by_user': '로그인 창이 닫혔습니다',

  // Supabase 에러
  'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않습니다',
  'Email not confirmed': '이메일 인증이 필요합니다',
  'User already registered': '이미 가입된 이메일입니다',

  // 기본 에러
  'default': '로그인 중 오류가 발생했습니다. 다시 시도해주세요',
}

export function getErrorMessage(error: string): string {
  return AUTH_ERROR_MESSAGES[error] || AUTH_ERROR_MESSAGES['default']
}
```

### 에러 표시 컴포넌트

```typescript
// src/components/auth/AuthError.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { getErrorMessage } from '@/lib/auth/errors'

export function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  if (!error) return null

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{getErrorMessage(error)}</p>
        </div>
      </div>
    </div>
  )
}
```

---

## 보안 체크리스트

### 필수 확인 사항

- [ ] HTTPS 사용 (프로덕션 환경)
- [ ] 환경 변수에 민감한 정보 저장 (Client Secret)
- [ ] NEXT_PUBLIC_ 접두사는 공개 가능한 값에만 사용
- [ ] Redirect URI 정확히 설정 (개발/프로덕션 분리)
- [ ] CSRF 토큰 검증 (NextAuth.js 자동 처리)
- [ ] 세션 만료 시간 적절히 설정

### 권장 보안 설정

```typescript
// next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ],
}
```

---

## 문제 해결 가이드

### "redirect_uri_mismatch" 에러

```
원인: Google Console의 Authorized redirect URIs와 실제 redirect URI가 다름

해결:
1. Google Cloud Console > APIs & Services > Credentials
2. OAuth 2.0 Client ID 선택
3. Authorized redirect URIs에 정확한 URL 추가:
   - 개발: http://localhost:3000/auth/callback
   - Supabase: https://<project-ref>.supabase.co/auth/v1/callback
```

### "popup_blocked" 에러

```
원인: 브라우저가 팝업을 차단함

해결:
1. signInWithPopup 대신 signInWithRedirect 사용
2. 또는 사용자에게 팝업 허용 안내
```

### 세션이 유지되지 않음

```
원인: 쿠키 설정 문제 또는 미들웨어 미적용

해결:
1. middleware.ts에서 세션 갱신 로직 확인
2. 쿠키 설정의 sameSite, secure 옵션 확인
3. 개발 환경에서는 secure: false 설정
```

---

## 참고 자료

- [Supabase Auth 문서](https://supabase.com/docs/guides/auth)
- [NextAuth.js 문서](https://next-auth.js.org/)
- [Firebase Auth 문서](https://firebase.google.com/docs/auth)
- [Google OAuth 2.0 문서](https://developers.google.com/identity/protocols/oauth2)
