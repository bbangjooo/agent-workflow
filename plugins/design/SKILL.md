# Stage 2: Design (디자인)

1인 창업자의 PRD를 개발 가능한 디자인 명세로 발전시키는 워크플로우 플러그인입니다.

## 개요

이 플러그인은 Stage 2(기획)에서 생성된 PRD와 화면 구조를 입력으로 받아, 개발자가 바로 구현할 수 있는 디자인 명세를 생성합니다. 디자인 전문가가 아니어도 체계적인 디자인 시스템을 구축할 수 있습니다.

> **핵심 철학**: "AI가 디자인을 못하는 게 아니라, 우리가 AI에게 너무 많은 결정을 위임했다."
> 레퍼런스 → 숫자(CSS 토큰) → 공통 컴포넌트 → 페이지 순서를 지키면 AI 산출물 퀄리티가 확 달라진다.

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
|  Step 2.1: Screen Analysis (기획 분석)             ★ NEW     |
|  스킬: screen-analysis                                       |
|  산출물: screen-analysis.md                                  |
|  핵심: 화면별 목적/유저상황/정보위계/핵심액션 분석              |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.2: Reference Analysis (레퍼런스 분석)                 |
|  스킬: reference-collection                                  |
|  산출물: references.md                                       |
|  핵심: 패턴/UX라이팅/컴포넌트 분석 + 비주얼 방향성 도출        |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.3: Wireframes (와이어프레임)               ★ 순서 UP |
|  스킬: wireframes                                            |
|  산출물: 플랫폼별 분리                                        |
|  핵심: 레퍼런스 바탕으로 구조 먼저 확정                        |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.4: Design Tokens (디자인 토큰)             ★ 통합    |
|  스킬: design-tokens                                         |
|  산출물: design-tokens.md (globals.css 포함)                 |
|  핵심: 3단계 토큰 + 시맨틱 네이밍 + WCAG 접근성 검증          |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.5: Component Spec (공통 컴포넌트 명세)                |
|  스킬: component-spec                                        |
|  산출물: 플랫폼별 분리                                        |
|  핵심: 확정된 구조 + 토큰으로 컴포넌트화                       |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.6: Design Spec (디자인 명세서)                        |
|  스킬: design-spec                                           |
|  산출물: 플랫폼별 분리                                        |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.7: Animation Spec (애니메이션 명세)                   |
|  스킬: animation-spec                                        |
|  산출물: animation-spec.md                                   |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.8: Pen Prototype (.pen 파일 프로토타입)              |
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
| screen-analysis | 2.1 | 화면별 목적/유저상황/정보위계 분석 ★ |
| reference-collection | 2.2 | 레퍼런스 수집 + 패턴/UX/비주얼 방향성 분석 |
| wireframes | 2.3 | 레퍼런스 기반 화면 구조 확정 (순서 UP) |
| design-tokens | 2.4 | 3단계 토큰 + WCAG 검증 + globals.css ★ |
| component-spec | 2.5 | 공통 UI 컴포넌트 라이브러리 명세 (플랫폼별 분리) |
| design-spec | 2.6 | 디자인 핸드오프 문서 (플랫폼별 분리) |
| animation-spec | 2.7 | 애니메이션/마이크로인터랙션 명세 |
| pen-prototype | 2.8 | Pencil MCP로 .pen 파일 프로토타입 생성 (플랫폼별 분리) |

## 산출물

모든 산출물은 `outputs/stage-2/` 디렉토리에 저장됩니다.

### 플랫폼별 산출물 구조

#### Web 선택 시
```
outputs/stage-2/
├── platform-selection.md       (2.0)
├── screen-analysis.md          (2.1) ★ NEW
├── references.md               (2.2)
├── wireframes-web.md           (2.3) ← 순서 올라옴
├── design-tokens.md            (2.4) ★ globals.css + WCAG 검증
├── component-spec-web.md       (2.5)
├── design-spec-web.md          (2.6)
├── animation-spec.md           (2.7)
└── prototype-web.pen           (2.8)
```

#### Mobile 선택 시
```
outputs/stage-2/
├── platform-selection.md       (2.0)
├── screen-analysis.md          (2.1) ★ NEW
├── references.md               (2.2)
├── wireframes-mobile.md        (2.3)
├── design-tokens.md            (2.4) ★ globals.css + WCAG 검증
├── component-spec-mobile.md    (2.5)
├── design-spec-mobile.md       (2.6)
├── animation-spec.md           (2.7)
└── prototype-mobile.pen        (2.8)
```

### 산출물 상세

| 파일명 | Step | 설명 |
|--------|------|------|
| platform-selection.md | 2.0 | 플랫폼 선택 결과 |
| screen-analysis.md | 2.1 | 화면별 목적/유저상황/정보위계 ★ |
| references.md | 2.2 | 레퍼런스 + 패턴 + 비주얼 방향성 |
| wireframes-{platform}.md | 2.3 | 플랫폼별 와이어프레임 (구조 확정) |
| design-tokens.md | 2.4 | 3단계 토큰 + WCAG 검증 + globals.css ★ |
| component-spec-{platform}.md | 2.5 | 플랫폼별 공통 컴포넌트 명세 |
| design-spec-{platform}.md | 2.6 | 플랫폼별 디자인 명세서 |
| animation-spec.md | 2.7 | 애니메이션/인터랙션 명세 |
| **prototype-{platform}.pen** | 2.8 | **Pencil MCP 시각적 프로토타입** |

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
| hermes-agent-style.md | Hermes Agent 스타일 — 다크 해커 미학, ASCII 아트, 코드 블록 중심, 스텝 바이 스텝 온보딩 |
| conductor-style.md | Conductor 스타일 — B2B 다크 테마, 듀얼 CTA, 사회적 증거(로고+testimonial), 자기증명 메시징 |

### Mobile UI 라이브러리
| 문서 | 설명 |
|------|------|
| react-native-paper.md | React Native Paper (Material Design 3) 가이드 |
| nativebase.md | NativeBase 크로스플랫폼 컴포넌트 가이드 |
| flutter-material.md | Flutter Material Design 가이드 |

## 1인 창업자를 위한 핵심 포인트

1. **기획 분석 먼저**: 화면 목적/유저 상황/정보 위계를 먼저 정리
2. **레퍼런스 기반**: 실제 서비스의 패턴/UX/컴포넌트 분석
3. **구조 먼저, 톤 나중에**: 와이어프레임 확정 후 디자인 토큰 (벽지보다 설계도 먼저)
4. **3단계 토큰 + 접근성**: Base→Semantic→Component 토큰, WCAG AA 명암비 필수 검증
5. **시맨틱 네이밍**: Gray-900 대신 `text-default` 같은 용도 기반 이름
6. **공통 컴포넌트 우선**: 테마 → 컴포넌트 → 페이지 순서 엄격 준수
7. **애니메이션 포함**: Framer Motion/GSAP 기반 인터랙션 명세
8. **플랫폼별 분리**: Web과 Mobile 각각의 디자인 패턴 구분
