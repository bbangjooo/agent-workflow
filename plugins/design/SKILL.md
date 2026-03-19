# Stage 2: Design (디자인)

1인 창업자의 PRD를 개발 가능한 디자인 명세로 발전시키는 워크플로우 플러그인입니다.

## 개요

이 플러그인은 Stage 2(기획)에서 생성된 PRD와 화면 구조를 입력으로 받아, 개발자가 바로 구현할 수 있는 디자인 명세를 생성합니다. 디자인 전문가가 아니어도 체계적인 디자인 시스템을 구축할 수 있습니다.

> **핵심 철학**: "AI가 디자인을 못하는 게 아니라, 우리가 AI에게 너무 많은 결정을 위임했다."
> 레퍼런스 → 숫자(CSS 토큰) → 공통 컴포넌트 → 페이지 순서를 지키면 AI 산출물 퀄리티가 확 달라진다.

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
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.1: Reference Collection (레퍼런스 수집)    ★ NEW     |
|  스킬: reference-collection                                  |
|  산출물: references.md                                       |
|  핵심: 실제 운영 서비스에서 디자인 요소 분석                    |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.2: Theme Analysis (테마 분석)              ★ NEW     |
|  스킬: theme-analysis                                        |
|  산출물: theme-tokens.md (globals.css 포함)                  |
|  핵심: 시각 스타일 → 구체적 CSS 값 (ShadCN 토큰 호환)         |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.3: Visual Direction (비주얼 방향성)                   |
|  스킬: visual-direction                                      |
|  산출물: visual-direction.md (공통)                          |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.4: Design System (디자인 시스템)                      |
|  스킬: design-system                                         |
|  산출물: design-system.md (globals.css 확정)                 |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.5: Component Spec (공통 컴포넌트 명세)                |
|  스킬: component-spec                                        |
|  산출물: 플랫폼별 분리                                        |
|  핵심: 공통 컴포넌트 먼저, 페이지는 이것으로 조립               |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.6: Wireframes (와이어프레임)                          |
|  스킬: wireframes                                            |
|  산출물: 플랫폼별 분리                                        |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.7: Design Spec (디자인 명세서)                        |
|  스킬: design-spec                                           |
|  산출물: 플랫폼별 분리                                        |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.8: Animation Spec (애니메이션 명세)        ★ NEW     |
|  스킬: animation-spec                                        |
|  산출물: animation-spec.md                                   |
|  핵심: 정적 디자인에 생동감을 더하는 마지막 터치               |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.9: Pen Prototype (.pen 파일 프로토타입)              |
|  스킬: pen-prototype                                         |
|  도구: Pencil MCP                                            |
|  산출물: 플랫폼별 분리 (최종)                                  |
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
| reference-collection | 2.1 | 실제 서비스 레퍼런스 수집 + 4축 분석 ★ |
| theme-analysis | 2.2 | 레퍼런스 → CSS 토큰 추출 (ShadCN 호환 globals.css) ★ |
| visual-direction | 2.3 | 브랜드 톤, 분위기, 참고 서비스 확정 |
| design-system | 2.4 | globals.css 확정, 타이포/간격/보더/그림자 통합 |
| component-spec | 2.5 | 공통 UI 컴포넌트 라이브러리 명세 (플랫폼별 분리) |
| wireframes | 2.6 | 화면별 레이아웃 및 와이어프레임 (플랫폼별 분리) |
| design-spec | 2.7 | 디자인 핸드오프 문서 (플랫폼별 분리) |
| animation-spec | 2.8 | 애니메이션/마이크로인터랙션 명세 ★ |
| pen-prototype | 2.9 | Pencil MCP로 .pen 파일 프로토타입 생성 (플랫폼별 분리) |

## 산출물

모든 산출물은 `outputs/stage-2/` 디렉토리에 저장됩니다.

### 플랫폼별 산출물 구조

#### Web 선택 시
```
outputs/stage-2/
├── platform-selection.md
├── references.md              ★ NEW
├── theme-tokens.md            ★ NEW (globals.css 포함)
├── visual-direction.md
├── design-system.md
├── component-spec-web.md
├── wireframes-web.md
├── design-spec-web.md
├── animation-spec.md          ★ NEW
└── prototype-web.pen
```

#### Mobile 선택 시
```
outputs/stage-2/
├── platform-selection.md
├── references.md              ★ NEW
├── theme-tokens.md            ★ NEW
├── visual-direction.md
├── design-system.md
├── component-spec-mobile.md
├── wireframes-mobile.md
├── design-spec-mobile.md
├── animation-spec.md          ★ NEW
└── prototype-mobile.pen
```

### 산출물 상세

| 파일명 | Step | 설명 |
|--------|------|------|
| platform-selection.md | 2.0 | 플랫폼 선택 결과 |
| references.md | 2.1 | 레퍼런스 수집 + 4축 분석 ★ |
| theme-tokens.md | 2.2 | CSS 토큰 + globals.css ★ |
| visual-direction.md | 2.3 | 비주얼 방향성 |
| design-system.md | 2.4 | 디자인 시스템 (globals.css 확정) |
| component-spec-{platform}.md | 2.5 | 플랫폼별 공통 컴포넌트 명세 |
| wireframes-{platform}.md | 2.6 | 플랫폼별 와이어프레임 |
| design-spec-{platform}.md | 2.7 | 플랫폼별 디자인 명세서 |
| animation-spec.md | 2.8 | 애니메이션/인터랙션 명세 ★ |
| **prototype-{platform}.pen** | 2.9 | **Pencil MCP 시각적 프로토타입** |

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

### 랜딩 페이지
| 문서 | 설명 |
|------|------|
| rapportlabs-style.md | 라포랩스 스타일 랜딩 — 풀스크린 Hero, 흑백 기조, 넉넉한 여백, 다크 섹션 반전 |

### Mobile UI 라이브러리
| 문서 | 설명 |
|------|------|
| react-native-paper.md | React Native Paper (Material Design 3) 가이드 |
| nativebase.md | NativeBase 크로스플랫폼 컴포넌트 가이드 |
| flutter-material.md | Flutter Material Design 가이드 |

## 1인 창업자를 위한 핵심 포인트

1. **레퍼런스 기반**: 막연한 지시 대신 실제 서비스를 분석하여 방향 설정
2. **CSS 토큰 출력**: 시각 스타일을 구체적 숫자(ShadCN 호환 globals.css)로 변환
3. **공통 컴포넌트 우선**: 테마 → 컴포넌트 → 페이지 순서 엄격 준수
4. **애니메이션 포함**: Framer Motion/GSAP 기반 인터랙션 명세
5. **플랫폼별 분리**: Web과 Mobile의 디자인 패턴 차이를 명확히 구분
6. **Pencil MCP 연계**: 디자인 명세 완료 후 .pen 파일 프로토타입 생성
7. **AI 도구 연계**: v0, Claude Artifacts, TweakCN으로 즉시 프로토타입 가능
8. **MVP 집중**: 최소한의 디자인으로 빠른 실행
