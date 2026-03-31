# /promote - 채널별 홍보 콘텐츠 생성

각 채널에 바로 포스팅할 수 있는 홍보 콘텐츠를 생성합니다. 채널을 지정하면 해당 채널 전용 콘텐츠를, 지정하지 않으면 전체 채널 콘텐츠를 일괄 생성합니다.

## 사용법

```
/promote                     — 전체 채널 콘텐츠 일괄 생성
/promote product-hunt        — Product Hunt 런칭 콘텐츠
/promote show-hn             — Hacker News Show HN 포스트
/promote reddit              — Reddit 서브레딧별 포스트
/promote twitter             — Twitter/X 런칭 스레드
/promote disquiet            — 디스콰이엇 런칭 콘텐츠
/promote naver-blog          — 네이버 블로그 SEO 포스트
/promote press-release       — 보도자료 (국내/글로벌)
/promote email-sequence      — 이메일 시퀀스 (웨이트리스트/온보딩)
/promote landing-copy        — 랜딩 페이지 카피
/promote meta                — Meta (Facebook/Instagram) 콘텐츠
/promote community           — 커뮤니티 포스트 (IndieHackers, Dev.to, GeekNews 등)
/promote outreach            — 타겟 인물 아웃리치 (이메일, LinkedIn, DM)
```

## 입력

- `outputs/stage-0/idea-brief.md` — 제품 아이디어
- `outputs/stage-1/prd.md` — 기능 정의 (존재 시)
- `outputs/monetization/business-model.md` — 비즈니스 모델 (존재 시)
- `outputs/stage-5/market-analysis.md` — 타겟 시장 (존재 시)
- `outputs/stage-5/acquisition-plan.md` — 유저 획득 전략 (존재 시)
- 라이브 URL (배포된 경우)

## 실행 로직

```
1. 입력 파일에서 제품 정보 추출:
   - 제품명, 한줄 설명, 핵심 가치 제안
   - 타겟 유저, 해결하는 문제
   - 라이브 URL, 스크린샷 경로
   - 가격 모델 (있으면)

2. 4단계 리서치 체인 (순차 실행):
   각 리서치는 이전 리서치 결과를 입력으로 활용합니다.
   이미 산출물이 존재하면 해당 단계를 스킵합니다.

   [Step R-1] copy-research (경쟁사 카피 조사)
   - outputs/promotion/copy-research.md 존재 확인
   - 없으면 → copy-research 스킬 실행
     - 경쟁사 랜딩 페이지 헤드라인/CTA
     - Product Hunt 상위 제품 타이틀/설명
     - Reddit/Twitter/IndieHackers 인기 포스트 문구
     - 앱스토어 설명 (모바일 시)

   [Step R-2] channel-research (채널 트렌드 & 커뮤니티 규칙)
   - outputs/promotion/channel-research.md 존재 확인
   - 없으면 → channel-research 스킬 실행
     - 각 타겟 채널의 커뮤니티 규칙/셀프프로모 정책 실제 조사
     - 채널별 최신 인기 콘텐츠 TOP 분석
     - 채널 우선순위 매트릭스

   [Step R-3] audience-language-research (유저 실제 언어)
   - outputs/promotion/audience-language.md 존재 확인
   - 없으면 → audience-language-research 스킬 실행
     - 유저가 문제를 설명하는 실제 표현 수집
     - 리뷰/커뮤니티에서 반복되는 단어/은어
     - 파워 프레이즈 & 금지 용어 정리

   [Step R-4] timing-research (최적 타이밍)
   - outputs/promotion/timing-research.md 존재 확인
   - 없으면 → timing-research 스킬 실행
     - 채널별 최적 포스팅 시간 (최신 데이터)
     - 업계 이벤트/트렌드 타이밍
     - 경쟁사 런칭 일정 충돌 확인

3. 채널 지정 확인:
   - 지정됨 → 해당 write-{channel} 스킬 실행
   - 미지정 → channel-research.md의 채널 우선순위 매트릭스 기반 채널 자동 선택
     - 국내 → disquiet, naver-blog, press-release(KR), community(KR)
     - 글로벌 → product-hunt, show-hn, reddit, twitter, community(EN)
     - 양쪽 → 전체
   - 채널 우선순위에서 "스킵 권장"인 채널은 제외

4. 각 채널별 스킬 호출하여 콘텐츠 생성
   - 4개 리서치 산출물을 모두 참조:
     - copy-research.md → 검증된 카피 패턴 활용
     - channel-research.md → 커뮤니티 규칙 준수, 인기 콘텐츠 패턴 반영
     - audience-language.md → 유저 언어로 작성, 금지 용어 회피
     - timing-research.md → 추천 포스팅 시간 명시

5. 아웃리치 메시지 생성 (write-outreach 스킬)
   - 타겟 인물 리서치 (인플루언서, 기자, 커뮤니티 리더)
   - 채널별 개인화 메시지 작성 (이메일, LinkedIn, Twitter DM)

6. 산출물을 outputs/promotion/{channel}/ 에 저장
   - timing-research.md의 타임라인에 맞춰 포스팅 순서 안내
```

## 채널별 스킬 매핑

| 채널 | 스킬 | 산출물 경로 |
|------|------|-----------|
| Product Hunt | write-product-hunt | `outputs/promotion/product-hunt/` |
| Show HN | write-show-hn | `outputs/promotion/show-hn/` |
| Reddit | write-reddit | `outputs/promotion/reddit/` |
| Twitter/X | write-twitter | `outputs/promotion/twitter/` |
| 디스콰이엇 | write-disquiet | `outputs/promotion/disquiet/` |
| 네이버 블로그 | write-naver-blog | `outputs/promotion/naver-blog/` |
| 보도자료 | write-press-release | `outputs/promotion/press-release/` |
| 이메일 | write-email-sequence | `outputs/promotion/email/` |
| 랜딩 카피 | write-landing-copy | `outputs/promotion/landing/` |
| Meta (FB/IG) | write-meta | `outputs/promotion/meta/` |
| 커뮤니티 | write-community | `outputs/promotion/community/` |
| 아웃리치 | write-outreach | `outputs/promotion/outreach/` |

## 리서치 산출물

| 리서치 | 스킬 | 산출물 | 역할 |
|--------|------|--------|------|
| 경쟁사 카피 | copy-research | `outputs/promotion/copy-research.md` | 검증된 카피 패턴 |
| 채널 트렌드 & 규칙 | channel-research | `outputs/promotion/channel-research.md` | 커뮤니티 규칙, 인기 콘텐츠 패턴 |
| 유저 언어 | audience-language-research | `outputs/promotion/audience-language.md` | 유저 실제 표현, 금지 용어 |
| 타이밍 | timing-research | `outputs/promotion/timing-research.md` | 최적 시간, 런칭 타임라인 |

## 완료 조건

- 지정된 채널의 콘텐츠 파일 생성됨
- 각 콘텐츠에 제품명, URL, 핵심 메시지 포함
- 해당 채널의 톤/포맷/글자수 제한 준수
