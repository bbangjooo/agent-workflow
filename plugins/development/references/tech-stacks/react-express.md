# React + Express Stack Guide

프론트엔드와 백엔드를 완전히 분리하고 싶을 때 사용하는 전통적인 조합입니다.

## 왜 이 조합인가?

| 장점 | 설명 |
|------|------|
| 완전한 분리 | FE/BE 독립 배포 가능 |
| 유연성 | 어떤 DB든 연결 가능 |
| 학습 자료 풍부 | 오래된 조합 |
| 제어권 | 모든 것을 직접 제어 |

| 단점 | 설명 |
|------|------|
| 설정 많음 | 직접 설정할 것이 많음 |
| 두 개 서버 | 개발 시 두 서버 실행 |
| 배포 복잡 | 별도 배포 필요 |

## 기술 스택 상세

```
Frontend:
├── React 18 (Vite)
├── TypeScript
├── Tailwind CSS
├── React Query (데이터 fetching)
└── React Router

Backend:
├── Express.js
├── TypeScript
├── Prisma (ORM)
└── PostgreSQL / MongoDB

Infrastructure:
├── Vercel (Frontend)
├── Railway / Render (Backend)
└── Supabase / PlanetScale (DB)
```

## 프로젝트 구조

```
my-project/
├── client/              # React 프론트엔드
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── server/              # Express 백엔드
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 시작하기

### Frontend (React + Vite)

```bash
# 프론트엔드 생성
npm create vite@latest client -- --template react-ts
cd client
npm install

# 추가 패키지
npm install axios @tanstack/react-query react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Backend (Express)

```bash
# 백엔드 생성
mkdir server && cd server
npm init -y

# 패키지 설치
npm install express cors dotenv
npm install -D typescript ts-node @types/node @types/express @types/cors nodemon

# TypeScript 설정
npx tsc --init
```

```typescript
// server/src/index.ts
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

### Prisma 설정 (선택)

```bash
cd server
npm install prisma @prisma/client
npx prisma init
```

```prisma
// server/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
}
```

## API 호출 패턴

### React Query 설정

```typescript
// client/src/lib/api.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

// 인터셉터로 토큰 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

```typescript
// client/src/hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await api.get('/posts')
      return data
    },
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (post: { title: string; content: string }) => {
      const { data } = await api.post('/posts', post)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
```

## Express API 패턴

```typescript
// server/src/routes/posts.ts
import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { authMiddleware } from '../middleware/auth'

const router = Router()

// 목록 조회
router.get('/', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  })
  res.json(posts)
})

// 생성 (인증 필요)
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body
  const userId = req.user.id

  const post = await prisma.post.create({
    data: { title, content, authorId: userId },
  })

  res.status(201).json(post)
})

export default router
```

## 개발 환경 실행

```bash
# 터미널 1: 백엔드
cd server
npm run dev

# 터미널 2: 프론트엔드
cd client
npm run dev
```

## 배포

### Frontend (Vercel)
```
1. GitHub 연결
2. client 폴더 선택
3. 환경변수 설정: VITE_API_URL
```

### Backend (Railway)
```
1. GitHub 연결
2. server 폴더 선택
3. 환경변수 설정: DATABASE_URL, JWT_SECRET
```

## 1인 창업자에게 권장하지 않는 이유

- 설정할 것이 많음
- 두 개의 배포 관리
- CORS 등 추가 설정 필요
- Next.js로 대부분 해결 가능

**이 스택을 선택하는 경우:**
- 이미 Express에 익숙함
- 백엔드를 완전히 분리해야 함
- 다른 클라이언트(모바일 등)도 사용
