# Prisma 설정 가이드

타입 안전한 Node.js/TypeScript ORM입니다. PostgreSQL, MySQL, SQLite 등을 지원합니다.

## 1. 패키지 설치

```bash
npm install prisma @prisma/client
npx prisma init
```

## 2. 파일 구조

```
프로젝트/
├── prisma/
│   └── schema.prisma    # 스키마 정의
├── src/lib/db/
│   └── prisma.ts        # 클라이언트 싱글톤
└── .env                 # DATABASE_URL
```

## 3. 스키마 설정

### PostgreSQL (Neon)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
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

  @@index([authorId])
}
```

### MySQL (PlanetScale)

```prisma
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"  // PlanetScale 필수!
}
```

## 4. Prisma 클라이언트 싱글톤

```typescript
// src/lib/db/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## 5. 마이그레이션

```bash
# 개발
npx prisma migrate dev --name init

# 프로덕션
npx prisma migrate deploy

# PlanetScale (마이그레이션 없이)
npx prisma db push
```

## 6. 연결 테스트

```typescript
// scripts/test-prisma.ts
import { PrismaClient } from '@prisma/client'

async function testConnection() {
  console.log('🔌 Testing Prisma connection...')
  const prisma = new PrismaClient()

  try {
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Connection successful!')
    return true
  } catch (err: any) {
    console.error('❌ Failed:', err.message)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
```

## 7. 일반적인 사용 패턴

```typescript
import { prisma } from '@/lib/db/prisma'

// 조회
const users = await prisma.user.findMany()
const user = await prisma.user.findUnique({ where: { email: 'a@b.com' } })

// 관계 포함
const userWithPosts = await prisma.user.findUnique({
  where: { id: userId },
  include: { posts: true }
})

// 생성
const user = await prisma.user.create({
  data: { email: 'new@example.com', name: 'New' }
})

// 수정
const updated = await prisma.user.update({
  where: { id: userId },
  data: { name: 'Updated' }
})

// 삭제
await prisma.post.delete({ where: { id: postId } })
```

## 8. 트러블슈팅

| 에러 | 원인 | 해결 |
|------|------|------|
| `P1001` | DB 연결 불가 | DATABASE_URL 확인 |
| `P2002` | 유니크 제약 위반 | 중복 데이터 확인 |
| `Cannot find module` | 클라이언트 미생성 | `npx prisma generate` |
