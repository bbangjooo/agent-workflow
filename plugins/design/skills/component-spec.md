# Component Spec

Step 2.3: 컴포넌트 명세 정의

## 설명

screen-structure의 화면들에 필요한 UI 컴포넌트를 정의하는 스킬입니다. 디자인 시스템을 바탕으로 재사용 가능한 컴포넌트 라이브러리를 명세합니다.

## 트리거

- Step 2.2 (Design System) 완료 후 자동 실행
- `design-system.md` 파일이 존재할 때

## 입력

- `outputs/stage-2/design-system.md`
- `outputs/stage-1/screen-structure.md`
- `outputs/stage-1/user-stories.md`

## 실행 내용

### 사전 작업

1. screen-structure.md에서 모든 화면의 구성요소 추출
2. 공통으로 사용되는 UI 패턴 식별
3. 필요한 컴포넌트 목록 도출

### 자동 생성 컴포넌트

대부분의 서비스에 필요한 기본 컴포넌트:

| 카테고리 | 컴포넌트 |
|----------|----------|
| **Buttons** | Primary, Secondary, Ghost, Icon Button |
| **Inputs** | Text Input, Textarea, Select, Checkbox, Radio |
| **Display** | Card, Badge, Avatar, Icon |
| **Feedback** | Alert, Toast, Modal, Tooltip |
| **Navigation** | Header, Footer, Tabs, Breadcrumb |
| **Layout** | Container, Grid, Divider |

### 질문 가이드

1. **추가 컴포넌트**
   - "화면 구조를 보니 이런 컴포넌트가 더 필요해 보여요: {목록}"
   - "혹시 더 필요한 UI 요소가 있나요?"

2. **특수 컴포넌트**
   - "{기능}을 위해 {컴포넌트}가 필요한데, 어떤 형태를 원하세요?"
   - "예를 들어 [옵션1], [옵션2] 같은 방식이 있어요"

### 대화 원칙

- 컴포넌트 목록을 먼저 제안하고 확인 받기
- 각 컴포넌트의 용도를 쉽게 설명
- "v0에서 바로 만들 수 있는 형태"로 명세
- MVP에 필요한 최소 컴포넌트에 집중

## 산출물

`outputs/stage-2/component-spec.md`

```markdown
# Component Spec

## 메타데이터
- Stage: 2
- Step: 2.3 - 컴포넌트 명세
- 생성일시: {현재 시간}
- 상태: draft

## 컴포넌트 목록

### Overview

| Category | Components | Count |
|----------|------------|-------|
| Buttons | Primary, Secondary, Ghost, Icon | 4 |
| Inputs | Text, Textarea, Select, Checkbox | 4 |
| Display | Card, Badge, Avatar | 3 |
| Feedback | Alert, Toast, Modal | 3 |
| Navigation | Header, Tabs | 2 |
| **Total** | | **16** |

---

## Buttons

### Button - Primary

**용도**: 주요 액션 (저장, 제출, 확인)

**Variants**:
| State | Background | Text | Border |
|-------|------------|------|--------|
| Default | Primary | White | none |
| Hover | Primary Dark | White | none |
| Disabled | Gray 300 | Gray 500 | none |

**Sizes**:
| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| sm | 32px | 12px 16px | 14px |
| md | 40px | 12px 20px | 16px |
| lg | 48px | 16px 24px | 16px |

**Props**:
- `variant`: primary | secondary | ghost
- `size`: sm | md | lg
- `disabled`: boolean
- `loading`: boolean
- `icon`: ReactNode (optional)

**Example**:
```
+------------------+
|   [ Button ]     |  <- Primary, md
+------------------+
```

---

### Button - Secondary

**용도**: 보조 액션 (취소, 이전)

**Variants**:
| State | Background | Text | Border |
|-------|------------|------|--------|
| Default | White | Primary | Primary |
| Hover | Primary Light | Primary | Primary |

---

### Button - Ghost

**용도**: 덜 강조되는 액션 (더보기, 링크형)

**Variants**:
| State | Background | Text | Border |
|-------|------------|------|--------|
| Default | Transparent | Primary | none |
| Hover | Primary Light | Primary | none |

---

## Inputs

### Text Input

**용도**: 단일 라인 텍스트 입력

**Variants**:
| State | Background | Border | Text |
|-------|------------|--------|------|
| Default | White | Gray 300 | Gray 900 |
| Focus | White | Primary | Gray 900 |
| Error | White | Error | Gray 900 |
| Disabled | Gray 100 | Gray 300 | Gray 500 |

**Anatomy**:
```
Label (optional)
+---------------------------+
| Placeholder...            |
+---------------------------+
Helper text or Error message
```

**Props**:
- `label`: string (optional)
- `placeholder`: string
- `helperText`: string (optional)
- `error`: string (optional)
- `disabled`: boolean

---

### Select

**용도**: 드롭다운 선택

**Anatomy**:
```
Label (optional)
+---------------------------+
| Selected option        [v]|
+---------------------------+
| Option 1                  |
| Option 2                  |
| Option 3                  |
+---------------------------+
```

---

## Display

### Card

**용도**: 콘텐츠 그룹화

**Variants**:
| Variant | Shadow | Border | Usage |
|---------|--------|--------|-------|
| Default | shadow-md | none | 일반 카드 |
| Outlined | none | Gray 300 | 목록 아이템 |
| Elevated | shadow-lg | none | 강조 카드 |

**Anatomy**:
```
+---------------------------+
| Header (optional)         |
|---------------------------|
|                           |
| Content                   |
|                           |
|---------------------------|
| Footer (optional)         |
+---------------------------+
```

---

### Badge

**용도**: 상태 표시, 카운트

**Variants**:
| Variant | Background | Text |
|---------|------------|------|
| Default | Gray 100 | Gray 700 |
| Primary | Primary Light | Primary |
| Success | Success Light | Success |
| Warning | Warning Light | Warning |
| Error | Error Light | Error |

---

## Feedback

### Modal

**용도**: 중요 정보, 확인 다이얼로그

**Anatomy**:
```
+----------------------------------+
| [X]                              |
|                                  |
|            Title                 |
|                                  |
|     Modal content goes here     |
|                                  |
|     [Cancel]        [Confirm]   |
+----------------------------------+
```

**Sizes**:
| Size | Width |
|------|-------|
| sm | 400px |
| md | 500px |
| lg | 600px |

---

### Toast

**용도**: 일시적 알림

**Variants**: success | error | warning | info

**Anatomy**:
```
+----------------------------------+
| [Icon] Message text here    [X]  |
+----------------------------------+
```

---

## Navigation

### Header

**용도**: 전역 네비게이션

**Anatomy**:
```
+--------------------------------------------------+
| [Logo]    Nav1  Nav2  Nav3    [User Avatar] [v]  |
+--------------------------------------------------+
```

---

## 사용 화면 매핑

| Component | 사용 화면 |
|-----------|----------|
| Button Primary | {화면 목록} |
| Card | {화면 목록} |
| Modal | {화면 목록} |
| ... | ... |

## 다음 단계

이 컴포넌트들을 사용해서 각 화면의 와이어프레임을 그립니다.
```

## 완료 조건

- 모든 필요 컴포넌트가 식별됨
- 각 컴포넌트의 variants/states 정의됨
- 컴포넌트 사용처(화면) 매핑됨
- `component-spec.md` 파일이 생성됨

## 다음 Step

-> Step 2.4: Wireframes (와이어프레임)
