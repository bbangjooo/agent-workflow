# Core Features Implementation

Step 3.6: 핵심 기능 개발

> **역할: Full-stack (Backend + Frontend)**
> - Backend: API Routes, Server Actions, 비즈니스 로직
> - Frontend: 데이터 fetching 훅, 상태 관리

## 설명

MVP의 핵심 기능(P0)을 구현하는 스킬입니다. 기능 우선순위에 따라 가장 중요한 기능부터 개발합니다.

## 트리거

- Step 3.5 (Authentication) 완료 후 실행
- `auth-impl.md` 파일이 존재할 때

## 입력

- `outputs/stage-1/feature-priority.md`
- `outputs/stage-1/user-stories.md`
- `outputs/stage-3/api-spec.md`
- `outputs/stage-3/data-model.md`

## 기능 개발 순서

1. **P0 기능 목록 확인**: feature-priority.md에서 추출
2. **기능별 분해**: 각 기능을 작은 단위로 분해
3. **순차 개발**: Backend 먼저 → Frontend

## 기능 개발 패턴

각 기능은 다음 순서로 개발:

```
1. [Backend] API Routes 구현
2. [Backend] Server Actions 구현
3. [Frontend] 데이터 fetching 훅
4. [Frontend] UI 컴포넌트 (다음 Step에서)
```

---

# Backend 구현

## [Backend] API 구현 예시

```typescript
// src/app/api/posts/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// 게시글 목록
export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)

  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from('posts')
    .select('*, author:users(id, name, avatar_url)', { count: 'exact' })
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    data,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil((count || 0) / limit)
    }
  })
}

// 게시글 작성
export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  // 유효성 검사
  if (!body.title?.trim()) {
    return NextResponse.json({ error: '제목을 입력해주세요' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('posts')
    .insert({
      user_id: user.id,
      title: body.title,
      content: body.content,
      status: body.status || 'draft'
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
```

## [Backend] Server Actions 패턴

```typescript
// src/lib/actions/posts.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '로그인이 필요합니다' }
  }

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const { data, error } = await supabase
    .from('posts')
    .insert({ user_id: user.id, title, content })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/posts')
  return { data }
}

export async function deletePost(postId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '로그인이 필요합니다' }
  }

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)
    .eq('user_id', user.id) // 본인 글만 삭제 가능

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/posts')
  return { success: true }
}
```

### [Backend] 기능별 개발 체크리스트

각 기능에 대해:

- [ ] API 엔드포인트 구현
- [ ] 유효성 검사 추가
- [ ] 에러 처리 추가
- [ ] Server Action 구현

---

# Frontend 구현

## [Frontend] 데이터 Fetching 훅

```typescript
// src/hooks/usePosts.ts
'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

interface Post {
  id: string
  title: string
  content: string
  created_at: string
  author: {
    id: string
    name: string
    avatar_url: string
  }
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('posts')
        .select('*, author:users(id, name, avatar_url)')
        .eq('status', 'published')
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setPosts(data || [])
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  return { posts, loading, error }
}
```

### [Frontend] 기능별 개발 체크리스트

각 기능에 대해:

- [ ] 데이터 fetching 훅 구현
- [ ] 로딩/에러 상태 처리
- [ ] 기본 동작 테스트

---

## 질문 가이드

1. **기능 확인**
   - "P0 기능 목록을 확인해볼게요. 이 순서대로 개발할까요?"
   - "이 기능에서 추가로 필요한 부분이 있나요?"

2. **구현 방식**
   - "이 기능은 실시간으로 업데이트되어야 하나요?"
   - "페이지네이션이 필요한가요?"

## 대화 원칙

- Backend 먼저 구현 후 Frontend 진행
- 한 기능씩 개발하고 확인
- 복잡한 기능은 더 작게 분해
- AI 도구 활용 적극 권장
- 에러 발생 시 차분히 해결

---

## 산출물

`outputs/stage-3/feature-impl.md`

```markdown
# Feature Implementation

## 메타데이터
- Stage: 3
- Step: 3.6 - 핵심 기능 개발
- 생성일시: {현재 시간}
- 상태: final

## 구현된 P0 기능

| 기능 | 상태 | API | 액션 |
|------|------|-----|------|
| 게시글 목록 | [x] | GET /posts | - |
| 게시글 작성 | [x] | POST /posts | createPost |
| 게시글 수정 | [x] | PUT /posts/:id | updatePost |
| 게시글 삭제 | [x] | DELETE /posts/:id | deletePost |
| ... | ... | ... | ... |

## 파일 목록

### Backend
| 파일 | 기능 |
|------|------|
| src/app/api/posts/route.ts | 게시글 CRUD |
| src/app/api/posts/[id]/route.ts | 개별 게시글 |
| src/lib/actions/posts.ts | Server Actions |
| ... | ... |

### Frontend
| 파일 | 기능 |
|------|------|
| src/hooks/usePosts.ts | usePosts 훅 |
| ... | ... |

## 테스트 결과

- [x] 게시글 목록 조회 성공
- [x] 게시글 작성 성공
- [x] 게시글 수정 성공 (본인만)
- [x] 게시글 삭제 성공 (본인만)
- [x] 권한 없는 작업 거부

## 남은 기능 (P1+)

| 기능 | 우선순위 | 상태 |
|------|----------|------|
| 댓글 기능 | P1 | 대기 |
| 좋아요 기능 | P1 | 대기 |
| ... | ... | ... |

## 다음 단계

UI 컴포넌트와 화면을 구현합니다.
```

## 완료 조건

- 모든 P0 기능 API 구현 완료
- 기본 동작 테스트 완료
- 에러 처리 완료
- `feature-impl.md` 파일이 생성됨

## 다음 Step

-> Step 3.7: UI Implementation (UI 구현)
