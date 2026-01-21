# Colombo - AI 기반 제품 개발 워크플로우

1인 창업자를 위한 End-to-End AI 지원 제품 개발 플랫폼입니다. 아이디어 구체화부터 배포까지 전 과정을 Claude Code 플러그인을 통해 단계별로 안내합니다.

```
아이디어 → 기획 → 디자인 → 개발 → 배포
(Stage 0)  (Stage 1)  (Stage 2)  (Stage 3)  (Stage 4)
```

## 설치 방법

Claude Code에서 다음 명령어를 실행합니다:

```bash
claude plugin marketplace add https://github.com/bbangjooo/agent-workflow.git
```

## 플러그인 목록

### 핵심 워크플로우

| 명령어 | 플러그인 | 설명 |
|--------|----------|------|
| `/ideate` | ideation | 막연한 아이디어를 구체적인 제품 컨셉으로 발전 |
| `/plan` | planning | 아이디어를 PRD(기획서)로 변환 |
| `/design` | design | 개발자가 바로 구현 가능한 디자인 스펙 생성 |
| `/develop` | development | 디자인 스펙 기반 MVP 코드 구현 |
| `/deploy` | deployment | 무료 호스팅에 자동 배포 |

### 보조 도구

| 명령어 | 플러그인 | 설명 |
|--------|----------|------|
| `/build-project` | orchestrator | 모든 단계를 자동으로 연결하여 실행 |
| `/debug` | debugging | 개발/배포 중 오류 체계적 해결 |
| `/check-ui-spec` | debugging | UI가 디자인 스펙과 일치하는지 검증 |
| `/workflow-status` | workflow-state-manager | 현재 진행 상황 확인 |
| `/workflow-resume` | workflow-state-manager | 마지막 지점부터 재개 |
| `/workflow-reset` | workflow-state-manager | 처음부터 다시 시작 |

## 빠른 시작

**전체 자동 실행**:
```
/build-project
```

**단계별 실행**:
```
/ideate → /plan → /design → /develop → /deploy
```

## 라이선스

MIT License
