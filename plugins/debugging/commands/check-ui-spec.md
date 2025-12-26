# /check-ui-spec

UI 구현이 디자인 스펙을 정확하게 반영하고 있는지 검증합니다.

## 사용법

```
/check-ui-spec
```

## 설명

이 커맨드는 UI Spec Checker 에이전트를 실행하여 다음을 수행합니다:

1. **디자인 스펙 로드** - design-spec-{platform}.md에서 디자인 토큰 추출
2. **코드 분석** - 소스 코드의 스타일 사용 현황 분석
3. **스펙 준수 검사** - 하드코딩, 토큰 불일치 등 위반 사항 식별
4. **수정 제안** - 위반 사항별 구체적인 수정 방법 제시

## 사전 조건

- `outputs/stage-2/design-spec-web.md` 또는 `design-spec-mobile.md` 존재
- 프로젝트에 UI 코드 존재 (tsx, jsx, css 파일)

## 산출물

검사 완료 후 다음 파일들이 생성됩니다:

- `outputs/debugging/spec-tokens.md` - 추출된 디자인 토큰
- `outputs/debugging/style-usage-report.md` - 스타일 사용 현황
- `outputs/debugging/compliance-report.md` - 스펙 준수 검사 결과
- `outputs/debugging/spec-fix-suggestions.md` - 수정 제안

## 예시

```
> /check-ui-spec

🎨 UI 스펙 검증을 시작합니다.

디자인 스펙 파일 확인 중...
✓ design-spec-web.md 발견

Step U.1: 디자인 토큰 추출 중...
✓ 색상 토큰 15개 추출
✓ 타이포그래피 토큰 8개 추출
✓ 간격 토큰 12개 추출

Step U.2: 코드 분석 중...
✓ 45개 파일 분석 완료
✓ 1,069개 스타일 정의 발견

Step U.3: 스펙 준수 검사 중...
⚠️ 52개 위반 사항 발견
  - Critical: 3개
  - High: 12개
  - Medium: 22개
  - Low: 15개

Step U.4: 수정 제안 생성 중...
✓ 수정 제안 문서 생성 완료

📊 결과 요약:
- 전체 준수율: 95.1%
- 즉시 수정 필요: 3개 (Critical)
- 빠른 수정 권장: 12개 (High)

상세 내용은 outputs/debugging/ 폴더를 확인하세요.
```

## 관련 커맨드

- `/debug` - 에러 발생 시 디버깅
- `/design` - 디자인 스펙 생성/수정
- `/develop` - 개발 진행

## 에이전트

이 커맨드는 `ui-spec-checker` 에이전트를 호출합니다.
