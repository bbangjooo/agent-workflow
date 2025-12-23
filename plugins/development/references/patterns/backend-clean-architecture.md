# Backend Clean Architecture

Node.js/TypeScript 백엔드를 위한 클린 아키텍처 패턴입니다.

## 개요

백엔드 클린 아키텍처는 Robert C. Martin(Uncle Bob)의 클린 아키텍처 원칙을 백엔드 개발에 적용한 것입니다. 비즈니스 로직을 프레임워크, 데이터베이스, 외부 서비스로부터 독립시켜 유지보수성과 테스트 가능성을 높입니다.

### 핵심 원칙

1. **의존성 역전 (DIP)**: 고수준 모듈이 저수준 모듈에 의존하지 않음
2. **프레임워크 독립성**: Express, Fastify 등 프레임워크 변경 가능
3. **데이터베이스 독립성**: PostgreSQL, MongoDB 등 DB 변경 가능
4. **테스트 용이성**: 비즈니스 로직을 독립적으로 테스트 가능
5. **외부 에이전시 독립성**: 외부 API, 서비스 변경에 유연하게 대응

---

## 레이어 구조

```
┌─────────────────────────────────────────────────────────────┐
│                    Infrastructure Layer                       │
│  (Controllers, Routes, Database, External APIs, Frameworks)  │
├─────────────────────────────────────────────────────────────┤
│                    Application Layer                          │
│       (Use Cases, Application Services, DTOs)                │
├─────────────────────────────────────────────────────────────┤
│                      Domain Layer                             │
│  (Entities, Value Objects, Domain Services, Repository IF)   │
└─────────────────────────────────────────────────────────────┘

의존성 방향: 외부 → 내부 (Infrastructure → Application → Domain)
```

---

## 폴더 구조

### 기본 구조 (Express/Fastify)

```
src/
├── domain/                    # Domain Layer - 핵심 비즈니스
│   ├── entities/             # 엔티티
│   │   ├── User.ts
│   │   ├── Post.ts
│   │   └── index.ts
│   ├── value-objects/        # 값 객체
│   │   ├── Email.ts
│   │   ├── Password.ts
│   │   └── index.ts
│   ├── repositories/         # 리포지토리 인터페이스
│   │   ├── IUserRepository.ts
│   │   ├── IPostRepository.ts
│   │   └── index.ts
│   ├── services/             # 도메인 서비스
│   │   └── PasswordHasher.ts
│   └── errors/               # 도메인 에러
│       ├── DomainError.ts
│       └── index.ts
│
├── application/               # Application Layer - 비즈니스 로직
│   ├── use-cases/            # 유스케이스
│   │   ├── users/
│   │   │   ├── CreateUserUseCase.ts
│   │   │   ├── GetUserUseCase.ts
│   │   │   └── index.ts
│   │   └── posts/
│   │       ├── CreatePostUseCase.ts
│   │       ├── GetPostsUseCase.ts
│   │       └── index.ts
│   ├── services/             # 애플리케이션 서비스
│   │   └── AuthService.ts
│   └── dto/                  # Data Transfer Objects
│       ├── UserDTO.ts
│       ├── PostDTO.ts
│       └── index.ts
│
├── infrastructure/           # Infrastructure Layer - 외부 연동
│   ├── http/                # HTTP 레이어
│   │   ├── controllers/     # 컨트롤러
│   │   │   ├── UserController.ts
│   │   │   └── PostController.ts
│   │   ├── routes/          # 라우트 정의
│   │   │   ├── userRoutes.ts
│   │   │   └── postRoutes.ts
│   │   ├── middlewares/     # 미들웨어
│   │   │   ├── authMiddleware.ts
│   │   │   └── errorMiddleware.ts
│   │   └── validators/      # 요청 검증
│   │       └── postValidator.ts
│   ├── database/            # 데이터베이스
│   │   ├── repositories/    # 리포지토리 구현
│   │   │   ├── UserRepository.ts
│   │   │   └── PostRepository.ts
│   │   ├── models/          # ORM 모델
│   │   │   ├── UserModel.ts
│   │   │   └── PostModel.ts
│   │   └── migrations/      # 마이그레이션
│   ├── services/            # 외부 서비스
│   │   ├── EmailService.ts
│   │   └── StorageService.ts
│   └── config/              # 설정
│       ├── database.ts
│       └── env.ts
│
├── shared/                   # 공유 유틸리티
│   ├── types/               # 공통 타입
│   ├── utils/               # 유틸리티
│   └── constants/           # 상수
│
├── container/               # 의존성 주입 컨테이너
│   └── index.ts
│
└── main.ts                  # 애플리케이션 진입점
```

### Next.js App Router 구조

```
src/
├── app/                      # Next.js App Router
│   ├── api/                 # API Routes
│   │   ├── users/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── posts/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   └── ...
│
├── server/                   # 서버사이드 로직
│   ├── domain/
│   ├── application/
│   └── infrastructure/
│
└── lib/                     # Server Actions, DB 클라이언트
    ├── actions/
    └── db/
```

---

## 레이어별 구현

### 1. Domain Layer (도메인 레이어)

외부 의존성 없이 순수 TypeScript로 작성합니다.

#### 엔티티 (Entity)

```typescript
// src/domain/entities/User.ts
import { Email } from '../value-objects/Email'
import { Password } from '../value-objects/Password'

export interface UserProps {
  id: string
  email: Email
  password: Password
  name: string
  role: UserRole
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'admin' | 'user'

export class User {
  private constructor(private props: UserProps) {}

  // Factory Method
  static create(props: Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>): User {
    return new User({
      ...props,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  static reconstitute(props: UserProps): User {
    return new User(props)
  }

  // Getters
  get id(): string { return this.props.id }
  get email(): Email { return this.props.email }
  get password(): Password { return this.props.password }
  get name(): string { return this.props.name }
  get role(): UserRole { return this.props.role }
  get isActive(): boolean { return this.props.isActive }
  get createdAt(): Date { return this.props.createdAt }
  get updatedAt(): Date { return this.props.updatedAt }

  // Business Methods
  deactivate(): void {
    this.props.isActive = false
    this.props.updatedAt = new Date()
  }

  changeName(name: string): void {
    if (name.length < 2) {
      throw new Error('이름은 2자 이상이어야 합니다')
    }
    this.props.name = name
    this.props.updatedAt = new Date()
  }

  changePassword(password: Password): void {
    this.props.password = password
    this.props.updatedAt = new Date()
  }

  isAdmin(): boolean {
    return this.props.role === 'admin'
  }
}
```

```typescript
// src/domain/entities/Post.ts
export interface PostProps {
  id: string
  title: string
  content: string
  status: PostStatus
  authorId: string
  tags: string[]
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export type PostStatus = 'draft' | 'published' | 'archived'

export class Post {
  private constructor(private props: PostProps) {}

  static create(props: Pick<PostProps, 'title' | 'content' | 'authorId' | 'tags'>): Post {
    return new Post({
      ...props,
      id: crypto.randomUUID(),
      status: 'draft',
      publishedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  static reconstitute(props: PostProps): Post {
    return new Post(props)
  }

  // Getters
  get id(): string { return this.props.id }
  get title(): string { return this.props.title }
  get content(): string { return this.props.content }
  get status(): PostStatus { return this.props.status }
  get authorId(): string { return this.props.authorId }
  get tags(): string[] { return [...this.props.tags] }
  get publishedAt(): Date | null { return this.props.publishedAt }
  get createdAt(): Date { return this.props.createdAt }
  get updatedAt(): Date { return this.props.updatedAt }

  // Business Methods
  publish(): void {
    if (!this.canPublish()) {
      throw new Error('게시물을 발행할 수 없습니다')
    }
    this.props.status = 'published'
    this.props.publishedAt = new Date()
    this.props.updatedAt = new Date()
  }

  archive(): void {
    this.props.status = 'archived'
    this.props.updatedAt = new Date()
  }

  update(data: Partial<Pick<PostProps, 'title' | 'content' | 'tags'>>): void {
    if (this.props.status === 'archived') {
      throw new Error('보관된 게시물은 수정할 수 없습니다')
    }

    if (data.title !== undefined) this.props.title = data.title
    if (data.content !== undefined) this.props.content = data.content
    if (data.tags !== undefined) this.props.tags = data.tags
    this.props.updatedAt = new Date()
  }

  canPublish(): boolean {
    return (
      this.props.status === 'draft' &&
      this.props.title.length > 0 &&
      this.props.content.length >= 100
    )
  }

  isOwnedBy(userId: string): boolean {
    return this.props.authorId === userId
  }
}
```

#### 값 객체 (Value Object)

```typescript
// src/domain/value-objects/Email.ts
export class Email {
  private readonly value: string

  private constructor(email: string) {
    this.value = email.toLowerCase()
  }

  static create(email: string): Email {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error('올바른 이메일 형식이 아닙니다')
    }
    return new Email(email)
  }

  getValue(): string {
    return this.value
  }

  equals(other: Email): boolean {
    return this.value === other.value
  }

  toString(): string {
    return this.value
  }
}
```

```typescript
// src/domain/value-objects/Password.ts
import bcrypt from 'bcrypt'

export class Password {
  private readonly hashedValue: string

  private constructor(hashedPassword: string) {
    this.hashedValue = hashedPassword
  }

  // 새 비밀번호 생성 (해싱)
  static async create(plainPassword: string): Promise<Password> {
    if (plainPassword.length < 8) {
      throw new Error('비밀번호는 8자 이상이어야 합니다')
    }

    if (!/[A-Z]/.test(plainPassword)) {
      throw new Error('비밀번호는 대문자를 포함해야 합니다')
    }

    if (!/[0-9]/.test(plainPassword)) {
      throw new Error('비밀번호는 숫자를 포함해야 합니다')
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10)
    return new Password(hashedPassword)
  }

  // 저장된 해시값으로 복원
  static fromHashed(hashedPassword: string): Password {
    return new Password(hashedPassword)
  }

  async compare(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.hashedValue)
  }

  getHashedValue(): string {
    return this.hashedValue
  }
}
```

#### 리포지토리 인터페이스

```typescript
// src/domain/repositories/IUserRepository.ts
import { User } from '../entities/User'
import { Email } from '../value-objects/Email'

export interface IUserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: Email): Promise<User | null>
  findAll(options?: { limit?: number; offset?: number }): Promise<User[]>
  save(user: User): Promise<void>
  delete(id: string): Promise<void>
  exists(email: Email): Promise<boolean>
}
```

```typescript
// src/domain/repositories/IPostRepository.ts
import { Post, PostStatus } from '../entities/Post'

export interface PostFilter {
  status?: PostStatus
  authorId?: string
  tags?: string[]
}

export interface PaginationOptions {
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
  findMany(filter: PostFilter, pagination: PaginationOptions): Promise<PaginatedResult<Post>>
  save(post: Post): Promise<void>
  delete(id: string): Promise<void>
}
```

#### 도메인 에러

```typescript
// src/domain/errors/DomainError.ts
export class DomainError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DomainError'
  }
}

export class NotFoundError extends DomainError {
  constructor(entity: string, id: string) {
    super(`${entity}을(를) 찾을 수 없습니다: ${id}`)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message = '인증이 필요합니다') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends DomainError {
  constructor(message = '권한이 없습니다') {
    super(message)
    this.name = 'ForbiddenError'
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}
```

---

### 2. Application Layer (애플리케이션 레이어)

유스케이스와 애플리케이션 서비스를 구현합니다.

#### 유스케이스 (Use Case)

```typescript
// src/application/use-cases/users/CreateUserUseCase.ts
import { User } from '@/domain/entities/User'
import { Email } from '@/domain/value-objects/Email'
import { Password } from '@/domain/value-objects/Password'
import { IUserRepository } from '@/domain/repositories/IUserRepository'
import { ValidationError } from '@/domain/errors/DomainError'

export interface CreateUserInput {
  email: string
  password: string
  name: string
}

export interface CreateUserOutput {
  id: string
  email: string
  name: string
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    // 이메일 생성 및 검증
    const email = Email.create(input.email)

    // 중복 확인
    const exists = await this.userRepository.exists(email)
    if (exists) {
      throw new ValidationError('이미 사용 중인 이메일입니다')
    }

    // 비밀번호 생성 및 검증
    const password = await Password.create(input.password)

    // 이름 검증
    if (input.name.length < 2) {
      throw new ValidationError('이름은 2자 이상이어야 합니다')
    }

    // 사용자 생성
    const user = User.create({
      email,
      password,
      name: input.name,
      role: 'user',
      isActive: true,
    })

    // 저장
    await this.userRepository.save(user)

    return {
      id: user.id,
      email: user.email.getValue(),
      name: user.name,
    }
  }
}
```

```typescript
// src/application/use-cases/posts/CreatePostUseCase.ts
import { Post } from '@/domain/entities/Post'
import { IPostRepository } from '@/domain/repositories/IPostRepository'
import { IUserRepository } from '@/domain/repositories/IUserRepository'
import { NotFoundError, ValidationError } from '@/domain/errors/DomainError'

export interface CreatePostInput {
  title: string
  content: string
  authorId: string
  tags?: string[]
}

export interface CreatePostOutput {
  id: string
  title: string
  status: string
}

export class CreatePostUseCase {
  constructor(
    private postRepository: IPostRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(input: CreatePostInput): Promise<CreatePostOutput> {
    // 작성자 확인
    const author = await this.userRepository.findById(input.authorId)
    if (!author) {
      throw new NotFoundError('User', input.authorId)
    }

    // 제목 검증
    if (!input.title.trim()) {
      throw new ValidationError('제목을 입력해주세요')
    }

    if (input.title.length > 200) {
      throw new ValidationError('제목은 200자 이내로 입력해주세요')
    }

    // 게시물 생성
    const post = Post.create({
      title: input.title.trim(),
      content: input.content,
      authorId: input.authorId,
      tags: input.tags ?? [],
    })

    // 저장
    await this.postRepository.save(post)

    return {
      id: post.id,
      title: post.title,
      status: post.status,
    }
  }
}
```

```typescript
// src/application/use-cases/posts/PublishPostUseCase.ts
import { IPostRepository } from '@/domain/repositories/IPostRepository'
import { NotFoundError, ForbiddenError } from '@/domain/errors/DomainError'

export interface PublishPostInput {
  postId: string
  userId: string
}

export class PublishPostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(input: PublishPostInput): Promise<void> {
    const post = await this.postRepository.findById(input.postId)

    if (!post) {
      throw new NotFoundError('Post', input.postId)
    }

    if (!post.isOwnedBy(input.userId)) {
      throw new ForbiddenError('본인의 게시물만 발행할 수 있습니다')
    }

    // 도메인 메서드 호출 (비즈니스 규칙 적용)
    post.publish()

    await this.postRepository.save(post)
  }
}
```

```typescript
// src/application/use-cases/posts/GetPostsUseCase.ts
import { IPostRepository, PostFilter, PaginationOptions } from '@/domain/repositories/IPostRepository'
import { PostDTO, toPostDTO } from '@/application/dto/PostDTO'

export interface GetPostsInput {
  filter?: PostFilter
  page?: number
  limit?: number
}

export interface GetPostsOutput {
  posts: PostDTO[]
  total: number
  page: number
  totalPages: number
}

export class GetPostsUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(input: GetPostsInput = {}): Promise<GetPostsOutput> {
    const pagination: PaginationOptions = {
      page: input.page ?? 1,
      limit: Math.min(input.limit ?? 20, 100), // 최대 100개
    }

    const result = await this.postRepository.findMany(
      input.filter ?? {},
      pagination
    )

    return {
      posts: result.data.map(toPostDTO),
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    }
  }
}
```

#### DTO (Data Transfer Object)

```typescript
// src/application/dto/UserDTO.ts
import { User } from '@/domain/entities/User'

export interface UserDTO {
  id: string
  email: string
  name: string
  role: string
  isActive: boolean
  createdAt: string
}

export function toUserDTO(user: User): UserDTO {
  return {
    id: user.id,
    email: user.email.getValue(),
    name: user.name,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt.toISOString(),
  }
}
```

```typescript
// src/application/dto/PostDTO.ts
import { Post } from '@/domain/entities/Post'

export interface PostDTO {
  id: string
  title: string
  content: string
  status: string
  authorId: string
  tags: string[]
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export function toPostDTO(post: Post): PostDTO {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    status: post.status,
    authorId: post.authorId,
    tags: post.tags,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }
}
```

---

### 3. Infrastructure Layer (인프라스트럭처 레이어)

#### 리포지토리 구현 (Prisma)

```typescript
// src/infrastructure/database/repositories/UserRepository.ts
import { PrismaClient } from '@prisma/client'
import { User } from '@/domain/entities/User'
import { Email } from '@/domain/value-objects/Email'
import { Password } from '@/domain/value-objects/Password'
import { IUserRepository } from '@/domain/repositories/IUserRepository'

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({ where: { id } })

    if (!data) return null

    return User.reconstitute({
      id: data.id,
      email: Email.create(data.email),
      password: Password.fromHashed(data.password),
      name: data.name,
      role: data.role as User['role'],
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }

  async findByEmail(email: Email): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: { email: email.getValue() },
    })

    if (!data) return null

    return User.reconstitute({
      id: data.id,
      email: Email.create(data.email),
      password: Password.fromHashed(data.password),
      name: data.name,
      role: data.role as User['role'],
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }

  async findAll(options?: { limit?: number; offset?: number }): Promise<User[]> {
    const data = await this.prisma.user.findMany({
      take: options?.limit,
      skip: options?.offset,
      orderBy: { createdAt: 'desc' },
    })

    return data.map((item) =>
      User.reconstitute({
        id: item.id,
        email: Email.create(item.email),
        password: Password.fromHashed(item.password),
        name: item.name,
        role: item.role as User['role'],
        isActive: item.isActive,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })
    )
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email.getValue(),
        password: user.password.getHashedValue(),
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        updatedAt: user.updatedAt,
      },
      create: {
        id: user.id,
        email: user.email.getValue(),
        password: user.password.getHashedValue(),
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } })
  }

  async exists(email: Email): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { email: email.getValue() },
    })
    return count > 0
  }
}
```

#### 컨트롤러

```typescript
// src/infrastructure/http/controllers/PostController.ts
import { Request, Response, NextFunction } from 'express'
import { CreatePostUseCase } from '@/application/use-cases/posts/CreatePostUseCase'
import { GetPostsUseCase } from '@/application/use-cases/posts/GetPostsUseCase'
import { PublishPostUseCase } from '@/application/use-cases/posts/PublishPostUseCase'
import { NotFoundError, ForbiddenError, ValidationError } from '@/domain/errors/DomainError'

export class PostController {
  constructor(
    private createPostUseCase: CreatePostUseCase,
    private getPostsUseCase: GetPostsUseCase,
    private publishPostUseCase: PublishPostUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id // 인증 미들웨어에서 주입
      if (!userId) {
        return res.status(401).json({ error: '인증이 필요합니다' })
      }

      const result = await this.createPostUseCase.execute({
        title: req.body.title,
        content: req.body.content,
        authorId: userId,
        tags: req.body.tags,
      })

      res.status(201).json({ data: result })
    } catch (error) {
      next(error)
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.getPostsUseCase.execute({
        filter: {
          status: req.query.status as string,
          authorId: req.query.authorId as string,
        },
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 20,
      })

      res.json({ data: result })
    } catch (error) {
      next(error)
    }
  }

  async publish(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id
      if (!userId) {
        return res.status(401).json({ error: '인증이 필요합니다' })
      }

      await this.publishPostUseCase.execute({
        postId: req.params.id,
        userId,
      })

      res.json({ success: true })
    } catch (error) {
      next(error)
    }
  }
}
```

#### 에러 핸들링 미들웨어

```typescript
// src/infrastructure/http/middlewares/errorMiddleware.ts
import { Request, Response, NextFunction } from 'express'
import {
  DomainError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
} from '@/domain/errors/DomainError'

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error)

  if (error instanceof NotFoundError) {
    return res.status(404).json({ error: error.message })
  }

  if (error instanceof UnauthorizedError) {
    return res.status(401).json({ error: error.message })
  }

  if (error instanceof ForbiddenError) {
    return res.status(403).json({ error: error.message })
  }

  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.message })
  }

  if (error instanceof DomainError) {
    return res.status(400).json({ error: error.message })
  }

  // 예상치 못한 에러
  res.status(500).json({ error: '서버 에러가 발생했습니다' })
}
```

#### 라우트 정의

```typescript
// src/infrastructure/http/routes/postRoutes.ts
import { Router } from 'express'
import { PostController } from '../controllers/PostController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { validateRequest } from '../middlewares/validateMiddleware'
import { createPostSchema, publishPostSchema } from '../validators/postValidator'

export function createPostRoutes(controller: PostController): Router {
  const router = Router()

  router.get('/', controller.list.bind(controller))

  router.post(
    '/',
    authMiddleware,
    validateRequest(createPostSchema),
    controller.create.bind(controller)
  )

  router.post(
    '/:id/publish',
    authMiddleware,
    validateRequest(publishPostSchema),
    controller.publish.bind(controller)
  )

  return router
}
```

---

### 4. 의존성 주입 (DI Container)

```typescript
// src/container/index.ts
import { PrismaClient } from '@prisma/client'

// Repositories
import { UserRepository } from '@/infrastructure/database/repositories/UserRepository'
import { PostRepository } from '@/infrastructure/database/repositories/PostRepository'

// Use Cases
import { CreateUserUseCase } from '@/application/use-cases/users/CreateUserUseCase'
import { CreatePostUseCase } from '@/application/use-cases/posts/CreatePostUseCase'
import { GetPostsUseCase } from '@/application/use-cases/posts/GetPostsUseCase'
import { PublishPostUseCase } from '@/application/use-cases/posts/PublishPostUseCase'

// Controllers
import { UserController } from '@/infrastructure/http/controllers/UserController'
import { PostController } from '@/infrastructure/http/controllers/PostController'

class Container {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  // Repositories
  get userRepository() {
    return new UserRepository(this.prisma)
  }

  get postRepository() {
    return new PostRepository(this.prisma)
  }

  // Use Cases
  get createUserUseCase() {
    return new CreateUserUseCase(this.userRepository)
  }

  get createPostUseCase() {
    return new CreatePostUseCase(this.postRepository, this.userRepository)
  }

  get getPostsUseCase() {
    return new GetPostsUseCase(this.postRepository)
  }

  get publishPostUseCase() {
    return new PublishPostUseCase(this.postRepository)
  }

  // Controllers
  get userController() {
    return new UserController(this.createUserUseCase)
  }

  get postController() {
    return new PostController(
      this.createPostUseCase,
      this.getPostsUseCase,
      this.publishPostUseCase
    )
  }
}

export const container = new Container()
```

---

### 5. 애플리케이션 진입점

```typescript
// src/main.ts
import express from 'express'
import { container } from './container'
import { createUserRoutes } from './infrastructure/http/routes/userRoutes'
import { createPostRoutes } from './infrastructure/http/routes/postRoutes'
import { errorMiddleware } from './infrastructure/http/middlewares/errorMiddleware'

const app = express()

app.use(express.json())

// Routes
app.use('/api/users', createUserRoutes(container.userController))
app.use('/api/posts', createPostRoutes(container.postController))

// Error handling
app.use(errorMiddleware)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

---

## Next.js App Router에서의 적용

### Server Actions와 클린 아키텍처

```typescript
// src/lib/actions/posts.ts
'use server'

import { container } from '@/container'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'

export async function createPost(formData: FormData) {
  const user = await getUser()
  if (!user) {
    return { error: '로그인이 필요합니다' }
  }

  try {
    const result = await container.createPostUseCase.execute({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      authorId: user.id,
    })

    revalidatePath('/posts')
    redirect(`/posts/${result.id}`)
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : '게시물 생성에 실패했습니다',
    }
  }
}

export async function publishPost(postId: string) {
  const user = await getUser()
  if (!user) {
    return { error: '로그인이 필요합니다' }
  }

  try {
    await container.publishPostUseCase.execute({
      postId,
      userId: user.id,
    })

    revalidatePath('/posts')
    revalidatePath(`/posts/${postId}`)
    return { success: true }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : '게시물 발행에 실패했습니다',
    }
  }
}
```

---

## 테스트 전략

### 유닛 테스트 (Use Case)

```typescript
// src/application/use-cases/posts/__tests__/CreatePostUseCase.test.ts
import { CreatePostUseCase } from '../CreatePostUseCase'
import { IPostRepository } from '@/domain/repositories/IPostRepository'
import { IUserRepository } from '@/domain/repositories/IUserRepository'
import { User } from '@/domain/entities/User'

describe('CreatePostUseCase', () => {
  let useCase: CreatePostUseCase
  let mockPostRepository: jest.Mocked<IPostRepository>
  let mockUserRepository: jest.Mocked<IUserRepository>

  beforeEach(() => {
    mockPostRepository = {
      findById: jest.fn(),
      findMany: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    }

    mockUserRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
    }

    useCase = new CreatePostUseCase(mockPostRepository, mockUserRepository)
  })

  it('should create a post successfully', async () => {
    // Arrange
    const mockUser = { id: 'user-1', name: 'Test' } as User
    mockUserRepository.findById.mockResolvedValue(mockUser)
    mockPostRepository.save.mockResolvedValue()

    // Act
    const result = await useCase.execute({
      title: 'Test Post',
      content: 'Test content',
      authorId: 'user-1',
    })

    // Assert
    expect(result.title).toBe('Test Post')
    expect(mockPostRepository.save).toHaveBeenCalled()
  })

  it('should throw error when author not found', async () => {
    mockUserRepository.findById.mockResolvedValue(null)

    await expect(
      useCase.execute({
        title: 'Test',
        content: '',
        authorId: 'invalid-user',
      })
    ).rejects.toThrow('User을(를) 찾을 수 없습니다')
  })

  it('should throw error when title is empty', async () => {
    const mockUser = { id: 'user-1' } as User
    mockUserRepository.findById.mockResolvedValue(mockUser)

    await expect(
      useCase.execute({
        title: '',
        content: '',
        authorId: 'user-1',
      })
    ).rejects.toThrow('제목을 입력해주세요')
  })
})
```

---

## 참고 자료

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design by Eric Evans](https://www.domainlanguage.com/ddd/)
- [Implementing Domain-Driven Design by Vaughn Vernon](https://www.oreilly.com/library/view/implementing-domain-driven-design/9780133039900/)
