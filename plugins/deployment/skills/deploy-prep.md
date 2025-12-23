# Deploy Preparation

Step 4.1: 배포 준비

## 설명

프로젝트의 기술 스택을 분석하여 최적의 무료 호스팅을 자동 선택하고, 배포에 필요한 환경변수를 설정합니다.

## 트리거

- `/deploy` 커맨드 실행 시 자동 시작
- Stage 3 산출물이 존재할 때

## 입력

- `outputs/stage-3/tech-stack.md` - 선택된 기술 스택
- `outputs/stage-3/build-config.md` - 빌드 설정
- 프로젝트 `package.json`
- `.env.example` 또는 `.env.local` (있는 경우)

## 실행 내용

### 1. 기술 스택 분석 (자동)

```
1. package.json의 dependencies 확인
2. 프레임워크 감지 (Next.js, React, Express 등)
3. 데이터베이스 연결 확인 (Supabase, Firebase, PostgreSQL 등)
```

### 2. 호스팅 자동 선택

| 감지된 스택 | 선택 호스팅 | 이유 |
|-------------|-------------|------|
| `next` in dependencies | **Vercel** | Next.js 공식 지원, 무료 티어 최적 |
| `react` + no SSR | **Netlify** | 정적 사이트 최적화, 무료 배포 |
| `express` / `fastify` | **Railway** | Node.js 서버 지원, $5 무료 크레딧 |
| Next.js + Express | **Vercel + Railway** | 프론트/백 분리 배포 |

### 3. 환경변수 추출 (자동)

```
1. .env.example 파일 파싱
2. 필요한 환경변수 목록 생성
3. 각 변수별 설정 안내 생성
```

### 4. 빌드 설정 검증 (자동)

```
1. package.json scripts 확인 (build, start)
2. 빌드 명령어 검증
3. 출력 디렉토리 확인 (.next, dist, build)
```

## 산출물

`outputs/stage-4/deploy-prep.md`

```markdown
# 배포 준비

## 메타데이터
- Stage: 4
- Step: 4.1
- 생성일시: {timestamp}
- 상태: final

## 프로젝트 분석

### 기술 스택
- 프레임워크: {Next.js / React / Express}
- 데이터베이스: {Supabase / Firebase / 없음}
- 기타: {Tailwind CSS, TypeScript 등}

### 빌드 설정
- 빌드 명령어: `{npm run build}`
- 출력 디렉토리: `{.next / dist / build}`
- Node 버전: `{18.x}`

## 호스팅 선택

### 선택된 호스팅: {Vercel}

| 항목 | 값 |
|------|-----|
| 플랫폼 | {Vercel} |
| 무료 티어 | {무제한 배포, 100GB 대역폭} |
| 선택 이유 | {Next.js 공식 지원} |

### 대안 (필요시)
- {Netlify}: {이유}
- {Railway}: {이유}

## 환경변수 설정

### 필요한 환경변수

| 변수명 | 설명 | 설정 방법 |
|--------|------|-----------|
| `DATABASE_URL` | DB 연결 문자열 | Supabase 대시보드에서 복사 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase URL | Supabase 대시보드 > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 공개 키 | Supabase 대시보드 > Settings > API |

### 호스팅에서 환경변수 설정

**Vercel:**
```bash
vercel env add DATABASE_URL
# 또는 Vercel 대시보드 > Settings > Environment Variables
```

## 배포 전 체크리스트

- [ ] 환경변수 설정 완료
- [ ] 빌드 테스트 통과 (`npm run build`)
- [ ] Git 저장소 연결 (선택사항)

## 다음 단계

→ Step 4.2: Deploy Execution (배포 실행)
```

## 완료 조건

- 기술 스택 분석 완료
- 호스팅 플랫폼 선택 완료
- 환경변수 목록 추출 완료
- `deploy-prep.md` 파일이 생성됨

## 다음 Step

→ Step 4.2: Deploy Execution (배포 실행)
