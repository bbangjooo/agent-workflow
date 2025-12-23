# Stage 2: Design (디자인)

1인 창업자의 PRD를 개발 가능한 디자인 명세로 발전시키는 워크플로우 플러그인입니다.

## 개요

이 플러그인은 Stage 1(기획)에서 생성된 PRD와 화면 구조를 입력으로 받아, 개발자가 바로 구현할 수 있는 디자인 명세를 생성합니다. 디자인 전문가가 아니어도 체계적인 디자인 시스템을 구축할 수 있습니다.

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
|  Step 2.1: Visual Direction (비주얼 방향성)                   |
|  스킬: visual-direction                                      |
|  산출물: visual-direction.md                                 |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.2: Design System (디자인 시스템)                      |
|  스킬: design-system                                         |
|  산출물: design-system.md                                    |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.3: Component Spec (컴포넌트 명세)                     |
|  스킬: component-spec                                        |
|  산출물: component-spec.md                                   |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.4: Wireframes (와이어프레임)                          |
|  스킬: wireframes                                            |
|  산출물: wireframes.md                                       |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 2.5: Design Spec (디자인 명세서)                        |
|  스킬: design-spec                                           |
|  산출물: design-spec.md (최종)                               |
+-------------------------------------------------------------+
```

## 주요 컴포넌트

### Command

- **/design**: Stage 2 전체 워크플로우 시작 (유일한 진입점)

### Agent

- **Design Coach**: 시각적이고 실용적인 디자인 코치. Step 순서를 관리하며 사용자와 대화를 통해 디자인 명세를 완성합니다.

### Skills

| 스킬 | Step | 설명 |
|------|------|------|
| visual-direction | 2.1 | 브랜드 톤, 분위기, 참고 서비스 결정 |
| design-system | 2.2 | 색상, 타이포, 간격 등 디자인 시스템 정의 |
| component-spec | 2.3 | UI 컴포넌트 라이브러리 명세 |
| wireframes | 2.4 | 화면별 레이아웃 및 와이어프레임 |
| design-spec | 2.5 | 최종 디자인 핸드오프 문서 |

## 산출물

모든 산출물은 `outputs/stage-2/` 디렉토리에 저장됩니다:

| 파일명 | Step | 설명 |
|--------|------|------|
| visual-direction.md | 2.1 | 비주얼 방향성 |
| design-system.md | 2.2 | 디자인 시스템 |
| component-spec.md | 2.3 | 컴포넌트 명세 |
| wireframes.md | 2.4 | 와이어프레임 |
| **design-spec.md** | 2.5 | **최종 디자인 명세서** |

## 다음 단계

Stage 2 완료 후 `design-spec.md`를 기반으로 **Stage 3: 개발** 단계로 진행합니다.

```
/develop  # Stage 3 시작 (예정)
```

## 의존성

- `planning` 플러그인
- `workflow-state-manager` 플러그인 (상태 추적용, 선택사항)

## References

레퍼런스 문서는 `references/` 디렉토리에 있습니다:

| 카테고리 | 문서 | 설명 |
|----------|------|------|
| design-systems | shadcn-ui.md | shadcn/ui + Radix UI + Tailwind CSS 가이드 |
| design-systems | material-ui.md | Google Material Design 기반 MUI 가이드 |
| design-systems | tailwind-daisyui.md | Tailwind CSS + DaisyUI 테마 시스템 가이드 |
| design-systems | chakra-ui.md | 접근성 중심 Chakra UI 가이드 |
| design-systems | ant-design.md | 엔터프라이즈급 Ant Design 가이드 |

## 1인 창업자를 위한 핵심 포인트

1. **텍스트 기반 명세**: Figma/Sketch 없이도 진행 가능
2. **AI 도구 연계**: v0, Claude Artifacts로 즉시 프로토타입 가능한 형태로 산출
3. **MVP 집중**: 최소한의 디자인으로 빠른 실행
4. **템플릿 제공**: 각 산출물에 복사해서 쓸 수 있는 구체적인 값 포함
