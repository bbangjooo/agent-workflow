# Design System

Step 2.3: 디자인 시스템 정의

## 설명

일관된 디자인을 위한 기초 시스템을 정의하는 스킬입니다. 색상은 Step 2.1에서 이미 결정되었으므로, 타이포그래피, 간격 시스템 등을 정의합니다.

## 트리거

- Step 2.2 (Visual Direction) 완료 후 자동 실행
- `outputs/stage-2/visual-direction.md` 파일이 존재할 때

## 입력

- `outputs/stage-2/color-palette.md`
- `outputs/stage-2/visual-direction.md`
- `outputs/stage-1/prd.md`

## 실행 내용

### 사전 작업

1. color-palette.md에서 이미 결정된 색상 체계 확인
2. visual-direction.md에서 분위기/키워드 추출
3. 참고 서비스의 디자인 시스템 특성 분석
4. 기본 디자인 시스템 초안 생성

### 질문 가이드

1. **라이트/다크 모드**
   - "라이트 모드, 다크 모드 중 기본으로 할까요?"
   - "MVP에서는 하나만 지원해도 충분해요"

2. **타이포그래피**
   - "한글 서비스인가요? 영문 서비스인가요?"
   - "특별히 사용하고 싶은 폰트가 있나요?"
   - (없으면) "무료로 사용 가능한 폰트를 추천해드릴게요"

### 폰트 추천

| 용도 | 한글 | 영문 |
|------|------|------|
| 깔끔/모던 | Pretendard, SUIT | Inter, SF Pro |
| 친근/캐주얼 | 나눔스퀘어라운드 | Nunito, Poppins |
| 전문적 | Noto Sans KR | Roboto, Open Sans |
| 프리미엄 | 본명조 | Playfair Display |

### 대화 원칙

- 디자인 시스템 초안을 먼저 보여주고 수정 요청 받기
- color-palette.md에서 결정된 색상을 그대로 사용
- "이 정도면 MVP로 충분해요" 안내
- 너무 많은 폰트 추가 지양

## 산출물

`outputs/stage-2/design-system.md`

```markdown
# Design System

## 메타데이터
- Stage: 2
- Step: 2.3 - 디자인 시스템
- 생성일시: {현재 시간}
- 상태: draft

## Color Palette

> 색상은 Step 2.1 (color-palette.md)에서 결정된 값을 그대로 사용합니다.
> color-palette.md를 참조하세요.

## Typography

### Font Family
- **Primary**: {폰트명} (한글/영문)
- **Fallback**: system-ui, sans-serif

### Type Scale
| Name | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| H1 | 32px | 40px | Bold (700) | 페이지 제목 |
| H2 | 24px | 32px | Semibold (600) | 섹션 제목 |
| H3 | 20px | 28px | Semibold (600) | 카드 제목 |
| Body | 16px | 24px | Regular (400) | 본문 |
| Body Small | 14px | 20px | Regular (400) | 보조 텍스트 |
| Caption | 12px | 16px | Regular (400) | 캡션, 레이블 |

## Spacing

8px 기반 간격 시스템:

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | 아이콘과 텍스트 사이 |
| space-2 | 8px | 관련 요소 간 간격 |
| space-3 | 12px | 폼 요소 내부 |
| space-4 | 16px | 카드 내부 패딩 |
| space-6 | 24px | 섹션 간 간격 |
| space-8 | 32px | 큰 섹션 간 간격 |
| space-12 | 48px | 페이지 섹션 구분 |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| radius-sm | 4px | 작은 요소 (태그, 뱃지) |
| radius-md | 8px | 버튼, 입력 필드 |
| radius-lg | 12px | 카드, 모달 |
| radius-full | 9999px | 원형 (아바타, 토글) |

## Shadow

| Token | Value | Usage |
|-------|-------|-------|
| shadow-sm | 0 1px 2px rgba(0,0,0,0.05) | 미세한 깊이감 |
| shadow-md | 0 4px 6px rgba(0,0,0,0.1) | 카드, 드롭다운 |
| shadow-lg | 0 10px 15px rgba(0,0,0,0.1) | 모달, 팝오버 |

## 다음 단계

이 디자인 시스템을 바탕으로 UI 컴포넌트를 정의합니다.
```

## 완료 조건

- color-palette.md의 색상이 포함됨
- 타이포그래피 스케일 정의됨
- 간격 시스템 정의됨
- `design-system.md` 파일이 생성됨

## 참조 문서

디자인 시스템 선택 시 다음 레퍼런스를 참고할 수 있습니다:

| 디자인 시스템 | 특징 | 적합한 프로젝트 |
|--------------|------|----------------|
| `references/design-systems/shadcn-ui.md` | Copy & Paste, Tailwind + Radix | Next.js, 커스텀 디자인 필요 시 |
| `references/design-systems/material-ui.md` | 완성도 높은 컴포넌트 | 대시보드, 엔터프라이즈 |
| `references/design-systems/tailwind-daisyui.md` | 29+ 테마, Zero JS | 빠른 프로토타이핑, 다양한 테마 |
| `references/design-systems/chakra-ui.md` | 접근성 우선 | 접근성 중요, 스타트업 |
| `references/design-systems/ant-design.md` | 엔터프라이즈급 | 어드민, B2B 애플리케이션 |

### 추천 조합

- **빠른 MVP + 커스텀 디자인**: shadcn/ui + Tailwind CSS
- **빠른 MVP + 다양한 테마**: DaisyUI + Tailwind CSS
- **대시보드/어드민**: Ant Design 또는 Material UI
- **접근성 중시**: Chakra UI

### 아이콘 라이브러리

SVG 기반 아이콘 라이브러리 선택 시 다음 레퍼런스를 참고하세요:

| 라이브러리 | 특징 | 적합한 프로젝트 |
|-----------|------|----------------|
| `references/icon-libraries/lucide.md` | shadcn/ui 기본, Feather 스타일 | Next.js, shadcn/ui 사용 시 |
| `references/icon-libraries/heroicons.md` | Tailwind 팀 제작, Outline/Solid | Tailwind CSS 프로젝트 |
| `references/icon-libraries/phosphor.md` | 6가지 weight, Duotone 지원 | 다양한 weight 필요 시 |
| `references/icon-libraries/react-native-vector-icons.md` | 10,000+ 아이콘 | React Native 앱 |

**플랫폼별 추천:**
- **Web (shadcn/ui)**: Lucide
- **Web (Tailwind CSS)**: Heroicons
- **React Native**: react-native-vector-icons 또는 phosphor-react-native
- **Flutter**: flutter_svg + phosphor_flutter

자세한 가이드: `references/icon-libraries/overview.md`

## 다음 Step

-> Step 2.4: Component Spec (컴포넌트 명세)
