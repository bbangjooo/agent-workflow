# Authentication Implementation

Step 3.8: 인증 구현 (Authentication)

> **역할: Full-stack (Backend + Frontend)**
> - Backend: Supabase 설정, 미들웨어, Server Actions, 보호된 라우트
> - Frontend: 로그인/회원가입 UI, 인증 상태 훅

## 설명

사용자 인증(로그인, 회원가입, 로그아웃)을 구현하는 스킬입니다. Supabase Auth를 활용하여 빠르게 구현합니다.

## 트리거

- Step 3.7 (API Design) 완료 후 실행
- `api-spec.md` 파일이 존재할 때

## 입력

- `outputs/stage-3/tech-stack.md`
- `outputs/stage-3/api-spec.md`
- `outputs/stage-2/wireframes.md` (로그인/회원가입 화면)

---

# Backend 구현

## [Backend] Supabase 프로젝트 설정

```
1. Supabase Dashboard > Authentication > Providers
2. Email 활성화 (기본)
3. (선택) 소셜 로그인 설정 (Google, GitHub 등)
```

## [Backend] 서버 클라이언트 설정

```typescript
// src/lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
```

## [Backend] 미들웨어 설정

세션 갱신 및 보호된 라우트 체크:

```typescript
// src/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // 세션 갱신
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

## [Backend] Server Actions

인증 관련 서버 액션:

```typescript
// src/lib/auth/actions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        name: formData.get('name') as string,
      },
    },
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  }

  redirect('/login?message=이메일을 확인해주세요')
}

export async function signIn(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  redirect('/')
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
```

## [Backend] 보호된 라우트 레이아웃

```typescript
// src/app/(main)/layout.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <>{children}</>
}
```

---

# Frontend 구현

## [Frontend] 클라이언트 Supabase 설정

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

## [Frontend] 인증 상태 훅

```typescript
// src/hooks/useUser.ts
'use client'

import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
```

## [Frontend] 로그인 페이지

```typescript
// src/app/(auth)/login/page.tsx
import { signIn } from '@/lib/auth/actions'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <h1 className="text-2xl font-bold text-center">로그인</h1>

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
            className="w-full rounded-md bg-primary py-2 text-white"
          >
            로그인
          </button>
        </form>

        <p className="text-center text-sm">
          계정이 없으신가요?{' '}
          <a href="/signup" className="text-primary">회원가입</a>
        </p>
      </div>
    </div>
  )
}
```

## [Frontend] 회원가입 페이지

```typescript
// src/app/(auth)/signup/page.tsx
import { signUp } from '@/lib/auth/actions'

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <h1 className="text-2xl font-bold text-center">회원가입</h1>

        <form action={signUp} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              이름
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>

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
              minLength={8}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary py-2 text-white"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  )
}
```

---

## 질문 가이드

1. **소셜 로그인**
   - "Google 로그인을 추가할까요?"
   - "다른 소셜 로그인이 필요한가요?"

2. **추가 기능**
   - "비밀번호 찾기 기능이 필요한가요?"
   - "이메일 인증을 필수로 할까요?"

## 참조 문서

- `skills/password-policy.md`: 비밀번호 정책 및 검증 구현
  - 비밀번호 최소 요구사항 정의
  - 강도 검증 유틸리티
  - 비밀번호 강도 표시 UI 컴포넌트
- `references/patterns/auth-patterns.md`: 기본 인증 패턴
- `references/patterns/google-auth-patterns.md`: 구글 OAuth 인증 상세 가이드
  - Google Cloud Console 설정 방법
  - Supabase, NextAuth.js, Firebase 별 구현 패턴
  - 사용자 프로필 동기화 방법
  - 에러 처리 및 보안 체크리스트

## 대화 원칙

- Backend 먼저 구현 후 Frontend 진행
- 각 파일 생성 후 확인
- 에러 발생 시 차근차근 해결
- 보안 관련 주의사항 안내

---

## 산출물

`outputs/stage-3/auth-impl.md`

```markdown
# Authentication Implementation

## 메타데이터
- Stage: 3
- Step: 3.8 - 인증 구현
- 생성일시: {현재 시간}
- 상태: final

## 구현된 기능

### Backend
| 기능 | 상태 | 파일 |
|------|------|------|
| Supabase 서버 클라이언트 | [x] | src/lib/supabase/server.ts |
| 미들웨어 (세션 갱신) | [x] | src/middleware.ts |
| Server Actions | [x] | src/lib/auth/actions.ts |
| 보호된 라우트 | [x] | src/app/(main)/layout.tsx |

### Frontend
| 기능 | 상태 | 파일 |
|------|------|------|
| Supabase 클라이언트 | [x] | src/lib/supabase/client.ts |
| useUser 훅 | [x] | src/hooks/useUser.ts |
| 로그인 페이지 | [x] | src/app/(auth)/login/page.tsx |
| 회원가입 페이지 | [x] | src/app/(auth)/signup/page.tsx |

## 테스트 결과

- [x] 회원가입 -> 이메일 인증 -> 로그인 성공
- [x] 잘못된 비밀번호 -> 에러 표시
- [x] 로그아웃 -> 세션 삭제
- [x] 보호된 페이지 -> 미로그인 시 리다이렉트

## 다음 단계

핵심 기능을 개발합니다.
```

## 완료 조건

- [Backend] Supabase 클라이언트 설정 완료
- [Backend] 미들웨어 설정 완료
- [Backend] Server Actions 구현 완료
- [Frontend] 인증 훅 구현 완료
- [Frontend] 로그인/회원가입 페이지 구현 완료
- 전체 인증 흐름 테스트 통과
- `auth-impl.md` 파일이 생성됨

## 다음 Step

→ Step 3.9: Core Features (핵심 기능 개발)
