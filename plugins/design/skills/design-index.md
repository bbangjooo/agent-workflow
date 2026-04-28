# Design Index

Step 2.9: 디자인 산출물 인덱스 README 자동 생성

## 설명

Stage 2의 모든 디자인 산출물(`outputs/stage-2/{brand,ui,character}/...`)을 스캔해서 단일 진입점 역할을 하는 `outputs/stage-2/README.md`를 생성하는 스킬입니다. orchestrator의 build-project가 이 README의 존재를 기준으로 design 완료를 판정하고, develop의 design-to-dev-bridge가 이 README의 링크를 따라 산출물을 소비합니다.

> **핵심 역할**: README는 단순 인덱스가 아니라 **표준 진입점(Standard Entry Point)** 이다. 다른 Stage(특히 Stage 4 develop)와 design 사이의 인터페이스 계약을 README가 담당한다.

> **Shortify 패턴 차용**: brand / ui / character 카테고리, 번호 파일, 빠른 탐색 Q&A, 메타 헤더(Owner/Status/Last Updated), 변경 이력 테이블.

## 트리거

- Step 2.8 (Pen Prototype) 완료 후 자동 실행 (워크플로우 마지막 단계)
- 또는 사용자가 명시적으로 "디자인 인덱스 다시 만들어줘"라고 요청 시

## 입력

`outputs/stage-2/` 디렉터리 전체 스캔. 다음 경로의 존재 여부를 확인하고 README에 반영한다.

```
outputs/stage-2/
├── platform-selection.md          (필수)
├── brand/
│   ├── 01-identity.md             (Step 2.2 reference-collection 부산물)
│   ├── 02-color.md                (Step 2.4 design-tokens 분할 1/3)
│   └── 03-typography.md           (Step 2.4 design-tokens 분할 2/3)
├── ui/
│   ├── 01-screen-analysis.md      (Step 2.1)
│   ├── 02-references.md           (Step 2.2)
│   ├── 03-wireframes-{platform}.md (Step 2.3)
│   ├── 04-tokens.md               (Step 2.4 design-tokens 분할 3/3 — spacing/radius/shadow/globals.css)
│   ├── 05-components-{platform}.md (Step 2.5)
│   └── 06-animation.md            (Step 2.7)
├── character/                     (선택 — 마스코트가 있는 프로젝트만)
│   └── 01-mascot.md
├── design-spec-{platform}.md      (Step 2.6 — 핸드오프 통합 문서)
└── prototype-{platform}.pen       (Step 2.8)
```

## 실행 내용

1. `outputs/stage-2/` 디렉터리 트리 스캔
2. 각 파일의 메타 헤더(YAML frontmatter)에서 `owner / status / last_updated` 추출
3. 카테고리(brand/ui/character)별로 표 생성, 빠른 탐색 Q&A 자동 채우기
4. 변경 이력 테이블 추가 (이전 README의 이력은 보존)
5. `outputs/stage-2/README.md`에 쓰기

## 산출물 템플릿

`outputs/stage-2/README.md`

```markdown
---
owner: 솔로 창업자
status: Approved
last_updated: {YYYY-MM-DD}
stage: 2
plugin: design
---

# Stage 2 Design — 산출물 인덱스

> {프로젝트명}의 디자인 산출물 단일 진입점.
> orchestrator/build-project와 develop/design-to-dev-bridge는 이 README를 기준으로 design 완료를 판정하고 산출물을 소비한다.

플랫폼: **{Web | Mobile | Both}** (선택 근거: [platform-selection.md](./platform-selection.md))

---

## 문서 구성

### 브랜드 (`brand/`)

| 번호 | 문서 | 내용 | 상태 |
|------|------|------|------|
| 01 | [Identity](./brand/01-identity.md) | 브랜드 키워드 · 분위기 · 톤앤매너 | {status} |
| 02 | [Color](./brand/02-color.md) | 컬러 팔레트 · 시맨틱 토큰 · WCAG 검증 | {status} |
| 03 | [Typography](./brand/03-typography.md) | 폰트 스택 · 타입 스케일 · 위계 | {status} |

### UI (`ui/`)

| 번호 | 문서 | 내용 | 상태 |
|------|------|------|------|
| 01 | [Screen Analysis](./ui/01-screen-analysis.md) | 화면별 목적/유저상황/정보위계 | {status} |
| 02 | [References](./ui/02-references.md) | 레퍼런스 패턴/UX/비주얼 방향성 | {status} |
| 03 | [Wireframes](./ui/03-wireframes-{platform}.md) | 레퍼런스 기반 화면 구조 | {status} |
| 04 | [Tokens](./ui/04-tokens.md) | spacing · radius · shadow · globals.css | {status} |
| 05 | [Components](./ui/05-components-{platform}.md) | 공통 UI 컴포넌트 명세 | {status} |
| 06 | [Animation](./ui/06-animation.md) | 트랜지션 · 마이크로인터랙션 | {status} |

### 캐릭터 (`character/`) — 선택

| 번호 | 문서 | 내용 | 상태 |
|------|------|------|------|
| 01 | [Mascot](./character/01-mascot.md) | 마스코트 · 캐릭터 캐스트 | {status} |

> 캐릭터/마스코트가 없는 프로젝트라면 이 섹션은 비어있을 수 있다.

### 핸드오프

| 문서 | 내용 |
|------|------|
| [design-spec-{platform}.md](./design-spec-{platform}.md) | brand + ui 통합 핸드오프 문서 |
| [prototype-{platform}.pen](./prototype-{platform}.pen) | Pencil MCP 시각적 프로토타입 |

---

## 빠른 탐색

자주 찾는 질문 → 직접 링크.

- **"메인 컬러 코드?"** → [brand/02-color.md](./brand/02-color.md)
- **"폰트 스택?"** → [brand/03-typography.md](./brand/03-typography.md)
- **"브랜드 한 마디로?"** → [brand/01-identity.md](./brand/01-identity.md)
- **"버튼/카드/모달은 어떻게?"** → [ui/05-components-{platform}.md](./ui/05-components-{platform}.md)
- **"화면 와이어프레임 어디?"** → [ui/03-wireframes-{platform}.md](./ui/03-wireframes-{platform}.md)
- **"globals.css 정본?"** → [ui/04-tokens.md](./ui/04-tokens.md) §globals.css
- **"WCAG 명암비 검증 결과?"** → [brand/02-color.md](./brand/02-color.md) §접근성 검증
- **"각 화면의 목적/위계?"** → [ui/01-screen-analysis.md](./ui/01-screen-analysis.md)
- **"왜 이 디자인 방향?"** → [ui/02-references.md](./ui/02-references.md) §3 차별화 포인트
- **"마이크로인터랙션은?"** → [ui/06-animation.md](./ui/06-animation.md)
- **"개발 핸드오프 문서?"** → [design-spec-{platform}.md](./design-spec-{platform}.md)
- **"시각 프로토타입?"** → [prototype-{platform}.pen](./prototype-{platform}.pen) (Pencil MCP에서 열기)

---

## 다음 Stage

이 README가 있어야 `/develop`(Stage 4)이 시작될 수 있다.
develop의 `design-to-dev-bridge` Step은 이 README의 링크를 따라 산출물을 소비한다.

```
/develop  # Stage 4 시작
```

---

## 변경 이력

| 날짜 | 작성자 | 변경 |
|------|--------|------|
| {YYYY-MM-DD} | 솔로 창업자 | Stage 2 산출물 초기 생성 |
```

---

## 메타 헤더 규약 (Stage 2 산출물 공통)

이 스킬이 README를 만들 수 있으려면, 각 산출물 파일이 다음 YAML frontmatter를 갖고 있어야 한다. 다른 design 스킬은 산출물 작성 시 반드시 이 헤더를 포함한다.

```yaml
---
owner: 솔로 창업자
status: Draft | In Review | Approved
last_updated: YYYY-MM-DD
stage: 2
step: "2.x — {Step 이름}"
---
```

- **status**:
  - `Draft`: 작성 중. 의사결정 도구로 사용 금지.
  - `In Review`: 사용자 검토 대기.
  - `Approved`: 사용자 승인 완료. 변경 시 변경 이력에 기록.

각 산출물 하단에는 다음 변경 이력 표를 둔다:

```markdown
## 변경 이력

| 날짜 | 작성자 | 변경 |
|------|--------|------|
| YYYY-MM-DD | 솔로 창업자 | 최초 작성 |
```

---

## 완료 조건

- `outputs/stage-2/README.md` 파일이 위 템플릿 형태로 생성됨
- 모든 카테고리 표가 실제 디스크 파일과 일치 (없는 파일은 ~~취소선~~ 처리, 추가 파일은 자동 추가)
- 빠른 탐색 Q&A의 모든 링크가 유효
- 변경 이력 테이블에 이번 생성 항목 추가

## 다음 Step

→ Stage 2 종료. orchestrator는 이 README의 존재로 design 완료를 판정한다.
