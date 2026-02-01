# Pen Prototype

Step 2.7: .pen 파일 프로토타입 생성

## 설명

design-spec이 완료된 후, pencil MCP를 사용하여 실제 시각적 UI 프로토타입을 .pen 파일로 생성하는 스킬입니다. 마크다운으로 정의된 디자인 명세를 실제 디자인 파일로 변환합니다.

**플랫폼에 따라 별도의 .pen 파일을 생성합니다.**

## 트리거

- Step 2.6 (Design Spec) 완료 후 자동 실행
- `design-spec-{platform}.md` 파일이 존재할 때

## 입력

- `outputs/stage-2/platform-selection.md` (플랫폼 확인)
- `outputs/stage-2/color-palette.md`
- `outputs/stage-2/visual-direction.md`
- `outputs/stage-2/design-system.md`
- `outputs/stage-2/component-spec-{platform}.md`
- `outputs/stage-2/wireframes-{platform}.md`
- `outputs/stage-2/design-spec-{platform}.md`

## 실행 내용

### 사전 작업

1. **platform-selection.md 확인** - Web/Mobile/Both 중 어떤 플랫폼인지 확인
2. 모든 디자인 산출물 읽기
3. 색상, 타이포그래피, 컴포넌트 정보 추출

### Pencil MCP 도구 사용 순서

#### 1단계: 스타일 가이드 및 가이드라인 로드

```
1. mcp__pencil__get_style_guide_tags 호출
   - 사용 가능한 스타일 태그 목록 확인

2. mcp__pencil__get_style_guide 호출
   - visual-direction.md의 키워드를 기반으로 적절한 태그 선택
   - 예: ["modern", "minimal", "webapp", "dashboard"] 등

3. mcp__pencil__get_guidelines 호출
   - topic: "design-system" (컴포넌트 기반 디자인 시)
   - topic: "landing-page" (랜딩 페이지 디자인 시)
```

#### 2단계: .pen 파일 생성 및 설정

```
1. mcp__pencil__open_document 호출
   - filePathOrTemplate: "new" (새 문서 생성)

2. mcp__pencil__get_editor_state 호출
   - 현재 에디터 상태 확인
   - 스키마 정보 포함 요청 (include_schema: true)

3. mcp__pencil__set_variables 호출
   - color-palette.md의 색상을 변수로 등록
   - design-system.md의 타이포그래피, 간격을 변수로 등록
```

#### 3단계: 화면 디자인 생성

```
1. wireframes-{platform}.md의 각 화면에 대해:

   a. mcp__pencil__find_empty_space_on_canvas 호출
      - 새 화면을 배치할 빈 공간 찾기

   b. mcp__pencil__batch_design 호출
      - 화면 프레임 생성
      - 레이아웃 구조 생성 (Header, Content, Footer 등)
      - 컴포넌트 배치
      - 스타일 적용

2. 각 화면 생성 후:

   a. mcp__pencil__get_screenshot 호출
      - 생성된 화면 시각적 검증
      - 레이아웃 오류 확인
```

### 플랫폼별 디자인 접근

#### Web 플랫폼

- **화면 크기**: Desktop 1440x900, Tablet 768x1024, Mobile 375x812
- **레이아웃**: 반응형 그리드 기반
- **컴포넌트**: shadcn/ui 스타일 참조

```javascript
// Web 화면 프레임 예시
screen=I(document, {
  type: "frame",
  name: "Home - Desktop",
  width: 1440,
  height: 900,
  layout: "vertical",
  fill: "#FFFFFF"
})
```

#### Mobile 플랫폼

- **화면 크기**: iPhone 390x844, Android 360x800
- **레이아웃**: 세로 스크롤 기반
- **컴포넌트**: iOS HIG / Material Design 3 참조

```javascript
// Mobile 화면 프레임 예시
screen=I(document, {
  type: "frame",
  name: "Home - Mobile",
  width: 390,
  height: 844,
  layout: "vertical",
  fill: "#FFFFFF"
})
```

### 디자인 생성 규칙

#### 색상 변수 설정

```javascript
// color-palette.md 기반 변수 설정
{
  "primary": {
    "value": "#3B82F6",
    "themed": {
      "theme": {
        "light": "#3B82F6",
        "dark": "#60A5FA"
      }
    }
  },
  "primary-light": { "value": "#DBEAFE" },
  "neutral-900": { "value": "#111827" },
  "neutral-100": { "value": "#F3F4F6" },
  "success": { "value": "#10B981" },
  "error": { "value": "#EF4444" }
}
```

#### 타이포그래피 적용

```javascript
// design-system.md 기반 텍스트 스타일
// Heading
{ type: "text", content: "제목", fontSize: 32, fontWeight: 700 }

// Body
{ type: "text", content: "본문", fontSize: 16, fontWeight: 400 }

// Caption
{ type: "text", content: "캡션", fontSize: 12, fontWeight: 400, fill: "#6B7280" }
```

#### 컴포넌트 생성

```javascript
// Button Primary
button=I(parent, {
  type: "frame",
  name: "Button Primary",
  layout: "horizontal",
  padding: [12, 24],
  cornerRadius: [8, 8, 8, 8],
  fill: "var:primary",
  gap: 8
})
label=I(button, {
  type: "text",
  content: "버튼 텍스트",
  fontSize: 14,
  fontWeight: 600,
  fill: "#FFFFFF"
})

// Card
card=I(parent, {
  type: "frame",
  name: "Card",
  layout: "vertical",
  padding: 16,
  cornerRadius: [12, 12, 12, 12],
  fill: "#FFFFFF",
  stroke: "#E5E7EB",
  strokeThickness: 1,
  gap: 12
})

// Input Field
input=I(parent, {
  type: "frame",
  name: "Input",
  layout: "horizontal",
  padding: [12, 16],
  cornerRadius: [8, 8, 8, 8],
  fill: "#FFFFFF",
  stroke: "#D1D5DB",
  strokeThickness: 1,
  width: "fill_container"
})
```

### 질문 가이드

1. **화면 우선순위**
   - "어떤 화면부터 프로토타입으로 만들까요?"
   - "MVP에서 가장 중요한 화면 3개를 선택해주세요."

2. **스타일 확인**
   - "이 스타일 가이드가 원하시는 분위기와 맞나요?"
   - "색상이나 분위기를 조정하고 싶은 부분이 있나요?"

3. **컴포넌트 확인**
   - "각 화면에 필요한 컴포넌트가 맞나요?"
   - "추가하거나 수정할 컴포넌트가 있나요?"

### 대화 원칙

- 한 화면씩 순차적으로 생성
- 각 화면 생성 후 스크린샷으로 시각적 확인
- 사용자 피드백 반영하여 수정
- 생성된 .pen 파일 경로 안내

## 산출물

플랫폼 선택에 따라 다른 파일이 생성됩니다:

- **Web**: `outputs/stage-2/prototype-web.pen`
- **Mobile**: `outputs/stage-2/prototype-mobile.pen`
- **Both**: 두 파일 모두 생성

### 산출물 구조

```
prototype-{platform}.pen
├── Design System (재사용 가능한 컴포넌트)
│   ├── Button Primary
│   ├── Button Secondary
│   ├── Input Field
│   ├── Card
│   ├── Header
│   └── ...
└── Screens
    ├── S01: 홈 화면
    ├── S02: 상세 화면
    ├── S03: 리스트 화면
    └── ...
```

### Pencil MCP 작업 흐름 요약

```
1. get_style_guide_tags → 스타일 태그 확인
2. get_style_guide → 디자인 영감 획득
3. get_guidelines("design-system") → 디자인 규칙 확인
4. open_document("new") → 새 .pen 파일 생성
5. get_editor_state → 에디터 상태 확인
6. set_variables → 디자인 토큰 설정
7. batch_design → 컴포넌트 및 화면 생성
8. get_screenshot → 결과물 검증
9. batch_design → 피드백 반영 수정
```

## 완료 조건

- 선택된 플랫폼의 모든 핵심 화면이 .pen 파일에 생성됨
- 디자인 시스템 컴포넌트가 재사용 가능하게 정의됨
- 색상, 타이포그래피, 간격이 변수로 설정됨
- 각 화면의 레이아웃이 wireframes와 일치함
- 사용자가 스크린샷으로 결과물 확인 및 승인
- **Web**: `prototype-web.pen` 파일 생성
- **Mobile**: `prototype-mobile.pen` 파일 생성
- **Both**: 두 파일 모두 생성

## Stage 2 완료

Pen Prototype이 완료되면 Stage 2가 종료됩니다.
다음 Stage는 **Stage 3: Development (개발)**입니다.

개발 단계에서는 생성된 .pen 파일을 참조하여 실제 코드를 구현합니다.
pencil MCP의 `get_guidelines("code")` 또는 `get_guidelines("tailwind")`를 사용하여 코드 생성 가이드를 얻을 수 있습니다.
