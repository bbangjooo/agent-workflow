# Error Handling Patterns

에러 처리 패턴 모음입니다.

## Next.js 에러 처리

### error.tsx (라우트 레벨)

```typescript
// src/app/error.tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 에러 로깅 서비스에 전송
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">문제가 발생했습니다</h2>
      <p className="text-muted-foreground mb-4">
        잠시 후 다시 시도해주세요
      </p>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  )
}
```

### not-found.tsx (404)

```typescript
// src/app/not-found.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">페이지를 찾을 수 없습니다</h2>
      <p className="text-muted-foreground mb-4">
        요청하신 페이지가 존재하지 않습니다
      </p>
      <Link href="/">
        <Button>홈으로 돌아가기</Button>
      </Link>
    </div>
  )
}
```

### global-error.tsx (전역)

```typescript
// src/app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">심각한 오류 발생</h2>
            <button onClick={reset}>다시 시도</button>
          </div>
        </div>
      </body>
    </html>
  )
}
```

## API 에러 처리

### 표준 에러 응답

```typescript
// src/lib/api/errors.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = '로그인이 필요합니다') {
    super(401, message, 'UNAUTHORIZED')
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = '권한이 없습니다') {
    super(403, message, 'FORBIDDEN')
  }
}

export class NotFoundError extends ApiError {
  constructor(message = '찾을 수 없습니다') {
    super(404, message, 'NOT_FOUND')
  }
}

export class ValidationError extends ApiError {
  constructor(message: string) {
    super(400, message, 'VALIDATION_ERROR')
  }
}
```

### API Route에서 사용

```typescript
// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { ApiError, UnauthorizedError, ValidationError } from '@/lib/api/errors'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new UnauthorizedError()
    }

    const body = await request.json()

    if (!body.title?.trim()) {
      throw new ValidationError('제목을 입력해주세요')
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({ user_id: user.id, title: body.title })
      .select()
      .single()

    if (error) {
      throw new ApiError(500, error.message, 'DB_ERROR')
    }

    return NextResponse.json({ data })
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      )
    }

    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
```

## Server Actions 에러 처리

```typescript
// src/lib/actions/posts.ts
'use server'

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

export async function createPost(formData: FormData): Promise<ActionResult<Post>> {
  try {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, error: '로그인이 필요합니다' }
    }

    const title = formData.get('title') as string
    if (!title.trim()) {
      return { success: false, error: '제목을 입력해주세요' }
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({ user_id: user.id, title })
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/posts')
    return { success: true, data }
  } catch (error) {
    console.error('createPost error:', error)
    return { success: false, error: '오류가 발생했습니다' }
  }
}
```

### 폼에서 사용

```typescript
// 컴포넌트에서
'use client'

import { useFormState } from 'react-dom'
import { createPost } from '@/lib/actions/posts'

export function PostForm() {
  const [state, action] = useFormState(createPost, null)

  return (
    <form action={action}>
      <input name="title" />

      {state?.success === false && (
        <p className="text-red-500">{state.error}</p>
      )}

      <button type="submit">저장</button>
    </form>
  )
}
```

## 클라이언트 에러 처리

### React Query 에러

```typescript
// 전역 에러 처리
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      onError: (error) => {
        console.error('Query error:', error)
      },
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error)
        toast.error('오류가 발생했습니다')
      },
    },
  },
})
```

### try-catch 패턴

```typescript
async function handleSubmit() {
  try {
    setLoading(true)
    await createPost({ title, content })
    toast.success('저장되었습니다')
    router.push('/posts')
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('오류가 발생했습니다')
    }
  } finally {
    setLoading(false)
  }
}
```

## Toast 알림

```typescript
// src/hooks/useToast.ts (shadcn/ui 사용 시)
import { toast } from 'sonner'

export function useToast() {
  return {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    info: (message: string) => toast.info(message),
    loading: (message: string) => toast.loading(message),
  }
}
```

## 로깅 (프로덕션)

```typescript
// src/lib/logger.ts
export function logError(error: unknown, context?: Record<string, unknown>) {
  // 개발 환경
  if (process.env.NODE_ENV === 'development') {
    console.error(error)
    if (context) console.error('Context:', context)
    return
  }

  // 프로덕션: 외부 서비스로 전송
  // Sentry, LogRocket 등
}
```
