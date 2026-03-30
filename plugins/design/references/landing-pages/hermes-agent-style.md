# 랜딩 페이지 디자인 레퍼런스: Hermes Agent 스타일

> 레퍼런스 URL: https://hermes-agent.nousresearch.com/
> 카테고리: AI/개발자 도구 랜딩 페이지, 터미널 에이전트

## 핵심 디자인 원칙

1. **다크 베이스 + 고대비** — 어두운 배경 위에 밝은 텍스트, 터미널/해커 미학
2. **ASCII 아트 브랜딩** — 로고를 ASCII 아트로 표현하여 기술적 정체성 강조
3. **스텝 바이 스텝 온보딩** — 설치 과정을 5단계로 나눠 선형적으로 가이드
4. **코드 퍼스트** — 코드 블록과 CLI 명령어가 시각적 중심, 복사 버튼 제공
5. **오픈소스 신뢰 뱃지** — "Open Source", "MIT License" 라벨로 투명성 강조

## 레이아웃 구조

```
[Nav] 고정, 다크 배경, 로고 좌측 + 주요 링크(Install, Features, Docs)
  ↓
[Hero] ASCII 아트 로고 + "An agent that grows with you" 헤드라인
  ↓
[Quick Start] 5단계 설치 가이드, 각 스텝에 코드 블록 + Copy 버튼
  ↓
[Features] 7개 핵심 기능 카드 (메모리, 자동화, 샌드박싱 등)
  ↓
[Details] 도구/플랫폼/환경/스킬 카테고리별 상세 정보
  ↓
[CTA] "Sign Up on Nous Portal" 버튼
  ↓
[Footer] 간결, 링크 모음
```

## 색상 팔레트

| 용도 | 색상 | 설명 |
|------|------|------|
| 배경 (기본) | #0D1117 ~ #161B22 | 깊은 다크 (GitHub Dark 유사) |
| 배경 (코드 블록) | #1C2128 | 코드 영역 구분 |
| 텍스트 (제목) | #E6EDF3 | 밝은 회백색 |
| 텍스트 (본문) | #8B949E | 중간 밝기 회색 |
| 텍스트 (강조) | #58A6FF | 링크/포인트 블루 |
| 뱃지 (오픈소스) | #238636 | 그린 뱃지 |
| 보더 | #30363D | 미묘한 경계선 |

## 타이포그래피

```
로고: ASCII 아트 (모노스페이스)
헤드라인: text-3xl md:text-5xl font-bold, 산세리프
부제목: text-lg text-muted, 간결한 한 줄 설명
코드 블록: font-mono, 고정폭, 배경색 구분
스텝 넘버링: font-bold, 포인트 컬러
```

## 컴포넌트 패턴

### 코드 블록 + 복사 버튼
```tsx
<div className="relative bg-[#1C2128] rounded-lg p-4 font-mono text-sm">
  <code className="text-green-400">$ hermes setup</code>
  <button className="absolute top-2 right-2 text-xs text-gray-400 hover:text-white px-2 py-1 rounded border border-gray-600">
    Copy
  </button>
</div>
```

### 기능 카드
```tsx
<div className="border border-[#30363D] rounded-lg p-6 bg-[#161B22]">
  <h3 className="text-lg font-semibold text-white mb-2">Memory</h3>
  <p className="text-sm text-gray-400">Remembers context across sessions</p>
</div>
```

### 오픈소스 뱃지
```tsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-800">
  Open Source · MIT License
</span>
```

## 디자인 톤앤무드

**기술적 + 접근 가능한 해커 미학**
- 터미널 UI 감성을 웹으로 옮긴 다크 테마
- "It's not a coding copilot" — 직관적이고 자신감 있는 카피
- 60초 시작 가이드로 진입 장벽 최소화
- 개발자 커뮤니티 중심의 오픈소스 정체성

## 참고 포인트

- **개발자 도구 랜딩 페이지** 설계 시 다크 테마 + 코드 블록 중심 레이아웃
- **CLI 도구 소개** 시 스텝 바이 스텝 온보딩 구조
- **오픈소스 프로젝트** 신뢰 구축 패턴 (뱃지, 라이선스, GitHub 링크)
- **ASCII 아트/모노스페이스** 활용한 테크 브랜딩
