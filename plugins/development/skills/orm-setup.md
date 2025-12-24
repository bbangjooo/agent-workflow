# ORM Setup

Step 3.5: ORM 설정 (ORM Setup)

> **역할: Backend**
> ORM/DB 클라이언트 설치, 설정, 연결 테스트 (코드 관점)

## 설명

선택한 데이터베이스에 맞는 ORM 또는 클라이언트 라이브러리를 설치하고 설정하는 스킬입니다. 코드 레벨에서 DB 연결을 구성하고 실제 연결이 동작하는지 테스트합니다.

> 인프라 레벨의 DB 프로젝트 생성과 환경변수 설정은 이전 Step(Database Setup)에서 완료되어 있어야 합니다.

## 트리거

- Step 3.4 (Database Setup) 완료 후 실행
- 환경변수가 설정되어 있을 때
- `database-setup.md`가 존재할 때

## 입력

- `outputs/stage-3/tech-stack.md`
- `outputs/stage-3/database-setup.md`

## 실행 내용

### 1. ORM/클라이언트 선택

DB 서비스에 따라 적합한 ORM을 선택합니다.

| DB 서비스 | 권장 ORM/클라이언트 | 대안 |
|-----------|-------------------|------|
| Supabase | Supabase JS Client | Prisma (직접 연결 시) |
| Firebase | Firebase SDK | - |
| PlanetScale | Prisma, Drizzle | Kysely |
| Neon | Prisma, Drizzle | Neon Serverless Driver |

### 2. 패키지 설치

#### Supabase Client
```bash
npm install @supabase/supabase-js @supabase/ssr
```

#### Firebase SDK
```bash
npm install firebase
```

#### Prisma
```bash
npm install prisma @prisma/client
npx prisma init
```

#### Drizzle
```bash
# PostgreSQL (Neon)
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit

# MySQL (PlanetScale)
npm install drizzle-orm @planetscale/database
npm install -D drizzle-kit
```

### 3. 클라이언트 설정

선택한 ORM에 따라 `references/orms/` 문서를 참조하여 진행합니다.

| ORM | 참조 문서 |
|-----|-----------|
| Supabase Client | `references/orms/supabase-client.md` |
| Firebase SDK | `references/orms/firebase-client.md` |
| Prisma | `references/orms/prisma-setup.md` |
| Drizzle | `references/orms/drizzle-setup.md` |

#### Supabase 클라이언트 예시

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
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch { /* Server Component */ }
        },
      },
    }
  )
}
```

#### Prisma 예시

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")  // Neon용
}
```

```typescript
// src/lib/db/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

#### Drizzle 예시

```typescript
// src/lib/db/drizzle.ts
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql)
```

### 4. 연결 테스트 (핵심!)

**이 단계가 이 스킬의 핵심입니다.** 실제로 DB에 연결되는지 검증합니다.

#### 테스트 스크립트 작성

```typescript
// scripts/test-db-connection.ts

// Supabase 버전
import { createClient } from '@supabase/supabase-js'

async function testSupabaseConnection() {
  console.log('🔌 Testing Supabase connection...')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  try {
    const { error } = await supabase.from('_test').select('*').limit(1)

    if (error?.code === 'PGRST116' || !error) {
      console.log('✅ Supabase connection successful!')
      return true
    }

    console.error('❌ Connection failed:', error.message)
    return false
  } catch (err) {
    console.error('❌ Connection error:', err)
    return false
  }
}

// Prisma 버전
import { PrismaClient } from '@prisma/client'

async function testPrismaConnection() {
  console.log('🔌 Testing Prisma connection...')

  const prisma = new PrismaClient()

  try {
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Prisma connection successful!')
    return true
  } catch (err: any) {
    console.error('❌ Connection failed:', err.message)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

// 실행
testSupabaseConnection()  // 또는 testPrismaConnection()
```

#### 테스트 실행

```bash
# 환경변수 로드 후 실행
npx dotenv -e .env.local -- npx tsx scripts/test-db-connection.ts

# 또는 ts-node 사용
npx dotenv -e .env.local -- npx ts-node scripts/test-db-connection.ts
```

#### 예상 출력

```
🔌 Testing Supabase connection...
✅ Supabase connection successful!
```

### 5. 연결 실패 시 트러블슈팅

| 에러 유형 | 원인 | 해결 방법 |
|-----------|------|-----------|
| `Invalid API key` | 환경변수 오류 | `.env.local` 키 재확인 |
| `Connection refused` | URL 오류 | DATABASE_URL 형식 확인 |
| `SSL required` | SSL 설정 누락 | `?sslmode=require` 추가 |
| `CORS error` | 브라우저 제한 | 서버 사이드에서 테스트 |
| `Too many connections` | 연결 풀 미설정 | 싱글톤 패턴 적용 |

### 질문 가이드

1. **ORM 선택**
   - "어떤 ORM을 사용하시겠어요? Supabase를 선택하셨으니 Supabase Client를 추천해요."
   - "Prisma나 Drizzle 같은 타입 안전한 ORM을 선호하시나요?"

2. **패키지 설치**
   - "필요한 패키지를 설치해볼까요?"
   - "설치 중 에러가 나면 알려주세요."

3. **클라이언트 설정**
   - "클라이언트 파일을 만들어볼게요."
   - "이 코드가 어떤 역할을 하는지 설명해드릴까요?"

4. **연결 테스트**
   - "테스트 스크립트를 실행해서 연결이 되는지 확인해볼까요?"
   - "성공 메시지가 나오면 다음 단계로 넘어가요!"

### 대화 원칙

- ORM 선택의 장단점 설명
- 코드 파일 위치와 역할 명확히 안내
- 연결 테스트 성공까지 진행
- 실패 시 차분히 트러블슈팅

## 산출물

`outputs/stage-3/orm-setup.md`

```markdown
# ORM Setup

## 메타데이터
- Stage: 3
- Step: 3.5 - ORM 설정
- 생성일시: {현재 시간}
- 상태: final

## ORM 정보

| 항목 | 값 |
|------|-----|
| ORM/클라이언트 | {Supabase Client/Prisma/Drizzle} |
| 버전 | {x.x.x} |
| DB 서비스 | {Supabase/Neon/PlanetScale} |

## 설치한 패키지

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## 클라이언트 파일 구조

| 파일 | 용도 |
|------|------|
| `src/lib/supabase/client.ts` | 브라우저 클라이언트 |
| `src/lib/supabase/server.ts` | 서버 클라이언트 |
| `src/middleware.ts` | 인증 미들웨어 (선택) |

## 연결 테스트 결과

```
🔌 Testing Supabase connection...
✅ Supabase connection successful!
📊 Connection details:
   - URL: https://xxxxx.supabase.co
   - Response time: 123ms
```

## 클라이언트 코드

### 브라우저 클라이언트
```typescript
// src/lib/supabase/client.ts
{실제 코드}
```

### 서버 클라이언트
```typescript
// src/lib/supabase/server.ts
{실제 코드}
```

## 확인 사항

- [x] ORM/클라이언트 패키지 설치
- [x] 클라이언트 파일 생성
- [x] 환경변수 연결 확인
- [x] 연결 테스트 통과

## 다음 단계

데이터 모델을 설계하고 스키마를 정의합니다.
```

## 완료 조건

- ORM/클라이언트 패키지 설치 완료
- 클라이언트 설정 파일 생성 완료
- **연결 테스트 스크립트 실행 성공** (핵심!)
- `orm-setup.md` 파일이 생성됨

## 다음 Step

→ Step 3.6: Data Modeling (데이터 모델링)
