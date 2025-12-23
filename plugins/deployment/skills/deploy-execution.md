# Deploy Execution

Step 4.2: 배포 실행

## 설명

선택된 호스팅에 프로젝트를 실제로 배포합니다. 빌드 에러가 발생하면 자동으로 감지하고 해결책을 제시합니다.

## 트리거

- Step 4.1 완료 후 자동 실행
- `outputs/stage-4/deploy-prep.md`이 존재할 때

## 입력

- `outputs/stage-4/deploy-prep.md` - 배포 준비 정보
- 프로젝트 소스 코드

## 실행 내용

### 1. 로컬 빌드 테스트 (자동)

배포 전 로컬에서 빌드가 성공하는지 확인합니다.

```bash
npm run build
```

### 2. 호스팅별 배포 명령 (자동)

#### Vercel (Next.js)

```bash
# Vercel CLI 설치 (최초 1회)
npm i -g vercel

# 배포 (프로덕션)
vercel --prod
```

**자동 설정 (vercel.json 불필요):**
- Next.js 자동 감지
- 빌드 명령어 자동 설정
- 환경변수는 CLI 또는 대시보드에서 설정

#### Netlify (React SPA)

```bash
# Netlify CLI 설치 (최초 1회)
npm i -g netlify-cli

# 배포
netlify deploy --prod --dir=dist
```

**netlify.toml (자동 생성):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Railway (Express/Node.js)

```bash
# Railway CLI 설치 (최초 1회)
npm i -g @railway/cli

# 로그인 & 배포
railway login
railway init
railway up
```

### 3. 빌드 에러 자동 해결

#### 흔한 에러 패턴

| 에러 | 원인 | 자동 해결 |
|------|------|----------|
| `Module not found` | 패키지 미설치 | `npm install {package}` 실행 |
| `Type error` | TypeScript 오류 | 해당 파일 수정 제안 |
| `ENOMEM` | 메모리 부족 | 빌드 최적화 설정 추가 |
| `환경변수 undefined` | 환경변수 미설정 | 설정 안내 |

#### 에러 처리 흐름

```
에러 발생
    ↓
에러 메시지 분석
    ↓
패턴 매칭으로 원인 파악
    ↓
자동 수정 가능? → 수정 후 재빌드
    ↓
수동 개입 필요 → 명확한 해결 단계 제시
    ↓
최대 3회 재시도 후 실패 시 사용자에게 전달
```

### 4. 배포 확인

배포 성공 시 자동으로 URL 추출:

```
✅ 배포 성공!

Production: https://your-app.vercel.app
Preview: https://your-app-git-main-username.vercel.app
```

## 산출물

`outputs/stage-4/deploy-log.md`

```markdown
# 배포 실행 로그

## 메타데이터
- Stage: 4
- Step: 4.2
- 생성일시: {timestamp}
- 상태: final

## 배포 정보

| 항목 | 값 |
|------|-----|
| 호스팅 | {Vercel} |
| 배포 시간 | {2분 30초} |
| 빌드 상태 | {성공} |

## 배포 URL

| 환경 | URL |
|------|-----|
| **Production** | https://{app-name}.vercel.app |
| Preview | https://{app-name}-git-main-{user}.vercel.app |

## 실행 로그

### 빌드 단계
```
$ npm run build
> next build
   Creating an optimized production build...
   Compiled successfully
   Route (app)                              Size     First Load JS
   ...
```

### 배포 단계
```
$ vercel --prod
Vercel CLI 32.x.x
🔍 Inspecting project settings
✅ Production deployment complete
```

## 발생한 이슈 (있는 경우)

### 이슈 1: {이슈명}
- **에러**: {에러 메시지}
- **원인**: {원인}
- **해결**: {해결 방법}
- **상태**: 해결됨

## 환경변수 설정 상태

| 변수명 | 상태 |
|--------|------|
| DATABASE_URL | 설정됨 |
| NEXT_PUBLIC_SUPABASE_URL | 설정됨 |

## 다음 단계

→ Step 4.3: Launch Verification (런칭 검증)
```

## 완료 조건

- 빌드 성공
- 배포 성공
- 배포 URL 획득
- `deploy-log.md` 파일이 생성됨

## 다음 Step

→ Step 4.3: Launch Verification (런칭 검증)

## 에러 발생 시

배포 실패가 3회 이상 지속되면:

1. 상세 에러 로그 기록
2. 가능한 해결책 목록 제시
3. 사용자에게 직접 확인 요청

```
⚠️ 배포가 실패했습니다.

발생한 에러:
{상세 에러 메시지}

시도한 해결책:
1. {시도 1}
2. {시도 2}

추가 확인이 필요합니다:
- [ ] 환경변수가 모두 설정되었는지 확인
- [ ] 로컬에서 `npm run build`가 성공하는지 확인
- [ ] {플랫폼} 대시보드에서 빌드 로그 확인
```
