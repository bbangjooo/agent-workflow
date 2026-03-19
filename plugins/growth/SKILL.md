# Stage 5: User Acquisition (초기 유저 획득)

1인 창업자를 위한 초기 유저 획득 전략 수립 워크플로우 플러그인입니다. 타겟 시장(국내/글로벌)에 따라 최적화된 채널 전략을 생성합니다.

## 개요

이 플러그인은 제품을 배포한 후 실제 유저를 확보하기 위한 전략을 수립합니다. 프리런칭부터 런칭, 포스트런칭까지 12주 실행 로드맵을 포함한 종합 유저 획득 계획을 만듭니다.

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

## 의존성

- `ideation` 플러그인 (idea-brief.md 참조)
- `planning` 플러그인 (prd.md 참조)
- `deployment` 플러그인 (deployment-complete.md 참조)
