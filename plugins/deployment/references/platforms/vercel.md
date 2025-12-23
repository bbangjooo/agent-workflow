# Vercel 배포 가이드

Next.js 프로젝트를 위한 Vercel 배포 가이드입니다.

## 언제 사용하나요?

- Next.js 프로젝트 (SSR, SSG, ISR 모두 지원)
- React 프로젝트 (정적 빌드)
- API Routes가 필요한 경우

## 무료 티어

| 항목 | 한도 |
|------|------|
| 배포 | 무제한 |
| 대역폭 | 100GB/월 |
| 빌드 시간 | 6000분/월 |
| 서버리스 함수 | 100GB-Hrs/월 |
| 팀 멤버 | 1명 (Hobby) |

## 빠른 배포

### 1. CLI 설치

```bash
npm i -g vercel
```

### 2. 로그인

```bash
vercel login
# 이메일 또는 GitHub 계정으로 로그인
```

### 3. 배포

```bash
# 프로젝트 루트에서 실행
vercel --prod
```

**첫 배포 시 질문:**
```
? Set up and deploy? [Y/n] Y
? Which scope? (선택)
? Link to existing project? [y/N] N
? What's your project's name? (프로젝트명)
? In which directory is your code located? ./
```

## 환경변수 설정

### CLI로 설정

```bash
# 개별 추가
vercel env add DATABASE_URL

# 입력 프롬프트가 나타남
? What's the value of DATABASE_URL? [input is hidden]
? Add DATABASE_URL to which Environments? (선택)
  ◉ Production
  ◉ Preview
  ◉ Development
```

### 대시보드에서 설정

1. https://vercel.com/dashboard 접속
2. 프로젝트 선택
3. Settings > Environment Variables
4. 변수 추가

## 흔한 에러 및 해결

### 1. Build Failed: Module not found

```
Error: Cannot find module 'xxx'
```

**해결:**
```bash
npm install xxx
# 또는 package.json에 누락된 의존성 추가
```

### 2. Build Failed: TypeScript Error

```
Type error: Property 'xxx' does not exist
```

**해결:**
- 타입 에러 수정
- 또는 `tsconfig.json`에서 strict 모드 완화 (비권장)

### 3. 500 Error (서버리스 함수)

```
FUNCTION_INVOCATION_FAILED
```

**해결:**
1. Vercel 대시보드 > Functions 탭에서 로그 확인
2. 환경변수 확인
3. 로컬에서 `vercel dev`로 디버깅

### 4. 환경변수 undefined

```
Error: NEXT_PUBLIC_XXX is undefined
```

**해결:**
1. `NEXT_PUBLIC_` 접두사 확인 (클라이언트용)
2. Vercel 대시보드에서 환경변수 설정 확인
3. 재배포 필요

### 5. Edge Function 타임아웃

```
EDGE_FUNCTION_INVOCATION_TIMEOUT
```

**해결:**
- Edge Function은 30초 제한
- 오래 걸리는 작업은 Serverless Function으로 변경
- `export const runtime = 'nodejs'` 추가

## 유용한 명령어

```bash
# 프로덕션 배포
vercel --prod

# 미리보기 배포 (PR용)
vercel

# 환경변수 목록
vercel env ls

# 로컬 개발 (Vercel 환경 시뮬레이션)
vercel dev

# 로그 확인
vercel logs [deployment-url]

# 프로젝트 연결 해제
vercel unlink
```

## vercel.json (선택사항)

대부분 자동 감지되지만, 커스텀 설정이 필요한 경우:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["icn1"],
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

## 배포 후 확인

1. **대시보드 확인**: https://vercel.com/dashboard
2. **로그 확인**: Deployments > 최신 배포 > Functions
3. **분석**: Analytics 탭 (무료)

## 참고 링크

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [환경변수 가이드](https://vercel.com/docs/environment-variables)
