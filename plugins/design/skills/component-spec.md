# Component Spec

Step 2.3: 컴포넌트 명세 정의

## 설명

screen-structure의 화면들에 필요한 UI 컴포넌트를 정의하는 스킬입니다. 디자인 시스템을 바탕으로 재사용 가능한 컴포넌트 라이브러리를 명세합니다.

**플랫폼에 따라 별도의 산출물을 생성합니다.** Web과 Mobile은 서로 다른 컴포넌트 라이브러리와 패턴을 사용합니다.

## 트리거

- Step 2.2 (Design System) 완료 후 자동 실행
- `design-system.md` 파일이 존재할 때

## 입력

- `outputs/stage-2/platform-selection.md` (플랫폼 확인)
- `outputs/stage-2/design-system.md`
- `outputs/stage-1/screen-structure.md`
- `outputs/stage-1/user-stories.md`

## 실행 내용

### 사전 작업

1. **platform-selection.md 확인** - Web/Mobile/Both 중 어떤 플랫폼인지 확인
2. screen-structure.md에서 모든 화면의 구성요소 추출
3. 공통으로 사용되는 UI 패턴 식별
4. 필요한 컴포넌트 목록 도출

### 플랫폼별 기본 컴포넌트

#### Web 플랫폼 기본 컴포넌트

대부분의 웹 서비스에 필요한 기본 컴포넌트 (shadcn/ui, Material UI 등 기반):

| 카테고리 | 컴포넌트 |
|----------|----------|
| **Buttons** | Primary, Secondary, Ghost, Icon Button |
| **Inputs** | Text Input, Textarea, Select, Checkbox, Radio |
| **Display** | Card, Badge, Avatar, Icon |
| **Feedback** | Alert, Toast, Modal, Tooltip |
| **Navigation** | Header, Footer, Tabs, Breadcrumb |
| **Layout** | Container, Grid, Divider |

#### Mobile 플랫폼 기본 컴포넌트

대부분의 모바일 앱에 필요한 기본 컴포넌트 (React Native Paper, NativeBase 등 기반):

| 카테고리 | 컴포넌트 |
|----------|----------|
| **Buttons** | Button, FAB (Floating Action Button), IconButton |
| **Inputs** | TextInput, SearchBar, Switch, Checkbox, RadioButton, Picker |
| **Display** | Card, Chip, Avatar, Badge, List, ListItem |
| **Feedback** | Snackbar, Dialog, ActivityIndicator, ProgressBar |
| **Navigation** | AppBar, BottomNavigation, Drawer, TabBar |
| **Layout** | SafeAreaView, ScrollView, FlatList, SectionList |
| **Overlay** | BottomSheet, Modal, ActionSheet |

### 질문 가이드

#### 공통 질문
1. **추가 컴포넌트**
   - "화면 구조를 보니 이런 컴포넌트가 더 필요해 보여요: {목록}"
   - "혹시 더 필요한 UI 요소가 있나요?"

#### Web 플랫폼 전용 질문
2. **컴포넌트 라이브러리 선호도**
   - "shadcn/ui, Material UI, Chakra UI 중 어떤 스타일을 선호하세요?"
   - "이 선택에 따라 컴포넌트 명세가 달라져요"

#### Mobile 플랫폼 전용 질문
2. **기술 스택 확인**
   - "React Native Paper, NativeBase, 또는 Flutter Material 중 어떤 걸 사용하시나요?"
   - "네이티브(SwiftUI/Jetpack Compose)로 직접 구현하시나요?"

3. **플랫폼별 차이**
   - "iOS와 Android에서 다르게 동작해야 하는 컴포넌트가 있나요?"
   - "예: iOS는 ActionSheet, Android는 BottomSheet"

### 대화 원칙

- 컴포넌트 목록을 먼저 제안하고 확인 받기
- 각 컴포넌트의 용도를 쉽게 설명
- **Web**: "v0에서 바로 만들 수 있는 형태"로 명세
- **Mobile**: "React Native/Flutter로 바로 구현 가능한 형태"로 명세
- MVP에 필요한 최소 컴포넌트에 집중
- **플랫폼 가이드라인 준수** (iOS HIG, Material Design 3)

## 산출물

플랫폼 선택에 따라 다른 파일이 생성됩니다:

- **Web**: `outputs/stage-2/component-spec-web.md`
- **Mobile**: `outputs/stage-2/component-spec-mobile.md`
- **Both**: 두 파일 모두 생성

---

### Web 컴포넌트 명세 템플릿

`outputs/stage-2/component-spec-web.md`

```markdown
# Component Spec (Web)

## 메타데이터
- Stage: 2
- Step: 2.3 - 컴포넌트 명세 (Web)
- 생성일시: {현재 시간}
- 상태: draft
- 플랫폼: Web
- UI 라이브러리: {shadcn/ui | Material UI | Chakra UI | etc.}

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

---

## Feedback

### Modal

**용도**: 중요 정보, 확인 다이얼로그

**Sizes**:
| Size | Width |
|------|-------|
| sm | 400px |
| md | 500px |
| lg | 600px |

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

## 다음 단계

이 컴포넌트들을 사용해서 각 화면의 와이어프레임을 그립니다.
```

---

### Mobile 컴포넌트 명세 템플릿

`outputs/stage-2/component-spec-mobile.md`

```markdown
# Component Spec (Mobile)

## 메타데이터
- Stage: 2
- Step: 2.3 - 컴포넌트 명세 (Mobile)
- 생성일시: {현재 시간}
- 상태: draft
- 플랫폼: Mobile (iOS/Android)
- 기술 스택: {React Native | Flutter | Native}
- UI 라이브러리: {React Native Paper | NativeBase | Flutter Material | etc.}

## 컴포넌트 목록

### Overview

| Category | Components | Count |
|----------|------------|-------|
| Buttons | Button, FAB, IconButton | 3 |
| Inputs | TextInput, SearchBar, Switch, Picker | 4 |
| Display | Card, Chip, Avatar, ListItem | 4 |
| Feedback | Snackbar, Dialog, ActivityIndicator | 3 |
| Navigation | AppBar, BottomNavigation, TabBar | 3 |
| Overlay | BottomSheet, Modal, ActionSheet | 3 |
| **Total** | | **20** |

---

## Buttons

### Button

**용도**: 주요/보조 액션

**Variants**:
| Mode | Style | Usage |
|------|-------|-------|
| contained | 배경색 채움 | 주요 액션 |
| outlined | 테두리만 | 보조 액션 |
| text | 텍스트만 | 덜 강조되는 액션 |

**Sizes** (React Native Paper 기준):
| Size | Height | 설명 |
|------|--------|------|
| compact | 32dp | 작은 공간 |
| default | 40dp | 기본 |

**Props**:
- `mode`: contained | outlined | text
- `disabled`: boolean
- `loading`: boolean
- `icon`: string (optional)

---

### FAB (Floating Action Button)

**용도**: 화면의 주요 액션 (글쓰기, 추가 등)

**Variants**:
| Size | Diameter | Icon Size |
|------|----------|-----------|
| small | 40dp | 24dp |
| default | 56dp | 24dp |
| large | 96dp | 36dp |

**Position**: 보통 화면 우하단 (Bottom: 16dp, Right: 16dp)

---

### IconButton

**용도**: 아이콘만 있는 버튼 (좋아요, 공유, 메뉴 등)

**Sizes**:
| Size | Touch Target | Icon Size |
|------|--------------|-----------|
| small | 40dp | 20dp |
| default | 48dp | 24dp |

---

## Inputs

### TextInput

**용도**: 텍스트 입력

**Variants**:
| Mode | Style | Usage |
|------|-------|-------|
| flat | 하단 라인만 | 가벼운 폼 |
| outlined | 전체 테두리 | 명확한 폼 |

**States**:
| State | 설명 |
|-------|------|
| default | 기본 상태 |
| focused | 포커스 (Primary 색상 강조) |
| error | 에러 (빨간 테두리 + 에러 메시지) |
| disabled | 비활성화 (흐린 색상) |

**Anatomy**:
```
+---------------------------+
| Label                     |
| [텍스트 입력 영역]          |
| Helper text               |
+---------------------------+
```

---

### SearchBar

**용도**: 검색 입력

**Anatomy**:
```
+-------------------------------+
| [돋보기] 검색어 입력...   [X] |
+-------------------------------+
```

---

### Switch / Toggle

**용도**: On/Off 설정

**Platform Difference**:
| Platform | Style |
|----------|-------|
| iOS | 둥근 토글 (UISwitch 스타일) |
| Android | Material Switch (트랙 + 썸) |

---

## Display

### Card

**용도**: 콘텐츠 그룹화

**Variants**:
| Mode | Elevation | Border |
|------|-----------|--------|
| elevated | 2-4dp | none |
| outlined | 0 | 1dp Gray |
| contained | 0 | none, 배경색 |

**Anatomy**:
```
+---------------------------+
| [이미지 / 미디어]          |  <- optional
|---------------------------|
| Title                     |
| Subtitle                  |
|---------------------------|
| Content                   |
|---------------------------|
| [Action1]    [Action2]    |  <- optional
+---------------------------+
```

---

### ListItem

**용도**: 리스트의 각 항목

**Anatomy**:
```
+-------------------------------------------+
| [Avatar] Title                    [>]     |
|         Description                       |
+-------------------------------------------+
```

**Variants**:
- Single line
- Two line (title + description)
- Three line (title + 2 lines)

---

### Chip

**용도**: 태그, 필터, 선택지

**Variants**:
| Type | Usage |
|------|-------|
| input | 입력값 표시 (삭제 가능) |
| choice | 단일 선택 |
| filter | 다중 선택 (체크 아이콘) |
| action | 액션 트리거 |

---

## Feedback

### Snackbar

**용도**: 일시적 알림 (Toast와 유사)

**Position**: 화면 하단 (Bottom Navigation 위)

**Anatomy**:
```
+------------------------------------------+
| 메시지 텍스트                    [ACTION] |
+------------------------------------------+
```

**Duration**: 4-10초 후 자동 dismiss

---

### Dialog

**용도**: 중요 정보, 확인 요청

**Anatomy**:
```
+----------------------------------+
|            Title                 |
|                                  |
|     Dialog content               |
|                                  |
|     [Cancel]        [Confirm]   |
+----------------------------------+
```

**Platform Difference**:
| Platform | Style |
|----------|-------|
| iOS | 중앙 정렬, 라운드 |
| Android | Material Dialog |

---

### ActivityIndicator

**용도**: 로딩 상태

**Variants**:
| Type | Usage |
|------|-------|
| circular | 일반 로딩 |
| linear | 진행률 표시 (다운로드 등) |

---

## Navigation

### AppBar (Header)

**용도**: 화면 상단 네비게이션

**Anatomy**:
```
+------------------------------------------+
| [<] 화면 제목                    [...] [?] |
+------------------------------------------+
```

**Variants**:
| Type | Usage |
|------|-------|
| default | 일반 화면 |
| prominent | 큰 제목, 스크롤 시 축소 |
| search | 검색바 포함 |

---

### BottomNavigation

**용도**: 메인 탭 네비게이션

**Anatomy**:
```
+------------------------------------------+
|   [아이콘]  [아이콘]  [아이콘]  [아이콘]   |
|    홈       검색      알림     프로필     |
+------------------------------------------+
```

**Guidelines**:
- 3-5개 탭 권장
- 각 탭은 아이콘 + 라벨
- Active 탭 강조 (Primary 색상)

---

## Overlay

### BottomSheet

**용도**: 추가 옵션, 상세 정보

**Anatomy**:
```
+------------------------------------------+
| ─────────────────────                    |  <- Handle
| Sheet Title                              |
+------------------------------------------+
| Option 1                                 |
| Option 2                                 |
| Option 3                                 |
+------------------------------------------+
```

**Behavior**: 스와이프로 닫기, 배경 탭으로 닫기

---

### ActionSheet (iOS) / BottomSheet (Android)

**용도**: 액션 선택

**Platform Difference**:
| Platform | Style |
|----------|-------|
| iOS | 하단에서 올라오는 ActionSheet |
| Android | BottomSheet 스타일 |

---

## Safe Area & Spacing

### Safe Area
| Area | iOS | Android |
|------|-----|---------|
| Top | 44-47pt (notch) | 24dp (status bar) |
| Bottom | 34pt (home indicator) | 48dp (nav bar) |

### Touch Target
- 최소 44x44pt (iOS) / 48x48dp (Android)

---

## 사용 화면 매핑

| Component | 사용 화면 |
|-----------|----------|
| Button | {화면 목록} |
| Card | {화면 목록} |
| BottomSheet | {화면 목록} |

## 다음 단계

이 컴포넌트들을 사용해서 각 화면의 와이어프레임을 그립니다.
```

## 완료 조건

- 모든 필요 컴포넌트가 식별됨
- 각 컴포넌트의 variants/states 정의됨
- 컴포넌트 사용처(화면) 매핑됨
- **Web**: `component-spec-web.md` 파일 생성
- **Mobile**: `component-spec-mobile.md` 파일 생성
- **Both**: 두 파일 모두 생성

## 다음 Step

-> Step 2.4: Wireframes (와이어프레임)
