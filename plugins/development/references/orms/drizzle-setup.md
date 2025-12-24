# Drizzle ORM 설정 가이드

타입 안전하고 가벼운 TypeScript ORM입니다. SQL에 가까운 문법으로 직관적입니다.

## 1. 패키지 설치

### PostgreSQL (Neon)

```bash
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit
```

### MySQL (PlanetScale)

```bash
npm install drizzle-orm @planetscale/database
npm install -D drizzle-kit
```

## 2. 파일 구조

```
프로젝트/
├── src/lib/db/
│   ├── drizzle.ts    # 클라이언트
│   └── schema.ts     # 스키마 정의
├── drizzle.config.ts # Drizzle Kit 설정
└── .env              # DATABASE_URL
```

## 3. 클라이언트 설정

### Neon (PostgreSQL)

```typescript
// src/lib/db/drizzle.ts
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema })
```

### PlanetScale (MySQL)

```typescript
// src/lib/db/drizzle.ts
import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import * as schema from './schema'

const connection = connect({ url: process.env.DATABASE_URL })
export const db = drizzle(connection, { schema })
```

## 4. 스키마 정의

### PostgreSQL

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

### MySQL

```typescript
// src/lib/db/schema.ts
import { mysqlTable, varchar, text, boolean, timestamp } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  id: varchar('id', { length: 128 }).primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})
```

## 5. Drizzle Kit 설정

```typescript
// drizzle.config.ts
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  driver: 'pg',  // 또는 'mysql2'
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config
```

## 6. 마이그레이션

```bash
# 마이그레이션 생성
npx drizzle-kit generate:pg  # PostgreSQL
npx drizzle-kit generate:mysql  # MySQL

# 스키마 푸시 (개발용)
npx drizzle-kit push:pg
npx drizzle-kit push:mysql
```

## 7. 연결 테스트

```typescript
// scripts/test-drizzle.ts
import { neon } from '@neondatabase/serverless'

async function testConnection() {
  console.log('🔌 Testing Drizzle connection...')

  const sql = neon(process.env.DATABASE_URL!)

  try {
    const result = await sql`SELECT 1`
    console.log('✅ Connection successful!')
    return true
  } catch (err: any) {
    console.error('❌ Failed:', err.message)
    return false
  }
}

testConnection()
```

## 8. 일반적인 사용 패턴

```typescript
import { db } from '@/lib/db/drizzle'
import { users, posts } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

// 전체 조회
const allUsers = await db.select().from(users)

// 조건 조회
const user = await db.select().from(users).where(eq(users.email, 'a@b.com'))

// 정렬 및 제한
const recentPosts = await db
  .select()
  .from(posts)
  .orderBy(desc(posts.createdAt))
  .limit(10)

// 생성
await db.insert(users).values({ id: 'xxx', email: 'new@example.com' })

// 수정
await db.update(users).set({ name: 'Updated' }).where(eq(users.id, userId))

// 삭제
await db.delete(posts).where(eq(posts.id, postId))
```

## 9. 트러블슈팅

| 에러 | 원인 | 해결 |
|------|------|------|
| `Connection refused` | URL 오류 | DATABASE_URL 확인 |
| `relation does not exist` | 테이블 없음 | `drizzle-kit push` 실행 |
| `SSL required` | SSL 설정 누락 | `?sslmode=require` 추가 |
