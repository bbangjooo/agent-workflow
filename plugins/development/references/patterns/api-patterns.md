# API Patterns

API 구현 패턴 모음입니다.

## Next.js Route Handlers

### 기본 CRUD 패턴

```typescript
// src/app/api/posts/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// 목록 조회
export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)

  // 페이지네이션
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = (page - 1) * limit

  // 필터링
  const status = searchParams.get('status')
  const search = searchParams.get('q')

  let query = supabase
    .from('posts')
    .select('*, author:users(id, name, avatar_url)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status) {
    query = query.eq('status', status)
  }

  if (search) {
    query = query.ilike('title', `%${search}%`)
  }

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({
    data,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil((count || 0) / limit),
    },
  })
}

// 생성
export async function POST(request: NextRequest) {
  const supabase = createClient()

  // 인증 확인
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // 요청 파싱
  const body = await request.json()

  // 유효성 검사
  if (!body.title?.trim()) {
    return NextResponse.json(
      { error: '제목을 입력해주세요' },
      { status: 400 }
    )
  }

  // 생성
  const { data, error } = await supabase
    .from('posts')
    .insert({
      user_id: user.id,
      title: body.title.trim(),
      content: body.content,
      status: 'draft',
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ data }, { status: 201 })
}
```

```typescript
// src/app/api/posts/[id]/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

type Params = { params: { id: string } }

// 단일 조회
export async function GET(request: NextRequest, { params }: Params) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*, author:users(id, name, avatar_url)')
    .eq('id', params.id)
    .single()

  if (error) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({ data })
}

// 수정
export async function PUT(request: NextRequest, { params }: Params) {
  const supabase = createClient()

  // 인증 확인
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 권한 확인 (작성자만)
  const { data: post } = await supabase
    .from('posts')
    .select('user_id')
    .eq('id', params.id)
    .single()

  if (post?.user_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()

  const { data, error } = await supabase
    .from('posts')
    .update({
      title: body.title,
      content: body.content,
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

// 삭제
export async function DELETE(request: NextRequest, { params }: Params) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 권한 확인
  const { data: post } = await supabase
    .from('posts')
    .select('user_id')
    .eq('id', params.id)
    .single()

  if (post?.user_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
```

## Server Actions 패턴

```typescript
// src/lib/actions/posts.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '로그인이 필요합니다' }
  }

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title.trim()) {
    return { error: '제목을 입력해주세요' }
  }

  const { data, error } = await supabase
    .from('posts')
    .insert({ user_id: user.id, title, content })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/posts')
  redirect(`/posts/${data.id}`)
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '로그인이 필요합니다' }
  }

  const { error } = await supabase
    .from('posts')
    .update({
      title: formData.get('title'),
      content: formData.get('content'),
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/posts')
  revalidatePath(`/posts/${id}`)
  return { success: true }
}

export async function deletePost(id: string) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '로그인이 필요합니다' }
  }

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/posts')
  redirect('/posts')
}
```

## 응답 형식 표준화

```typescript
// src/lib/api/response.ts
import { NextResponse } from 'next/server'

export function success<T>(data: T, status = 200) {
  return NextResponse.json({ data, error: null }, { status })
}

export function error(message: string, status = 400) {
  return NextResponse.json({ data: null, error: message }, { status })
}

export function unauthorized() {
  return error('Unauthorized', 401)
}

export function forbidden() {
  return error('Forbidden', 403)
}

export function notFound() {
  return error('Not found', 404)
}
```

## 유효성 검사 (Zod)

```typescript
// src/lib/validations/post.ts
import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(100),
  content: z.string().optional(),
})

export const updatePostSchema = createPostSchema.partial()

// 사용
import { createPostSchema } from '@/lib/validations/post'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const result = createPostSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.errors[0].message },
      { status: 400 }
    )
  }

  // result.data 사용
}
```
