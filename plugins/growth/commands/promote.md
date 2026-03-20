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
/promote community           — 커뮤니티 포스트 (IndieHackers, Dev.to, GeekNews 등)
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

2. 경쟁사/성공 사례 카피 조사 (copy-research 스킬):
   - outputs/promotion/copy-research.md 존재 확인
   - 없으면 → copy-research 스킬 실행 (웹 서치로 실제 카피 수집)
     - 경쟁사 랜딩 페이지 헤드라인/CTA
     - Product Hunt 상위 제품 타이틀/설명
     - Reddit/Twitter/IndieHackers 인기 포스트 문구
     - 앱스토어 설명 (모바일 시)
   - 있으면 → 기존 조사 결과 참조
   → 이 조사 결과가 이후 모든 채널 콘텐츠의 톤/패턴 기준이 됨

3. 채널 지정 확인:
   - 지정됨 → 해당 write-{channel} 스킬 실행
   - 미지정 → market-analysis.md의 타겟 시장 기반 채널 자동 선택
     - 국내 → disquiet, naver-blog, press-release(KR), community(KR)
     - 글로벌 → product-hunt, show-hn, reddit, twitter, community(EN)
     - 양쪽 → 전체

4. 각 채널별 스킬 호출하여 콘텐츠 생성
   - copy-research.md의 패턴을 참고하여 검증된 카피 구조 활용
   - 경쟁사 문구를 그대로 복사하지 않고, 패턴을 우리 제품에 맞게 변형

5. 산출물을 outputs/promotion/{channel}/ 에 저장
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
| 커뮤니티 | write-community | `outputs/promotion/community/` |

## 완료 조건

- 지정된 채널의 콘텐츠 파일 생성됨
- 각 콘텐츠에 제품명, URL, 핵심 메시지 포함
- 해당 채널의 톤/포맷/글자수 제한 준수
