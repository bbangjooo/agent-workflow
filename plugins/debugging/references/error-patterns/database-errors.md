# Database Errors 패턴 및 해결책

데이터베이스 연결, 쿼리, 마이그레이션 관련 일반적인 에러 패턴과 해결 방법입니다.

---

## 연결 에러

### Connection Refused

**에러:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
Error: Connection refused
FATAL: password authentication failed for user
```

**원인별 해결책:**

#### 1. 잘못된 연결 정보

**확인 사항:**
- [ ] 호스트 주소 확인
- [ ] 포트 번호 확인
- [ ] 사용자명/비밀번호 확인
- [ ] 데이터베이스명 확인

**Supabase 연결 예시:**
```bash
# .env.local
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# 또는 Pooling 사용 (권장)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

---

#### 2. 네트워크/방화벽 문제

**로컬 개발:**
```bash
# PostgreSQL 서버 실행 확인
pg_isready -h localhost -p 5432

# Docker로 실행 중인 경우
docker ps | grep postgres
```

**클라우드 DB:**
- DB 대시보드에서 IP 화이트리스트 확인
- 배포 환경의 경우 `0.0.0.0/0` 또는 특정 IP 허용

---

#### 3. SSL 연결 필요

**에러:**
```
Error: SSL connection is required
no pg_hba.conf entry for host
```

**해결:**
```bash
# 연결 문자열에 SSL 옵션 추가
DATABASE_URL="postgresql://...?sslmode=require"

# 또는 sslmode=no-verify (인증서 검증 생략)
DATABASE_URL="postgresql://...?sslmode=no-verify"
```

**Prisma의 경우:**
```prisma
// schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

### Connection Pool Exhausted

**에러:**
```
Error: Connection pool exhausted
Error: too many connections for role
remaining connection slots are reserved
```

**해결:**

#### Prisma
```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

#### 연결 풀 사용 (Supabase)
```bash
# Pooler 연결 사용
DATABASE_URL="postgresql://...@[PROJECT].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

---

## 쿼리 에러

### Syntax Error in SQL

**에러:**
```
ERROR: syntax error at or near "..."
QueryFailedError: syntax error
```

**해결:**
```typescript
// 변경 전 - 잘못된 쿼리
const result = await prisma.$queryRaw`
  SELECT * FROM users WHERE name = ${name}  // 따옴표 누락될 수 있음
`

// 변경 후 - Prisma 파라미터 사용
const result = await prisma.user.findMany({
  where: { name: name }
})
```

---

### Column/Table Not Found

**에러:**
```
ERROR: relation "users" does not exist
ERROR: column "email" does not exist
```

**원인:**
1. 테이블이 생성되지 않음
2. 마이그레이션이 적용되지 않음
3. 스키마 이름이 다름

**해결:**

#### Prisma
```bash
# 마이그레이션 적용
npx prisma migrate dev

# 또는 프로덕션에서
npx prisma migrate deploy

# 스키마 동기화 (개발용)
npx prisma db push
```

#### Supabase
```sql
-- SQL Editor에서 테이블 확인
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- 컬럼 확인
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'users';
```

---

### Unique Constraint Violation

**에러:**
```
ERROR: duplicate key value violates unique constraint
Unique constraint failed on the fields: (`email`)
```

**해결:**
```typescript
// 삽입 전 존재 여부 확인
const existing = await prisma.user.findUnique({
  where: { email: email }
})

if (existing) {
  // 업데이트 또는 에러 처리
  return await prisma.user.update({
    where: { email: email },
    data: { ...data }
  })
}

// 새로 생성
return await prisma.user.create({
  data: { email, ...data }
})

// 또는 upsert 사용
await prisma.user.upsert({
  where: { email: email },
  update: { ...data },
  create: { email, ...data }
})
```

---

### Foreign Key Violation

**에러:**
```
ERROR: insert or update on table "posts" violates foreign key constraint
Foreign key constraint failed on the field
```

**해결:**
```typescript
// 참조하는 레코드가 존재하는지 확인
const user = await prisma.user.findUnique({
  where: { id: userId }
})

if (!user) {
  throw new Error('User not found')
}

// 그 후 생성
await prisma.post.create({
  data: {
    title: 'Post Title',
    userId: user.id  // 존재하는 user
  }
})
```

---

## Supabase 특유 에러

### Row Level Security (RLS) 에러

**에러:**
```
Error: new row violates row-level security policy for table
42501: permission denied for table
```

**해결:**

#### 1. RLS가 활성화된 테이블에 정책 추가
```sql
-- Supabase SQL Editor에서
-- 읽기 정책
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- 쓰기 정책
CREATE POLICY "Users can insert own data" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 또는 개발 중 일시적으로 RLS 비활성화
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
```

#### 2. 서비스 키 사용 (서버 사이드)
```typescript
// 서버에서만 사용 - 클라이언트 노출 금지!
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // 서버 전용 키
)

// RLS 우회하여 쿼리
const { data } = await supabaseAdmin.from('users').select('*')
```

---

### Auth 관련 에러

**에러:**
```
Error: Invalid JWT
Error: User not found
AuthApiError: Email not confirmed
```

**해결:**
```typescript
// 세션 확인
const { data: { session }, error } = await supabase.auth.getSession()

if (!session) {
  // 로그인 필요
  redirect('/login')
}

// 토큰 갱신
const { data, error } = await supabase.auth.refreshSession()
```

---

## Prisma 특유 에러

### Prisma Client Generation

**에러:**
```
Error: @prisma/client did not initialize yet
Error: PrismaClient is not generated
```

**해결:**
```bash
# Prisma Client 생성
npx prisma generate

# 스키마 변경 후 항상 실행
npx prisma generate
```

---

### Migration 충돌

**에러:**
```
Error: Migration failed to apply
Error: Drift detected
```

**해결:**
```bash
# 마이그레이션 상태 확인
npx prisma migrate status

# 개발 환경 - 마이그레이션 리셋
npx prisma migrate reset

# 드리프트 해결
npx prisma migrate resolve --applied "migration_name"
```

---

## 빠른 진단 체크리스트

데이터베이스 에러 발생 시 확인:

1. [ ] 연결 문자열이 올바른가? (호스트, 포트, 사용자, 비밀번호, DB명)
2. [ ] 환경 변수가 제대로 설정되어 있는가?
3. [ ] SSL 설정이 필요한가?
4. [ ] 마이그레이션이 적용되어 있는가?
5. [ ] 테이블/컬럼이 실제로 존재하는가?
6. [ ] RLS 정책이 설정되어 있는가? (Supabase)
7. [ ] 연결 풀이 고갈되지 않았는가?
8. [ ] 외래 키 관계가 올바른가?

---

## 유용한 디버깅 명령어

### Prisma
```bash
# 스키마 검증
npx prisma validate

# DB 상태 확인
npx prisma db pull

# Prisma Studio (GUI)
npx prisma studio
```

### PostgreSQL
```bash
# 연결 테스트
psql "postgresql://user:pass@host:5432/dbname"

# 테이블 목록
\dt

# 테이블 구조
\d table_name
```
