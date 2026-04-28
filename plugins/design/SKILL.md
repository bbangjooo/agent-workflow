# Stage 2: Design (디자인)

1인 창업자의 PRD를 개발 가능한 디자인 명세로 발전시키는 워크플로우 플러그인입니다. 산출물은 다음 규칙으로 정리합니다 — `brand/` · `ui/` · `character/` 카테고리 트리, 번호 파일, 메타 헤더, 변경 이력, 단일 진입점 README.

## 개요

이 플러그인은 Stage 1(기획)의 PRD와 화면 구조를 입력으로 받아, 개발자가 바로 구현할 수 있는 디자인 명세를 생성합니다.

> **핵심 철학**: "AI가 디자인을 못하는 게 아니라, 우리가 AI에게 너무 많은 결정을 위임했다."
> 레퍼런스 → 숫자(CSS 토큰) → 공통 컴포넌트 → 페이지 순서를 지키면 AI 산출물 퀄리티가 확 달라진다.

> **정리 패턴**: brand/ui 카테고리 분할 + 번호 파일 + 메타 헤더 + 변경 이력 + 빠른 탐색 README. orchestrator/develop과의 인터페이스는 **단일 진입점 README**가 담당.

**Web과 Mobile 플랫폼을 분리하여 각각에 맞는 디자인 명세를 생성합니다.**

> **이모지 사용 금지.** 모든 디자인 산출물에서 이모지 대신 아이콘 라이브러리(Lucide, Heroicons 등)의 SVG 아이콘을 사용한다. 상세 가이드는 `references/icon-libraries/overview.md` 참조.

## 사전 조건

- Stage 1 완료 (`/plan`)
- `outputs/stage-1/prd.md` 파일 존재
- `outputs/stage-1/screen-structure.md` 파일 존재

## 사용 방법

```
/design
```

이 커맨드 하나로 Design Coach 에이전트가 전체 워크플로우를 안내합니다.

## 워크플로우

```
/design 실행
    |
Design Coach 에이전트가 대화 주도
    |
+-------------------------------------------------------------+
|  Step 2.0: Platform Selection (플랫폼 선택)                   |
|  스킬: platform-selection                                    |
|  산출물: platform-selection.md                               |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.1: Screen Analysis (기획 분석)                        |
|  스킬: screen-analysis                                       |
|  산출물: ui/01-screen-analysis.md                            |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.2: Reference + Brand Identity                        |
|  스킬: reference-collection                                  |
|  산출물: ui/02-references.md + brand/01-identity.md          |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.3: Wireframes (와이어프레임)                          |
|  스킬: wireframes                                            |
|  산출물: ui/03-wireframes-{platform}.md                      |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.4: Design Tokens (3개 분할)                          |
|  스킬: design-tokens                                         |
|  산출물 (3개):                                                |
|    - brand/02-color.md (팔레트 + WCAG)                       |
|    - brand/03-typography.md (폰트 + 타입 스케일)              |
|    - ui/04-tokens.md (spacing/radius/shadow + globals.css)   |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.5: Component Spec (공통 컴포넌트 명세)                |
|  스킬: component-spec                                        |
|  산출물: ui/05-components-{platform}.md                      |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.6: Design Spec (핸드오프 통합)                        |
|  스킬: design-spec                                           |
|  산출물: design-spec-{platform}.md (brand+ui 링크)           |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.7: Animation Spec (애니메이션 명세)                   |
|  스킬: animation-spec                                        |
|  산출물: ui/06-animation.md                                  |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.8: Pen Prototype (.pen 파일 프로토타입)               |
|  스킬: pen-prototype                                         |
|  도구: Pencil MCP                                            |
|  산출물: prototype-{platform}.pen                            |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.9: Design Index (README — 표준 진입점) ★ NEW         |
|  스킬: design-index                                          |
|  산출물: README.md (orchestrator/develop의 인터페이스)        |
+-------------------------------------------------------------+
```

## 주요 컴포넌트

### Command

- **/design**: Stage 2 전체 워크플로우 시작 (유일한 진입점)

### Agent

- **Design Coach**: 시각적이고 실용적인 디자인 코치. Step 순서를 관리하며 사용자와 대화를 통해 디자인 명세를 완성하고, 마지막에 단일 진입점 README를 생성합니다.

### Skills

| 스킬 | Step | 설명 |
|------|------|------|
| platform-selection | 2.0 | 타겟 플랫폼 선택 (Web/Mobile/Both) |
| screen-analysis | 2.1 | 화면별 목적/유저상황/정보위계 분석 |
| reference-collection | 2.2 | 레퍼런스 + 브랜드 정체성 (2개 파일 출력) |
| wireframes | 2.3 | 레퍼런스 기반 화면 구조 확정 |
| design-tokens | 2.4 | 3개 파일 분할 (brand/color, brand/typography, ui/tokens) |
| component-spec | 2.5 | 공통 UI 컴포넌트 라이브러리 명세 |
| design-spec | 2.6 | brand+ui 통합 핸드오프 문서 |
| animation-spec | 2.7 | 애니메이션/마이크로인터랙션 명세 |
| pen-prototype | 2.8 | Pencil MCP로 .pen 파일 프로토타입 생성 |
| **design-index** | **2.9** | **README 자동 생성 (표준 진입점)** ★ NEW |

## 산출물

모든 산출물은 `outputs/stage-2/` 디렉토리에 다음 트리로 저장됩니다.

### Web 선택 시
```
outputs/stage-2/
├── README.md                          (2.9 ★ 표준 진입점)
├── platform-selection.md              (2.0)
├── brand/
│   ├── 01-identity.md                 (2.2)
│   ├── 02-color.md                    (2.4)
│   └── 03-typography.md               (2.4)
├── ui/
│   ├── 01-screen-analysis.md          (2.1)
│   ├── 02-references.md               (2.2)
│   ├── 03-wireframes-web.md           (2.3)
│   ├── 04-tokens.md                   (2.4)
│   ├── 05-components-web.md           (2.5)
│   └── 06-animation.md                (2.7)
├── design-spec-web.md                 (2.6 핸드오프)
└── prototype-web.pen                  (2.8)
```

### Mobile 선택 시
```
outputs/stage-2/
├── README.md
├── platform-selection.md
├── brand/{01-identity, 02-color, 03-typography}.md
├── ui/
│   ├── 01-screen-analysis.md
│   ├── 02-references.md
│   ├── 03-wireframes-mobile.md
│   ├── 04-tokens.md
│   ├── 05-components-mobile.md
│   └── 06-animation.md
├── design-spec-mobile.md
└── prototype-mobile.pen
```

### 메타 헤더 규약

모든 `.md` 산출물 상단에 YAML frontmatter를 필수 포함:

```yaml
---
owner: 솔로 창업자
status: Draft | In Review | Approved
last_updated: YYYY-MM-DD
stage: 2
step: "2.x — {Step 이름}"
---
```

- **Draft**: 작성 중. 의사결정 도구로 사용 금지.
- **In Review**: 사용자 검토 대기.
- **Approved**: 사용자 승인 완료. 변경 시 변경 이력에 기록.

각 산출물 하단에는 변경 이력 표를 둔다.

## orchestrator / develop 통합 (인터페이스 계약)

- **orchestrator/build-project**: Stage 3 (Design) 완료 조건 = `outputs/stage-2/README.md` 존재
- **develop/design-to-dev-bridge**: 입력은 `outputs/stage-2/README.md`. 그 안의 빠른 탐색 링크를 따라 brand/ui 산출물을 소비.

이 인터페이스 덕분에 design 내부의 트리 구조가 바뀌어도 develop은 영향받지 않는다 (README가 인터페이스 계약).

## 다음 단계

Stage 2 완료(README.md 생성) 후 `design-spec-{platform}.md`와 README를 기반으로 **Stage 4: Development** 단계로 진행합니다.

```
/develop  # Stage 4 시작
```

## 의존성

- `planning` 플러그인
- `workflow-state-manager` 플러그인 (상태 추적용, 선택사항)

## References

레퍼런스 문서는 `references/` 디렉토리에 있습니다:

### Web UI 라이브러리
| 문서 | 설명 |
|------|------|
| shadcn-ui.md | shadcn/ui + Radix UI + Tailwind CSS 가이드 |
| material-ui.md | Google Material Design 기반 MUI 가이드 |
| tailwind-daisyui.md | Tailwind CSS + DaisyUI 테마 시스템 가이드 |
| chakra-ui.md | 접근성 중심 Chakra UI 가이드 |
| ant-design.md | 엔터프라이즈급 Ant Design 가이드 |

### 랜딩 페이지
| 문서 | 설명 |
|------|------|
| rapportlabs-style.md | 라포랩스 스타일 랜딩 |
| hermes-agent-style.md | Hermes Agent 스타일 — 다크 해커 미학 |
| conductor-style.md | Conductor 스타일 — B2B 다크 테마 |

### Mobile UI 라이브러리
| 문서 | 설명 |
|------|------|
| react-native-paper.md | React Native Paper (Material Design 3) 가이드 |
| nativebase.md | NativeBase 크로스플랫폼 컴포넌트 가이드 |
| flutter-material.md | Flutter Material Design 가이드 |

## 1인 창업자를 위한 핵심 포인트

1. **기획 분석 먼저**: 화면 목적/유저 상황/정보 위계를 먼저 정리
2. **레퍼런스 기반**: 실제 서비스의 패턴/UX/컴포넌트 분석
3. **구조 먼저, 톤 나중에**: 와이어프레임 확정 후 디자인 토큰
4. **3단계 토큰 + 접근성**: Base→Semantic→Component 토큰, WCAG AA 명암비 필수
5. **시맨틱 네이밍**: Gray-900 대신 `text-default` 같은 용도 기반 이름
6. **공통 컴포넌트 우선**: 테마 → 컴포넌트 → 페이지 순서 엄격 준수
7. **애니메이션 포함**: Framer Motion/GSAP 기반 인터랙션 명세
8. **플랫폼별 분리**: Web과 Mobile 각각의 디자인 패턴 구분
9. **카테고리식 정리**: brand/ui 트리 + 메타 헤더 + 변경 이력 + 인덱스 README
10. **README가 인터페이스**: orchestrator/develop은 README만 본다 — 내부 트리 변경은 자유
