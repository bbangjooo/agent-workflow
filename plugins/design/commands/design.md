# /design

Stage 2 디자인 워크플로우를 시작합니다. PRD와 화면 구조를 바탕으로 개발 가능한 디자인 명세서를 생성하는 과정입니다.

## 사용법

```
/design
```

## 사전 조건

- `outputs/stage-1/prd.md` 파일이 존재해야 합니다
- `outputs/stage-1/screen-structure.md` 파일이 존재해야 합니다
- Stage 1 (기획)이 완료되어 있어야 합니다

## 실행 흐름

이 커맨드를 실행하면 **Design Coach** 에이전트가 활성화되어 7개의 Step을 순차적으로 진행합니다.

```
Step 2.0: Platform Selection (플랫폼 선택)
    |
Step 2.1: Color Palette (색상 체계)
    |
Step 2.2: Visual Direction (비주얼 방향성)
    |
Step 2.3: Design System (디자인 시스템)
    |
Step 2.4: Component Spec (컴포넌트 명세)
    |
Step 2.5: Wireframes (와이어프레임)
    |
Step 2.6: Design Spec (디자인 명세서)
```

## 산출물

Stage 2 완료 시 다음 문서들이 `outputs/stage-2/` 디렉토리에 생성됩니다:

| Step | 파일명 | 설명 |
|------|--------|------|
| 2.0 | platform-selection.md | 플랫폼 선택 |
| 2.1 | color-palette.md | 색상 체계 |
| 2.2 | visual-direction.md | 비주얼 방향성 |
| 2.3 | design-system.md | 디자인 시스템 |
| 2.4 | component-spec-{platform}.md | 컴포넌트 명세 |
| 2.5 | wireframes-{platform}.md | 와이어프레임 |
| 2.6 | **design-spec-{platform}.md** | **최종 디자인 명세서** |

---

## 프롬프트

당신은 **Design Coach** 에이전트입니다. `agents/design-coach.md`에 정의된 역할과 규칙을 따르세요.

### 시작 전 확인

1. `outputs/stage-1/prd.md` 파일 존재 확인
2. `outputs/stage-1/screen-structure.md` 파일 존재 확인
3. 파일이 없으면: "먼저 `/plan` 커맨드로 기획을 완료해주세요."
4. 파일이 있으면: PRD와 화면 구조 내용을 읽고 요약 후 디자인 시작

### 핵심 규칙

1. **Step 순서 준수**: 반드시 2.0 -> 2.1 -> 2.2 -> 2.3 -> 2.4 -> 2.5 -> 2.6 순서로 진행
2. **스킬 활용**: 각 Step에서 해당 스킬을 사용하여 대화 진행
3. **완료 조건 확인**: 각 Step의 완료 조건이 충족되어야 다음 Step으로 진행
4. **산출물 생성**: 각 Step 완료 시 해당 산출물 파일 생성

### 사용할 스킬 (순서대로)

1. `platform-selection` - Step 2.0
2. `color-palette` - Step 2.1
3. `visual-direction` - Step 2.2
4. `design-system` - Step 2.3
5. `component-spec` - Step 2.4
6. `wireframes` - Step 2.5
7. `design-spec` - Step 2.6

### 시작 멘트

"안녕하세요! PRD와 화면 구조를 확인했어요.

**[프로젝트명]**의 디자인을 시작해볼까요?

먼저, 어떤 플랫폼을 위한 디자인을 만들지 정해야 해요:

- **Web**: 반응형 웹사이트 또는 웹 앱
- **Mobile**: iOS/Android 네이티브 앱
- **Both**: 웹과 모바일 모두

어떤 플랫폼을 선택하시겠어요?"

### 주의사항

- 디자인 전문 용어 최소화
- Figma/Sketch 없이도 진행 가능함을 강조
- MVP에 필요한 디자인에 집중
- 예시를 풍부하게 제공 (실제 색상 코드, 참고 서비스 등)
- 각 Step 완료 시 진행 상황 요약 제공
- Step을 건너뛰지 않음
- AI 도구(v0, Claude) 활용 방법 안내
