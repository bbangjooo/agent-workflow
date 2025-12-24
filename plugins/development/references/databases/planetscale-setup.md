# PlanetScale 데이터베이스 설정 가이드

MySQL 호환 서버리스 데이터베이스입니다. 브랜치 기반 스키마 관리, 무중단 스키마 변경, 자동 스케일링이 특징입니다.

> ⚠️ **주의**: 2024년 4월부터 Free 티어가 폐지되었습니다. Hobby 플랜($39/월)부터 사용 가능합니다.

## 1. 프로젝트 생성

### 1.1 계정 생성

1. [planetscale.com](https://planetscale.com) 접속
2. "Get Started" 클릭
3. GitHub 계정으로 가입 (권장)

### 1.2 데이터베이스 생성

1. 대시보드에서 "Create a new database" 클릭
2. 정보 입력:
   - **Database name**: 프로젝트 이름 (예: my-saas-db)
   - **Region**: `ap-northeast-1` (Tokyo) 권장
   - **Plan**: Hobby ($39/월) 선택
3. "Create database" 클릭

### 1.3 Hobby 플랜 사양

| 항목 | 사양 |
|------|------|
| 스토리지 | 10GB |
| 읽기/쓰기 | 1억 행/월 |
| 브랜치 | 2개 (main + 1 dev) |
| 연결 | 1,000 동시 연결 |
| 자동 백업 | 일일 |

---

## 2. 연결 문자열 생성

### 2.1 비밀번호 생성

1. 데이터베이스 선택 > **Connect** 버튼 클릭
2. "Create password" 클릭
3. 옵션 설정:
   - **Branch**: `main`
   - **Role**: `Admin` (개발용) 또는 `Reader/Writer` (프로덕션)
   - **Name**: 식별 가능한 이름 (예: local-dev)
4. "Create password" 클릭

### 2.2 연결 문자열 복사

"Connect with" 드롭다운에서 프레임워크 선택:

#### Prisma용
```
DATABASE_URL='mysql://username:password@host/database?sslaccept=strict'
```

#### Drizzle/일반 MySQL용
```
DATABASE_URL='mysql://username:password@host/database?ssl={"rejectUnauthorized":true}'
```

> ⚠️ 비밀번호는 한 번만 표시됩니다. 반드시 안전하게 저장하세요!

---

## 3. 환경변수 설정

### 3.1 .env.local 파일

```bash
# .env.local
# PlanetScale Database
DATABASE_URL="mysql://xxxxx:pscale_pw_xxxxx@aws.connect.psdb.cloud/my-saas-db?sslaccept=strict"
```

### 3.2 .env.example

```bash
# .env.example
DATABASE_URL="mysql://user:password@host/database?sslaccept=strict"
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
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"  // PlanetScale에서 필수!
}

// 예시 모델
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]

  @@index([email])
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?  @db.Text
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([authorId])
}
```

> ⚠️ `relationMode = "prisma"` 필수! PlanetScale은 외래키를 지원하지 않습니다.

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
npm install drizzle-orm @planetscale/database
npm install -D drizzle-kit
```

#### Drizzle 설정

```typescript
// src/lib/db/drizzle.ts
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'

const connection = connect({
  url: process.env.DATABASE_URL,
})

export const db = drizzle(connection)
```

#### 스키마 정의

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

export const posts = mysqlTable('posts', {
  id: varchar('id', { length: 128 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  published: boolean('published').default(false),
  authorId: varchar('author_id', { length: 128 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})
```

---

## 5. 스키마 배포 (Branch 워크플로우)

### 5.1 PlanetScale CLI 설치

```bash
# macOS
brew install planetscale/tap/pscale

# 로그인
pscale auth login
```

### 5.2 개발 브랜치 생성

```bash
# 개발 브랜치 생성
pscale branch create my-saas-db dev

# 개발 브랜치에 연결
pscale connect my-saas-db dev --port 3309
```

### 5.3 스키마 푸시 (Prisma)

```bash
# 개발 브랜치에 스키마 푸시
DATABASE_URL="mysql://root@127.0.0.1:3309/my-saas-db" npx prisma db push
```

### 5.4 Deploy Request 생성

```bash
# 개발 → main 배포 요청
pscale deploy-request create my-saas-db dev

# 배포 요청 승인 및 배포
pscale deploy-request deploy my-saas-db <deploy-request-number>
```

---

## 6. 연결 테스트

### 6.1 테스트 스크립트 (Prisma)

```typescript
// scripts/test-planetscale.ts
import { PrismaClient } from '@prisma/client'

async function testConnection() {
  console.log('🔌 PlanetScale 연결 테스트 시작...')

  const prisma = new PrismaClient()

  try {
    // 연결 테스트 - 간단한 쿼리 실행
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ 데이터베이스 연결 성공!')

    // 테이블 목록 확인
    const tables = await prisma.$queryRaw<{ Tables_in_db: string }[]>`SHOW TABLES`
    console.log(`📊 테이블 수: ${tables.length}개`)

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

### 6.2 실행 방법

```bash
npx dotenv -e .env.local -- npx tsx scripts/test-planetscale.ts
```

### 6.3 예상 출력

```
🔌 PlanetScale 연결 테스트 시작...
✅ 데이터베이스 연결 성공!
📊 테이블 수: 2개

🎉 모든 연결 테스트 통과!
```

---

## 7. 트러블슈팅

### 7.1 일반적인 에러

| 에러 | 원인 | 해결 |
|------|------|------|
| `Access denied` | 비밀번호 오류 | 새 비밀번호 생성 |
| `Unknown database` | DB 이름 오류 | 연결 문자열 확인 |
| `SSL connection required` | SSL 설정 누락 | `sslaccept=strict` 추가 |
| `Too many connections` | 연결 풀 미설정 | Prisma 싱글톤 패턴 사용 |

### 7.2 Prisma 외래키 에러

```
Error: Foreign keys are not supported
```

해결: `schema.prisma`에 `relationMode = "prisma"` 추가

### 7.3 연결 풀 최적화

```typescript
// src/lib/db/prisma.ts
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // 연결 풀 설정
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
})
```

---

## 8. 보안 체크리스트

- [ ] 프로덕션용 별도 비밀번호 생성
- [ ] Reader/Writer 역할 사용 (Admin 아님)
- [ ] `.env.local`이 `.gitignore`에 포함됨
- [ ] IP 제한 설정 (Enterprise 플랜)

---

## 9. PlanetScale 특징

### 9.1 장점

- **무중단 스키마 변경**: Deploy Request로 안전한 마이그레이션
- **브랜치 워크플로우**: Git처럼 스키마 버전 관리
- **자동 스케일링**: 트래픽에 따라 자동 확장
- **글로벌 복제**: 여러 리전에 읽기 복제본

### 9.2 제한 사항

- **외래키 미지원**: 앱 레벨에서 관계 관리
- **트랜잭션 제한**: 분산 환경 특성
- **Free 티어 없음**: 최소 $39/월

---

## 10. 유용한 링크

- [PlanetScale 공식 문서](https://docs.planetscale.com)
- [Prisma + PlanetScale 가이드](https://www.prisma.io/docs/guides/database/planetscale)
- [PlanetScale Dashboard](https://app.planetscale.com)
- [PlanetScale CLI](https://docs.planetscale.com/reference/planetscale-cli)
