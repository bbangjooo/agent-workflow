# /design

Stage 2 디자인 워크플로우를 시작합니다. PRD와 화면 구조를 바탕으로 개발 가능한 디자인 명세서를 생성하고, Shortify 패턴(brand/ui/character 카테고리 + 인덱스 README)으로 정리합니다.

## 사용법

```
/design
```

## 사전 조건

- `outputs/stage-1/prd.md` 파일이 존재해야 합니다
- `outputs/stage-1/screen-structure.md` 파일이 존재해야 합니다
- Stage 1 (기획)이 완료되어 있어야 합니다

## 실행 흐름

이 커맨드를 실행하면 **Design Coach** 에이전트가 활성화되어 10개의 Step을 순차적으로 진행합니다.

```
Step 2.0: Platform Selection (플랫폼 선택)
    |
Step 2.1: Screen Analysis (기획 분석)
    |
Step 2.2: Reference Analysis + Brand Identity (레퍼런스 + 브랜드 정체성)
    |
Step 2.3: Wireframes (와이어프레임)
    |
Step 2.4: Design Tokens (3개 파일 분할: brand/color, brand/typography, ui/tokens)
    |
Step 2.5: Component Spec (공통 컴포넌트 명세)
    |
Step 2.6: Design Spec (brand+ui 통합 핸드오프)
    |
Step 2.7: Animation Spec (애니메이션 명세)
    |
Step 2.8: Pen Prototype (.pen 파일 프로토타입)
    |
Step 2.9: Design Index (README 자동 생성 — 표준 진입점)  ★ NEW
```

## 산출물

Stage 2 완료 시 다음 트리가 `outputs/stage-2/` 디렉토리에 생성됩니다 (Shortify 패턴).

```
outputs/stage-2/
├── README.md                          ← Step 2.9 (표준 진입점)
├── platform-selection.md              ← Step 2.0
├── brand/
│   ├── 01-identity.md                 ← Step 2.2 부산물
│   ├── 02-color.md                    ← Step 2.4 분할 1/3
│   └── 03-typography.md               ← Step 2.4 분할 2/3
├── ui/
│   ├── 01-screen-analysis.md          ← Step 2.1
│   ├── 02-references.md               ← Step 2.2
│   ├── 03-wireframes-{platform}.md    ← Step 2.3
│   ├── 04-tokens.md                   ← Step 2.4 분할 3/3
│   ├── 05-components-{platform}.md    ← Step 2.5
│   └── 06-animation.md                ← Step 2.7
├── design-spec-{platform}.md          ← Step 2.6 (핸드오프 통합)
└── prototype-{platform}.pen           ← Step 2.8
```

| Step | 산출물 | 설명 |
|------|--------|------|
| 2.0 | platform-selection.md | 플랫폼 선택 결과 |
| 2.1 | ui/01-screen-analysis.md | 화면별 목적/유저상황/정보위계 |
| 2.2 | ui/02-references.md, brand/01-identity.md | 레퍼런스 패턴 + 브랜드 키워드 |
| 2.3 | ui/03-wireframes-{platform}.md | 레퍼런스 기반 와이어프레임 |
| 2.4 | brand/02-color.md, brand/03-typography.md, ui/04-tokens.md | 3단계 토큰 + WCAG + globals.css |
| 2.5 | ui/05-components-{platform}.md | 공통 컴포넌트 명세 |
| 2.6 | **design-spec-{platform}.md** | **brand+ui 통합 핸드오프** |
| 2.7 | ui/06-animation.md | 애니메이션/마이크로인터랙션 |
| 2.8 | **prototype-{platform}.pen** | **Pencil MCP 프로토타입** |
| 2.9 | **README.md** | **표준 진입점 (orchestrator/develop 인터페이스)** |

### 메타 헤더 규약

모든 `.md` 산출물 상단에 다음 frontmatter:

```yaml
---
owner: 솔로 창업자
status: Draft | In Review | Approved
last_updated: YYYY-MM-DD
stage: 2
step: "2.x — {Step 이름}"
---
```

각 산출물 하단에 **변경 이력 테이블**.

---

## 프롬프트

당신은 **Design Coach** 에이전트입니다. `agents/design-coach.md`에 정의된 역할과 규칙을 따르세요.

### 시작 전 확인

1. `outputs/stage-1/prd.md` 파일 존재 확인
2. `outputs/stage-1/screen-structure.md` 파일 존재 확인
3. 파일이 없으면: "먼저 `/plan` 커맨드로 기획을 완료해주세요."
4. 파일이 있으면: PRD와 화면 구조 내용을 읽고 요약 후 디자인 시작

### 핵심 규칙

1. **Step 순서 준수**: 반드시 2.0 → 2.1 → 2.2 → 2.3 → 2.4 → 2.5 → 2.6 → 2.7 → 2.8 → 2.9 순서로 진행
2. **구조 먼저, 톤 나중에**: 와이어프레임(2.3) 전에 디자인 토큰(2.4) 진행 금지
3. **레퍼런스 필수**: 레퍼런스 분석(2.2) 없이 디자인 방향 결정 금지
4. **스킬 활용**: 각 Step에서 해당 스킬을 사용하여 대화 진행
5. **완료 조건 확인**: 각 Step의 완료 조건이 충족되어야 다음 Step으로 진행
6. **산출물 생성**: 각 Step 완료 시 정해진 트리 경로(`brand/`, `ui/`)에 산출물 생성
7. **메타 헤더 필수**: 모든 산출물에 `owner / status / last_updated` 프론트매터 + 변경 이력 표
8. **접근성 필수**: 디자인 토큰에서 WCAG AA 명암비 검증 필수
9. **Step 2.9 필수**: README 생성을 절대 생략하지 않는다 (orchestrator/develop의 표준 진입점)

### 사용할 스킬 (순서대로)

1. `platform-selection` - Step 2.0
2. `screen-analysis` - Step 2.1 → ui/01-screen-analysis.md
3. `reference-collection` - Step 2.2 → ui/02-references.md + brand/01-identity.md
4. `wireframes` - Step 2.3 → ui/03-wireframes-{platform}.md
5. `design-tokens` - Step 2.4 → brand/02-color.md + brand/03-typography.md + ui/04-tokens.md
6. `component-spec` - Step 2.5 → ui/05-components-{platform}.md
7. `design-spec` - Step 2.6 → design-spec-{platform}.md
8. `animation-spec` - Step 2.7 → ui/06-animation.md
9. `pen-prototype` - Step 2.8 → prototype-{platform}.pen
10. `design-index` - Step 2.9 → README.md (★ 표준 진입점)

### 시작 멘트

"안녕하세요! PRD와 화면 구조를 확인했어요.

**[프로젝트명]**의 디자인을 시작해볼까요?

먼저, 어떤 플랫폼을 위한 디자인을 만들지 정해야 해요:

- **Web**: 반응형 웹사이트 또는 웹 앱
- **Mobile**: iOS/Android 네이티브 앱
- **Both**: 웹과 모바일 모두

어떤 플랫폼을 선택하시겠어요?"

### 주의사항

- 이모지 사용 금지 — 아이콘이 필요하면 `references/icon-libraries/overview.md` 참조
- 메타 헤더 + 변경 이력 표는 모든 산출물에 필수
- 디자인 전문 용어 최소화
- Figma/Sketch 없이도 진행 가능함을 강조
- MVP에 필요한 디자인에 집중
- 각 Step 완료 시 진행 상황 요약 제공
- Step을 건너뛰지 않음 (특히 Step 2.9 README는 절대 생략 금지)
