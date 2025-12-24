# Platform Selection

Step 2.0: 플랫폼 선택

## 설명

디자인 워크플로우를 시작하기 전에 타겟 플랫폼을 선택하는 스킬입니다. 이 선택에 따라 이후 모든 디자인 산출물이 해당 플랫폼에 맞게 생성됩니다.

## 트리거

- `/design` 커맨드 실행 시 가장 먼저 실행
- Stage 1 산출물이 존재할 때

## 입력

- `outputs/stage-1/prd.md`
- `outputs/stage-1/screen-structure.md`

## 실행 내용

### 플랫폼 옵션

| 옵션 | 설명 | 산출물 |
|------|------|--------|
| **Web** | 웹 애플리케이션 전용 | `-web.md` 파일들 |
| **Mobile** | 모바일 앱 전용 (iOS/Android) | `-mobile.md` 파일들 |
| **Both** | 웹 + 모바일 모두 | 두 세트 모두 생성 |

### 질문 가이드

1. **플랫폼 확인**
   - "어떤 플랫폼을 위한 디자인을 만들까요?"
   - 옵션 제시:
     - **Web**: 반응형 웹사이트 또는 웹 앱
     - **Mobile**: iOS/Android 네이티브 앱
     - **Both**: 웹과 모바일 모두

2. **Mobile 선택 시 추가 질문**
   - "React Native, Flutter, 또는 네이티브(Swift/Kotlin) 중 어떤 기술을 사용할 예정인가요?"
   - 이 정보는 컴포넌트 명세에 반영됩니다.

3. **Both 선택 시 안내**
   - "웹과 모바일 각각의 디자인 명세를 만들어드릴게요."
   - "공통 디자인 시스템은 공유하고, 컴포넌트와 와이어프레임은 플랫폼별로 분리됩니다."

### 대화 원칙

- 명확한 옵션 제시
- 각 옵션의 차이점 간략 설명
- 사용자가 결정하기 쉽게 안내
- 기술 스택 정보 수집 (Mobile 선택 시)

### 플랫폼별 영향

#### Web 선택 시
- 컴포넌트: shadcn/ui, Material UI, Chakra UI 등 웹 라이브러리 기준
- 와이어프레임: Desktop + Responsive (Tablet, Mobile breakpoints)
- 기술 스택: React, Next.js, Vue 등

#### Mobile 선택 시
- 컴포넌트: React Native Paper, NativeBase, Flutter Widgets 등 모바일 라이브러리 기준
- 와이어프레임: iOS/Android 화면 크기 기준
- 기술 스택: React Native, Flutter, SwiftUI, Jetpack Compose 등
- 플랫폼 가이드라인: iOS Human Interface Guidelines, Material Design 3

#### Both 선택 시
- 공통: Visual Direction, Design System (색상, 타이포 등)
- 분리: Component Spec, Wireframes, Design Spec (각 플랫폼별)

## 산출물

`outputs/stage-2/platform-selection.md`

```markdown
# Platform Selection

## 메타데이터
- Stage: 2
- Step: 2.0 - 플랫폼 선택
- 생성일시: {현재 시간}
- 상태: final

## 선택된 플랫폼

### 타겟 플랫폼
- **Primary**: {Web | Mobile | Both}

### 플랫폼 상세

#### Web (해당 시)
- 반응형 지원: Desktop, Tablet, Mobile
- 프레임워크: {Next.js / React / Vue / etc.}
- UI 라이브러리: {shadcn/ui / Material UI / etc.}

#### Mobile (해당 시)
- 타겟 OS: iOS, Android
- 기술 스택: {React Native / Flutter / Native}
- UI 라이브러리: {React Native Paper / NativeBase / etc.}
- 디자인 가이드라인: {iOS HIG / Material Design 3}

## 산출물 구조

선택에 따라 다음 파일들이 생성됩니다:

### Web 전용
```
outputs/stage-2/
├── platform-selection.md
├── visual-direction.md
├── design-system.md
├── component-spec-web.md
├── wireframes-web.md
└── design-spec-web.md
```

### Mobile 전용
```
outputs/stage-2/
├── platform-selection.md
├── visual-direction.md
├── design-system.md
├── component-spec-mobile.md
├── wireframes-mobile.md
└── design-spec-mobile.md
```

### Both (웹 + 모바일)
```
outputs/stage-2/
├── platform-selection.md
├── visual-direction.md      # 공통
├── design-system.md         # 공통
├── component-spec-web.md
├── component-spec-mobile.md
├── wireframes-web.md
├── wireframes-mobile.md
├── design-spec-web.md
└── design-spec-mobile.md
```

## 다음 단계

플랫폼이 결정되었으니, 비주얼 방향성을 정의합니다.
```

## 완료 조건

- 플랫폼 선택 완료 (Web / Mobile / Both)
- Mobile 선택 시 기술 스택 확인
- `platform-selection.md` 파일이 생성됨

## 다음 Step

-> Step 2.1: Color Palette (색상 체계)
