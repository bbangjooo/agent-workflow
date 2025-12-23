# Design Spec

Step 2.5: 디자인 명세서 생성

## 설명

모든 디자인 산출물을 통합하여 개발자가 바로 사용할 수 있는 최종 디자인 명세서를 생성하는 스킬입니다.

## 트리거

- Step 2.4 (Wireframes) 완료 후 자동 실행
- 모든 이전 산출물이 존재할 때

## 입력

- `outputs/stage-2/visual-direction.md`
- `outputs/stage-2/design-system.md`
- `outputs/stage-2/component-spec.md`
- `outputs/stage-2/wireframes.md`
- `outputs/stage-1/prd.md`
- `outputs/stage-1/screen-structure.md`

## 실행 내용

### 자동 통합 작업

1. 모든 산출물 읽기
2. 일관성 검증 (색상, 컴포넌트 사용 등)
3. 개발자 친화적 형식으로 재구성
4. AI 도구 활용 가이드 추가

### 최종 확인 질문

1. **전체 검토**
   - "디자인 명세서 초안을 만들었어요. 전체적으로 검토해주세요."
   - "수정이 필요한 부분이 있나요?"

2. **우선순위 확인**
   - "개발 시 먼저 만들 화면 순서가 맞나요?"
   - "MVP에서 제외할 화면이 있나요?"

3. **AI 도구 활용**
   - "v0나 Claude로 프로토타입을 만들어볼까요?"
   - "어떤 화면부터 만들어볼까요?"

### 대화 원칙

- 명세서 전체를 한번에 보여주기
- 개발자 관점에서 빠진 정보 없는지 확인
- 다음 단계(개발) 안내
- AI 도구 활용 프롬프트 제공

## 산출물

`outputs/stage-2/design-spec.md`

```markdown
# Design Spec

## 메타데이터
- Stage: 2
- Step: 2.5 - 디자인 명세서 (최종)
- 생성일시: {현재 시간}
- 상태: final
- 버전: 1.0

---

## 1. 프로젝트 개요

### 1.1 프로젝트 정보
- **프로젝트명**: {이름}
- **타겟 사용자**: {타겟}
- **핵심 가치**: {가치}

### 1.2 디자인 방향
- **키워드**: {브랜드 키워드}
- **분위기**: {분위기 설명}
- **참고 서비스**: {참고 서비스 목록}

---

## 2. Design System

### 2.1 Colors

#### Primary
| Name | HEX | RGB | Usage |
|------|-----|-----|-------|
| Primary | #{code} | rgb(r,g,b) | 주요 버튼, 링크 |
| Primary Light | #{code} | rgb(r,g,b) | 호버, 배경 |
| Primary Dark | #{code} | rgb(r,g,b) | 액티브 |

#### Neutral
| Name | HEX | Usage |
|------|-----|-------|
| Gray 900 | #111827 | 제목 |
| Gray 700 | #374151 | 본문 |
| Gray 500 | #6B7280 | 보조 텍스트 |
| Gray 300 | #D1D5DB | 테두리 |
| Gray 100 | #F3F4F6 | 배경 |

#### Semantic
| Name | HEX | Usage |
|------|-----|-------|
| Success | #10B981 | 성공 |
| Warning | #F59E0B | 경고 |
| Error | #EF4444 | 에러 |

### 2.2 Typography

```css
/* Font Family */
font-family: '{폰트명}', system-ui, sans-serif;

/* Type Scale */
--text-h1: 32px/40px, font-weight: 700;
--text-h2: 24px/32px, font-weight: 600;
--text-h3: 20px/28px, font-weight: 600;
--text-body: 16px/24px, font-weight: 400;
--text-small: 14px/20px, font-weight: 400;
--text-caption: 12px/16px, font-weight: 400;
```

### 2.3 Spacing

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
```

### 2.4 Border & Shadow

```css
/* Border Radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;

/* Shadow */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
```

---

## 3. Components

### 3.1 Component List

| Category | Components |
|----------|------------|
| Buttons | Primary, Secondary, Ghost |
| Inputs | Text, Select, Checkbox |
| Display | Card, Badge, Avatar |
| Feedback | Alert, Toast, Modal |
| Navigation | Header, Footer, Tabs |

### 3.2 Component Details

(component-spec.md 내용 요약)

---

## 4. Screens

### 4.1 Screen List

| ID | 화면명 | 우선순위 | 개발 순서 |
|----|--------|----------|-----------|
| S01 | {화면} | P0 | 1 |
| S02 | {화면} | P0 | 2 |
| ... | ... | ... | ... |

### 4.2 Screen Wireframes

(wireframes.md 내용 요약 - 주요 화면만)

---

## 5. 개발 가이드

### 5.1 추천 기술 스택

| 영역 | 추천 |
|------|------|
| Framework | Next.js / React |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Icons | Lucide Icons |

### 5.2 Tailwind Config 예시

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#{primary}',
          light: '#{primary-light}',
          dark: '#{primary-dark}',
        },
      },
      fontFamily: {
        sans: ['{폰트명}', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

### 5.3 개발 순서 권장

1. 디자인 시스템 설정 (colors, fonts, spacing)
2. 공통 컴포넌트 구현 (Button, Input, Card)
3. 레이아웃 컴포넌트 (Header, Footer)
4. 핵심 화면 순서대로 구현

---

## 6. AI 도구 활용 가이드

### 6.1 v0.dev 프롬프트

다음 프롬프트를 v0.dev에 붙여넣어 프로토타입을 생성할 수 있습니다:

```
Create a {화면명} page with the following specifications:

Design System:
- Primary color: {primary}
- Font: {font}
- Border radius: {radius}

Layout:
{와이어프레임 설명}

Components needed:
{컴포넌트 목록}
```

### 6.2 Claude Artifacts 프롬프트

```
Create a React component for {컴포넌트명} with these specs:
{컴포넌트 명세}

Use Tailwind CSS for styling.
```

---

## 7. 체크리스트

### 디자인 완료 확인
- [ ] 모든 색상이 정의됨
- [ ] 타이포그래피 스케일 완성
- [ ] 필요한 컴포넌트 모두 정의
- [ ] 모든 화면 와이어프레임 완성
- [ ] 반응형 고려됨

### 개발 준비 확인
- [ ] 개발자가 이해할 수 있는 수준의 명세
- [ ] 기술 스택 결정
- [ ] 개발 순서 정의

---

## 다음 단계

이 디자인 명세서를 바탕으로 **Stage 3: 개발** 단계를 진행합니다.

```
/develop  # Stage 3 시작 (예정)
```
```

## 완료 조건

- 모든 디자인 산출물이 통합됨
- 개발자 친화적 형식으로 정리됨
- AI 도구 활용 가이드 포함
- 개발 준비 체크리스트 완료
- 사용자 최종 승인
- `design-spec.md` 파일이 생성됨

## Stage 2 완료

Design Spec이 완료되면 Stage 2가 종료됩니다.
다음 Stage는 **Stage 3: Development (개발)**입니다.
