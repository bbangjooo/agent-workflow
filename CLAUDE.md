# Agent Workflow - Claude Code Plugin Collection

## Project Structure

- `plugins/<plugin_name>/` - 각 플러그인 디렉토리
  - `plugin.json` - 플러그인 매니페스트 (name, version, commands, skills, agents)
  - `SKILL.md` - 플러그인 개요, 핵심 가치, 명령어, 워크플로우
  - `commands/` - 슬래시 커맨드 정의 (.md)
  - `skills/` - 원자적 스킬 정의 (.md)
  - `agents/` - 에이전트 정의 (.md)
- `.claude-plugin/marketplace.json` - 마켓플레이스 매니페스트 (모든 플러그인 등록)
- `outputs/` - 런타임 산출물 (stage-0 ~ stage-4, roadmap, feedback, decisions)
- `docs/STAGE_DESIGN_PATTERN.md` - 플러그인 작성 가이드

## Conventions

- Commands, skills, agents는 모두 `.md` 파일로 정의
- 새 플러그인 추가 시 반드시 `marketplace.json`에도 등록
- Agent .md 파일에는 step 실행 순서를 명시 (Claude가 step을 건너뛰지 않도록)
- 복잡한 명령은 기존 skill을 체이닝하여 구성 (예: `/next` = goal-capture + roadmap-generate + progress-locate)
- 산출물은 `outputs/<plugin_name>/` 또는 `outputs/stage-N/`에 저장
- 동일 파일에 대한 동시/중복 쓰기 금지 - 반드시 순차적 read-then-write

## User Preferences

- 한국어로 소통 및 요약
- 통합된 워크플로우 선호 (여러 단계를 하나의 커맨드로)
- 구조화된 요약 제공 (파일 구조, 명령어 기능, 설계 포인트)
- 초기 고수준 요구사항 → 결과물 기반 반복 개선 방식

## Prefix Triggers

- **`orch::`** — 사용자 메시지가 `orch::` 로 시작하면, 접두사를 제거한 나머지 텍스트를 프롬프트로 하여 `orchestrator:project-orchestrator` subagent_type의 Agent를 즉시 호출한다. 다른 작업 없이 바로 오케스트레이터를 실행할 것.
