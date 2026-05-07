# AI 기반 제품 개발 워크플로우

[English](README.en.md) | 한국어

1인 창업자를 위한 End-to-End AI 지원 제품 개발 플랫폼입니다. 아이디어 구체화부터 유저 획득까지 전 과정을 Claude Code 플러그인으로 안내합니다.

```
아이디어 → 사업전략 → 기획 → 디자인 → 개발 → 배포 → 유저 획득
(Stage 0)  (Stage 1) (Stage 2) (Stage 3) (Stage 4) (Stage 5) (Stage 6)
```

## 설치

```bash
claude plugin marketplace add https://github.com/bbangjooo/agent-workflow.git
```

## 빠른 시작

```bash
# 전체 자동 실행 (Stage 0~6 순차 진행, 중단/재개 가능)
/build-project

# 단계별 실행
/ideate → /monetize → /plan → /design → /develop → /deploy → /grow
```

## 플러그인

### 메인 파이프라인

| Stage | 명령어 | 역할 | 주요 산출물 |
|-------|--------|------|-----------|
| 0 | `/ideate` | 아이디어를 구체적인 제품 컨셉으로 발전시킵니다 | `idea-brief.md` |
| 1 | `/monetize` | 수익 모델, 가격 전략, 비즈니스 모델을 설계합니다 | `business-model.md` |
| 2 | `/plan` | 비즈니스 모델을 반영한 PRD(기획서)를 작성합니다 | `prd.md` |
| 3 | `/design` | 개발자가 바로 구현할 수 있는 디자인 스펙을 생성합니다 | `design-spec.md`, `design-tokens.md` |
| 4 | `/develop` | 디자인 스펙 기반으로 MVP 코드를 구현합니다 | 프로젝트 코드 |
| 5 | `/deploy` | 무료 호스팅에 자동 배포합니다 | 라이브 URL |
| 6 | `/grow` | 프로젝트 산출물을 분석하여 맞춤 유저 획득 전략을 수립합니다 | `acquisition-plan.md` |

### 홍보 콘텐츠 생성

`/grow`로 전략을 수립한 후, `/promote`로 각 채널에 바로 올릴 수 있는 콘텐츠를 생성합니다.

```bash
/promote                  # 전체 채널 콘텐츠 일괄 생성
/promote product-hunt     # Product Hunt 타이틀, 설명, 메이커코멘트
/promote show-hn          # Hacker News Show HN 포스트
/promote reddit           # 서브레딧별 맞춤 포스트
/promote twitter          # 런칭 스레드 + 개별 트윗
/promote disquiet         # 디스콰이엇 제품 페이지 + 런칭 포스트
/promote naver-blog       # 네이버 블로그 SEO 포스트
/promote press-release    # 보도자료 (한글/영문) + 기자 피칭 이메일
/promote email-sequence   # 웨이트리스트 활성화 + 온보딩 이메일
/promote landing-copy     # 랜딩 페이지 전체 섹션 카피
/promote community        # IndieHackers, Dev.to, GeekNews, OKKY, Velog
```

### 피드백 & 이터레이션

| 명령어 | 역할 |
|--------|------|
| `/reflect` | 각 Stage 완료 후 회고 — 학습점과 개선점 수집 |
| `/decide` | 중요 의사결정 기록 및 추적 |
| `/review` | Stage 간 산출물 정합성 검토 |
| `/iterate {stage}` | 이전 Stage로 돌아가 개선 (예: `/iterate planning`) |
| `/next-version` | 현재 버전 완료 후 새 버전(v2) 시작 |
| `/new-product` | 완전히 새로운 제품 시작 |

### 목표 & 로드맵

| 명령어 | 역할 |
|--------|------|
| `/roadmap` | 프로젝트 목표 정의 및 ROADMAP 생성 |
| `/where` | 현재 진행 상황 추적 |
| `/align` | 목표 정렬 검증 |
| `/next` | 목표 + 진행도 + 다음 액션 통합 확인 |

### 장기 프로젝트 가이던스

여러 세션에 걸친 프로젝트를 *비관적으로* 운영합니다. status 로그와 methodology pipeline 두 문서를 짝으로 유지하며, 매 사이클 두 개의 게이트를 통과해야 닫힙니다.

| 명령어 | 역할 |
|--------|------|
| `/progress-guidance` | status + pipeline 페어 문서 운영. **critic 게이트** (질문 생성 → 답변 → 검증)로 "옳은 걸 측정했나"를 묻고, **auditor 게이트** (Schema/Reproducibility/Drift/Linguistic 4 패스)로 "쓴 게 정직한가"를 검증. 모든 진행 주장에 *증거·시스템 영향·종착지 델타* 강제, 매 사이클 종착지 시스템 모양을 재투영해 다음 사이클에 재주입 |

### 보조 도구

| 명령어 | 역할 |
|--------|------|
| `/build-project` | Stage 0~6 자동 순차 실행 (중단/재개 가능) |
| `/debug` | 개발/배포 중 오류 체계적 해결 |
| `/check-ui-spec` | UI가 디자인 스펙과 일치하는지 검증 |
| `/goal` | 프로젝트 목표 상태 대시보드 |

## 사용 예시

### 새 프로젝트 시작

```bash
/build-project
# → "어떤 제품을 만들고 싶으신가요?" 질문 후 Stage 0부터 순차 진행
```

### 사업 전략부터 시작

```bash
/monetize
# → 수익 모델 분석, 가격 전략, 단위 경제학, 결제 인프라, 비즈니스 모델 캔버스
# → business-model.md 생성 → /plan에서 PRD에 과금 기능 자동 반영
```

### 디자인만 진행

```bash
/design
# → 플랫폼 선택 → 기획분석 → 레퍼런스 분석 → 와이어프레임(구조 확정)
#   → 디자인 토큰(톤 정리) → 컴포넌트 → 명세서 → 애니메이션 → 프로토타입
```

### 유저 획득 전략

```bash
/grow
# → 이전 산출물(아이디어, 비즈니스 모델, PRD) 자동 분석
# → 프로젝트 맞춤 타겟 시장, 런칭 플랜, 그로스 채널, 12주 로드맵 생성

/promote product-hunt
# → Product Hunt 타이틀 3시안, 설명, 메이커코멘트, 런칭 체크리스트 생성
```

### 피드백 루프

```bash
/reflect            # Stage 완료 후 회고
/iterate design     # 디자인 단계로 돌아가 개선
/next-version       # v2 시작
```

## 프로젝트 구조

```
plugins/
├── ideation/              # Stage 0: 아이디어 고도화
├── monetization/          # Stage 1: 사업 전략 & 수익 모델
├── planning/              # Stage 2: 기획
├── design/                # Stage 3: 디자인
├── development/           # Stage 4: 개발
├── deployment/            # Stage 5: 배포
├── growth/                # Stage 6: 유저 획득 + 채널 콘텐츠
├── orchestrator/          # 전체 파이프라인 관리
├── feedback/              # 피드백 & 회고
├── iteration/             # 이터레이션 관리
├── roadmap/               # 목표 & 로드맵
├── progress-guidance/     # 장기 프로젝트 status + pipeline 페어 문서 + critic/auditor 게이트
├── debugging/             # 디버깅
└── workflow-state-manager/ # 상태 관리
```

## 라이선스

MIT License
