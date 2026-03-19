# Stage 1: Monetization (사업 전략 / 수익 모델)

1인 창업자를 위한 사업 전략 및 수익 모델 설계 워크플로우 플러그인입니다. 아이디어를 기반으로 이윤 창출 방법론을 연구하고 비즈니스 모델을 수립합니다.

## 개요

이 플러그인은 아이디어 검증(Stage 0) 이후, 기획(Planning) 이전에 실행됩니다. 여기서 수립한 수익 모델과 가격 전략이 PRD에 반영되어, 과금 기능/결제 화면/프리미엄 경계 등이 처음부터 설계에 포함됩니다.

## 사용 방법

```
/monetize
```

이 커맨드 하나로 Monetization Coach 에이전트가 전체 워크플로우를 안내합니다.

## 워크플로우

```
/monetize 실행
    ↓
Monetization Coach 에이전트가 대화 주도
    ↓
┌─────────────────────────────────────────────────────────────┐
│  Step 1.1: Revenue Model Analysis (수익 모델 분석)            │
│  스킬: revenue-model-analysis                                │
│  산출물: revenue-model.md                                    │
├─────────────────────────────────────────────────────────────┤
│                           ↓                                 │
├─────────────────────────────────────────────────────────────┤
│  Step 1.2: Pricing Strategy (가격 전략)                       │
│  스킬: pricing-strategy                                      │
│  산출물: pricing-strategy.md                                 │
├─────────────────────────────────────────────────────────────┤
│                           ↓                                 │
├─────────────────────────────────────────────────────────────┤
│  Step 1.3: Unit Economics (단위 경제학)                       │
│  스킬: unit-economics                                        │
│  산출물: unit-economics.md                                   │
├─────────────────────────────────────────────────────────────┤
│                           ↓                                 │
├─────────────────────────────────────────────────────────────┤
│  Step 1.4: Payment Infrastructure (결제 인프라)               │
│  스킬: payment-infrastructure                                │
│  산출물: payment-plan.md                                     │
├─────────────────────────────────────────────────────────────┤
│                           ↓                                 │
├─────────────────────────────────────────────────────────────┤
│  Step 1.5: Business Model Canvas (비즈니스 모델 캔버스)        │
│  스킬: business-model-canvas                                 │
│  산출물: business-model.md (최종)                             │
└─────────────────────────────────────────────────────────────┘
```

## 주요 컴포넌트

### Command

- **/monetize**: 사업 전략 수립 시작

### Agent

- **Monetization Coach**: 수익 모델 설계를 안내하는 코치 에이전트

### Skills

| 스킬 | 설명 |
|------|------|
| revenue-model-analysis | 제품에 적합한 수익 모델 분석 및 선택 |
| pricing-strategy | 가격 전략 및 티어 설계 |
| unit-economics | 단위 경제학 설계 (LTV, CAC, 마진) |
| payment-infrastructure | 결제 시스템 및 인프라 계획 |
| business-model-canvas | 최종 비즈니스 모델 캔버스 |

## 수익 모델 레퍼런스

| 모델 | 적합한 제품 | 예시 |
|------|------------|------|
| 구독 (SaaS) | B2B 도구, 생산성 앱 | Notion, Slack |
| 프리미엄 | 네트워크 효과 제품, 개인 도구 | Spotify, Dropbox |
| 사용량 기반 | API, 클라우드, AI 서비스 | AWS, OpenAI |
| 거래 수수료 | 마켓플레이스, 중개 플랫폼 | 배달의민족, Airbnb |
| 일회성 구매 | 유틸리티 앱, 디지털 콘텐츠 | Sketch, 게임 |
| 광고 | 미디어, 커뮤니티, 무료 도구 | YouTube, Reddit |
| 라이선싱 | 화이트라벨, 엔터프라이즈 | Salesforce |
| 크레딧 기반 | AI 도구, 생성형 서비스 | Midjourney, Claude |

## 국내 vs 글로벌 결제 인프라

| 영역 | 국내 | 글로벌 |
|------|------|--------|
| 결제 PG | 토스페이먼츠, NHN KCP, 아임포트(포트원) | Stripe, Paddle, LemonSqueezy |
| 간편결제 | 카카오페이, 네이버페이, 토스 | Apple Pay, Google Pay |
| 구독 관리 | 토스페이먼츠 정기결제, 부트페이 | Stripe Billing, Chargebee |
| MoR (판매자 대행) | 해당 없음 | Paddle, LemonSqueezy (세금/VAT 자동 처리) |
| 세금 | 부가세 10% | 국가별 VAT/Sales Tax (Stripe Tax 등) |

## 산출물

모든 산출물은 `outputs/monetization/`에 저장됩니다:

| 파일 | 설명 |
|------|------|
| `revenue-model.md` | 수익 모델 분석 및 선택 |
| `pricing-strategy.md` | 가격 전략 및 티어 설계 |
| `unit-economics.md` | 단위 경제학 (LTV, CAC, 마진 목표) |
| `payment-plan.md` | 결제 인프라 계획 |
| `business-model.md` | **최종 비즈니스 모델 캔버스** |

## 의존성

- `ideation` 플러그인 (idea-brief.md 참조)

## 다음 Stage 연계

이 Stage의 산출물 `business-model.md`는 다음 Stage인 Planning의 입력으로 사용됩니다. PRD 작성 시 수익 모델에 기반한 기능(과금, 결제, 프리미엄 경계)이 반영됩니다.
