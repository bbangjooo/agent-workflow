# /monetize - 사업 전략 및 수익 모델 설계

아이디어 브리프를 기반으로 수익 모델, 가격 전략, 단위 경제학, 결제 인프라를 설계하고 비즈니스 모델 캔버스를 완성합니다.

## 트리거

- `/monetize` 커맨드 실행 시
- Stage Router에서 Stage 1 (Monetization) 시작 시 자동 호출

## 입력

- `outputs/stage-0/idea-brief.md` — 제품 아이디어, 타겟 유저, MVP 정의

## 레퍼런스

각 Step 실행 시 `references/monetization-strategies.md`의 관련 섹션을 참조합니다:

| Step | 참조 섹션 |
|------|----------|
| 1.1 수익 모델 분석 | 1. Core Frameworks (Monetization Zoo, Value Metric), 4. Case Studies |
| 1.2 가격 전략 | 1.2 ProfitWell Methodology, 1.3 WTP Framework, 3. Pricing Psychology |
| 1.3 단위 경제학 | 2. SaaS Benchmarks, 2.5 SaaS Metrics That Matter |
| 1.4 결제 인프라 | 7.4 Billing & Subscription Management, 4.12 토스페이먼츠 |
| 1.5 비즈니스 모델 | 1.4 Business Model Canvas, 1.5 Lean Canvas, 전체 케이스 스터디 |

## 실행 순서

### Step 1.1: Revenue Model Analysis (수익 모델 분석)

제품 특성에 적합한 수익 모델을 분석하고 선택합니다.

```
1. idea-brief.md에서 제품 유형, 타겟 유저, 가치 제안 추출
2. 제품 유형별 적합한 수익 모델 매칭:
   - B2B SaaS → 구독 (좌석별/사용량별)
   - 소비자 앱 → 프리미엄, 인앱 구매
   - 마켓플레이스 → 거래 수수료
   - AI 서비스 → 크레딧/사용량 기반
   - 콘텐츠/미디어 → 광고 + 프리미엄
   - 유틸리티 → 일회성 구매, 라이선싱
3. 각 모델의 장단점, 매출 잠재력, 구현 난이도 비교
4. 최적 모델 1-2개 추천 (하이브리드 가능)
5. 산출물: outputs/monetization/revenue-model.md
```

**수익 모델 옵션:**

| 모델 | 설명 | 적합한 경우 |
|------|------|------------|
| 구독 (SaaS) | 월/연 정기 결제 | 지속적 가치 제공, B2B 도구 |
| 프리미엄 | 무료 + 유료 프리미엄 | 네트워크 효과, 바이럴 가능 제품 |
| 사용량 기반 | 사용한 만큼 과금 | API, 클라우드, AI 서비스 |
| 크레딧 기반 | 크레딧 충전 후 소진 | AI 생성 도구, 제한된 리소스 |
| 거래 수수료 | 거래 금액의 % | 마켓플레이스, 중개 플랫폼 |
| 일회성 구매 | 1회 결제 | 유틸리티 앱, 디지털 콘텐츠 |
| 광고 | 노출/클릭 기반 수익 | 대규모 무료 유저 확보 가능 시 |
| 라이선싱 | 기술/플랫폼 라이선스 | 화이트라벨, 엔터프라이즈 |
| 하이브리드 | 2개 이상 조합 | 복합 가치 제안 (61%가 하이브리드 채택) |

### Step 1.2: Pricing Strategy (가격 전략)

선택한 수익 모델에 맞는 가격 전략을 수립합니다.

```
1. 가격 결정 방법론:
   - 가치 기반 (고객이 느끼는 가치 기준 — 권장)
   - 경쟁사 기반 (시장 가격 벤치마크)
   - 비용 기반 (원가 + 마진)

2. 티어 설계 (구독/프리미엄 모델):
   - Free: 핵심 가치 체험 가능, 업그레이드 동기 부여
   - Starter/Pro: 핵심 유료 기능, 개인/소규모 팀
   - Business/Enterprise: 팀 기능, 관리 도구, SLA
   - 3-4개 티어가 최적 (심리학적 "가운데 선택" 효과)

3. 심리적 가격 전략:
   - 앵커링: 고가 티어를 먼저 보여줘 중간 티어 합리적으로
   - 디코이: 가격 대비 가치가 낮은 옵션으로 목표 티어 유도
   - 참 프라이싱: $9.99 vs $10 (5-9% 전환율 향상)
   - 연간 할인: 월간 대비 15-25% 할인 (현금흐름 확보)

4. Free Trial vs Freemium 결정:
   - Free Trial (14-30일): 전환율 18-49%, 빠른 검증
   - Freemium: 전환율 ~12%, 바이럴/네트워크 효과 시
   - Opt-out Trial: 48.8% 전환 (카드 선입력)
   - Opt-in Trial: 18.2% 전환 (카드 미입력)

5. 가격 지역화 (PPP):
   - [국내] 원화 가격 설정
   - [글로벌] PPP 적용 시 이머징 마켓 전환율 4.7배 향상
   - 3-5개 가격 티어 (지역별)

6. 산출물: outputs/monetization/pricing-strategy.md
```

### Step 1.3: Unit Economics (단위 경제학)

수익성을 보장하는 핵심 경제 지표를 설계합니다.

```
1. LTV (고객 생애 가치) 설계:
   - LTV = ARPU × 평균 고객 수명
   - 고객 수명 = 1 / 월간 이탈률
   - 목표: 카테고리별 LTV 벤치마크 기준 설정

2. CAC (고객 획득 비용) 목표:
   - 채널별 예상 CAC 산정
   - LTV/CAC 비율: 건강한 비율 3:1~5:1
   - 페이백 기간: 6-12개월 목표

3. 이탈률 목표:
   - SaaS 평균 월간 이탈률: 3.5%
   - 좋은 수준: 2% 미만
   - 우수: 1% 미만
   - 이탈 방지 전략 수립

4. 마진 목표:
   - SaaS 매출총이익률: 70-85%
   - 초기 스타트업: 40-60% (인프라 비용 높음)
   - AI 서비스: 원가 관리 핵심 (70%가 비용 관리 어려움)

5. MRR/ARR 로드맵:
   - 3개월 / 6개월 / 12개월 매출 목표
   - 고객 수 × ARPU 기반 시나리오

6. 산출물: outputs/monetization/unit-economics.md
```

### Step 1.4: Payment Infrastructure (결제 인프라)

실제 결제를 처리할 인프라를 계획합니다.

```
[국내 서비스]
- PG사 선택:
  - 토스페이먼츠: 개발자 친화적, 빠른 연동
  - 포트원(구 아임포트): 멀티 PG 통합, 편리한 API
  - NHN KCP: 안정적, 대규모 트래픽
- 간편결제 연동: 카카오페이, 네이버페이, 토스
- 정기결제 설정 (구독 모델 시)
- 부가세(10%) 처리

[글로벌 서비스]
- 결제 플랫폼 선택:
  - Stripe: 가장 범용적, 글로벌 표준 (수수료 2.9%+30¢)
  - Paddle: MoR (세금/VAT 자동 처리) — 1인 창업자 추천
  - LemonSqueezy: Paddle 대안, 디지털 상품 최적화
- 다통화 지원 설정
- 세금 자동 처리 (VAT, Sales Tax)
- Stripe Tax / Paddle Tax 설정

[공통]
- 결제 흐름 UX 설계 (체크아웃 → 확인 → 완료)
- 영수증/인보이스 자동 발행
- 환불 정책 설계
- 구독 관리 대시보드

산출물: outputs/monetization/payment-plan.md
```

### Step 1.5: Business Model Canvas (비즈니스 모델 캔버스)

모든 분석 결과를 종합한 최종 비즈니스 모델 문서를 생성합니다.

```
1. 비즈니스 모델 캔버스 9요소:
   ┌────────────────────────────────────────────────┐
   │ Key Partners │ Key Activities │ Value Prop │ Customer │ Customer │
   │              │ Key Resources  │            │ Relations│ Segments │
   │──────────────│────────────────│────────────│──────────│──────────│
   │              │   Cost Structure              │ Revenue Streams    │
   └────────────────────────────────────────────────┘

2. Revenue Streams 상세:
   - 주요 수익원 및 예상 비중
   - 가격표 (티어별)
   - 결제 주기 및 방식

3. 모네타이제이션 타임라인:
   - Phase 1 (0-3개월): 무료/베타 → 첫 과금 시작
   - Phase 2 (3-6개월): 가격 최적화, 업셀 시작
   - Phase 3 (6-12개월): 스케일업, 엔터프라이즈 확장

4. Planning 연계 항목 (PRD에 반영해야 할 기능):
   - 과금 관련 기능 목록 (결제, 구독 관리, 가격표 페이지)
   - 프리미엄 경계 기능 (무료 vs 유료 기능 분리)
   - 결제 플로우 화면 목록
   - 사용량 추적 (사용량 기반 모델 시)

5. 산출물: outputs/monetization/business-model.md
```

## 산출물

| 파일 | 설명 |
|------|------|
| `outputs/monetization/revenue-model.md` | 수익 모델 분석 및 선택 |
| `outputs/monetization/pricing-strategy.md` | 가격 전략 및 티어 설계 |
| `outputs/monetization/unit-economics.md` | LTV, CAC, 마진 목표 |
| `outputs/monetization/payment-plan.md` | 결제 인프라 계획 |
| `outputs/monetization/business-model.md` | 최종 비즈니스 모델 캔버스 (완료 산출물) |

## 완료 조건

- `outputs/monetization/business-model.md` 파일 생성
- 수익 모델 선택 및 근거 포함
- 가격표 (티어별) 포함
- 단위 경제학 목표 수치 포함
- 결제 인프라 계획 포함
- Planning 연계 항목 (PRD에 반영할 기능) 명시
