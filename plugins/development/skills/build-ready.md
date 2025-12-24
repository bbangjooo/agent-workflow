# Build Ready

Step 3.12: 빌드 준비 (Build Ready)

> **역할: Full-stack**
> 프로덕션 빌드, 환경변수, 배포 설정 전체

## 설명

프로덕션 빌드를 생성하고 배포를 위한 최종 준비를 하는 스킬입니다. 환경변수 정리, 빌드 테스트, 최적화 확인을 진행합니다.

## 트리거

- Step 3.11 (Testing) 완료 후 실행
- 모든 테스트가 통과했을 때

## 입력

- `outputs/stage-3/test-report.md`
- 전체 프로젝트 코드
- `outputs/stage-3/tech-stack.md`

## 실행 내용

### 빌드 전 체크리스트

#### 환경변수 정리

```bash
# .env.example (커밋됨 - 예시용)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_APP_URL=https://your-domain.com

# .env.local (커밋 안됨 - 로컬 개발용)
# .env.production (커밋 안됨 - 프로덕션용)
```

#### 불필요한 파일 정리

```bash
# 삭제할 파일들
- console.log 제거
- 주석 처리된 코드 정리
- 테스트용 더미 데이터 제거
- .env.local이 .gitignore에 있는지 확인
```

### 프로덕션 빌드

```bash
# 빌드 실행
npm run build

# 빌드 결과 확인
# .next 폴더 생성
# 에러 없이 완료되어야 함
```

### 빌드 에러 해결

일반적인 빌드 에러:

| 에러 | 원인 | 해결 |
|------|------|------|
| Module not found | 설치 안 된 패키지 | npm install |
| Type error | 타입 불일치 | 타입 수정 |
| ESLint error | 린트 규칙 위반 | 코드 수정 또는 규칙 조정 |
| Build failed | 다양한 원인 | 에러 메시지 확인 |

### 빌드 최적화 확인

```bash
# 빌드 분석 (선택)
npm run build -- --analyze

# 번들 크기 확인
# 너무 큰 번들이 있으면 코드 스플리팅 고려
```

### 프로덕션 환경 설정

#### Vercel 배포 준비

```bash
# 1. Vercel CLI 설치 (선택)
npm i -g vercel

# 2. 로그인
vercel login

# 3. 프로젝트 연결
vercel link

# 4. 환경변수 설정 (Vercel 대시보드 또는 CLI)
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

#### 환경변수 구분

| 변수 | Development | Production |
|------|-------------|------------|
| NEXT_PUBLIC_SUPABASE_URL | dev-project | prod-project |
| NEXT_PUBLIC_APP_URL | localhost:3000 | your-domain.com |

### 런칭 전 체크리스트

참조: `references/checklists/launch-checklist.md`

#### 필수
- [ ] 빌드 성공
- [ ] 환경변수 설정 완료
- [ ] RLS 정책 활성화
- [ ] HTTPS 사용 (Vercel 기본)
- [ ] 에러 페이지 (404, 500) 확인

#### 권장
- [ ] 파비콘 설정
- [ ] 메타 태그 (OG 이미지 등)
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] 분석 도구 (Vercel Analytics 등)

### 질문 가이드

1. **빌드 확인**
   - "빌드를 실행해볼까요?"
   - "에러가 있나요?"

2. **환경변수**
   - "프로덕션용 환경변수 준비되셨나요?"
   - "Supabase 프로덕션 프로젝트가 있나요?"

3. **배포 방식**
   - "Vercel로 배포할까요?"
   - "도메인이 있으신가요?"

### 대화 원칙

- 빌드 에러 발생 시 차근차근 해결
- 환경변수 보안 강조
- 체크리스트 하나씩 확인
- 다음 스테이지(배포) 안내

## 산출물

`outputs/stage-3/build-config.md`

```markdown
# Build Configuration

## 메타데이터
- Stage: 3
- Step: 3.12 - 빌드 준비
- 생성일시: {현재 시간}
- 상태: final

## 빌드 결과

| 항목 | 상태 |
|------|------|
| 빌드 성공 | [x] |
| 에러 없음 | [x] |
| 경고 없음 | [x] / [ ] 경고 {N}개 |

## 빌드 정보

```
Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         89 kB
├ ○ /login                               2.1 kB         86 kB
├ ○ /posts                               3.4 kB         87 kB
├ ● /posts/[id]                          4.2 kB         88 kB
...
```

## 환경변수

### 필수 변수
| 변수 | 설정 상태 |
|------|----------|
| NEXT_PUBLIC_SUPABASE_URL | [x] 설정됨 |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | [x] 설정됨 |
| NEXT_PUBLIC_APP_URL | [x] 설정됨 |

### 선택 변수
| 변수 | 설정 상태 | 비고 |
|------|----------|------|
| (추가 변수) | [ ] | 필요시 추가 |

## 배포 준비 상태

### Vercel
- [ ] 프로젝트 연결
- [ ] 환경변수 설정
- [ ] 도메인 연결 (선택)

### Supabase (Production)
- [ ] 프로덕션 프로젝트 생성
- [ ] 테이블 마이그레이션
- [ ] RLS 정책 설정

## 런칭 전 체크리스트

### 필수
- [x] 빌드 성공
- [x] 환경변수 정리
- [x] 보안 설정 확인
- [ ] 프로덕션 DB 설정

### SEO/메타
- [ ] 파비콘
- [ ] OG 이미지
- [ ] 메타 설명
- [ ] robots.txt

### 분석
- [ ] Vercel Analytics
- [ ] Error tracking (Sentry 등)

## Stage 3 완료 요약

### 구현된 것
- 기술 스택: Next.js + Supabase + Tailwind
- 화면 수: {N}개
- API 엔드포인트: {N}개
- 핵심 기능: {기능 목록}

### 코드 위치
```
{project-path}/
├── src/
│   ├── app/         # 페이지
│   ├── components/  # 컴포넌트
│   ├── lib/         # 유틸리티
│   └── ...
└── ...
```

## 다음 단계

Stage 4: 배포를 진행합니다.

```
/deploy  # Stage 4 시작 (예정)
```
```

## 완료 조건

- 빌드 성공
- 환경변수 정리 완료
- 불필요한 코드/파일 정리
- 런칭 전 체크리스트 확인
- `build-config.md` 파일이 생성됨

## Stage 3 완료

Build Ready가 완료되면 Stage 3가 종료됩니다.
다음 Stage는 **Stage 4: Deployment (배포)**입니다.
