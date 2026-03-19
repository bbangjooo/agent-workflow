# Write Product Hunt

Product Hunt 런칭에 필요한 모든 콘텐츠를 생성합니다.

## 설명

Product Hunt의 포맷과 커뮤니티 문화에 맞춘 런칭 콘텐츠를 생성합니다. 타이틀, 서브타이틀, 상세 설명, 첫 번째 댓글(메이커 코멘트)까지 바로 복붙 가능한 형태로 출력합니다.

## 입력

- 제품명, 한줄 설명, 핵심 가치 제안, 타겟 유저, 라이브 URL

## 실행 내용

### 1. Tagline (60자 이내)

```
3개 시안 생성:

[가치 앵글] — 핵심 가치를 직접적으로 전달
예: "The fastest way to turn ideas into shipped products"

[호기심 앵글] — 궁금증 유발
예: "What if building a SaaS took hours, not months?"

[소셜프루프 앵글] — 결과/숫자 기반 (있을 경우)
예: "500+ founders shipped their MVP in under a week"
```

### 2. Description (260자 이내)

```
구조:
1문장: 무엇인지 (What)
2문장: 누구를 위한 것인지 (Who)
3문장: 어떤 문제를 해결하는지 (Why)
4문장: 핵심 차별점 (How it's different)

톤: 친근하고 직접적, 마케팅 용어 최소화
이모지: 핵심 포인트에 1-2개만 사용
```

### 3. Maker Comment (첫 번째 댓글)

```
구조:
- 인사 + 자기소개 (1줄)
- 왜 만들었는지 (개인 스토리/문제 경험) (2-3줄)
- 핵심 기능 3-5개 (불릿 포인트)
- 기술 스택 또는 빌딩 과정 한줄 (개발자 커뮤니티 어필)
- 피드백 요청 + 질문 환영 (1줄)
- 특별 오퍼 (있으면): "PH 유저 한정 ~" (1줄)

톤: 진정성 있고 솔직한 메이커 목소리
길이: 150-300단어
```

### 4. Gallery 가이드

```
권장 이미지/영상 구성:
1. 히어로 이미지: 핵심 화면 + 가치 제안 텍스트
2. 기능 스크린샷 3-4장: 주요 플로우 순서대로
3. 데모 GIF 또는 영상 (30초-2분)
4. Before/After 비교 (해당 시)

이미지 사이즈: 1270×760px 권장
```

### 5. Launch Day 체크리스트

```
- [ ] 런칭 시간: PST 12:01 AM (한국 시간 오후 5:01)
- [ ] 첫 1시간: 팀/지인에게 알림 (upvote 요청은 금지)
- [ ] 첫 4시간: 모든 댓글에 즉시 응답
- [ ] 중간 체크 (12시간): 순위 확인, 추가 커뮤니티 공유
- [ ] 마지막 2시간: 최종 스퍼트, 감사 댓글
```

## 산출물

`outputs/promotion/product-hunt/launch-content.md`

```markdown
# Product Hunt Launch Content

## Tagline 시안
1. [가치] {tagline 1}
2. [호기심] {tagline 2}
3. [소셜프루프] {tagline 3}

**추천**: #{추천 번호}

## Description
{260자 이내 설명}

## Maker Comment
{첫 번째 댓글 전문}

## Gallery 구성
1. {히어로 이미지 설명}
2. {기능 스크린샷 1 설명}
3. {기능 스크린샷 2 설명}
4. {데모 GIF/영상 설명}

## Launch Day Checklist
{체크리스트}

## Topics
{관련 토픽 태그 3-5개}
```

## 완료 조건

- Tagline 3개 시안 (각 60자 이내)
- Description 1개 (260자 이내)
- Maker Comment 1개 (150-300단어)
- Gallery 구성 가이드
- Launch Day 체크리스트
