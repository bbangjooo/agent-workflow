# API Design

Step 3.7: API 설계 (API Design)

> **역할: Backend**
> API 엔드포인트, 요청/응답 형식, 에러 처리 설계

## 설명

데이터 모델을 바탕으로 API 엔드포인트를 설계하는 스킬입니다. RESTful 패턴을 따르며, 사용자 스토리에 필요한 모든 기능을 커버합니다.

## 트리거

- Step 3.6 (Data Modeling) 완료 후 실행
- `data-model.md` 파일이 존재할 때

## 입력

- `outputs/stage-3/data-model.md`
- `outputs/stage-1/user-stories.md`
- `outputs/stage-1/feature-priority.md`

## 실행 내용

### API 설계 원칙

1. **RESTful 규칙 준수**
   - GET: 조회
   - POST: 생성
   - PUT/PATCH: 수정
   - DELETE: 삭제

2. **일관된 응답 형식**
   ```json
   {
     "data": { },
     "error": null,
     "message": "Success"
   }
   ```

3. **적절한 HTTP 상태 코드**
   - 200: 성공
   - 201: 생성 성공
   - 400: 잘못된 요청
   - 401: 인증 필요
   - 403: 권한 없음
   - 404: 찾을 수 없음
   - 500: 서버 에러

### 엔드포인트 도출

사용자 스토리에서 필요한 API 추출:

| 사용자 스토리 | 필요한 API |
|--------------|-----------|
| 사용자가 회원가입할 수 있다 | POST /auth/signup |
| 사용자가 로그인할 수 있다 | POST /auth/login |
| 사용자가 게시글을 작성할 수 있다 | POST /posts |
| 사용자가 게시글 목록을 볼 수 있다 | GET /posts |
| ... | ... |

### Next.js Route Handlers 구조

```
src/app/api/
├── auth/
│   ├── signup/route.ts
│   ├── login/route.ts
│   └── logout/route.ts
├── users/
│   ├── route.ts              # GET (목록), POST (생성)
│   └── [id]/route.ts         # GET, PUT, DELETE (단일)
├── posts/
│   ├── route.ts
│   └── [id]/
│       ├── route.ts
│       └── comments/route.ts
└── ...
```

### API 구현 템플릿

```typescript
// src/app/api/posts/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// 목록 조회
export async function GET(request: NextRequest) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json(
      { data: null, error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ data, error: null })
}

// 생성
export async function POST(request: NextRequest) {
  const supabase = createClient()
  const body = await request.json()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json(
      { data: null, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { data, error } = await supabase
    .from('posts')
    .insert({ ...body, user_id: user.id })
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { data: null, error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ data, error: null }, { status: 201 })
}
```

### Supabase 직접 호출 vs API Route

| 방식 | 장점 | 단점 | 사용 시점 |
|------|------|------|----------|
| Supabase 직접 | 간단, 빠름 | 복잡한 로직 어려움 | 단순 CRUD |
| API Route | 유연, 로직 추가 쉬움 | 코드량 증가 | 복잡한 비즈니스 로직 |

### 질문 가이드

1. **엔드포인트 확인**
   - "이 기능을 위한 API가 필요한데, 맞나요?"
   - "추가로 필요한 API가 있나요?"

2. **권한**
   - "이 API는 로그인한 사용자만 사용할 수 있나요?"
   - "다른 사용자의 데이터도 볼 수 있어야 하나요?"

### 대화 원칙

- API 목록을 먼저 제안하고 확인
- 요청/응답 예시 제공
- 복잡한 API는 패턴 문서 참조 안내
- MVP에 필요한 API에 집중

## 산출물

`outputs/stage-3/api-spec.md`

```markdown
# API Specification

## 메타데이터
- Stage: 3
- Step: 3.7 - API 설계
- 생성일시: {현재 시간}
- 상태: final

## Base URL

- 개발: `http://localhost:3000/api`
- 프로덕션: `https://{domain}/api`

## 인증

모든 인증이 필요한 API는 Supabase 세션을 사용합니다.
세션 정보는 쿠키에 저장됩니다.

## API 목록

### 인증 (Auth)

| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| POST | /auth/signup | 회원가입 | - |
| POST | /auth/login | 로그인 | - |
| POST | /auth/logout | 로그아웃 | O |
| GET | /auth/me | 현재 사용자 정보 | O |

### 사용자 (Users)

| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| GET | /users/:id | 사용자 정보 조회 | - |
| PUT | /users/:id | 사용자 정보 수정 | O (본인만) |

### 게시글 (Posts)

| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| GET | /posts | 게시글 목록 | - |
| GET | /posts/:id | 게시글 상세 | - |
| POST | /posts | 게시글 작성 | O |
| PUT | /posts/:id | 게시글 수정 | O (작성자만) |
| DELETE | /posts/:id | 게시글 삭제 | O (작성자만) |

(... 나머지 API)

## API 상세

### POST /auth/signup

회원가입

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "홍길동"
}
```

**Response (201):**
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "홍길동"
    }
  },
  "error": null
}
```

**Error (400):**
```json
{
  "data": null,
  "error": "Email already exists"
}
```

(... 나머지 API 상세)

## 에러 코드

| 코드 | 설명 |
|------|------|
| AUTH_REQUIRED | 로그인이 필요합니다 |
| FORBIDDEN | 권한이 없습니다 |
| NOT_FOUND | 리소스를 찾을 수 없습니다 |
| VALIDATION_ERROR | 입력값이 올바르지 않습니다 |

## 페이지네이션

목록 API는 다음 쿼리 파라미터를 지원합니다:

| 파라미터 | 기본값 | 설명 |
|----------|--------|------|
| page | 1 | 페이지 번호 |
| limit | 20 | 페이지당 항목 수 |
| sort | created_at | 정렬 필드 |
| order | desc | 정렬 방향 |

## 파일 구조

```
src/app/api/
├── auth/
│   ├── signup/route.ts
│   ├── login/route.ts
│   ├── logout/route.ts
│   └── me/route.ts
├── users/
│   └── [id]/route.ts
├── posts/
│   ├── route.ts
│   └── [id]/route.ts
└── ...
```

## 다음 단계

인증 시스템을 구현합니다.
```

## 완료 조건

- 모든 필요 API 엔드포인트 정의 완료
- 요청/응답 형식 정의 완료
- 인증 요구사항 정의 완료
- 에러 처리 규칙 정의 완료
- `api-spec.md` 파일이 생성됨

## 다음 Step

→ Step 3.8: Authentication (인증 구현)
