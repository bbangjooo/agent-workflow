# Supabase 데이터베이스 설정 가이드

PostgreSQL 기반의 오픈소스 Firebase 대안입니다. 인증, 실시간 구독, 스토리지, Edge Functions까지 통합 제공합니다.

## 1. 프로젝트 생성

### 1.1 계정 생성 및 로그인

1. [supabase.com](https://supabase.com) 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인 (권장)

### 1.2 새 프로젝트 생성

1. 대시보드에서 "New Project" 클릭
2. Organization 선택 (기본값 사용 가능)
3. 프로젝트 정보 입력:
   - **Name**: 프로젝트 이름 (예: my-saas-app)
   - **Database Password**: 강력한 비밀번호 설정 (꼭 저장해두세요!)
   - **Region**: `Northeast Asia (Tokyo)` 권장 (한국 사용자)
   - **Pricing Plan**: Free 선택 (시작 시)
4. "Create new project" 클릭
5. 약 2분 대기 (프로젝트 프로비저닝)

### 1.3 Free 티어 제한 사항

| 항목 | 제한 |
|------|------|
| 프로젝트 수 | 2개 |
| 데이터베이스 크기 | 500MB |
| 스토리지 | 1GB |
| 대역폭 | 2GB/월 |
| 일시정지 | 7일 미사용 시 자동 정지 |

> 💡 일시정지된 프로젝트는 대시보드에서 "Restore" 버튼으로 복구 가능

---

## 2. API 키 확인

### 2.1 키 위치

1. 프로젝트 대시보드 접속
2. 좌측 메뉴 **Settings** > **API** 클릭
3. 두 가지 키 확인:

| 키 이름 | 용도 | 공개 여부 |
|---------|------|-----------|
| `anon` (public) | 클라이언트 사이드 | 공개 가능 (RLS로 보호) |
| `service_role` | 서버 사이드 전용 | **절대 비공개** |

### 2.2 키 복사 시 주의사항

- 키 전체를 정확히 복사 (앞뒤 공백 제거)
- `service_role` 키는 절대 클라이언트 코드에 사용하지 않음
- `.env.local`에만 저장, 절대 git에 커밋하지 않음

---

## 3. 환경변수 설정

### 3.1 .env.local 파일 생성

```bash
# .env.local
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 서버 사이드에서만 사용 (선택사항)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3.2 .env.example 업데이트

```bash
# .env.example (git에 커밋됨)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 4. 클라이언트 설정

### 4.1 필수 패키지

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 4.2 브라우저 클라이언트

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

### 4.3 서버 클라이언트 (App Router)

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
            // Server Component에서는 무시
          }
        },
      },
    }
  )
}
```

### 4.4 미들웨어 설정 (인증용)

```typescript
// src/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  await supabase.auth.getUser()

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

---

## 5. 연결 테스트

### 5.1 테스트 스크립트

```typescript
// scripts/test-supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function testConnection() {
  console.log('🔌 Supabase 연결 테스트 시작...')
  console.log(`📍 URL: ${supabaseUrl}`)

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // 1. 기본 연결 테스트 (존재하지 않는 테이블 쿼리)
    const { error } = await supabase.from('_connection_test').select('*').limit(1)

    if (error?.code === 'PGRST116') {
      // 테이블이 없다는 에러 = 연결은 성공
      console.log('✅ 데이터베이스 연결 성공!')
    } else if (error) {
      console.error('❌ 연결 실패:', error.message)
      return false
    } else {
      console.log('✅ 데이터베이스 연결 성공!')
    }

    // 2. 인증 서비스 테스트
    const { data: authData, error: authError } = await supabase.auth.getSession()
    if (!authError) {
      console.log('✅ 인증 서비스 연결 성공!')
    }

    console.log('\n🎉 모든 연결 테스트 통과!')
    return true

  } catch (err) {
    console.error('❌ 예상치 못한 에러:', err)
    return false
  }
}

testConnection()
```

### 5.2 실행 방법

```bash
# 환경변수 로드 후 실행
npx tsx scripts/test-supabase.ts

# 또는 dotenv 사용
npx dotenv -e .env.local -- npx tsx scripts/test-supabase.ts
```

### 5.3 예상 출력

```
🔌 Supabase 연결 테스트 시작...
📍 URL: https://xxxxx.supabase.co
✅ 데이터베이스 연결 성공!
✅ 인증 서비스 연결 성공!

🎉 모든 연결 테스트 통과!
```

---

## 6. 트러블슈팅

### 6.1 일반적인 에러

| 에러 | 원인 | 해결 |
|------|------|------|
| `Invalid API key` | anon 키 오류 | Settings > API에서 재복사 |
| `Invalid JWT` | 키 형식 오류 | 복사 시 공백/줄바꿈 제거 |
| `FetchError: network` | URL 오류 또는 네트워크 | URL 확인, VPN 해제 |
| `Project is paused` | 7일 미사용 | 대시보드에서 Restore |

### 6.2 CORS 에러 해결

1. Supabase 대시보드 > Settings > API
2. "Additional allowed origins" 섹션
3. 개발 URL 추가: `http://localhost:3000`
4. 프로덕션 URL 추가: `https://your-domain.com`

### 6.3 연결 타임아웃

```typescript
// 타임아웃 설정 추가
const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: 'public',
  },
  global: {
    fetch: (url, options = {}) => {
      return fetch(url, { ...options, signal: AbortSignal.timeout(10000) })
    },
  },
})
```

---

## 7. 보안 체크리스트

- [ ] `service_role` 키는 서버에서만 사용
- [ ] `.env.local`이 `.gitignore`에 포함됨
- [ ] RLS (Row Level Security) 활성화 예정
- [ ] 프로덕션에서는 SSL 연결 사용

---

## 8. 유용한 링크

- [Supabase 공식 문서](https://supabase.com/docs)
- [Next.js + Supabase 가이드](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
