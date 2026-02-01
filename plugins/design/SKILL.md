# Stage 2: Design (디자인)

1인 창업자의 PRD를 개발 가능한 디자인 명세로 발전시키는 워크플로우 플러그인입니다.

## 개요

이 플러그인은 Stage 1(기획)에서 생성된 PRD와 화면 구조를 입력으로 받아, 개발자가 바로 구현할 수 있는 디자인 명세를 생성합니다. 디자인 전문가가 아니어도 체계적인 디자인 시스템을 구축할 수 있습니다.

**Web과 Mobile 플랫폼을 분리하여 각각에 맞는 디자인 명세를 생성합니다.**

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
|  중요: Web / Mobile / Both 중 선택 → 이후 산출물 구조 결정      |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.1: Color Palette (색상 체계)                          |
|  스킬: color-palette                                         |
|  산출물: color-palette.md (공통)                              |
|  중요: 제품 성격에 맞는 색상 체계 결정                          |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.2: Visual Direction (비주얼 방향성)                   |
|  스킬: visual-direction                                      |
|  산출물: visual-direction.md (공통)                          |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.3: Design System (디자인 시스템)                      |
|  스킬: design-system                                         |
|  산출물: design-system.md (공통)                             |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.4: Component Spec (컴포넌트 명세)                     |
|  스킬: component-spec                                        |
|  산출물: 플랫폼별 분리                                        |
|    - Web: component-spec-web.md                              |
|    - Mobile: component-spec-mobile.md                        |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.5: Wireframes (와이어프레임)                          |
|  스킬: wireframes                                            |
|  산출물: 플랫폼별 분리                                        |
|    - Web: wireframes-web.md                                  |
|    - Mobile: wireframes-mobile.md                            |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.6: Design Spec (디자인 명세서)                        |
|  스킬: design-spec                                           |
|  산출물: 플랫폼별 분리                                        |
|    - Web: design-spec-web.md                                 |
|    - Mobile: design-spec-mobile.md                           |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.7: Pen Prototype (.pen 파일 프로토타입)              |
|  스킬: pen-prototype                                         |
|  도구: Pencil MCP                                            |
|  산출물: 플랫폼별 분리 (최종)                                  |
|    - Web: prototype-web.pen                                  |
|    - Mobile: prototype-mobile.pen                            |
+-------------------------------------------------------------+
```

## 주요 컴포넌트

### Command

- **/design**: Stage 2 전체 워크플로우 시작 (유일한 진입점)

### Agent

- **Design Coach**: 시각적이고 실용적인 디자인 코치. Step 순서를 관리하며 사용자와 대화를 통해 디자인 명세를 완성합니다. 플랫폼 선택에 따라 맞춤형 산출물을 생성합니다.

### Skills

| 스킬 | Step | 설명 |
|------|------|------|
| platform-selection | 2.0 | 타겟 플랫폼 선택 (Web/Mobile/Both) |
| color-palette | 2.1 | 제품 성격에 맞는 색상 체계 결정 |
| visual-direction | 2.2 | 브랜드 톤, 분위기, 참고 서비스 결정 |
| design-system | 2.3 | 타이포, 간격 등 디자인 시스템 정의 |
| component-spec | 2.4 | UI 컴포넌트 라이브러리 명세 (플랫폼별 분리) |
| wireframes | 2.5 | 화면별 레이아웃 및 와이어프레임 (플랫폼별 분리) |
| design-spec | 2.6 | 디자인 핸드오프 문서 (플랫폼별 분리) |
| pen-prototype | 2.7 | Pencil MCP로 .pen 파일 프로토타입 생성 (플랫폼별 분리) |

## 산출물

모든 산출물은 `outputs/stage-2/` 디렉토리에 저장됩니다.

### 플랫폼별 산출물 구조

#### Web 선택 시
```
outputs/stage-2/
├── platform-selection.md
├── color-palette.md
├── visual-direction.md
├── design-system.md
├── component-spec-web.md
├── wireframes-web.md
├── design-spec-web.md
└── prototype-web.pen        <- 최종 (Pencil MCP)
```

#### Mobile 선택 시
```
outputs/stage-2/
├── platform-selection.md
├── color-palette.md
├── visual-direction.md
├── design-system.md
├── component-spec-mobile.md
├── wireframes-mobile.md
├── design-spec-mobile.md
└── prototype-mobile.pen     <- 최종 (Pencil MCP)
```

#### Both 선택 시
```
outputs/stage-2/
├── platform-selection.md
├── color-palette.md         # 공통
├── visual-direction.md      # 공통
├── design-system.md         # 공통
├── component-spec-web.md
├── component-spec-mobile.md
├── wireframes-web.md
├── wireframes-mobile.md
├── design-spec-web.md
├── design-spec-mobile.md
├── prototype-web.pen        <- 최종 (Pencil MCP)
└── prototype-mobile.pen     <- 최종 (Pencil MCP)
```

### 산출물 상세

| 파일명 | Step | 설명 |
|--------|------|------|
| platform-selection.md | 2.0 | 플랫폼 선택 결과 |
| color-palette.md | 2.1 | 색상 체계 |
| visual-direction.md | 2.2 | 비주얼 방향성 |
| design-system.md | 2.3 | 디자인 시스템 |
| component-spec-{platform}.md | 2.4 | 플랫폼별 컴포넌트 명세 |
| wireframes-{platform}.md | 2.5 | 플랫폼별 와이어프레임 |
| design-spec-{platform}.md | 2.6 | 플랫폼별 디자인 명세서 |
| **prototype-{platform}.pen** | 2.7 | **Pencil MCP 시각적 프로토타입** |

## 다음 단계

Stage 2 완료 후 `design-spec-{platform}.md`를 기반으로 **Stage 3: 개발** 단계로 진행합니다.

```
/develop  # Stage 3 시작
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

### Mobile UI 라이브러리
| 문서 | 설명 |
|------|------|
| react-native-paper.md | React Native Paper (Material Design 3) 가이드 |
| nativebase.md | NativeBase 크로스플랫폼 컴포넌트 가이드 |
| flutter-material.md | Flutter Material Design 가이드 |

## 1인 창업자를 위한 핵심 포인트

1. **플랫폼별 명세 분리**: Web과 Mobile의 디자인 패턴 차이를 명확히 구분
2. **텍스트 기반 명세**: Figma/Sketch 없이도 진행 가능
3. **Pencil MCP 연계**: 디자인 명세 완료 후 자동으로 .pen 파일 프로토타입 생성
4. **AI 도구 연계**: v0, Claude Artifacts로 즉시 프로토타입 가능한 형태로 산출
5. **MVP 집중**: 최소한의 디자인으로 빠른 실행
6. **템플릿 제공**: 각 산출물에 복사해서 쓸 수 있는 구체적인 값 포함
