# Next.js + Supabase Stack Guide

1인 창업자에게 가장 추천하는 풀스택 조합입니다.

## 왜 이 조합인가?

| 장점 | 설명 |
|------|------|
| 풀스택 | 프론트엔드 + 백엔드 한번에 |
| 무료 티어 | 둘 다 넉넉한 무료 티어 |
| 빠른 개발 | 인증, DB, 스토리지 내장 |
| 배포 쉬움 | Vercel + Supabase 연동 |
| 확장성 | 트래픽 증가에도 대응 가능 |

## 기술 스택 상세

```
Frontend:
├── Next.js 14 (App Router)
├── TypeScript
├── Tailwind CSS
└── shadcn/ui

Backend:
├── Supabase (PostgreSQL)
├── Supabase Auth
├── Supabase Storage
└── Supabase Edge Functions (선택)

Infrastructure:
├── Vercel (Hosting)
├── Supabase (BaaS)
└── GitHub (Version Control)
```

## 시작하기

### 1. Supabase 프로젝트 생성

```
1. supabase.com 가입
2. "New Project" 클릭
3. 프로젝트 이름, 비밀번호 설정
4. 리전 선택 (Northeast Asia 권장)
5. 생성 완료까지 약 2분 대기
```

### 2. Next.js 프로젝트 생성

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-app
```

### 3. Supabase 연동

```bash
# 패키지 설치
npm install @supabase/supabase-js @supabase/ssr

# 환경변수 설정
# Supabase Dashboard > Settings > API에서 복사
```

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

### 4. Supabase 클라이언트 설정

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

## 무료 티어 한도

### Supabase Free Tier
| 리소스 | 한도 |
|--------|------|
| Database | 500MB |
| Storage | 1GB |
| Bandwidth | 2GB/월 |
| Auth Users | 무제한 |
| Edge Functions | 500K/월 |

### Vercel Free Tier
| 리소스 | 한도 |
|--------|------|
| Bandwidth | 100GB/월 |
| Serverless Execution | 100GB-Hrs |
| Builds | 6,000분/월 |

## 디렉토리 구조 권장

```
src/
├── app/
│   ├── (auth)/           # 인증 페이지 그룹
│   │   ├── login/
│   │   └── signup/
│   ├── (main)/           # 메인 콘텐츠 그룹
│   │   └── ...
│   ├── api/              # API Routes
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/               # shadcn/ui
│   ├── layout/           # Header, Footer
│   └── features/         # 기능별 컴포넌트
├── lib/
│   ├── supabase/         # Supabase 클라이언트
│   ├── actions/          # Server Actions
│   └── utils.ts
├── hooks/                # Custom Hooks
└── types/                # TypeScript Types
```

## 자주 쓰는 패턴

### 인증된 사용자 가져오기

```typescript
// Server Component
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <div>Hello {user.email}</div>
}
```

### 데이터 조회 (Server Component)

```typescript
export default async function PostsPage() {
  const supabase = createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      {posts?.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

### Server Action으로 데이터 생성

```typescript
// src/lib/actions/posts.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('posts')
    .insert({
      user_id: user.id,
      title: formData.get('title'),
      content: formData.get('content'),
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/posts')
  return { success: true }
}
```

## 배포

### Vercel 배포

```bash
# 1. GitHub에 푸시
git push origin main

# 2. Vercel에서 Import
# vercel.com > Add New > Project > Import Git Repository

# 3. 환경변수 설정
# Project Settings > Environment Variables
```

### 환경변수 설정 (Vercel)

```
NEXT_PUBLIC_SUPABASE_URL = https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJxxx...
```

## 다음 단계로 확장

| 기능 | 방법 |
|------|------|
| 결제 | Stripe 연동 |
| 이메일 | Resend 연동 |
| 파일 업로드 | Supabase Storage |
| 실시간 | Supabase Realtime |
| 검색 | Supabase Full Text Search |

## 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Supabase 공식 문서](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
