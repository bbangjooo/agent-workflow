# Railway 배포 가이드

Node.js 백엔드 및 풀스택 프로젝트를 위한 Railway 배포 가이드입니다.

## 언제 사용하나요?

- Express.js / Fastify 백엔드
- Node.js 서버 애플리케이션
- 데이터베이스가 필요한 풀스택 프로젝트
- WebSocket 서버

## 무료 티어

| 항목 | 한도 |
|------|------|
| 크레딧 | $5/월 (무료) |
| 실행 시간 | ~500시간/월 |
| 메모리 | 512MB RAM |
| 네트워크 | 100GB/월 |
| 프로젝트 | 무제한 |

**참고**: $5 크레딧으로 소규모 서비스 충분히 운영 가능

## 빠른 배포

### 1. CLI 설치

```bash
npm i -g @railway/cli
```

### 2. 로그인

```bash
railway login
# 브라우저에서 GitHub 인증
```

### 3. 프로젝트 초기화

```bash
# 새 프로젝트 생성
railway init

# 또는 기존 프로젝트 연결
railway link
```

### 4. 배포

```bash
railway up
```

## 환경변수 설정

### CLI로 설정

```bash
# 개별 추가
railway variables set DATABASE_URL="your-value"

# 여러 개 추가
railway variables set KEY1=value1 KEY2=value2
```

### 대시보드에서 설정

1. https://railway.app/dashboard 접속
2. 프로젝트 > 서비스 선택
3. Variables 탭
4. + New Variable

## 데이터베이스 추가

Railway는 데이터베이스를 쉽게 추가할 수 있습니다:

### PostgreSQL 추가

```bash
# 대시보드에서:
# 1. + New > Database > PostgreSQL
# 2. 자동으로 DATABASE_URL 환경변수 생성됨
```

### 환경변수 자동 연결

Railway가 자동으로 `DATABASE_URL`을 서비스에 주입합니다.

## 필수 설정

### package.json

```json
{
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc"
  },
  "engines": {
    "node": "18.x"
  }
}
```

### Procfile (선택사항)

```
web: npm start
```

### 포트 설정

Railway는 `PORT` 환경변수를 자동 주입합니다:

```javascript
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## 흔한 에러 및 해결

### 1. Build Failed

```
npm ERR! Missing script: "build"
```

**해결:**
`package.json`에 build 스크립트 추가:
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

### 2. 포트 바인딩 실패

```
Error: listen EADDRINUSE
```

**해결:**
`process.env.PORT` 사용:
```javascript
const port = process.env.PORT || 3000;
```

### 3. 데이터베이스 연결 실패

```
Connection refused
```

**해결:**
1. DATABASE_URL 환경변수 확인
2. SSL 설정 추가:
```javascript
// Prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 또는 연결 문자열에 ?sslmode=require 추가
```

### 4. 메모리 부족

```
JavaScript heap out of memory
```

**해결:**
환경변수 추가:
```
NODE_OPTIONS=--max_old_space_size=512
```

### 5. 배포 후 서비스 중단

```
Service crashed
```

**해결:**
1. 로그 확인: `railway logs`
2. 헬스체크 엔드포인트 추가:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
```

## 유용한 명령어

```bash
# 배포
railway up

# 로그 확인
railway logs

# 환경변수 목록
railway variables

# 로컬 개발 (Railway 환경변수로)
railway run npm start

# 서비스 상태
railway status

# 대시보드 열기
railway open
```

## railway.json (선택사항)

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

## 프론트엔드 + 백엔드 분리 배포

### 구조

```
프로젝트/
├── frontend/  → Vercel 배포
└── backend/   → Railway 배포
```

### 백엔드 (Railway)

```bash
cd backend
railway init
railway up
# URL: https://your-backend.railway.app
```

### 프론트엔드 환경변수

```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

## 비용 최적화

### 무료 티어 최대 활용

1. **수면 모드 활용**: 트래픽 없으면 자동 수면
2. **불필요한 서비스 삭제**: 사용하지 않는 서비스 제거
3. **리소스 최적화**: 필요한 만큼만 메모리 사용

### 크레딧 소진 시

- 서비스 일시 중지됨
- 신용카드 등록 시 사용량만큼 과금 ($0.000463/분)

## 배포 후 확인

1. **대시보드 확인**: https://railway.app/dashboard
2. **로그 확인**: 서비스 > Deployments > Logs
3. **메트릭**: 서비스 > Metrics

## 참고 링크

- [Railway 공식 문서](https://docs.railway.app/)
- [Node.js 배포 가이드](https://docs.railway.app/guides/nodejs)
- [환경변수 가이드](https://docs.railway.app/develop/variables)
