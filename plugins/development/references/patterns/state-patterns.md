# State Management Patterns

상태 관리 패턴 모음입니다.

## React Query (권장)

### 설정

```typescript
// src/providers/QueryProvider.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

```typescript
// src/app/layout.tsx
import { QueryProvider } from '@/providers/QueryProvider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
```

### 데이터 조회 훅

```typescript
// src/hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'

// 목록 조회
export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('posts')
        .select('*, author:users(id, name)')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
  })
}

// 단일 조회
export function usePost(id: string) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('posts')
        .select('*, author:users(id, name)')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!id, // id가 있을 때만 실행
  })
}

// 생성
export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { title: string; content: string }) => {
      const supabase = createClient()
      const { data: post, error } = await supabase
        .from('posts')
        .insert(data)
        .select()
        .single()

      if (error) throw error
      return post
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

// 수정
export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: { title?: string; content?: string }
    }) => {
      const supabase = createClient()
      const { data: post, error } = await supabase
        .from('posts')
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return post
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts', variables.id] })
    },
  })
}

// 삭제
export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = createClient()
      const { error } = await supabase.from('posts').delete().eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
```

### 사용 예시

```typescript
// 컴포넌트에서 사용
'use client'

import { usePosts, useCreatePost } from '@/hooks/usePosts'

export function PostList() {
  const { data: posts, isLoading, error } = usePosts()
  const createPost = useCreatePost()

  if (isLoading) return <div>로딩 중...</div>
  if (error) return <div>에러: {error.message}</div>

  const handleCreate = async () => {
    try {
      await createPost.mutateAsync({
        title: '새 글',
        content: '내용',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <button onClick={handleCreate} disabled={createPost.isPending}>
        {createPost.isPending ? '생성 중...' : '새 글 작성'}
      </button>
      {posts?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

## Zustand (간단한 전역 상태)

```typescript
// src/stores/useUIStore.ts
import { create } from 'zustand'

interface UIState {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
}))
```

```typescript
// 사용
import { useUIStore } from '@/stores/useUIStore'

function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useUIStore()

  return (
    <aside className={isSidebarOpen ? 'open' : 'closed'}>
      <button onClick={toggleSidebar}>Toggle</button>
    </aside>
  )
}
```

## React Context (간단한 경우)

```typescript
// src/contexts/ThemeContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

## 언제 무엇을 쓸까?

| 상태 유형 | 추천 | 예시 |
|----------|------|------|
| 서버 데이터 | React Query | 게시글, 사용자 목록 |
| 간단한 전역 UI | Zustand | 사이드바 열림/닫힘 |
| 컴포넌트 로컬 | useState | 폼 입력값 |
| 복잡한 폼 | React Hook Form | 다단계 폼 |
| 테마/설정 | Context | 다크모드 |

## 1인 창업자 추천

```
1. 서버 데이터: React Query
2. 간단한 전역 상태: Zustand
3. 나머지: useState로 충분

Redux는 필요 없음 (오버킬)
```
