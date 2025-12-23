# Netlify 배포 가이드

React SPA 및 정적 사이트를 위한 Netlify 배포 가이드입니다.

## 언제 사용하나요?

- React SPA (Create React App, Vite)
- 정적 사이트 (HTML/CSS/JS)
- SSR 없이 클라이언트 렌더링만 필요한 경우

## 무료 티어

| 항목 | 한도 |
|------|------|
| 배포 | 무제한 |
| 대역폭 | 100GB/월 |
| 빌드 시간 | 300분/월 |
| 사이트 수 | 무제한 |
| 팀 멤버 | 1명 |

## 빠른 배포

### 1. CLI 설치

```bash
npm i -g netlify-cli
```

### 2. 로그인

```bash
netlify login
# 브라우저에서 인증
```

### 3. 빌드

```bash
npm run build
```

### 4. 배포

```bash
# 프로덕션 배포
netlify deploy --prod --dir=dist

# Vite 프로젝트: --dir=dist
# CRA 프로젝트: --dir=build
```

**첫 배포 시:**
```
? What would you like to do? Create & configure a new site
? Team: (선택)
? Site name: (프로젝트명, 선택사항)
```

## 환경변수 설정

### CLI로 설정

```bash
netlify env:set DATABASE_URL "your-value"
```

### 대시보드에서 설정

1. https://app.netlify.com 접속
2. 사이트 선택
3. Site settings > Environment variables
4. Add a variable

## SPA 라우팅 설정

React Router 등 클라이언트 라우팅 사용 시 **필수**:

### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

또는 `public/_redirects` 파일:

```
/*    /index.html   200
```

## 흔한 에러 및 해결

### 1. 404 Not Found (라우팅)

```
Page Not Found
```

**해결:**
- `netlify.toml`에 redirects 설정 추가
- 또는 `public/_redirects` 파일 생성

### 2. Build Failed: Module not found

```
Error: Cannot find module 'xxx'
```

**해결:**
```bash
npm install xxx
```

### 3. 환경변수 undefined

```
process.env.REACT_APP_XXX is undefined
```

**해결:**
1. CRA: `REACT_APP_` 접두사 필수
2. Vite: `VITE_` 접두사 필수
3. Netlify 대시보드에서 환경변수 설정
4. 재배포

### 4. API 호출 실패 (CORS)

```
Access-Control-Allow-Origin error
```

**해결:**
Netlify Functions 사용하거나, `netlify.toml`에 프록시 설정:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-api.com/:splat"
  status = 200
  force = true
```

### 5. 빌드 메모리 부족

```
JavaScript heap out of memory
```

**해결:**
환경변수 추가:
```
NODE_OPTIONS=--max_old_space_size=4096
```

## 유용한 명령어

```bash
# 프로덕션 배포
netlify deploy --prod --dir=dist

# 미리보기 배포 (URL 생성)
netlify deploy --dir=dist

# 환경변수 목록
netlify env:list

# 로컬 개발 (Netlify 환경 시뮬레이션)
netlify dev

# 사이트 열기
netlify open

# 빌드 로그 확인
netlify watch
```

## netlify.toml 전체 예시

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

# SPA 라우팅
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# API 프록시 (선택사항)
[[redirects]]
  from = "/api/*"
  to = "https://your-api.com/:splat"
  status = 200
  force = true

# 헤더 설정 (선택사항)
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

## Vite vs CRA 차이점

| 항목 | Vite | Create React App |
|------|------|------------------|
| 빌드 출력 | `dist/` | `build/` |
| 환경변수 접두사 | `VITE_` | `REACT_APP_` |
| 빌드 명령어 | `vite build` | `react-scripts build` |

## 배포 후 확인

1. **대시보드 확인**: https://app.netlify.com
2. **배포 로그**: Deploys 탭
3. **분석**: Analytics 탭 (Pro 플랜)

## 참고 링크

- [Netlify 공식 문서](https://docs.netlify.com/)
- [SPA 라우팅 설정](https://docs.netlify.com/routing/redirects/rewrites-proxies/)
- [환경변수 가이드](https://docs.netlify.com/environment-variables/overview/)
