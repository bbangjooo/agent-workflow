# Supabase Client 설정 가이드

Supabase의 공식 JavaScript 클라이언트 설정 가이드입니다. Next.js App Router 환경에 최적화되어 있습니다.

## 1. 패키지 설치

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## 2. 클라이언트 파일 구조

```
src/
└── lib/
    └── supabase/
        ├── client.ts     # 브라우저용 클라이언트
        └── server.ts     # 서버용 클라이언트
```

## 3. 브라우저 클라이언트

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

### 사용 예시 (Client Component)

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function UserProfile() {
  const [user, setUser] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return <div>{user?.email}</div>
}
```

## 4. 서버 클라이언트 (App Router)

```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component에서 쿠키 설정 시도 시 무시
          }
        },
      },
    }
  )
}
```

### 사용 예시 (Server Component)

```typescript
// app/profile/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return <div>Hello, {user?.email}</div>
}
```

## 5. 연결 테스트

```typescript
// scripts/test-supabase.ts
import { createClient } from '@supabase/supabase-js'

async function testConnection() {
  console.log('🔌 Testing Supabase connection...')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  try {
    const { error } = await supabase.from('_test').select('*').limit(1)

    if (error?.code === 'PGRST116' || !error) {
      console.log('✅ Connection successful!')
      return true
    }
    console.error('❌ Failed:', error.message)
    return false
  } catch (err) {
    console.error('❌ Error:', err)
    return false
  }
}

testConnection()
```

## 6. 일반적인 사용 패턴

```typescript
// 조회
const { data, error } = await supabase.from('posts').select('*')

// 생성
const { data, error } = await supabase.from('posts').insert({ title: 'Hi' }).select().single()

// 수정
const { data, error } = await supabase.from('posts').update({ title: 'Updated' }).eq('id', id)

// 삭제
const { error } = await supabase.from('posts').delete().eq('id', id)
```

## 7. 트러블슈팅

| 에러 | 원인 | 해결 |
|------|------|------|
| `Invalid API key` | 환경변수 오류 | `.env.local` 확인 |
| `PGRST116` | 테이블 없음 | 정상 (연결은 성공) |
| `RLS violation` | 권한 없음 | RLS 정책 확인 |
