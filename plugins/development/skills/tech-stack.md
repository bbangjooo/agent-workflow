# Tech Stack Selection

Step 3.2: 기술 스택 선택 (Tech Stack Selection)

> **역할: Full-stack**
> Frontend 프레임워크, Backend/DB, 인프라 전체 기술 선택

## 설명

프로젝트에 사용할 기술 스택을 선택하는 스킬입니다. 1인 창업자의 경험 수준과 프로젝트 요구사항에 맞는 최적의 스택을 결정합니다.

## 트리거

- `/develop` 커맨드 실행 시 첫 번째로 실행
- `outputs/stage-2/design-spec.md` 파일이 존재할 때

## 입력

- `outputs/stage-2/design-spec.md`
- `outputs/stage-1/prd.md`
- `outputs/stage-1/feature-priority.md`

## 실행 내용

### 사전 분석

1. PRD에서 핵심 기능 요구사항 추출
2. 필요한 기술적 기능 파악 (인증, 결제, 실시간 등)
3. 사용자 경험 수준 파악

### 질문 가이드

1. **개발 경험**
   - "코딩 경험이 어느 정도 있으세요?"
   - "이전에 사용해본 프레임워크가 있나요?"

2. **선호도**
   - "특별히 배우고 싶거나 사용하고 싶은 기술이 있나요?"
   - "TypeScript에 익숙하신가요?"

3. **요구사항 기반**
   - "실시간 기능(채팅, 알림)이 필요한가요?"
   - "결제 기능이 필요한가요?"
   - "이미지/파일 업로드가 필요한가요?"

### 추천 스택 조합

| 조합 | 대상 | 특징 |
|------|------|------|
| **Next.js + Supabase** | 초보~중급 | 빠른 개발, 무료 티어 넉넉, 인증 내장 |
| **Next.js + Firebase** | 초보~중급 | 실시간 DB, 간편한 인증, 구글 생태계 |
| **Next.js + Prisma + PostgreSQL** | 중급~고급 | 유연한 DB, 타입 안정성 |
| **React + Express + MongoDB** | 중급 | 분리된 구조, 유연성 |

### 1인 창업자 추천 (기본값)

```
프레임워크: Next.js 14 (App Router)
- 이유: 풀스택, SEO 좋음, 배포 쉬움

스타일링: Tailwind CSS
- 이유: 빠른 개발, 일관성, 디자인 시스템 연동 용이

UI 라이브러리: shadcn/ui
- 이유: 복사해서 쓰는 방식, 커스터마이징 쉬움

데이터베이스: Supabase
- 이유: PostgreSQL 기반, 무료 티어 넉넉, 인증 내장

호스팅: Vercel
- 이유: Next.js 최적화, 무료 티어, 쉬운 배포
```

### 기능별 추가 기술

| 기능 | 추천 기술 |
|------|----------|
| 인증 | Supabase Auth / NextAuth.js |
| 결제 | Stripe / 토스페이먼츠 |
| 이메일 | Resend / SendGrid |
| 파일 업로드 | Supabase Storage / Cloudinary |
| 실시간 | Supabase Realtime / Pusher |
| 분석 | Vercel Analytics / Mixpanel |

### 대화 원칙

- 복잡한 선택지보다 검증된 조합 추천
- 사용자 경험 수준에 맞게 조정
- "이 조합이면 MVP 만들기 충분해요" 안심
- 레퍼런스 문서 안내 (references/tech-stacks/)

## 산출물

`outputs/stage-3/tech-stack.md`

```markdown
# Tech Stack

## 메타데이터
- Stage: 3
- Step: 3.2 - 기술 스택 선택
- 생성일시: {현재 시간}
- 상태: final

## 선택된 스택

### 프레임워크
| 영역 | 기술 | 버전 | 선택 이유 |
|------|------|------|----------|
| Framework | Next.js | 14.x | App Router, 풀스택 |
| Language | TypeScript | 5.x | 타입 안정성 |
| Styling | Tailwind CSS | 3.x | 빠른 개발 |
| UI | shadcn/ui | latest | 커스터마이징 용이 |

### 백엔드/데이터베이스
| 영역 | 기술 | 선택 이유 |
|------|------|----------|
| Database | Supabase (PostgreSQL) | 무료 티어, 인증 내장 |
| ORM | Prisma (optional) | 타입 안정성 |
| Auth | Supabase Auth | 간편한 소셜 로그인 |

### 인프라
| 영역 | 기술 | 선택 이유 |
|------|------|----------|
| Hosting | Vercel | Next.js 최적화 |
| Storage | Supabase Storage | 통합 솔루션 |
| Domain | (사용자 선택) | - |

### 추가 서비스
| 기능 | 기술 | 필요 여부 |
|------|------|----------|
| 결제 | {선택} | {예/아니오} |
| 이메일 | {선택} | {예/아니오} |
| 분석 | {선택} | {예/아니오} |

## 환경 구성

### 필요한 계정
- [ ] GitHub 계정
- [ ] Vercel 계정
- [ ] Supabase 계정
- [ ] (기타 필요 서비스)

### 로컬 개발 환경
- Node.js 18+
- npm 또는 pnpm
- Git
- VS Code + Cursor (권장)

## 예상 비용 (월)

| 서비스 | 무료 티어 | 유료 시작 |
|--------|----------|----------|
| Vercel | 100GB 대역폭 | $20/월 |
| Supabase | 500MB DB, 2GB Storage | $25/월 |
| 도메인 | - | $10-15/년 |
| **합계** | **$0** | **~$45/월** |

## 레퍼런스

- 상세 가이드: `references/tech-stacks/nextjs-supabase.md`
- 폴더 구조: `references/templates/folder-structures.md`

## 다음 단계

선택한 스택으로 프로젝트를 초기화합니다.
```

## 완료 조건

- 프레임워크 선택 완료
- 데이터베이스 선택 완료
- 호스팅 선택 완료
- 추가 서비스 결정 완료
- `tech-stack.md` 파일이 생성됨

## 다음 Step

→ Step 3.3: Project Setup (프로젝트 초기화)
