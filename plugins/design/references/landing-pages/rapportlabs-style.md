# 랜딩 페이지 디자인 레퍼런스: 라포랩스 스타일

> 레퍼런스 URL: https://rapportlabs.kr/
> 적용 사례: 잡원큐 (job-one-q-web) 랜딩 페이지

## 핵심 디자인 원칙

1. **풀스크린 Hero** — 이미지/영상 배경 + 어두운 오버레이(50~60%) + 중앙 정렬 텍스트
2. **흑백 기조** — 네비게이션, CTA 버튼, 텍스트 모두 블랙/화이트 중심. 색상은 포인트로만
3. **넉넉한 여백** — 섹션 간 `py-32` (128px), 콘텐츠 내 여백도 충분히
4. **다크 섹션 반전** — 핵심 가치 제안(Solution) 섹션은 `bg-slate-950` 또는 `bg-black` 배경
5. **영문 라벨** — 각 섹션 상단에 `PROBLEM`, `SOLUTION`, `FEATURES` 등 tracking-widest uppercase 소문자

## 레이아웃 구조

```
[Nav] 고정, bg-white/80 backdrop-blur, 로고 좌측 + CTA 우측
  ↓
[Hero] 풀스크린(h-screen), 배경 이미지 + 오버레이 + 중앙 텍스트 + 스크롤 인디케이터
  ↓
[Problem] 흰 배경, 넘버링(01/02/03) + 제목 + 설명, 3컬럼 그리드
  ↓
[Solution] 검은 배경, border-t border-white/10 구분선, 3컬럼
  ↓
[Features] 흰 배경, 일러스트와 텍스트 좌우 교차 배치 (지그재그)
  ↓
[보조 섹션] bg-slate-50, 카드형 정보
  ↓
[CTA] 검은 배경, 대담한 타이포 + 흰 버튼
  ↓
[Footer] 간결, 로고 + 한 줄 슬로건
```

## 색상 팔레트

| 용도 | 색상 | Tailwind |
|------|------|----------|
| 배경 (기본) | #FFFFFF | `bg-white` |
| 배경 (강조) | #0F172A | `bg-slate-950` 또는 `bg-black` |
| 배경 (보조) | #F8FAFC | `bg-slate-50` |
| 텍스트 (제목) | #000000 | `text-slate-900` |
| 텍스트 (본문) | #64748B | `text-slate-500` |
| 텍스트 (흰 배경 위 라벨) | #94A3B8 | `text-slate-400` |
| 텍스트 (검은 배경 위) | rgba(255,255,255,0.5) | `text-white/50` |
| 포인트 | 프로젝트별 primary | `text-primary-500` |
| 오버레이 | rgba(0,0,0,0.55) | `bg-black/55` |

## 타이포그래피

```
Nav 로고: text-lg font-bold tracking-tight
영문 라벨: text-sm tracking-widest uppercase text-slate-400
섹션 제목: text-3xl md:text-4xl font-bold leading-snug
Hero 제목: text-4xl md:text-6xl font-bold tracking-tight
본문: text-sm md:text-base text-slate-500 leading-relaxed
넘버링: text-5xl font-bold text-slate-100 (배경 장식)
```

## 컴포넌트 패턴

### CTA 버튼
```tsx
// 흰 배경 위 (검은 버튼)
<button className="px-5 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-slate-800">
  시작하기 <ArrowUpRight />
</button>

// 검은 배경 위 (흰 버튼)
<button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-slate-100">
  시작하기 <ArrowRight />
</button>
```

### 스크롤 인디케이터 (Hero 하단)
```tsx
<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
  <span className="text-xs text-white/40 tracking-wider">SCROLL</span>
  <div className="w-px h-8 bg-white/20" />
</div>
```

### 섹션 구분선
```tsx
<div className="w-16 h-px bg-slate-200 mb-16" />       // 흰 배경
<div className="w-16 h-px bg-white/20 mb-16" />         // 검은 배경
```

### Problem 넘버링
```tsx
<span className="text-5xl font-bold text-slate-100">01</span>
<h3 className="text-lg font-semibold text-slate-800 mt-2 mb-2">제목</h3>
<p className="text-sm text-slate-500 leading-relaxed">설명</p>
```

### Feature 좌우 교차
```tsx
// 홀수: 텍스트 좌 + 일러스트 우
<div className="grid md:grid-cols-2 gap-16 items-center mb-24">
  <div>텍스트</div>
  <div>일러스트</div>
</div>

// 짝수: 일러스트 좌 + 텍스트 우
<div className="grid md:grid-cols-2 gap-16 items-center mb-24">
  <div>일러스트</div>
  <div>텍스트</div>
</div>
```

## 이미지 활용 패턴

- **Hero**: 풀스크린 배경 이미지 + `object-cover` + 어두운 오버레이
- **Before/After 대비**: Hero에 문제 상황 이미지, Solution/CTA 섹션에 해결 후 이미지
- **일러스트**: CSS/SVG 기반 앱 UI 모킹 (별도 이미지 파일 없이 코드로 구현)

## 적용 시 주의사항

- 풀스크린 Hero는 `h-screen`으로 정확히 뷰포트 높이
- 오버레이 투명도는 이미지 밝기에 따라 50~60% 조절
- 검은 배경 섹션에서 텍스트는 `text-white/50` ~ `text-white/70` 사이
- 넘버링(`01`, `02`)은 `text-slate-100`으로 배경 장식 역할
- 모바일에서도 여백 유지: `px-6` ~ `px-8`
