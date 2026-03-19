# /grow - 초기 유저 획득 전략

배포된 서비스의 초기 유저 획득 전략을 수립합니다. 타겟 시장(국내/글로벌)에 따라 최적화된 전략을 생성합니다.

## 트리거

- `/grow` 커맨드 실행 시
- Stage Router에서 Stage 5 시작 시 자동 호출

## 입력

- `outputs/stage-0/idea-brief.md` — 제품 아이디어 및 타겟 유저
- `outputs/stage-1/prd.md` — 기능 정의 및 가치 제안
- `outputs/stage-4/deployment-complete.md` — 배포 정보 및 라이브 URL

## 실행 순서

### Step 5.1: Market Targeting (타겟 시장 분석)

제품 특성에 따라 타겟 시장을 분석합니다.

```
1. idea-brief.md와 prd.md에서 타겟 유저 정보 추출
2. 시장 범위 결정: 국내 전용 / 글로벌 전용 / 양쪽
3. 핵심 타겟 유저 페르소나 정의 (2-3개)
4. 각 페르소나별 주요 활동 채널 매핑
5. 산출물: outputs/stage-5/market-analysis.md
```

**산출물 포함 내용:**
- 타겟 시장 범위 (국내/글로벌/양쪽)
- 유저 페르소나 (이름, 직업, 니즈, 활동 채널)
- 경쟁 서비스 대비 차별점
- 초기 타겟 규모 추정

### Step 5.2: Pre-launch Strategy (프리런칭 전략)

출시 전 관심과 수요를 확보하는 전략을 수립합니다.

```
1. 웨이트리스트/랜딩페이지 전략
   - 추천인 메커니즘 설계 (순위제, 보상)
   - 이메일 수집 및 넛지 전략

2. 커뮤니티 빌딩 전략
   [국내] 네이버 카페, 카카오톡 오픈채팅, 디스콰이엇
   [글로벌] Discord, Slack, Twitter/X 빌드 인 퍼블릭

3. 콘텐츠/SEO 전략
   [국내] 네이버 블로그 (1,500자+), 네이버 SEO 최적화
   [글로벌] Google SEO, 블로그, 가이드 콘텐츠

4. 베타 테스팅 프로그램 설계
   - 초대 방식 (웨이트리스트 상위 → 베타 액세스)
   - 피드백 수집 채널

5. [국내 전용] 정부 지원사업 체크리스트
   - TIPS, 초기창업패키지, 예비창업패키지 등

6. 산출물: outputs/stage-5/pre-launch-strategy.md
```

### Step 5.3: Launch Plan (런칭 플랜)

출시 주간의 상세 실행 계획을 작성합니다.

```
1. 런칭 플랫폼 전략
   [국내] 디스콰이엇 런칭
   [글로벌] Product Hunt 런칭 플레이북
     - 타이틀 3개 시안 (가치/소셜프루프/호기심 앵글)
     - 런칭 요일/시간 결정
     - 시간대별 실행 체크리스트
   [글로벌] Show HN 포스팅 전략
   [글로벌] Reddit 관련 서브레딧 포스팅

2. PR/언론 전략
   [국내] 벤처스퀘어, 플래텀, 아웃스탠딩 등 보도자료
   [글로벌] TechCrunch Tips, 테크 블로거 아웃리치
   - 기자 관계 구축 타임라인 (런칭 2-3개월 전부터)

3. 인플루언서 시딩
   [국내] 유튜버, 네이버 블로거 (마이크로 인플루언서 우선)
   [글로벌] Twitter/X, YouTube 크리에이터
   - 마이크로 인플루언서 (1만-10만) 타겟 리스트
   - 얼리 액세스 제공 방식

4. 커뮤니티 동시 포스팅 계획
   [국내] 네이버 카페, GeekNews, OKKY, Velog
   [글로벌] IndieHackers, Dev.to, 관련 Slack/Discord

5. 웨이트리스트 활성화 시퀀스
   - 초대 이메일 시리즈 설계

6. 산출물: outputs/stage-5/launch-plan.md
```

### Step 5.4: Growth Channels (그로스 채널 설계)

지속적 성장을 위한 채널과 메커니즘을 설계합니다.

```
1. Product-Led Growth (PLG) 설계
   - 프리미엄 모델 경계 설정 (무료 vs 유료)
   - 바이럴 루프 메커니즘 (공유, 초대, UGC)
   - 네트워크 효과 가능성 분석
   - 온보딩 최적화 (첫 "와우 모먼트" 5분 이내 도달)

2. 레퍼럴 프로그램 설계
   - 양측 보상 구조 (추천인 + 피추천인)
   - 제품 관련 보상 vs 금전 보상 결정
   - 인앱 추천 UX 흐름

3. 유료 광고 테스트 계획
   [국내] 네이버 검색 광고, 카카오 비즈보드
   [글로벌] Google Ads, Meta Ads, Apple Search Ads
   - 소액 테스트 예산 배분 (채널별)
   - A/B 테스트 계획

4. 파트너십/통합 전략
   - 연동 가능한 플랫폼 마켓플레이스 (Slack, Zapier 등)
   - 크로스 프로모션 대상 서비스
   - 어필리에이트 프로그램 설계

5. ASO (앱스토어 최적화) — 모바일 앱인 경우
   - 키워드 전략
   - 스크린샷/프리뷰 영상 계획
   - 리뷰 관리 전략
   [국내] ONE Store 추가 등록 검토

6. 이벤트/컨퍼런스 참가 계획
   [국내] COMEUP, Startup Grind Seoul, 데모데이
   [글로벌] TechCrunch Disrupt, Web Summit, SXSW

7. 산출물: outputs/stage-5/growth-channels.md
```

### Step 5.5: Execution Roadmap (실행 로드맵)

전체 전략을 시간 순서로 정리하고 측정 지표를 정의합니다.

```
1. 타임라인 로드맵 (12주)
   - Week 1-4: 프리런칭 (웨이트리스트, 커뮤니티, 콘텐츠)
   - Week 5-6: 런칭 (플랫폼 런칭, PR, 인플루언서)
   - Week 7-12: 포스트런칭 (레퍼럴, 유료 광고, PLG 최적화)

2. KPI/측정 지표 정의
   - 웨이트리스트 가입자 수
   - DAU/WAU/MAU
   - 가입 전환율
   - 레퍼럴 계수 (viral coefficient)
   - CAC (고객 획득 비용)
   - 채널별 전환율
   - NPS (순추천지수)

3. 채널별 우선순위 매트릭스
   - Impact vs Effort 기준 정렬
   - 1순위 / 2순위 / 3순위 채널 분류

4. 주간 실행 체크리스트
   - 각 주차별 핵심 할 일 목록

5. 최종 종합 전략 문서 생성
   - 산출물: outputs/stage-5/acquisition-plan.md
```

## 산출물

| 파일 | 설명 |
|------|------|
| `outputs/stage-5/market-analysis.md` | 타겟 시장 분석 및 유저 페르소나 |
| `outputs/stage-5/pre-launch-strategy.md` | 프리런칭 전략 (웨이트리스트, 커뮤니티, SEO) |
| `outputs/stage-5/launch-plan.md` | 런칭 주간 상세 실행 계획 |
| `outputs/stage-5/growth-channels.md` | 그로스 채널 및 PLG 설계 |
| `outputs/stage-5/acquisition-plan.md` | 최종 종합 유저 획득 전략 (완료 산출물) |

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

## 완료 조건

- `outputs/stage-5/acquisition-plan.md` 파일 생성
- 타겟 시장에 맞는 채널별 전략 포함
- 12주 실행 로드맵 포함
- KPI/측정 지표 정의 포함
