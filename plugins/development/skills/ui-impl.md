# UI Implementation

Step 3.8: UI 구현 (UI Implementation)

> **역할: Frontend**
> React 컴포넌트, 화면 레이아웃, 스타일링

## 설명

디자인 명세와 와이어프레임을 바탕으로 실제 UI 컴포넌트와 화면을 구현하는 스킬입니다.

## 트리거

- Step 3.7 (Core Features) 완료 후 실행
- `feature-impl.md` 파일이 존재할 때

## 입력

- `outputs/stage-2/design-spec.md`
- `outputs/stage-2/wireframes.md`
- `outputs/stage-2/component-spec.md`
- `outputs/stage-1/screen-structure.md`
- `outputs/stage-3/feature-impl.md`

## 실행 내용

### UI 개발 순서

1. **공통 레이아웃 컴포넌트**
   - Header, Footer, Sidebar
   - 반응형 레이아웃

2. **기본 UI 컴포넌트**
   - shadcn/ui 기반 커스터마이징
   - 디자인 시스템 적용

3. **페이지별 화면 구현**
   - 와이어프레임 기반
   - 기능 연동

### 레이아웃 컴포넌트

```typescript
// src/components/layout/Header.tsx
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { UserMenu } from './UserMenu'

export async function Header() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            {/* 로고 */}
            Logo
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/posts" className="text-sm hover:text-primary">
              게시글
            </Link>
            {/* 네비게이션 항목 */}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link href="/login" className="text-sm">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
```

```typescript
// src/components/layout/MainLayout.tsx
import { Header } from './Header'
import { Footer } from './Footer'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
```

### 페이지 컴포넌트

```typescript
// src/app/(main)/posts/page.tsx
import { createClient } from '@/lib/supabase/server'
import { PostCard } from '@/components/features/posts/PostCard'

export default async function PostsPage() {
  const supabase = createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('*, author:users(id, name, avatar_url)')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">게시글</h1>
        <Link href="/posts/new">
          <Button>글쓰기</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {posts?.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          아직 게시글이 없습니다.
        </div>
      )}
    </div>
  )
}
```

### 기능 컴포넌트

```typescript
// src/components/features/posts/PostCard.tsx
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: {
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
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3 mb-4">
            {post.content}
          </p>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.author.avatar_url} />
              <AvatarFallback>{post.author.name?.[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {post.author.name}
            </span>
            <span className="text-sm text-muted-foreground">
              {formatDate(post.created_at)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
```

### 폼 컴포넌트

```typescript
// src/components/features/posts/PostForm.tsx
'use client'

import { useFormState } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { createPost } from '@/lib/actions/posts'

export function PostForm() {
  const [state, action] = useFormState(createPost, null)

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          name="title"
          placeholder="제목을 입력하세요"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">내용</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="내용을 입력하세요"
          rows={10}
        />
      </div>

      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <Button type="submit" className="w-full">
        작성하기
      </Button>
    </form>
  )
}
```

### v0 활용 방법

```
1. wireframes.md의 특정 화면 ASCII 복사
2. v0.dev에 붙여넣기
3. design-system의 색상/폰트 정보 추가
4. 생성된 코드를 프로젝트에 적용
5. 필요에 맞게 수정
```

### 질문 가이드

1. **화면 순서**
   - "어떤 화면부터 만들까요? 메인 화면부터 시작할까요?"
   - "v0로 먼저 프로토타입을 만들어볼까요?"

2. **세부 사항**
   - "이 화면에서 로딩 상태는 어떻게 보여줄까요?"
   - "에러 메시지는 어디에 표시할까요?"

### 대화 원칙

- 한 화면씩 개발
- v0/Claude 활용 적극 권장
- 완성 후 확인하고 다음 진행
- 반응형 고려

## 산출물

`outputs/stage-3/ui-impl.md`

```markdown
# UI Implementation

## 메타데이터
- Stage: 3
- Step: 3.8 - UI 구현
- 생성일시: {현재 시간}
- 상태: final

## 구현된 화면

| 화면 | 경로 | 상태 |
|------|------|------|
| 메인/랜딩 | / | [x] |
| 로그인 | /login | [x] |
| 회원가입 | /signup | [x] |
| 게시글 목록 | /posts | [x] |
| 게시글 상세 | /posts/[id] | [x] |
| 게시글 작성 | /posts/new | [x] |
| ... | ... | ... |

## 컴포넌트 목록

### 레이아웃
| 컴포넌트 | 경로 |
|----------|------|
| Header | src/components/layout/Header.tsx |
| Footer | src/components/layout/Footer.tsx |
| MainLayout | src/components/layout/MainLayout.tsx |

### UI (shadcn)
| 컴포넌트 | 용도 |
|----------|------|
| Button | 버튼 |
| Input | 텍스트 입력 |
| Card | 카드 |
| Avatar | 프로필 이미지 |
| ... | ... |

### 기능
| 컴포넌트 | 경로 |
|----------|------|
| PostCard | src/components/features/posts/PostCard.tsx |
| PostForm | src/components/features/posts/PostForm.tsx |
| ... | ... |

## 반응형 대응

| Breakpoint | 처리 |
|------------|------|
| Mobile (< 640px) | 1열 그리드, 햄버거 메뉴 |
| Tablet (640-1024px) | 2열 그리드 |
| Desktop (> 1024px) | 3열 그리드 |

## 스크린샷

(개발 서버 실행 후 스크린샷 추가)

## 다음 단계

테스트를 진행합니다.
```

## 완료 조건

- 모든 화면 구현 완료
- 레이아웃 컴포넌트 완성
- 기능 연동 완료
- 반응형 동작 확인
- `ui-impl.md` 파일이 생성됨

## 다음 Step

→ Step 3.9: Testing (테스트)
