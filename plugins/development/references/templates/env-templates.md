# Environment Variables Templates

환경변수 템플릿 모음입니다.

## 기본 구조

```bash
# .env.local (개발용, gitignore에 포함)
# .env.example (예시, 커밋됨)
# .env.production (프로덕션용, gitignore에 포함)
```

## Next.js + Supabase

```bash
# .env.example

# ===================
# Supabase
# ===================
# Supabase Dashboard > Settings > API에서 확인
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# 서버 전용 (선택)
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ===================
# App
# ===================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=My App

# ===================
# Third-party Services (선택)
# ===================
# Stripe
# STRIPE_SECRET_KEY=sk_test_xxx
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
# STRIPE_WEBHOOK_SECRET=whsec_xxx

# Resend (이메일)
# RESEND_API_KEY=re_xxx

# Cloudinary (이미지)
# CLOUDINARY_CLOUD_NAME=xxx
# CLOUDINARY_API_KEY=xxx
# CLOUDINARY_API_SECRET=xxx

# Analytics
# NEXT_PUBLIC_GA_ID=G-xxx
```

## Next.js + Firebase

```bash
# .env.example

# ===================
# Firebase
# ===================
# Firebase Console > Project Settings > General에서 확인
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx

# Firebase Admin (서버용)
# FIREBASE_ADMIN_PROJECT_ID=xxx
# FIREBASE_ADMIN_CLIENT_EMAIL=xxx
# FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

# ===================
# App
# ===================
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 환경변수 네이밍 규칙

### Next.js

```bash
# 클라이언트에서 접근 가능 (브라우저에 노출됨)
NEXT_PUBLIC_*

# 서버에서만 접근 가능 (안전)
그 외 모든 변수
```

### 예시

```bash
# 클라이언트 OK (공개되어도 됨)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_APP_URL=...

# 서버 ONLY (절대 노출 안됨)
SUPABASE_SERVICE_ROLE_KEY=...    # DB 풀 액세스
STRIPE_SECRET_KEY=...            # 결제 시크릿
RESEND_API_KEY=...               # 이메일 API
```

## 환경별 분리

```bash
# .env.local (로컬 개발)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://dev-xxx.supabase.co

# .env.production (프로덕션)
NEXT_PUBLIC_APP_URL=https://myapp.com
NEXT_PUBLIC_SUPABASE_URL=https://prod-xxx.supabase.co
```

## Vercel 환경변수 설정

```
1. Project Settings > Environment Variables
2. 각 변수 추가
3. Environment 선택:
   - Production
   - Preview
   - Development
```

## 보안 체크리스트

- [ ] `.env.local`이 `.gitignore`에 포함됨
- [ ] `.env.example`에는 실제 값 없음
- [ ] `NEXT_PUBLIC_`이 아닌 키는 서버에서만 사용
- [ ] 시크릿 키는 절대 커밋 안됨
- [ ] 프로덕션 키는 별도 관리

## 환경변수 접근 방법

```typescript
// 클라이언트 (브라우저)
const url = process.env.NEXT_PUBLIC_SUPABASE_URL

// 서버 (API Route, Server Component, Server Action)
const secretKey = process.env.STRIPE_SECRET_KEY

// 타입 안전성을 위한 검증
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is required')
}
```

## TypeScript 타입 정의 (선택)

```typescript
// src/types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    NEXT_PUBLIC_APP_URL: string
    SUPABASE_SERVICE_ROLE_KEY?: string
    STRIPE_SECRET_KEY?: string
  }
}
```
