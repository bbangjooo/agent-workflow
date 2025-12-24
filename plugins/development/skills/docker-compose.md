# Docker Compose

Step 3.13: 컨테이너화 (Docker Compose)

> **역할: DevOps**
> Docker 이미지 생성 및 docker-compose로 로컬 실행 환경 구성

## 설명

개발 완료된 애플리케이션을 Docker 이미지로 빌드하고, docker-compose를 통해 손쉽게 실행할 수 있는 환경을 구성하는 스킬입니다. 이를 통해 개발 환경과 프로덕션 환경의 일관성을 보장하고, 배포 준비를 완료합니다.

## 트리거

- Step 3.12 (Build Ready) 완료 후 실행
- 빌드가 성공적으로 완료되었을 때

## 입력

- `outputs/stage-3/build-config.md`
- `outputs/stage-3/tech-stack.md`
- 전체 프로젝트 코드
- `.env.example` 파일

## 실행 내용

### Dockerfile 생성

#### Next.js 프로젝트용 Dockerfile

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# 의존성 설치 단계
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# package.json과 lock 파일 복사
COPY package.json package-lock.json* ./
RUN npm ci

# 빌드 단계
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 환경변수 설정 (빌드 시 필요한 것들)
# ARG로 빌드 시 주입
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_APP_URL

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

# 빌드 실행
RUN npm run build

# 프로덕션 단계
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# 비root 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 필요한 파일만 복사
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

#### next.config.js 수정 (standalone 모드)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // 기존 설정 유지
}

module.exports = nextConfig
```

### docker-compose.yml 생성

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
        - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
        - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.local
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # 로컬 개발용 DB (선택사항 - Supabase 로컬 에뮬레이터)
  # supabase-local:
  #   image: supabase/postgres:15.1.0.117
  #   ports:
  #     - "54322:5432"
  #   environment:
  #     POSTGRES_PASSWORD: postgres
  #   volumes:
  #     - supabase-data:/var/lib/postgresql/data

# volumes:
#   supabase-data:
```

### docker-compose.dev.yml (개발용)

```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - NODE_ENV=development
    env_file:
      - .env.local
    command: npm run dev
```

### Dockerfile.dev (개발용)

```dockerfile
# Dockerfile.dev
FROM node:20-alpine

WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json* ./
RUN npm install

# 소스 코드는 volume으로 마운트됨

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

### .dockerignore 생성

```
# .dockerignore
node_modules
.next
.git
.gitignore
*.md
.env*.local
.env.production
Dockerfile*
docker-compose*.yml
.dockerignore
```

### 헬스체크 API 생성

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  })
}
```

### 실행 명령어

```bash
# 프로덕션 빌드 및 실행
docker-compose up --build

# 백그라운드 실행
docker-compose up -d --build

# 로그 확인
docker-compose logs -f app

# 중지
docker-compose down

# 개발 모드 실행
docker-compose -f docker-compose.dev.yml up --build
```

### 이미지 태깅 및 푸시 (선택)

```bash
# 이미지 빌드
docker build -t myapp:latest .

# Docker Hub에 푸시 (로그인 필요)
docker tag myapp:latest username/myapp:latest
docker push username/myapp:latest

# 또는 GitHub Container Registry
docker tag myapp:latest ghcr.io/username/myapp:latest
docker push ghcr.io/username/myapp:latest
```

### 질문 가이드

1. **Docker 경험**
   - "Docker를 사용해보신 적 있으세요?"
   - "로컬에 Docker Desktop이 설치되어 있나요?"

2. **이미지 레지스트리**
   - "Docker 이미지를 어디에 저장하고 싶으세요? (Docker Hub, GitHub Container Registry, AWS ECR)"
   - "지금은 로컬 실행만 할까요, 아니면 이미지 푸시까지 할까요?"

3. **환경변수**
   - "프로덕션용 환경변수가 준비되어 있나요?"
   - ".env.local 파일이 있나요?"

### 대화 원칙

- Docker 초보자를 위해 각 명령어 설명
- 보안 관련 주의사항 강조 (환경변수 노출 금지)
- 로컬에서 먼저 테스트 후 진행
- 에러 발생 시 차근차근 해결

## 산출물

`outputs/stage-3/docker-compose.md`

```markdown
# Docker Compose Configuration

## 메타데이터
- Stage: 3
- Step: 3.13 - 컨테이너화
- 생성일시: {현재 시간}
- 상태: final

## Docker 파일 목록

| 파일 | 용도 | 상태 |
|------|------|------|
| Dockerfile | 프로덕션 빌드 | [x] 생성됨 |
| Dockerfile.dev | 개발용 | [x] 생성됨 |
| docker-compose.yml | 프로덕션 실행 | [x] 생성됨 |
| docker-compose.dev.yml | 개발 실행 | [x] 생성됨 |
| .dockerignore | 제외 파일 | [x] 생성됨 |

## 이미지 정보

| 항목 | 값 |
|------|-----|
| 베이스 이미지 | node:20-alpine |
| 이미지 이름 | {project-name} |
| 노출 포트 | 3000 |
| 멀티스테이지 빌드 | Yes |

## 실행 명령어

### 프로덕션
```bash
# 빌드 및 실행
docker-compose up --build -d

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

### 개발
```bash
# 개발 모드 실행
docker-compose -f docker-compose.dev.yml up --build

# 핫 리로드 지원됨
```

## 환경변수 설정

### 빌드 시 필요 (ARG)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_APP_URL

### 런타임 필요 (ENV)
- NODE_ENV
- (기타 런타임 환경변수)

## 헬스체크

- 엔드포인트: `/api/health`
- 상태: [x] 구현됨
- 인터벌: 30초

## 테스트 결과

| 테스트 | 결과 |
|--------|------|
| docker-compose up | [x] 성공 |
| 로컬 접속 (localhost:3000) | [x] 성공 |
| 헬스체크 | [x] 성공 |
| 환경변수 로드 | [x] 성공 |

## 이미지 레지스트리 (선택)

| 레지스트리 | 상태 | 이미지 URL |
|-----------|------|-----------|
| 로컬 | [x] 빌드됨 | - |
| Docker Hub | [ ] | - |
| GitHub Container Registry | [ ] | - |
| AWS ECR | [ ] | - |

## 다음 단계

Stage 4: 배포를 진행합니다.

```
/deploy  # Stage 4 시작
```

Docker 이미지가 준비되었으므로:
- Kubernetes 배포
- AWS ECS 배포
- Railway, Fly.io 등 컨테이너 플랫폼 배포
등의 옵션을 선택할 수 있습니다.
```

## 완료 조건

- Dockerfile 생성 완료
- docker-compose.yml 생성 완료
- .dockerignore 생성 완료
- 헬스체크 API 구현
- `docker-compose up --build` 성공
- 로컬에서 컨테이너 실행 확인 (localhost:3000 접속)
- `docker-compose.md` 파일 생성

## Stage 3 완료

Docker Compose 설정이 완료되면 Stage 3가 종료됩니다.
다음 Stage는 **Stage 4: Deployment (배포)**입니다.

컨테이너화가 완료되었으므로 다양한 배포 옵션을 선택할 수 있습니다:
- Vercel (기존 방식)
- Docker 기반 플랫폼 (Railway, Fly.io, Render)
- Kubernetes (GKE, EKS, AKS)
- AWS ECS/Fargate
