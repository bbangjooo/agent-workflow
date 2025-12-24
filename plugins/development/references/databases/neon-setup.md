# Neon 데이터베이스 설정 가이드

서버리스 PostgreSQL 데이터베이스입니다. 브랜치 기능, 자동 스케일링, 관대한 무료 티어가 특징입니다.

## 1. 프로젝트 생성

### 1.1 계정 생성

1. [neon.tech](https://neon.tech) 접속
2. "Sign Up" 클릭
3. GitHub, Google, 또는 이메일로 가입

### 1.2 프로젝트 생성

1. 대시보드에서 "New Project" 클릭
2. 정보 입력:
   - **Project name**: 프로젝트 이름 (예: my-saas-app)
   - **Postgres version**: 16 (최신) 권장
   - **Region**: `Asia Pacific (Singapore)` 권장
3. "Create Project" 클릭
4. 연결 문자열이 자동 표시됨

### 1.3 Free 티어 사양

| 항목 | 사양 |
|------|------|
| 프로젝트 수 | 10개 |
| 브랜치 | 10개/프로젝트 |
| 스토리지 | 0.5GB/프로젝트 |
| 컴퓨트 | 0.25 vCPU |
| 컴퓨트 시간 | 191시간/월 |
| 자동 일시정지 | 5분 미사용 시 |

> 💡 자동 일시정지는 비용 절약에 좋지만, 콜드 스타트 (약 1초) 발생

---

## 2. 연결 문자열 확인

### 2.1 대시보드에서 확인

1. 프로젝트 선택
2. "Connection Details" 패널 확인
3. "Connection string" 복사

### 2.2 연결 문자열 형식

```
postgresql://user:password@ep-cool-name-123456.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

구성 요소:
- `user`: 자동 생성된 사용자명
- `password`: 자동 생성된 비밀번호
- `ep-cool-name-123456`: 엔드포인트 이름
- `ap-southeast-1`: 리전
- `neondb`: 기본 데이터베이스 이름

### 2.3 Pooled vs Direct 연결

| 연결 타입 | 용도 | 포트 |
|-----------|------|------|
| Pooled | 서버리스 환경 (Vercel, Lambda) | 기본 |
| Direct | 마이그레이션, 장시간 연결 | `-pooler` 제거 |

```bash
# Pooled (기본)
postgresql://...@ep-cool-name-123456.ap-southeast-1.aws.neon.tech/neondb

# Direct (마이그레이션용)
postgresql://...@ep-cool-name-123456.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

---

## 3. 환경변수 설정

### 3.1 .env.local 파일

```bash
# .env.local
# Neon PostgreSQL
DATABASE_URL="postgresql://user:password@ep-xxxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

# 마이그레이션용 (Direct)
DIRECT_DATABASE_URL="postgresql://user:password@ep-xxxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
```

### 3.2 .env.example

```bash
# .env.example
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
DIRECT_DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

---

## 4. 클라이언트 설정

### 4.1 Prisma 사용 시

#### 패키지 설치

```bash
npm install prisma @prisma/client
npx prisma init
```

#### Prisma 스키마 설정

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")  // 마이그레이션용
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Prisma 클라이언트 생성

```typescript
// src/lib/db/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 4.2 Drizzle 사용 시

#### 패키지 설치

```bash
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit
```

#### Drizzle 설정

```typescript
// src/lib/db/drizzle.ts
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql)
```

#### 스키마 정의

```typescript
// src/lib/db/schema.ts
import { pgTable, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: varchar('id', { length: 128 }).primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const posts = pgTable('posts', {
  id: varchar('id', { length: 128 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  published: boolean('published').default(false),
  authorId: varchar('author_id', { length: 128 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
```

### 4.3 Vercel Postgres (Neon 기반)

Vercel 프로젝트에서 사용 시:

```bash
npm install @vercel/postgres
```

```typescript
// src/lib/db/vercel.ts
import { sql } from '@vercel/postgres'

export { sql }

// 사용 예시
const result = await sql`SELECT * FROM users WHERE id = ${userId}`
```

---

## 5. 스키마 마이그레이션

### 5.1 Prisma 마이그레이션

```bash
# 마이그레이션 생성 및 적용
npx prisma migrate dev --name init

# 프로덕션 마이그레이션
npx prisma migrate deploy

# 스키마 푸시 (개발용)
npx prisma db push
```

### 5.2 Drizzle 마이그레이션

```bash
# drizzle.config.ts 생성
npx drizzle-kit generate:pg

# 마이그레이션 적용
npx drizzle-kit push:pg
```

---

## 6. 연결 테스트

### 6.1 테스트 스크립트 (Prisma)

```typescript
// scripts/test-neon.ts
import { PrismaClient } from '@prisma/client'

async function testConnection() {
  console.log('🔌 Neon PostgreSQL 연결 테스트 시작...')

  const prisma = new PrismaClient()

  try {
    // 연결 테스트 - PostgreSQL 버전 확인
    const result = await prisma.$queryRaw<[{ version: string }]>`SELECT version()`
    console.log('✅ 데이터베이스 연결 성공!')
    console.log(`📊 PostgreSQL 버전: ${result[0].version.split(' ')[0]} ${result[0].version.split(' ')[1]}`)

    // 테이블 목록 확인
    const tables = await prisma.$queryRaw<{ tablename: string }[]>`
      SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    `
    console.log(`📋 테이블 수: ${tables.length}개`)

    console.log('\n🎉 모든 연결 테스트 통과!')
    return true

  } catch (err: any) {
    console.error('❌ 연결 실패:', err.message)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
```

### 6.2 테스트 스크립트 (Neon SDK)

```typescript
// scripts/test-neon-sdk.ts
import { neon } from '@neondatabase/serverless'

async function testConnection() {
  console.log('🔌 Neon 연결 테스트 시작...')

  const sql = neon(process.env.DATABASE_URL!)

  try {
    // 버전 확인
    const result = await sql`SELECT version()`
    console.log('✅ 데이터베이스 연결 성공!')
    console.log(`📊 ${result[0].version}`)

    // 응답 시간 측정
    const start = Date.now()
    await sql`SELECT 1`
    const latency = Date.now() - start
    console.log(`⚡ 응답 시간: ${latency}ms`)

    console.log('\n🎉 모든 연결 테스트 통과!')
    return true

  } catch (err: any) {
    console.error('❌ 연결 실패:', err.message)
    return false
  }
}

testConnection()
```

### 6.3 실행 방법

```bash
npx dotenv -e .env.local -- npx tsx scripts/test-neon.ts
```

### 6.4 예상 출력

```
🔌 Neon PostgreSQL 연결 테스트 시작...
✅ 데이터베이스 연결 성공!
📊 PostgreSQL 버전: PostgreSQL 16.1
📋 테이블 수: 2개

🎉 모든 연결 테스트 통과!
```

---

## 7. 브랜치 활용

### 7.1 개발 브랜치 생성

1. Neon 대시보드 > 프로젝트 선택
2. "Branches" 탭 클릭
3. "Create branch" 클릭
4. 브랜치 이름 입력 (예: dev, staging)

### 7.2 브랜치별 연결 문자열

각 브랜치는 고유한 연결 문자열을 가집니다:

```bash
# main 브랜치
DATABASE_URL="postgresql://...@ep-main-xxxxx.../neondb"

# dev 브랜치
DATABASE_URL_DEV="postgresql://...@ep-dev-xxxxx.../neondb"
```

### 7.3 브랜치 용도

| 브랜치 | 용도 |
|--------|------|
| main | 프로덕션 |
| dev | 개발/테스트 |
| staging | 스테이징 환경 |
| feature-* | 기능별 테스트 |

---

## 8. 트러블슈팅

### 8.1 일반적인 에러

| 에러 | 원인 | 해결 |
|------|------|------|
| `Connection timeout` | 콜드 스타트 | 재시도 또는 keep-alive |
| `SSL required` | sslmode 누락 | `?sslmode=require` 추가 |
| `Too many connections` | 연결 풀 미설정 | Pooled 연결 사용 |
| `Endpoint suspended` | 컴퓨트 시간 초과 | 대시보드에서 재시작 |

### 8.2 콜드 스타트 최적화

```typescript
// 연결 유지 (keep-alive)
import { Pool } from '@neondatabase/serverless'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// 주기적 쿼리로 연결 유지
setInterval(async () => {
  await pool.query('SELECT 1')
}, 60000)  // 1분마다
```

### 8.3 Vercel에서 타임아웃

```typescript
// vercel.json
{
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

---

## 9. 보안 체크리스트

- [ ] 프로덕션용 별도 브랜치 사용
- [ ] IP 허용 목록 설정 (Pro 플랜)
- [ ] `.env.local`이 `.gitignore`에 포함됨
- [ ] 읽기 전용 사용자 생성 (분석용)

---

## 10. Neon 특징

### 10.1 장점

- **관대한 무료 티어**: 취미 프로젝트에 충분
- **브랜치 기능**: 스키마 테스트 용이
- **자동 스케일링**: 사용량에 따라 자동 조정
- **빠른 프로비저닝**: 수 초 내 데이터베이스 생성
- **PostgreSQL 호환**: 모든 PostgreSQL 기능 사용 가능

### 10.2 제한 사항

- **콜드 스타트**: 5분 미사용 시 일시정지 (Free)
- **컴퓨트 시간 제한**: 191시간/월 (Free)
- **스토리지 제한**: 0.5GB (Free)

---

## 11. 유용한 링크

- [Neon 공식 문서](https://neon.tech/docs)
- [Prisma + Neon 가이드](https://neon.tech/docs/guides/prisma)
- [Neon Dashboard](https://console.neon.tech)
- [Neon Serverless Driver](https://neon.tech/docs/serverless/serverless-driver)
- [Vercel + Neon 통합](https://vercel.com/integrations/neon)
