# Frontend Clean Architecture

React/Next.js 프로젝트를 위한 클린 아키텍처 패턴입니다.

## 개요

프론트엔드 클린 아키텍처는 관심사 분리(Separation of Concerns)를 통해 유지보수성, 테스트 가능성, 확장성을 높이는 구조입니다. UI, 비즈니스 로직, 데이터 접근을 명확히 분리합니다.

### 핵심 원칙

1. **의존성 규칙**: 외부 레이어가 내부 레이어에 의존 (UI → Application → Domain)
2. **관심사 분리**: 각 레이어는 단일 책임을 가짐
3. **추상화**: 외부 의존성은 인터페이스로 추상화
4. **테스트 용이성**: 비즈니스 로직은 UI와 독립적으로 테스트 가능

---

## 폴더 구조

### 기본 구조

```
src/
├── app/                    # Next.js App Router (라우팅)
│   ├── (auth)/            # 인증 관련 라우트 그룹
│   ├── (main)/            # 메인 라우트 그룹
│   ├── api/               # API Routes
│   └── layout.tsx
│
├── components/            # UI 컴포넌트
│   ├── ui/               # 기본 UI 컴포넌트 (Button, Input 등)
│   ├── layout/           # 레이아웃 컴포넌트 (Header, Sidebar 등)
│   └── features/         # 기능별 컴포넌트
│       ├── auth/
│       ├── posts/
│       └── users/
│
├── features/              # 기능별 모듈 (Feature-Sliced Design)
│   ├── auth/
│   │   ├── api/          # API 호출
│   │   ├── hooks/        # 커스텀 훅
│   │   ├── stores/       # 상태 관리
│   │   ├── types/        # 타입 정의
│   │   └── utils/        # 유틸리티
│   ├── posts/
│   └── users/
│
├── shared/                # 공유 모듈
│   ├── api/              # API 클라이언트, 인터셉터
│   ├── config/           # 환경 설정
│   ├── hooks/            # 공통 훅
│   ├── lib/              # 외부 라이브러리 래퍼
│   ├── types/            # 공통 타입
│   └── utils/            # 유틸리티 함수
│
└── styles/               # 전역 스타일
```

### 확장 구조 (대규모 프로젝트)

```
src/
├── app/                   # Presentation Layer - 라우팅
│
├── presentation/          # Presentation Layer - UI
│   ├── components/
│   ├── hooks/            # UI 관련 훅
│   └── providers/        # Context Providers
│
├── application/          # Application Layer - 비즈니스 로직
│   ├── use-cases/        # 유스케이스
│   ├── services/         # 애플리케이션 서비스
│   └── dto/              # Data Transfer Objects
│
├── domain/               # Domain Layer - 핵심 비즈니스
│   ├── entities/         # 엔티티
│   ├── value-objects/    # 값 객체
│   └── repositories/     # 리포지토리 인터페이스
│
├── infrastructure/       # Infrastructure Layer - 외부 연동
│   ├── api/              # API 클라이언트
│   ├── repositories/     # 리포지토리 구현
│   └── storage/          # 로컬 스토리지
│
└── shared/               # 공유 유틸리티
```

---

## 레이어별 구현

### 1. Domain Layer (도메인 레이어)

핵심 비즈니스 로직과 엔티티를 정의합니다. 외부 의존성이 없습니다.

#### 엔티티 (Entity)

```typescript
// src/domain/entities/User.ts
export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'admin' | 'user' | 'guest'

// 팩토리 함수
export function createUser(data: Partial<User>): User {
  return {
    id: data.id ?? '',
    email: data.email ?? '',
    name: data.name ?? '',
    avatarUrl: data.avatarUrl,
    role: data.role ?? 'user',
    createdAt: data.createdAt ?? new Date(),
    updatedAt: data.updatedAt ?? new Date(),
  }
}
```

```typescript
// src/domain/entities/Post.ts
export interface Post {
  id: string
  title: string
  content: string
  status: PostStatus
  authorId: string
  author?: User
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export type PostStatus = 'draft' | 'published' | 'archived'

// 비즈니스 규칙
export function canPublish(post: Post): boolean {
  return post.title.length > 0 && post.content.length >= 100
}

export function canEdit(post: Post, userId: string): boolean {
  return post.authorId === userId
}
```

#### 값 객체 (Value Object)

```typescript
// src/domain/value-objects/Email.ts
export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Email | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return null
    }
    return new Email(email.toLowerCase())
  }

  getValue(): string {
    return this.value
  }

  equals(other: Email): boolean {
    return this.value === other.value
  }
}
```

#### 리포지토리 인터페이스

```typescript
// src/domain/repositories/IPostRepository.ts
import { Post, PostStatus } from '../entities/Post'

export interface PostFilter {
  status?: PostStatus
  authorId?: string
  search?: string
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
}

export interface IPostRepository {
  findById(id: string): Promise<Post | null>
  findMany(filter: PostFilter, pagination: PaginationParams): Promise<PaginatedResult<Post>>
  create(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post>
  update(id: string, data: Partial<Post>): Promise<Post>
  delete(id: string): Promise<void>
}
```

---

### 2. Application Layer (애플리케이션 레이어)

유스케이스와 애플리케이션 서비스를 구현합니다.

#### 유스케이스 (Use Case)

```typescript
// src/application/use-cases/posts/CreatePostUseCase.ts
import { IPostRepository } from '@/domain/repositories/IPostRepository'
import { Post } from '@/domain/entities/Post'

export interface CreatePostInput {
  title: string
  content: string
  authorId: string
  tags?: string[]
}

export interface CreatePostOutput {
  post: Post
}

export class CreatePostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(input: CreatePostInput): Promise<CreatePostOutput> {
    // 비즈니스 규칙 검증
    if (!input.title.trim()) {
      throw new Error('제목을 입력해주세요')
    }

    if (input.title.length > 100) {
      throw new Error('제목은 100자 이내로 입력해주세요')
    }

    const post = await this.postRepository.create({
      title: input.title.trim(),
      content: input.content,
      status: 'draft',
      authorId: input.authorId,
      tags: input.tags ?? [],
    })

    return { post }
  }
}
```

```typescript
// src/application/use-cases/posts/PublishPostUseCase.ts
import { IPostRepository } from '@/domain/repositories/IPostRepository'
import { canPublish, canEdit } from '@/domain/entities/Post'

export interface PublishPostInput {
  postId: string
  userId: string
}

export class PublishPostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(input: PublishPostInput): Promise<void> {
    const post = await this.postRepository.findById(input.postId)

    if (!post) {
      throw new Error('게시물을 찾을 수 없습니다')
    }

    if (!canEdit(post, input.userId)) {
      throw new Error('권한이 없습니다')
    }

    if (!canPublish(post)) {
      throw new Error('게시물을 발행하려면 제목과 100자 이상의 내용이 필요합니다')
    }

    await this.postRepository.update(input.postId, {
      status: 'published',
    })
  }
}
```

#### DTO (Data Transfer Object)

```typescript
// src/application/dto/PostDTO.ts
import { Post } from '@/domain/entities/Post'

export interface PostDTO {
  id: string
  title: string
  content: string
  status: string
  author: {
    id: string
    name: string
    avatarUrl?: string
  } | null
  tags: string[]
  createdAt: string
  updatedAt: string
}

export function toPostDTO(post: Post): PostDTO {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    status: post.status,
    author: post.author
      ? {
          id: post.author.id,
          name: post.author.name,
          avatarUrl: post.author.avatarUrl,
        }
      : null,
    tags: post.tags,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }
}
```

---

### 3. Infrastructure Layer (인프라스트럭처 레이어)

외부 서비스와의 통신을 구현합니다.

#### API 클라이언트

```typescript
// src/infrastructure/api/apiClient.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

interface RequestConfig extends RequestInit {
  params?: Record<string, string>
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, ...init } = config

    let url = `${this.baseURL}${endpoint}`
    if (params) {
      const searchParams = new URLSearchParams(params)
      url += `?${searchParams.toString()}`
    }

    const response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `HTTP Error: ${response.status}`)
    }

    return response.json()
  }

  get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params })
  }

  post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
```

#### 리포지토리 구현

```typescript
// src/infrastructure/repositories/PostRepository.ts
import { IPostRepository, PostFilter, PaginationParams, PaginatedResult } from '@/domain/repositories/IPostRepository'
import { Post } from '@/domain/entities/Post'
import { apiClient } from '../api/apiClient'

interface ApiPost {
  id: string
  title: string
  content: string
  status: string
  author_id: string
  author?: {
    id: string
    name: string
    avatar_url?: string
  }
  tags: string[]
  created_at: string
  updated_at: string
}

function mapApiPostToPost(apiPost: ApiPost): Post {
  return {
    id: apiPost.id,
    title: apiPost.title,
    content: apiPost.content,
    status: apiPost.status as Post['status'],
    authorId: apiPost.author_id,
    author: apiPost.author
      ? {
          id: apiPost.author.id,
          email: '',
          name: apiPost.author.name,
          avatarUrl: apiPost.author.avatar_url,
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      : undefined,
    tags: apiPost.tags,
    createdAt: new Date(apiPost.created_at),
    updatedAt: new Date(apiPost.updated_at),
  }
}

export class PostRepository implements IPostRepository {
  async findById(id: string): Promise<Post | null> {
    try {
      const response = await apiClient.get<{ data: ApiPost }>(`/api/posts/${id}`)
      return mapApiPostToPost(response.data)
    } catch {
      return null
    }
  }

  async findMany(
    filter: PostFilter,
    pagination: PaginationParams
  ): Promise<PaginatedResult<Post>> {
    const params: Record<string, string> = {
      page: pagination.page.toString(),
      limit: pagination.limit.toString(),
    }

    if (filter.status) params.status = filter.status
    if (filter.authorId) params.author_id = filter.authorId
    if (filter.search) params.q = filter.search

    const response = await apiClient.get<{
      data: ApiPost[]
      pagination: { total: number; page: number; totalPages: number }
    }>('/api/posts', params)

    return {
      data: response.data.map(mapApiPostToPost),
      total: response.pagination.total,
      page: response.pagination.page,
      totalPages: response.pagination.totalPages,
    }
  }

  async create(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
    const response = await apiClient.post<{ data: ApiPost }>('/api/posts', {
      title: post.title,
      content: post.content,
      status: post.status,
      tags: post.tags,
    })
    return mapApiPostToPost(response.data)
  }

  async update(id: string, data: Partial<Post>): Promise<Post> {
    const response = await apiClient.put<{ data: ApiPost }>(`/api/posts/${id}`, data)
    return mapApiPostToPost(response.data)
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/posts/${id}`)
  }
}
```

---

### 4. Presentation Layer (프레젠테이션 레이어)

UI 컴포넌트와 React 훅을 구현합니다.

#### 커스텀 훅

```typescript
// src/features/posts/hooks/usePosts.ts
'use client'

import { useState, useCallback } from 'react'
import { Post, PostStatus } from '@/domain/entities/Post'
import { PostRepository } from '@/infrastructure/repositories/PostRepository'
import { CreatePostUseCase, CreatePostInput } from '@/application/use-cases/posts/CreatePostUseCase'

const postRepository = new PostRepository()

interface UsePostsOptions {
  initialPage?: number
  limit?: number
  status?: PostStatus
}

export function usePosts(options: UsePostsOptions = {}) {
  const { initialPage = 1, limit = 20, status } = options

  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(0)

  const fetchPosts = useCallback(async (pageNum: number = page) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await postRepository.findMany(
        { status },
        { page: pageNum, limit }
      )
      setPosts(result.data)
      setTotalPages(result.totalPages)
      setPage(pageNum)
    } catch (err) {
      setError(err instanceof Error ? err.message : '게시물을 불러오는데 실패했습니다')
    } finally {
      setIsLoading(false)
    }
  }, [page, limit, status])

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      fetchPosts(page + 1)
    }
  }, [page, totalPages, fetchPosts])

  const prevPage = useCallback(() => {
    if (page > 1) {
      fetchPosts(page - 1)
    }
  }, [page, fetchPosts])

  return {
    posts,
    isLoading,
    error,
    page,
    totalPages,
    fetchPosts,
    nextPage,
    prevPage,
  }
}
```

```typescript
// src/features/posts/hooks/useCreatePost.ts
'use client'

import { useState } from 'react'
import { Post } from '@/domain/entities/Post'
import { PostRepository } from '@/infrastructure/repositories/PostRepository'
import { CreatePostUseCase, CreatePostInput } from '@/application/use-cases/posts/CreatePostUseCase'

const postRepository = new PostRepository()
const createPostUseCase = new CreatePostUseCase(postRepository)

export function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createPost = async (input: CreatePostInput): Promise<Post | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await createPostUseCase.execute(input)
      return result.post
    } catch (err) {
      setError(err instanceof Error ? err.message : '게시물 생성에 실패했습니다')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createPost,
    isLoading,
    error,
  }
}
```

#### 컴포넌트

```typescript
// src/components/features/posts/PostList.tsx
'use client'

import { useEffect } from 'react'
import { usePosts } from '@/features/posts/hooks/usePosts'
import { PostCard } from './PostCard'

export function PostList() {
  const { posts, isLoading, error, page, totalPages, fetchPosts, nextPage, prevPage } = usePosts()

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <div className="flex justify-between">
        <button onClick={prevPage} disabled={page <= 1}>
          이전
        </button>
        <span>{page} / {totalPages}</span>
        <button onClick={nextPage} disabled={page >= totalPages}>
          다음
        </button>
      </div>
    </div>
  )
}
```

```typescript
// src/components/features/posts/CreatePostForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreatePost } from '@/features/posts/hooks/useCreatePost'
import { useAuth } from '@/features/auth/hooks/useAuth'

export function CreatePostForm() {
  const router = useRouter()
  const { user } = useAuth()
  const { createPost, isLoading, error } = useCreatePost()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    const post = await createPost({
      title,
      content,
      authorId: user.id,
    })

    if (post) {
      router.push(`/posts/${post.id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}

      <div>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? '저장 중...' : '저장'}
      </button>
    </form>
  )
}
```

---

## 의존성 주입 (DI)

### Context를 이용한 DI

```typescript
// src/shared/providers/RepositoryProvider.tsx
'use client'

import { createContext, useContext, ReactNode } from 'react'
import { IPostRepository } from '@/domain/repositories/IPostRepository'
import { PostRepository } from '@/infrastructure/repositories/PostRepository'

interface Repositories {
  postRepository: IPostRepository
}

const RepositoryContext = createContext<Repositories | null>(null)

export function RepositoryProvider({ children }: { children: ReactNode }) {
  const repositories: Repositories = {
    postRepository: new PostRepository(),
  }

  return (
    <RepositoryContext.Provider value={repositories}>
      {children}
    </RepositoryContext.Provider>
  )
}

export function useRepositories() {
  const context = useContext(RepositoryContext)
  if (!context) {
    throw new Error('useRepositories must be used within RepositoryProvider')
  }
  return context
}
```

### 테스트에서 Mock 주입

```typescript
// src/features/posts/hooks/__tests__/usePosts.test.ts
import { renderHook } from '@testing-library/react'
import { RepositoryProvider } from '@/shared/providers/RepositoryProvider'

// Mock Repository
const mockPostRepository = {
  findMany: jest.fn().mockResolvedValue({
    data: [{ id: '1', title: 'Test' }],
    total: 1,
    page: 1,
    totalPages: 1,
  }),
}

// Provider with mock
const wrapper = ({ children }) => (
  <RepositoryProvider repositories={{ postRepository: mockPostRepository }}>
    {children}
  </RepositoryProvider>
)

test('usePosts fetches posts', async () => {
  const { result } = renderHook(() => usePosts(), { wrapper })
  // ...
})
```

---

## 상태 관리 통합

### Zustand와 함께 사용

```typescript
// src/features/posts/stores/postStore.ts
import { create } from 'zustand'
import { Post } from '@/domain/entities/Post'
import { PostRepository } from '@/infrastructure/repositories/PostRepository'

const postRepository = new PostRepository()

interface PostState {
  posts: Post[]
  selectedPost: Post | null
  isLoading: boolean
  error: string | null

  // Actions
  fetchPosts: () => Promise<void>
  selectPost: (id: string) => Promise<void>
  clearError: () => void
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  selectedPost: null,
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    set({ isLoading: true, error: null })
    try {
      const result = await postRepository.findMany({}, { page: 1, limit: 20 })
      set({ posts: result.data })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : '에러 발생' })
    } finally {
      set({ isLoading: false })
    }
  },

  selectPost: async (id: string) => {
    set({ isLoading: true })
    try {
      const post = await postRepository.findById(id)
      set({ selectedPost: post })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : '에러 발생' })
    } finally {
      set({ isLoading: false })
    }
  },

  clearError: () => set({ error: null }),
}))
```

---

## 테스트 전략

### 레이어별 테스트

| 레이어 | 테스트 유형 | 도구 |
|--------|------------|------|
| Domain | 유닛 테스트 | Jest |
| Application | 유닛 테스트 | Jest + Mock |
| Infrastructure | 통합 테스트 | MSW |
| Presentation | 컴포넌트 테스트 | React Testing Library |

### 유스케이스 테스트 예시

```typescript
// src/application/use-cases/posts/__tests__/CreatePostUseCase.test.ts
import { CreatePostUseCase } from '../CreatePostUseCase'
import { IPostRepository } from '@/domain/repositories/IPostRepository'

describe('CreatePostUseCase', () => {
  let useCase: CreatePostUseCase
  let mockRepository: jest.Mocked<IPostRepository>

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }
    useCase = new CreatePostUseCase(mockRepository)
  })

  it('should create a post successfully', async () => {
    const mockPost = { id: '1', title: 'Test', content: '', status: 'draft' }
    mockRepository.create.mockResolvedValue(mockPost)

    const result = await useCase.execute({
      title: 'Test',
      content: '',
      authorId: 'user-1',
    })

    expect(result.post).toEqual(mockPost)
    expect(mockRepository.create).toHaveBeenCalled()
  })

  it('should throw error when title is empty', async () => {
    await expect(
      useCase.execute({ title: '', content: '', authorId: 'user-1' })
    ).rejects.toThrow('제목을 입력해주세요')
  })
})
```

---

## UI 콘텐츠 가이드라인

### 이모티콘 사용

- **이모티콘 사용 최소화**: UI에서 이모티콘 사용을 최소화합니다
- 이모티콘이 많으면 페이지가 어색해지고 전문성이 떨어져 보입니다
- 꼭 필요한 경우에만 제한적으로 사용하세요
- 텍스트 레이블, 버튼, 메시지 등에서 이모티콘 대신 명확한 텍스트나 아이콘(lucide-react 등)을 사용합니다

```typescript
// 좋은 예 - 아이콘 사용
import { Check, X, AlertTriangle } from 'lucide-react'

<Button><Check className="h-4 w-4 mr-2" />저장</Button>
<Alert><AlertTriangle />주의가 필요합니다</Alert>

// 피해야 할 예 - 이모티콘 과다 사용
<Button>✨ 저장하기 🚀</Button>
<Alert>⚠️ 주의! ❗</Alert>
```

---

## 참고 자료

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
