# Write Press Release

국내/글로벌 보도자료를 생성합니다.

## 설명

테크 미디어에 배포할 보도자료를 작성합니다. 국내(벤처스퀘어, 플래텀 등)와 글로벌(TechCrunch 등) 매체의 포맷에 맞춘 양식으로 출력합니다.

## 입력

> **참고**: `outputs/promotion/copy-research.md`가 존재하면 경쟁사/성공 사례의 실제 카피 패턴을 참조하여 콘텐츠를 생성합니다. 검증된 패턴을 우리 제품에 맞게 변형합니다.

- 제품명, 상세 설명, 타겟 유저, 핵심 수치(있으면), 라이브 URL, 창업자 정보

## 실행 내용

### 1. 한국어 보도자료 (벤처스퀘어/플래텀/아웃스탠딩)

```
[제목] — 핵심 뉴스 한줄 (50자 이내)
예: "{회사명}, {핵심 가치} '{제품명}' 런칭"

[부제] — 보충 정보 (50자 이내)
예: "{타겟유저} 대상... {차별점} 제공"

[리드] — 5W1H 핵심 요약 (2-3문장)
- 누가, 무엇을, 왜, 언제

[본문]
1단락: 제품 상세 설명 (200자)
2단락: 시장 배경 / 문제 (200자)
3단락: 핵심 기능 3-5개 (300자)
4단락: 차별점 / 기술 (200자)
5단락: 향후 계획 (100자)

[인용문] — 대표자 코멘트
"{제품명}은 {문제}를 해결하기 위해 만들었습니다. {비전}" — {대표자명}, {직함}

[회사 소개] — 보일러플레이트 (100자)
[미디어 키트 링크]
[문의처]
```

### 2. 영문 보도자료 (TechCrunch Tips/글로벌 매체)

```
[Headline] — Action verb + key news (10 words max)
예: "{Company} Launches {Product} to Help {Target} {Benefit}"

[Subheadline] — Supporting detail

[Lead paragraph] — Who, What, Why, When (2-3 sentences)

[Body]
Para 2: Product details + key features
Para 3: Market context + problem
Para 4: Differentiators + technology
Para 5: Traction/metrics (if available)
Para 6: Future plans + availability

[Quote]
"{Quote}" — {Name}, {Title} at {Company}

[About {Company}] — Boilerplate (2-3 sentences)
[Media contact]
```

### 3. 기자 피칭 이메일

```
[국내]
제목: [보도요청] {제품명} — {핵심 뉴스 한줄}
본문:
- 1줄 인사 + 기자님 최근 기사 언급
- 2-3줄 핵심 뉴스
- 왜 이 기사가 독자에게 흥미로운지
- 보도자료 + 스크린샷 첨부
- 인터뷰/추가 자료 제공 가능 안내

[글로벌]
Subject: {Product} — {one-line hook relevant to journalist's beat}
Body: 3-5 sentences max, journalist's recent article reference, key news, why readers care
```

## 산출물

`outputs/promotion/press-release/press-kit.md`

```markdown
# Press Kit

## 한국어 보도자료
{전체 보도자료 — 바로 배포 가능}

---

## English Press Release
{Full press release — ready to distribute}

---

## 기자 피칭 이메일

### 국내 매체용
**대상**: 벤처스퀘어, 플래텀, 아웃스탠딩, 모비인사이드
**제목**: {제목}
**본문**: {본문}

### 글로벌 매체용
**대상**: TechCrunch, The Verge, relevant tech blogs
**Subject**: {subject}
**Body**: {body}

---

## 미디어 키트 체크리스트
- [ ] 로고 (PNG, SVG, 고해상도)
- [ ] 제품 스크린샷 (고해상도 3-5장)
- [ ] 창업자 사진
- [ ] 제품 데모 영상 링크
- [ ] 핵심 수치/지표 (있으면)
```

## 완료 조건

- 한국어 보도자료 완성 (800자 이상)
- 영문 보도자료 완성 (400단어 이상)
- 기자 피칭 이메일 국내/글로벌 각 1개
- 미디어 키트 체크리스트
