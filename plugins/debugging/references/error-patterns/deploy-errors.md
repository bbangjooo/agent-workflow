# Deploy Errors 패턴 및 해결책

배포 과정 및 프로덕션 환경에서 발생하는 일반적인 에러 패턴과 해결 방법입니다.

---

## 빌드 실패 (배포 플랫폼)

### Vercel 빌드 에러

#### Build Command Failed

**에러:**
```
Error: Command "npm run build" exited with 1
Build failed
```

**일반적인 원인과 해결:**

1. **TypeScript 에러**
```bash
# 로컬에서 먼저 확인
npm run build
```

2. **ESLint 에러** (Next.js의 경우 빌드 시 lint 실행)
```typescript
// next.config.js에서 임시로 무시 (권장하지 않음)
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}
```

3. **타입 에러** (Next.js)
```typescript
// next.config.js에서 임시로 무시 (권장하지 않음)
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
}
```

---

### Netlify 빌드 에러

#### Build script returned non-zero exit code

**해결:**
```bash
# netlify.toml 확인
[build]
  command = "npm run build"
  publish = "dist"  # 또는 "build", ".next" 등 프레임워크에 맞게
```

---

## 환경 변수 에러

### 환경 변수 누락

**에러:**
```
Error: Missing required environment variable: DATABASE_URL
process.env.NEXT_PUBLIC_API_URL is undefined
```

**해결:**

#### Vercel
1. Dashboard → Project → Settings → Environment Variables
2. 모든 필요한 변수 추가
3. 재배포

#### Netlify
1. Site settings → Build & deploy → Environment
2. Edit variables → 추가
3. 재배포

**체크리스트:**
```bash
# 필요한 환경 변수 확인
cat .env.example

# 로컬 .env.local과 비교
diff .env.example .env.local
```

---

### NEXT_PUBLIC_ 접두사 누락

**에러:**
```
TypeError: Cannot read properties of undefined
# 클라이언트에서 환경 변수가 undefined
```

**원인:** Next.js에서 클라이언트에 노출할 변수는 `NEXT_PUBLIC_` 접두사 필요

**해결:**
```bash
# 변경 전 (.env.local)
API_URL=https://api.example.com

# 변경 후 - 클라이언트에서 사용하려면
NEXT_PUBLIC_API_URL=https://api.example.com
```

```typescript
// 사용
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

---

## 502/503 에러

### 502 Bad Gateway

**일반적인 원인:**

1. **서버가 시작되지 않음**
2. **포트 불일치**
3. **시작 스크립트 오류**

**해결 (Railway/Render 등):**

```json
// package.json
{
  "scripts": {
    "start": "node server.js",  // 또는 "next start"
    "build": "next build"
  }
}
```

**포트 설정:**
```typescript
// server.js
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

---

### 503 Service Unavailable

**일반적인 원인:**

1. **Cold start 지연** (서버리스)
2. **리소스 한도 초과**
3. **Health check 실패**

**해결:**
- 서버리스 함수 크기 최적화
- 타임아웃 설정 확인
- 외부 의존성 연결 확인 (DB 등)

---

## CORS 에러

### CORS policy 에러

**에러:**
```
Access to fetch at 'https://api.example.com' from origin 'https://myapp.com' has been blocked by CORS policy
```

**해결:**

#### Next.js API Routes
```typescript
// pages/api/proxy.ts 또는 app/api/proxy/route.ts
export async function GET(request: Request) {
  const response = await fetch('https://api.example.com/data')
  const data = await response.json()

  return Response.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    },
  })
}
```

#### 외부 API 서버 설정 (Express)
```typescript
import cors from 'cors'

app.use(cors({
  origin: ['https://myapp.com', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))
```

#### Vercel에서 리라이트 사용
```typescript
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/external/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
}
```

---

## 데이터베이스 연결 에러

### Connection Refused

**에러:**
```
Error: connect ECONNREFUSED
Error: Connection timed out
```

**원인:**
1. DB 서버 주소/포트 오류
2. 방화벽/네트워크 설정
3. DB 서버가 실행되지 않음

**해결:**

#### Supabase
```bash
# 올바른 연결 문자열 형식
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

#### 배포 플랫폼에서 IP 허용 (PlanetScale, MongoDB Atlas 등)
1. DB 대시보드 → Network/Security 설정
2. 배포 플랫폼의 IP 범위 허용 또는 `0.0.0.0/0` (모든 IP)

---

### SSL 연결 필요

**에러:**
```
Error: SSL/TLS required
Error: no pg_hba.conf entry
```

**해결:**
```bash
# 연결 문자열에 SSL 옵션 추가
DATABASE_URL="postgresql://...?sslmode=require"
```

```typescript
// Prisma의 경우 schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // directUrl = env("DIRECT_URL")  // 필요한 경우
}
```

---

## 정적 파일/이미지 에러

### 이미지 로드 실패

**에러:**
```
Image with src "/images/logo.png" not found
next/image Un-configured Host
```

**해결:**

#### public 폴더 경로
```typescript
// 올바른 경로
<img src="/images/logo.png" />  // public/images/logo.png
```

#### 외부 이미지 (Next.js)
```typescript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
    ],
    // 또는 간단히
    domains: ['example.com'],
  },
}
```

---

## 빠른 진단 체크리스트

배포 에러 발생 시 확인:

1. [ ] 로컬에서 `npm run build` 성공하는가?
2. [ ] 모든 환경 변수가 배포 플랫폼에 설정되어 있는가?
3. [ ] 클라이언트용 환경 변수에 `NEXT_PUBLIC_` 접두사가 있는가?
4. [ ] 데이터베이스 연결 문자열이 올바른가?
5. [ ] 외부 서비스(DB, API)에서 배포 서버 IP를 허용하는가?
6. [ ] package.json의 start/build 스크립트가 올바른가?
7. [ ] 프레임워크에 맞는 output 디렉토리를 설정했는가?

---

## 플랫폼별 로그 확인 방법

### Vercel
- Dashboard → Project → Deployments → 실패한 배포 클릭 → Logs

### Netlify
- Site → Deploys → 실패한 배포 → Deploy log

### Railway
- Project → Deployments → 배포 선택 → Logs

### Render
- Dashboard → Service → Events/Logs
