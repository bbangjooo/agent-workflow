# Stage 6: User Acquisition (초기 유저 획득)

1인 창업자를 위한 초기 유저 획득 전략 수립 워크플로우 플러그인입니다. **프로젝트의 기획(아이디어, 비즈니스 모델, PRD, 디자인)을 심층 분석하여 맞춤 전략을 생성합니다.**

## 개요

이 플러그인은 이전 Stage의 모든 산출물을 분석하여, 해당 제품에 최적화된 유저 획득 전략을 수립합니다. 일반적인 그로스 체크리스트가 아니라, **"이 제품이기 때문에 통하는 전략"**을 만듭니다.

> 핵심: 수익 모델이 프리미엄이면 PLG 중심, 협업 도구면 팀 초대 바이럴, 콘텐츠 생성 도구면 산출물 공유 바이럴 — 제품 특성이 그로스 전략을 결정한다.

## 사용 방법

```
/grow
```

이 커맨드 하나로 Growth Coach 에이전트가 전체 워크플로우를 안내합니다.

## 워크플로우

```
/grow 실행
    ↓
Growth Coach 에이전트가 대화 주도
    ↓
┌─────────────────────────────────────────────────────────────┐
│  Step 5.1: Market Targeting (타겟 시장 분석)                  │
│  스킬: market-targeting                                      │
│  산출물: market-analysis.md                                  │
├─────────────────────────────────────────────────────────────┤
│                           ↓                                 │
├─────────────────────────────────────────────────────────────┤
│  Step 5.2: Pre-launch Strategy (프리런칭 전략)                │
│  스킬: pre-launch-strategy                                   │
│  산출물: pre-launch-strategy.md                              │
├─────────────────────────────────────────────────────────────┤
│                           ↓                                 │
├─────────────────────────────────────────────────────────────┤
│  Step 5.3: Launch Plan (런칭 플랜)                            │
│  스킬: launch-plan                                           │
│  산출물: launch-plan.md                                      │
├─────────────────────────────────────────────────────────────┤
│                           ↓                                 │
├─────────────────────────────────────────────────────────────┤
│  Step 5.4: Growth Channels (그로스 채널 설계)                  │
│  스킬: growth-channels                                       │
│  산출물: growth-channels.md                                  │
├─────────────────────────────────────────────────────────────┤
│                           ↓                                 │
├─────────────────────────────────────────────────────────────┤
│  Step 5.5: Execution Roadmap (실행 로드맵)                    │
│  스킬: execution-roadmap                                     │
│  산출물: acquisition-plan.md (최종)                           │
└─────────────────────────────────────────────────────────────┘
```

## 주요 컴포넌트

### Command

- **/grow**: 유저 획득 전략 수립 시작

### Agent

- **Growth Coach**: 유저 획득 전략 수립을 안내하는 코치 에이전트

### Skills

| 스킬 | 설명 |
|------|------|
| market-targeting | 타겟 시장 분석 및 유저 페르소나 정의 |
| pre-launch-strategy | 프리런칭 전략 수립 (웨이트리스트, 커뮤니티, SEO) |
| launch-plan | 런칭 주간 상세 실행 계획 |
| growth-channels | 그로스 채널 및 PLG 설계 |
| execution-roadmap | 12주 실행 로드맵 및 KPI 정의 |

## 국내 vs 글로벌 채널 레퍼런스

| 영역 | 국내 (한국) | 글로벌 |
|------|------------|--------|
| 검색 SEO | 네이버 (점유율 58%) — 블로그/카페 우선 | Google SEO |
| 메시징 | 카카오톡 채널, 오픈채팅 (94.7% 사용) | 이메일 마케팅 중심 |
| 런칭 플랫폼 | 디스콰이엇 | Product Hunt, Show HN |
| 커뮤니티 | 네이버 카페, GeekNews, OKKY, Velog, 블라인드 | Reddit, IndieHackers, Dev.to, HN |
| 광고 | 네이버 광고, 카카오 비즈보드 | Google Ads, Meta Ads, Apple Search Ads |
| 언론 | 벤처스퀘어, 플래텀, 아웃스탠딩 | TechCrunch, The Verge, Wired |
| 인플루언서 | 유튜버, 네이버 블로거 | YouTube, TikTok, X 크리에이터 |
| 정부 지원 | TIPS (최대 8억), 초기창업패키지 (1.5억) | 해당 없음 |
| 이벤트 | COMEUP, Startup Grind Seoul | TechCrunch Disrupt, Web Summit |

## 산출물

모든 산출물은 `outputs/stage-5/`에 저장됩니다:

| 파일 | 설명 |
|------|------|
| `market-analysis.md` | 타겟 시장 분석 및 유저 페르소나 |
| `pre-launch-strategy.md` | 프리런칭 전략 |
| `launch-plan.md` | 런칭 주간 실행 계획 |
| `growth-channels.md` | 그로스 채널 설계 |
| `acquisition-plan.md` | **최종 종합 유저 획득 전략** |

## `/promote` 리서치 체인

글을 작성하기 전, 4단계 리서치를 순차 실행하여 데이터 기반으로 콘텐츠를 생성합니다.

```
/promote 실행
    ↓
[R-1] copy-research      → 경쟁사 카피 패턴 수집
    ↓
[R-2] channel-research   → 채널별 규칙/인기글/셀프프로모 정책
    ↓
[R-3] audience-language   → 유저 실제 표현/검색어/금지 용어
    ↓
[R-4] timing-research    → 최적 타이밍/업계 일정/경쟁사 충돌
    ↓
[콘텐츠 생성] write-* 스킬들 (리서치 4개 참조)
    ↓
[아웃리치] write-outreach (타겟 인물 DM/이메일)
```

| 리서치 | 스킬 | 산출물 |
|--------|------|--------|
| 경쟁사 카피 | copy-research | `outputs/promotion/copy-research.md` |
| 채널 트렌드 & 규칙 | channel-research | `outputs/promotion/channel-research.md` |
| 유저 언어 | audience-language-research | `outputs/promotion/audience-language.md` |
| 타이밍 | timing-research | `outputs/promotion/timing-research.md` |

## 채널별 실행 스킬 (`/promote`)

전략 수립 후 실제 포스팅/홍보 콘텐츠를 생성하는 실행 스킬입니다.

```
/promote                — 전체 채널 콘텐츠 일괄 생성
/promote product-hunt   — Product Hunt 런칭 콘텐츠
/promote show-hn        — Hacker News Show HN 포스트
/promote reddit         — Reddit 서브레딧별 포스트
/promote twitter        — Twitter/X 런칭 스레드
/promote meta           — Meta (Facebook/Instagram) 콘텐츠
/promote disquiet       — 디스콰이엇 런칭 콘텐츠
/promote naver-blog     — 네이버 블로그 SEO 포스트
/promote press-release  — 보도자료 (국내/글로벌)
/promote email-sequence — 이메일 시퀀스
/promote landing-copy   — 랜딩 페이지 카피
/promote linkedin       — LinkedIn 런칭 포스트 & 시리즈
/promote community      — 커뮤니티 포스트
```

| 스킬 | 채널 | 산출물 |
|------|------|--------|
| write-product-hunt | Product Hunt | 타이틀, 설명, 메이커 코멘트, 런칭 체크리스트 |
| write-show-hn | Hacker News | Show HN 포스트, FAQ 대응 |
| write-reddit | Reddit | 서브레딧별 맞춤 포스트 3개+ |
| write-twitter | Twitter/X | 런칭 스레드 (7-10트윗), 개별 트윗 5개 |
| write-meta | Meta (Facebook/Instagram) | FB 포스트 3종, IG 캐러셀/릴스/스토리, 광고 카피 |
| write-disquiet | 디스콰이엇 | 제품 페이지, 런칭 포스트 |
| write-naver-blog | 네이버 블로그 | SEO 포스트 + 시리즈 4편 계획 |
| write-press-release | 언론 | 보도자료 (KR/EN), 기자 피칭 이메일 |
| write-email-sequence | 이메일 | 웨이트리스트 3통 + 온보딩 5통 |
| write-landing-copy | 랜딩 페이지 | 전체 섹션 카피 + SEO 메타 |
| write-linkedin | LinkedIn | 런칭 포스트 3종, Thought Leadership 시리즈, 카루셀 |
| write-community | 커뮤니티 | IndieHackers, Dev.to, GeekNews, OKKY, Velog |
| write-outreach | 아웃리치 | 타겟 인물 이메일, LinkedIn DM, Twitter DM |

모든 산출물은 `outputs/promotion/{channel}/`에 저장되며, 바로 복붙해서 올릴 수 있는 형태로 생성됩니다.

## 의존성

- `ideation` 플러그인 (idea-brief.md 참조)
- `planning` 플러그인 (prd.md 참조)
- `deployment` 플러그인 (deployment-complete.md 참조)
