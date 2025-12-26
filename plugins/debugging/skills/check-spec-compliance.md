# Check Spec Compliance

Step U.3: 디자인 스펙 준수 검사

## 설명

추출된 디자인 토큰과 코드 분석 결과를 비교하여 스펙 위반 사항을 식별하고 심각도별로 분류하는 스킬입니다.

## 트리거

- Step U.2 (Analyze UI Code) 완료 후 자동 실행
- `spec-tokens.md`와 `style-usage-report.md` 파일이 모두 존재할 때

## 입력

- `outputs/debugging/spec-tokens.md` (필수)
- `outputs/debugging/style-usage-report.md` (필수)

---

## 실행 내용

### 1. 토큰 매칭 검사

디자인 스펙의 토큰과 실제 사용된 값을 비교합니다:

```
검사 항목:
□ 하드코딩된 색상 → 디자인 토큰과 일치 여부
□ 하드코딩된 크기 → 스케일 시스템과 일치 여부
□ 사용된 토큰 → 정의된 토큰인지 확인
□ 누락된 토큰 → 정의되었지만 사용되지 않는 토큰
```

### 2. 위반 유형 분류

#### 2.1 Category: Color Violations

```markdown
| 위반 유형 | 설명 | 심각도 |
|----------|------|--------|
| HARDCODED_PRIMARY | Primary 색상 하드코딩 | Critical |
| HARDCODED_SEMANTIC | Semantic 색상 하드코딩 | High |
| UNDEFINED_COLOR | 정의되지 않은 색상 사용 | High |
| SIMILAR_COLOR | 정의된 색상과 유사하지만 다른 값 | Medium |
| INLINE_COLOR | inline style로 색상 지정 | Medium |
```

#### 2.2 Category: Typography Violations

```markdown
| 위반 유형 | 설명 | 심각도 |
|----------|------|--------|
| WRONG_FONT_FAMILY | 잘못된 폰트 패밀리 | Critical |
| HARDCODED_FONT_SIZE | 폰트 크기 하드코딩 | High |
| NON_SCALE_SIZE | 스케일에 없는 크기 | Medium |
| WRONG_FONT_WEIGHT | 잘못된 폰트 굵기 | Low |
```

#### 2.3 Category: Spacing Violations

```markdown
| 위반 유형 | 설명 | 심각도 |
|----------|------|--------|
| HARDCODED_SPACING | 간격 하드코딩 | Medium |
| NON_SCALE_SPACING | 스케일에 없는 간격 | Medium |
| INCONSISTENT_SPACING | 유사 컨텍스트에서 다른 간격 | Low |
```

#### 2.4 Category: Other Violations

```markdown
| 위반 유형 | 설명 | 심각도 |
|----------|------|--------|
| WRONG_RADIUS | 정의되지 않은 border-radius | Low |
| WRONG_SHADOW | 정의되지 않은 shadow | Low |
| WRONG_BREAKPOINT | 정의되지 않은 breakpoint | Medium |
```

### 3. 심각도 정의

```markdown
## 심각도 레벨

### Critical (즉시 수정 필요)
- 브랜드 아이덴티티에 직접적 영향
- 일관성에 심각한 문제
- 예: Primary 색상 불일치, 폰트 패밀리 불일치

### High (빠른 수정 권장)
- 디자인 시스템 무결성에 영향
- 유지보수성 저하
- 예: Semantic 색상 하드코딩, 폰트 크기 하드코딩

### Medium (점진적 개선)
- 일관성 개선 필요
- 향후 변경 시 문제 가능
- 예: 간격 하드코딩, 비표준 breakpoint

### Low (권장 사항)
- 개선하면 좋지만 필수는 아님
- 미적 일관성 향상
- 예: 비표준 radius, shadow 차이
```

### 4. 상세 검사 수행

각 위반 사항에 대해 상세 정보를 기록합니다:

```markdown
### 위반 상세

**ID:** VIOLATION-001
**카테고리:** Color
**유형:** HARDCODED_PRIMARY
**심각도:** Critical

**위치:**
- 파일: src/components/Button.tsx
- 라인: 23
- 코드: `className="bg-[#3B82F6]"`

**문제:**
- 발견된 값: #3B82F6
- 기대 값: bg-primary (디자인 토큰)
- 이유: Primary 색상은 토큰으로 사용해야 향후 테마 변경이 가능

**영향:**
- 다크 모드 적용 시 변경 누락 위험
- 브랜드 색상 변경 시 수동 수정 필요
```

### 5. 패턴 분석

반복되는 위반 패턴을 분석합니다:

```markdown
## 위반 패턴 분석

### 패턴 1: Legacy 컴포넌트의 하드코딩
- 위치: src/components/legacy/
- 발생: 15회
- 원인 추정: 마이그레이션 미완료

### 패턴 2: Landing 페이지 커스텀 스타일
- 위치: src/pages/landing.tsx
- 발생: 8회
- 원인 추정: 디자인 시스템 도입 전 작성된 코드

### 패턴 3: 반복되는 특정 값
- 값: 20px, 10px
- 발생: 12회
- 제안: 디자인 토큰에 space-5(20px) 추가 고려
```

---

## 산출물

`outputs/debugging/compliance-report.md`

```markdown
# Design Spec Compliance Report

## 메타데이터
- 생성일시: {현재 시간}
- 검사 대상: {프로젝트명}
- 디자인 스펙: design-spec-{platform}.md

---

## 1. 요약

### 전체 현황
| 심각도 | 위반 수 | 비율 |
|--------|--------|------|
| Critical | 3 | 5.8% |
| High | 12 | 23.1% |
| Medium | 22 | 42.3% |
| Low | 15 | 28.8% |
| **총합** | **52** | 100% |

### 카테고리별 현황
| 카테고리 | Critical | High | Medium | Low | 합계 |
|----------|----------|------|--------|-----|------|
| Color | 2 | 5 | 3 | 2 | 12 |
| Typography | 1 | 4 | 2 | 3 | 10 |
| Spacing | 0 | 2 | 15 | 5 | 22 |
| Other | 0 | 1 | 2 | 5 | 8 |

### 스펙 준수율
```
전체 준수율: 95.1%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 95.1%
```

---

## 2. Critical 위반 (즉시 수정 필요)

### VIOLATION-001: Primary 색상 하드코딩
| 항목 | 내용 |
|------|------|
| 파일 | src/components/Button.tsx |
| 라인 | 23 |
| 코드 | `bg-[#3B82F6]` |
| 기대 값 | `bg-primary` |
| 영향 | 테마 변경 시 누락 위험 |

### VIOLATION-002: Primary 색상 하드코딩
| 항목 | 내용 |
|------|------|
| 파일 | src/components/Link.tsx |
| 라인 | 8 |
| 코드 | `text-[#3B82F6]` |
| 기대 값 | `text-primary` |
| 영향 | 테마 변경 시 누락 위험 |

### VIOLATION-003: 잘못된 폰트 패밀리
| 항목 | 내용 |
|------|------|
| 파일 | src/components/Heading.tsx |
| 라인 | 5 |
| 코드 | `font-['Arial']` |
| 기대 값 | `font-sans` (Pretendard) |
| 영향 | 브랜드 타이포그래피 불일치 |

---

## 3. High 위반 (빠른 수정 권장)

### VIOLATION-004: Semantic 색상 하드코딩
| 항목 | 내용 |
|------|------|
| 파일 | src/components/Alert.tsx |
| 라인 | 12 |
| 코드 | `bg-[#EF4444]` |
| 기대 값 | `bg-error` |

### VIOLATION-005: 폰트 크기 하드코딩
| 항목 | 내용 |
|------|------|
| 파일 | src/components/Title.tsx |
| 라인 | 8 |
| 코드 | `text-[30px]` |
| 기대 값 | `text-3xl` (32px) |

... (추가 위반 사항)

---

## 4. Medium 위반 (점진적 개선)

### 간격 하드코딩 목록
| 파일 | 라인 | 현재 값 | 권장 값 |
|------|------|---------|---------|
| Layout.tsx | 22 | p-[20px] | p-5 |
| Grid.tsx | 8 | gap-[10px] | gap-2.5 |
| Card.tsx | 15 | mb-[30px] | mb-8 (32px) |
| ... | ... | ... | ... |

---

## 5. Low 위반 (권장 사항)

### 비표준 Border Radius
| 파일 | 라인 | 현재 값 | 권장 값 |
|------|------|---------|---------|
| Modal.tsx | 5 | rounded-[10px] | rounded-lg (12px) |
| Tooltip.tsx | 12 | rounded-[6px] | rounded-md (8px) |

---

## 6. 위반 패턴 분석

### 패턴 1: Legacy 코드
- **위치**: `src/components/legacy/`
- **위반 수**: 15개
- **설명**: 디자인 시스템 도입 전 작성된 컴포넌트
- **제안**: 점진적 마이그레이션 또는 새 컴포넌트로 교체

### 패턴 2: 반복되는 값
- **값**: 20px
- **발생**: 8회
- **분석**: 디자인 토큰에 없는 값이 자주 사용됨
- **제안**: 디자인 토큰에 `space-5` (20px) 추가 검토

### 패턴 3: Inline Style
- **위치**: src/pages/landing.tsx
- **위반 수**: 5개
- **설명**: style 속성 직접 사용
- **제안**: Tailwind 클래스로 변환

---

## 7. 파일별 위반 랭킹

| 순위 | 파일 | 위반 수 | Critical | High |
|------|------|---------|----------|------|
| 1 | legacy/OldButton.tsx | 8 | 1 | 3 |
| 2 | pages/landing.tsx | 6 | 0 | 2 |
| 3 | components/Card.tsx | 4 | 0 | 1 |
| 4 | components/Alert.tsx | 3 | 0 | 1 |
| 5 | components/Title.tsx | 3 | 1 | 1 |

---

## 8. 권장 수정 우선순위

### Phase 1: Critical 수정 (즉시)
1. Button.tsx - Primary 색상 토큰화
2. Link.tsx - Primary 색상 토큰화
3. Heading.tsx - 폰트 패밀리 수정

### Phase 2: High 수정 (이번 스프린트)
1. Alert.tsx - Semantic 색상 토큰화
2. Title.tsx - 폰트 크기 스케일 적용
3. ... (나머지 High 위반)

### Phase 3: Legacy 마이그레이션 (계획 수립)
1. legacy/ 디렉토리 컴포넌트 전체 검토
2. 새 디자인 시스템 기반 컴포넌트로 교체

---

## 다음 단계

→ Step U.4: Fix Suggestions (수정 제안)
```

---

## 완료 조건

- [ ] 모든 하드코딩된 값과 토큰 매칭 완료
- [ ] 위반 사항 식별 완료
- [ ] 심각도 분류 완료
- [ ] 위반 패턴 분석 완료
- [ ] 파일별 위반 랭킹 생성 완료
- [ ] `compliance-report.md` 파일 생성됨

## 다음 Step

→ Step U.4: Fix Suggestions (suggest-spec-fixes)
