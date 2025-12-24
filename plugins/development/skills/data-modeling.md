# Data Modeling

Step 3.6: 데이터 모델링 (Data Modeling)

> **역할: Backend**
> 데이터베이스 스키마, 테이블, 관계 설계

## 설명

PRD와 기능 명세를 바탕으로 데이터 모델을 설계하고 데이터베이스 스키마를 생성하는 스킬입니다.

## 트리거

- Step 3.5 (ORM Setup) 완료 후 실행
- ORM 연결 테스트가 성공했을 때

## 입력

- `outputs/stage-1/prd.md`
- `outputs/stage-1/user-stories.md`
- `outputs/stage-1/feature-priority.md`
- `outputs/stage-3/tech-stack.md`
- `outputs/stage-3/database-setup.md`
- `outputs/stage-3/orm-setup.md`

## 실행 내용

### 엔티티 도출 프로세스

1. **PRD에서 명사 추출**: 사용자, 게시글, 댓글, 주문 등
2. **관계 파악**: 1:N, N:M 관계 정의
3. **필드 정의**: 각 엔티티의 속성
4. **제약조건**: 필수값, 유니크, 기본값

### 질문 가이드

1. **핵심 엔티티**
   - "서비스에서 가장 중요한 데이터는 뭔가요?"
   - "사용자가 만들거나 관리하는 것이 뭔가요?"

2. **관계**
   - "사용자 한 명이 여러 개의 {X}를 가질 수 있나요?"
   - "{A}와 {B}는 어떤 관계인가요?"

3. **추가 필드**
   - "이 데이터에 대해 더 저장해야 할 정보가 있나요?"
   - "검색이나 필터링에 필요한 필드가 있나요?"

### 일반적인 엔티티 패턴

#### 사용자 (users)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 프로필 확장 (profiles)
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  website TEXT,
  -- 서비스 특화 필드
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 콘텐츠 (예: posts)
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  status TEXT DEFAULT 'draft', -- draft, published, archived
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Supabase 스키마 생성

```sql
-- Supabase SQL Editor에서 실행

-- 1. 테이블 생성
CREATE TABLE {table_name} (
  -- 필드 정의
);

-- 2. RLS (Row Level Security) 활성화
ALTER TABLE {table_name} ENABLE ROW LEVEL SECURITY;

-- 3. RLS 정책 설정
CREATE POLICY "Users can view own data" ON {table_name}
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data" ON {table_name}
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data" ON {table_name}
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own data" ON {table_name}
  FOR DELETE USING (auth.uid() = user_id);

-- 4. 인덱스 생성 (선택)
CREATE INDEX {table_name}_user_id_idx ON {table_name}(user_id);
```

### TypeScript 타입 생성

```typescript
// src/types/database.ts

export interface User {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  user_id: string
  title: string
  content: string | null
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
}

// Supabase 자동 생성 타입 사용 시
// npx supabase gen types typescript --project-id {id} > src/types/supabase.ts
```

### 대화 원칙

- ERD 형태로 관계 시각화
- 각 필드의 목적 설명
- RLS 정책의 중요성 강조
- MVP에 필요한 최소 테이블에 집중

## 산출물

`outputs/stage-3/data-model.md`

```markdown
# Data Model

## 메타데이터
- Stage: 3
- Step: 3.6 - 데이터 모델링
- 생성일시: {현재 시간}
- 상태: final

## ERD (Entity Relationship Diagram)

```
+-------------+       +-------------+       +-------------+
|   users     |       |   posts     |       |  comments   |
+-------------+       +-------------+       +-------------+
| id (PK)     |<──┐   | id (PK)     |<──┐   | id (PK)     |
| email       |   │   | user_id(FK) |───┘   | post_id(FK) |───┐
| name        |   │   | title       |       | user_id(FK) |───┤
| avatar_url  |   │   | content     |       | content     |   │
| created_at  |   │   | status      |       | created_at  |   │
| updated_at  |   │   | created_at  |       +-------------+   │
+-------------+   │   | updated_at  |                         │
                  │   +-------------+                         │
                  │                                           │
                  └───────────────────────────────────────────┘
```

## 테이블 상세

### users
| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | UUID | PK, DEFAULT | 사용자 고유 ID |
| email | TEXT | UNIQUE, NOT NULL | 이메일 |
| name | TEXT | - | 이름 |
| avatar_url | TEXT | - | 프로필 이미지 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 생성일 |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | 수정일 |

### posts
| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | UUID | PK, DEFAULT | 게시글 ID |
| user_id | UUID | FK -> users | 작성자 |
| title | TEXT | NOT NULL | 제목 |
| content | TEXT | - | 내용 |
| status | TEXT | DEFAULT 'draft' | 상태 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 생성일 |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | 수정일 |

(... 나머지 테이블)

## SQL 스크립트

```sql
-- 전체 스키마 생성 SQL
{생성된 SQL 스크립트}
```

## RLS 정책

| 테이블 | 정책 | 설명 |
|--------|------|------|
| users | 본인만 수정 가능 | auth.uid() = id |
| posts | 작성자만 수정/삭제, 공개글은 모두 읽기 | - |

## TypeScript 타입

```typescript
{생성된 타입 정의}
```

## Supabase 설정 완료 확인

- [ ] Supabase 프로젝트 생성
- [ ] 테이블 생성
- [ ] RLS 활성화 및 정책 설정
- [ ] API 키 환경변수에 설정
- [ ] 연결 테스트 완료

## 다음 단계

API 엔드포인트를 설계합니다.
```

## 완료 조건

- 모든 핵심 엔티티 정의 완료
- 엔티티 간 관계 설정 완료
- 데이터베이스 테이블 생성 완료
- RLS 정책 설정 완료
- TypeScript 타입 생성 완료
- `data-model.md` 파일이 생성됨

## 다음 Step

→ Step 3.7: API Design (API 설계)
