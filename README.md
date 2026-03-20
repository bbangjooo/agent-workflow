# AI 기반 제품 개발 워크플로우

1인 창업자를 위한 End-to-End AI 지원 제품 개발 플랫폼입니다. 아이디어 구체화부터 유저 획득까지 전 과정을 Claude Code 플러그인을 통해 단계별로 안내하며, **목표 기반 이터레이션**을 통해 제품을 지속적으로 발전시킬 수 있습니다.

```
아이디어 → 사업전략 → 기획 → 디자인 → 개발 → 배포 → 유저 획득
(Stage 0)  (Stage 1)  (Stage 2) (Stage 3) (Stage 4) (Stage 5) (Stage 6)
                                                         ↓
                                                    피드백/회고
                                                         ↓
                                                    이터레이션
```

## 설치 방법

Claude Code에서 다음 명령어를 실행합니다:

```bash
claude plugin marketplace add https://github.com/bbangjooo/agent-workflow.git
```

## 전체 파이프라인 (7단계)

### Stage 0~6: 아이디어에서 유저 획득까지

| Stage | 명령어 | 플러그인 | 설명 |
|-------|--------|----------|------|
| 0 | `/ideate` | ideation | 막연한 아이디어를 구체적인 제품 컨셉으로 발전 |
| 1 | `/monetize` | monetization | 수익 모델 설계, 가격 전략, 비즈니스 모델 캔버스 |
| 2 | `/plan` | planning | 아이디어 + 비즈니스 모델을 PRD(기획서)로 변환 |
| 3 | `/design` | design | 개발자가 바로 구현 가능한 디자인 스펙 생성 |
| 4 | `/develop` | development | 디자인 스펙 기반 MVP 코드 구현 |
| 5 | `/deploy` | deployment | 무료 호스팅에 자동 배포 |
| 6 | `/grow` | growth | 프로젝트 맞춤 유저 획득 전략 수립 |

### 원커맨드 실행

```
/build-project
```

오케스트레이터가 Stage 0~6을 자동으로 순차 실행합니다. 중간에 끊겨도 이어서 진행 가능합니다.

---

## 신규 플러그인

### Monetization (Stage 1) — 사업 전략 & 수익 모델

아이디어 검증 후, 기획 전에 비즈니스 모델을 수립합니다. 여기서 결정된 수익 모델이 PRD에 반영되어 결제/과금 기능이 처음부터 설계에 포함됩니다.

```
/monetize
```

**5단계 워크플로우:**

| Step | 이름 | 설명 |
|------|------|------|
| 1.1 | Revenue Model Analysis | 제품에 적합한 수익 모델 분석 (구독/프리미엄/사용량/거래수수료 등) |
| 1.2 | Pricing Strategy | 가격 전략 및 티어 설계 (심리적 가격, Free Trial vs Freemium) |
| 1.3 | Unit Economics | LTV, CAC, 이탈률, 마진 목표 설정 |
| 1.4 | Payment Infrastructure | 결제 인프라 계획 (국내: 토스페이먼츠/포트원, 글로벌: Stripe/Paddle) |
| 1.5 | Business Model Canvas | 최종 비즈니스 모델 + Planning 연계 항목 (PRD에 반영할 기능 체크리스트) |

**레퍼런스 포함** (`references/monetization-strategies.md`):
- 9개 프레임워크 (Monetization Zoo, ProfitWell, WTP, BMC, Lean Canvas, JTBD, AARRR, Mom Test)
- 12개 케이스 스터디 (Notion, Slack, Superhuman, Calendly, 토스, 당근마켓, 리멤버, 배민 등)
- 14권 추천 도서, SaaS 벤치마크, 가격 심리학, 도구 목록

---

### Growth (Stage 6) — 유저 획득 전략 + 채널별 콘텐츠 생성

프로젝트의 모든 산출물(아이디어, 비즈니스 모델, PRD, 디자인)을 심층 분석하여 **맞춤 유저 획득 전략**을 수립합니다.

```
/grow      # 맞춤 전략 수립
/promote   # 채널별 홍보 콘텐츠 생성
```

**전략 수립 (5단계):**

| Step | 이름 | 맞춤화 포인트 |
|------|------|-------------|
| 6.1 | Market Targeting | idea-brief 타겟 → 페르소나 자동 생성, 수익 모델 → 유료/무료 유저 분리 |
| 6.2 | Pre-launch Strategy | 핵심 기능 → 랜딩페이지 카피 초안, 프리미엄 경계 → 웨이트리스트 보상 |
| 6.3 | Launch Plan | 차별점 → PH 타이틀/HN 스토리 프레이밍, 타겟 유저 → 서브레딧 자동 추천 |
| 6.4 | Growth Channels | 수익 모델 → PLG 자동 연동, 기능 분석 → 바이럴 루프 식별 |
| 6.5 | Execution Roadmap | 단위경제학 → KPI 목표 역산, 채널별 CAC 한도 자동 계산 |

**프로젝트 특성 → 전략 자동 매핑:**

| 제품 특성 | 전략 방향 |
|----------|----------|
| 프리미엄 모델 | PLG — 무료 가치로 획득, 유료로 전환 |
| 협업 도구 | 팀 초대 = 바이럴 (Slack/Notion 패턴) |
| 콘텐츠 생성 도구 | 산출물 공유 = 바이럴 (Canva/Loom 패턴) |
| 개발자 도구 | Show HN + GitHub + 오픈소스 |
| 한글 전용 서비스 | 네이버 블로그 + 카카오톡 + 디스콰이엇 |
| 영문/글로벌 서비스 | Product Hunt + HN + Reddit + Twitter/X |

**채널별 콘텐츠 생성 (`/promote`):**

바로 복붙해서 올릴 수 있는 홍보 콘텐츠를 채널별로 생성합니다.

```
/promote product-hunt   → 타이틀 3시안, 설명, 메이커코멘트, 런칭 체크리스트
/promote show-hn        → Show HN 포스트 + FAQ 대응
/promote reddit         → 서브레딧별 맞춤 포스트 3개+
/promote twitter        → 런칭 스레드 7-10트윗 + 개별 트윗 5개
/promote disquiet       → 제품 페이지 + 런칭 메이커로그 (한글)
/promote naver-blog     → SEO 포스트 1,500자+ / 시리즈 4편 계획
/promote press-release  → 보도자료 KR/EN + 기자 피칭 이메일
/promote email-sequence → 웨이트리스트 3통 + 온보딩 5통
/promote landing-copy   → 랜딩 전체 8섹션 카피 + SEO 메타태그
/promote community      → IndieHackers, Dev.to, GeekNews, OKKY, Velog
```

---

## 개선된 플러그인

### Design (Stage 3) — 실제 디자이너 워크플로우 기반 재설계

실제 디자이너의 작업 순서를 반영하여 재구성했습니다: **기획분석 → 레퍼런스 → 구조(와이어프레임) → 톤(토큰) → 컴포넌트**

```
/design
```

**9단계 워크플로우:**

| Step | 이름 | 핵심 |
|------|------|------|
| 2.0 | Platform Selection | Web / Mobile / Both 선택 |
| 2.1 | Screen Analysis ★ | 화면별 목적, 유저 상황, 정보 위계 분석 |
| 2.2 | Reference Analysis | 실제 서비스 패턴/UX/컴포넌트 분석 + 비주얼 방향성 |
| 2.3 | Wireframes ★순서UP | **구조를 먼저 확정** (Desktop + Mobile Web 두 뷰포트 필수) |
| 2.4 | Design Tokens ★통합 | 확정 구조 위에 톤 (3단계 토큰 + WCAG 접근성 검증 + globals.css) |
| 2.5 | Component Spec | 공통 컴포넌트 우선 — 테마→컴포넌트→페이지 순서 |
| 2.6 | Design Spec | 최종 디자인 핸드오프 문서 |
| 2.7 | Animation Spec ★ | Framer Motion/GSAP 마이크로인터랙션 |
| 2.8 | Pen Prototype | Pencil MCP로 .pen 시각적 프로토타입 |

**핵심 개선:**

- **구조 먼저, 톤 나중에**: 와이어프레임 확정 후 색상/폰트 결정 (벽지보다 설계도 먼저)
- **3단계 디자인 토큰**: Base Token → Semantic Token → Component Token (Toss TDS, Adobe Spectrum 참고)
- **시맨틱 컬러 네이밍**: `Gray-900` 대신 `text-default` — 용도 기반 이름
- **WCAG 접근성 필수 검증**: 텍스트 색상 명암비 AA 4.5:1 기준 자동 체크
- **Web = Desktop + Mobile Web 필수**: 반응형 메모가 아닌 두 뷰포트 각각 와이어프레임
- **애니메이션 스펙 추가**: 정적 디자인에 생동감을 더하는 마지막 터치

**설계 철학:**

> "AI가 디자인을 못하는 게 아니라, 우리가 AI에게 너무 많은 결정을 위임했다."
> AI = 주니어 디자이너. 레퍼런스와 구체적 수치(CSS 토큰)를 주면 결과물이 달라진다.

---

### Orchestrator — 7단계 파이프라인

오케스트레이터가 기존 5단계에서 7단계로 확장되었습니다.

```
Stage 0: Ideation        → /ideate    → 아이디어 구체화
Stage 1: Monetization     → /monetize  → 수익 모델 & 비즈니스 전략 ★ NEW
Stage 2: Planning         → /plan      → PRD 작성 (수익 모델 반영)
Stage 3: Design           → /design    → 디자인 명세
Stage 4: Development      → /develop   → 코드 구현
Stage 5: Deployment       → /deploy    → 배포
Stage 6: User Acquisition → /grow      → 유저 획득 전략 ★ NEW
```

---

## 기존 플러그인

### 피드백 & 이터레이션

| 명령어 | 플러그인 | 설명 |
|--------|----------|------|
| `/reflect` | feedback | 각 Stage 완료 후 회고 — 학습점과 개선점 수집 |
| `/decide` | feedback | 중요 의사결정 기록 및 추적 |
| `/review` | feedback | Stage 간 산출물 정합성 검토 |
| `/iterate {stage}` | iteration | 이전 Stage로 돌아가 개선 |
| `/next-version` | iteration | 현재 버전 완료 후 새 버전(v2) 시작 |
| `/new-product` | iteration | 완전히 새로운 제품 시작 |

### 목표 & 로드맵

| 명령어 | 플러그인 | 설명 |
|--------|----------|------|
| `/roadmap` | roadmap | 프로젝트 목표 정의 및 ROADMAP 생성 |
| `/where` | roadmap | 현재 진행 상황 추적 (코드/커밋/산출물 기반) |
| `/align` | roadmap | 목표 정렬 양방향 검증 |
| `/next` | roadmap | 목표 + 진행도 + 다음 액션 통합 확인 |

### 보조 도구

| 명령어 | 플러그인 | 설명 |
|--------|----------|------|
| `/build-project` | orchestrator | 모든 단계를 자동으로 연결하여 실행 |
| `/debug` | debugging | 개발/배포 중 오류 체계적 해결 |
| `/check-ui-spec` | debugging | UI가 디자인 스펙과 일치하는지 검증 |
| `/goal` | feedback | 프로젝트 목표 상태 대시보드 |
| `/workflow-status` | workflow-state-manager | 현재 진행 상황 확인 |

## 빠른 시작

**전체 자동 실행**:
```
/build-project
```

**단계별 실행**:
```
/ideate → /monetize → /plan → /design → /develop → /deploy → /grow
```

**유저 획득 콘텐츠 생성**:
```
/promote              # 전체 채널 콘텐츠 일괄 생성
/promote product-hunt  # Product Hunt 런칭 콘텐츠만
```

**피드백 루프 활용**:
```
/reflect          # 완료된 Stage 회고
/iterate planning # 기획 단계로 돌아가 개선
/next-version     # v2 시작
```

## 프로젝트 구조

```
plugins/
├── ideation/          # Stage 0: 아이디어 고도화
├── monetization/      # Stage 1: 사업 전략 & 수익 모델 ★ NEW
│   ├── commands/monetize.md
│   ├── agents/monetization-coach.md
│   ├── skills/        # 5개 스킬
│   └── references/    # 100+ 소스 레퍼런스
├── planning/          # Stage 2: 기획
├── design/            # Stage 3: 디자인 (재설계됨) ★ IMPROVED
│   ├── commands/design.md
│   ├── agents/design-coach.md
│   ├── skills/        # 11개 스킬 (screen-analysis, design-tokens, animation-spec 추가)
│   └── references/    # UI 라이브러리, 아이콘, 모바일, 랜딩 가이드
├── development/       # Stage 4: 개발
├── deployment/        # Stage 5: 배포
├── growth/            # Stage 6: 유저 획득 ★ NEW
│   ├── commands/grow.md, promote.md
│   ├── agents/growth-coach.md
│   └── skills/        # 15개 스킬 (전략 5 + 채널 콘텐츠 10)
├── orchestrator/      # 전체 파이프라인 관리 (7단계)
├── feedback/          # 피드백 & 회고
├── iteration/         # 이터레이션 관리
├── roadmap/           # 목표 & 로드맵
├── debugging/         # 디버깅
└── workflow-state-manager/  # 상태 관리
```

## 라이선스

MIT License
