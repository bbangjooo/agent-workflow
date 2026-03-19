# Animation Spec

Step 2.8: 애니메이션 및 인터랙션 명세

## 설명

완성된 디자인에 "킥"을 더하는 애니메이션과 마이크로인터랙션을 정의하는 스킬입니다. 정적 디자인을 생동감 있는 제품으로 만드는 마지막 터치입니다.

> "완벽한 디자인 시스템, 깔끔한 컴포넌트, 일관된 테마... 다 있는데 뭔가 부족하다면, 그건 애니메이션이다."

## 트리거

- Step 2.7 (Design Spec) 완료 후

## 입력

- `outputs/stage-2/design-spec-{platform}.md`
- `outputs/stage-2/wireframes-{platform}.md`
- `outputs/stage-2/references.md` — 레퍼런스의 애니메이션 참고

## 실행 내용

### 1. 페이지 트랜지션

```
화면 간 전환 효과:
- Fade: 부드러운 전환 (기본)
- Slide: 좌우/상하 슬라이드 (모바일 권장)
- Scale: 확대/축소 전환 (모달)

정의 포맷:
| From | To | 트랜지션 | Duration | Easing |
|------|-----|---------|----------|--------|
| 홈 | 상세 | Slide Right | 300ms | ease-out |
| 리스트 | 모달 | Scale + Fade | 200ms | ease-in-out |
```

### 2. 스크롤 애니메이션

```
스크롤 시 나타나는 효과 (랜딩 페이지 등):
- Fade In Up: 아래에서 위로 올라오며 나타남
- Fade In: 단순 나타남
- Stagger: 요소들이 순차적으로 나타남
- Parallax: 배경과 전경의 스크롤 속도 차이

정의 포맷:
| 섹션 | 효과 | Trigger | Duration | Delay |
|------|------|---------|----------|-------|
| Hero | Fade In Up | viewport enter | 600ms | 0ms |
| Features | Stagger | viewport enter | 400ms | 100ms each |
```

### 3. 마이크로인터랙션

```
UI 요소별 인터랙션:

[버튼]
- Hover: scale(1.02), background 색상 변화 (150ms)
- Click: scale(0.98) (100ms)
- Loading: spinner 또는 pulse 애니메이션

[카드]
- Hover: translateY(-2px) + shadow-lg (200ms)
- Click: scale(0.99) (100ms)

[입력 필드]
- Focus: border-color 변화 + ring 효과 (150ms)
- Error: shake 애니메이션 (300ms)

[토스트/알림]
- Enter: slide-in-right + fade (300ms)
- Exit: slide-out-right + fade (200ms)

[토글/스위치]
- Toggle: spring 물리 기반 (300ms)

[네비게이션]
- Active tab: underline slide (200ms)
- Mobile menu: slide-down (250ms)
```

### 4. 로딩 상태

```
[스켈레톤 UI]
- 콘텐츠 로딩 시 형태를 미리 보여주는 pulse 애니메이션
- 사용처: 리스트, 카드, 프로필

[스피너]
- 전체 페이지: 중앙 스피너
- 인라인: 버튼 내 스피너
- 프로그레스: 진행률 바

[Optimistic UI]
- 액션 즉시 반영, 실패 시 롤백
```

### 5. 추천 라이브러리

```
[Web]
| 라이브러리 | 용도 | 난이도 | AI 친화도 |
|-----------|------|--------|----------|
| Framer Motion | 범용 애니메이션 | 중 | 높음 (AI가 잘 구현) |
| GSAP | 타임라인/복잡한 시퀀스 | 높 | 중간 |
| Tailwind CSS animate | 간단한 전환 | 낮 | 매우 높음 |
| Unicorn Studio | 히어로 섹션 3D 효과 | 낮 (노코드) | - |

[Mobile]
| 라이브러리 | 용도 |
|-----------|------|
| React Native Reanimated | RN 네이티브 애니메이션 |
| Moti | Framer Motion 스타일 (RN) |
| Flutter Animations | Flutter 내장 애니메이션 |

권장 조합:
- 기본: Tailwind animate (간단한 전환)
- 중급: + Framer Motion (스크롤, 레이아웃 애니메이션)
- 고급: + GSAP (타임라인 시퀀스)
```

### 6. 애니메이션 원칙

```
1. 의미 있는 움직임만: 장식이 아닌 의미 전달
2. 300ms 법칙: 대부분의 트랜지션은 200-300ms
3. Easing: linear 금지, ease-out (진입), ease-in (퇴장)
4. 성능: transform/opacity만 애니메이트 (layout 속성 금지)
5. 줄이기: 많으면 산만함, 핵심 인터랙션에만 적용
6. prefers-reduced-motion: 접근성 - 모션 축소 설정 존중
```

## 산출물

`outputs/stage-2/animation-spec.md`

```markdown
# Animation Spec

## 메타데이터
- Stage: 2
- Step: 2.8 - 애니메이션 명세
- 생성일시: {현재 시간}

## 사용 라이브러리
- **기본**: {라이브러리}
- **추가**: {라이브러리} (해당 시)

## 페이지 트랜지션

| From | To | 효과 | Duration | Easing |
|------|-----|------|----------|--------|
| {화면} | {화면} | {효과} | {시간} | {이징} |

## 스크롤 애니메이션

| 섹션/요소 | 효과 | Trigger | Duration | Delay |
|----------|------|---------|----------|-------|
| {요소} | {효과} | {트리거} | {시간} | {딜레이} |

## 마이크로인터랙션

### 버튼
- Hover: {효과}
- Click: {효과}
- Loading: {효과}

### 카드
- Hover: {효과}

### 입력 필드
- Focus: {효과}
- Error: {효과}

### 알림/토스트
- Enter: {효과}
- Exit: {효과}

## 로딩 상태
- 스켈레톤: {적용 화면}
- 스피너: {적용 위치}

## Framer Motion 코드 예시 (참고)

\`\`\`tsx
// Fade In Up (스크롤 진입)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true }}
>

// 버튼 호버
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.15 }}
>

// Stagger Children
<motion.div
  variants={{
    show: { transition: { staggerChildren: 0.1 } }
  }}
>
\`\`\`
```

## 완료 조건

- 페이지 트랜지션 정의
- 핵심 마이크로인터랙션 정의 (버튼, 카드, 입력, 알림)
- 스크롤 애니메이션 정의 (해당 시)
- 로딩 상태 정의
- 사용 라이브러리 선택
- `animation-spec.md` 파일 생성

## 다음 Step

→ Step 2.9: Design Spec (최종 통합 — 애니메이션 포함)
