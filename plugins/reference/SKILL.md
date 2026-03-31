# Reference Manager

플러그인의 에이전트/스킬이 참고할 레퍼런스 자료를 대화형으로 추가하고, git push로 플러그인을 업데이트합니다.

## 개요

각 플러그인은 `references/` 디렉토리에 에이전트가 참고하는 자료를 보관합니다. 이 플러그인은 새 레퍼런스를 **기존 포맷에 맞춰** 추가하고, 관련 스킬/에이전트의 참조 테이블도 함께 업데이트한 뒤 git push합니다.

## 사용 방법

```
/add-ref
```

대화형으로 진행됩니다:
1. 플러그인 선택
2. 카테고리 선택
3. 추가할 레퍼런스 입력
4. 자동 생성 & 확인
5. 관련 파일 업데이트
6. Git commit & push

## 대상 플러그인 & 레퍼런스 현황

| 플러그인 | 카테고리 | 설명 |
|---------|----------|------|
| design | `landing-pages/` | 랜딩페이지 디자인 분석 |
| design | `design-systems/` | UI 라이브러리 가이드 |
| design | `icon-libraries/` | 아이콘 라이브러리 |
| design | `mobile-ui/` | 모바일 UI 프레임워크 |
| development | `patterns/` | 코드 패턴 (인증, 상태, API 등) |
| development | `tech-stacks/` | 기술 스택 조합 가이드 |
| development | `databases/` | DB 서비스 설정 가이드 |
| development | `orms/` | ORM/클라이언트 설정 |
| development | `templates/` | 설정 파일, 폴더 구조 템플릿 |
| development | `checklists/` | 런치/보안/성능 체크리스트 |
| debugging | `error-patterns/` | 에러 유형별 원인/해결책 |
| deployment | `platforms/` | 배포 플랫폼 가이드 |
| deployment | `services/` | 외부 서비스 연동 가이드 |
| monetization | (루트) | 수익화 전략 종합 |

## 핵심 원칙

- **기존 포맷 준수**: 같은 카테고리의 기존 파일을 읽고 동일 구조로 생성
- **대화형 선택**: 한 번에 하나씩 질문, 번호로 선택
- **연결 업데이트**: 레퍼런스를 참조하는 스킬/에이전트도 함께 수정
- **Git push**: 완료 후 커밋 & 푸시로 플러그인 즉시 반영

## Command

| 커맨드 | 설명 |
|--------|------|
| `/add-ref` | 대화형 레퍼런스 추가 |
