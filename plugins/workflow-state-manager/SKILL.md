# workflow-state-manager

Persistent workflow state management for phase-based projects.

## When to Use

This skill should be used when the user:
- Asks to "check workflow status", "show progress", "where am I"
- Wants to "resume workflow", "continue where I left off"
- Needs to "reset workflow", "start over", "clear progress"
- Says "load workflow state", "save progress"
- Mentions "mark phase complete", "finish step", "next step"

## Capabilities

| Capability | Description | Reference |
|------------|-------------|-----------|
| State Loading | Load and display current workflow state | [state-loader.md](skills/state-loader.md) |
| State Updating | Update phases, steps, and artifacts | [state-updater.md](skills/state-updater.md) |
| Progress Reporting | Generate formatted progress reports | [progress-reporter.md](skills/progress-reporter.md) |

## State File Location

Default path: `.workflow/state.json`

The state file is stored in the project root under `.workflow/` directory. This directory contains:
- `state.json` - Workflow state and progress
- `artifacts/` - Generated artifacts from each phase

## State Structure

```json
{
  "workflowId": "string",
  "workflowName": "string",
  "projectName": "string",
  "version": "1.0.0",
  "createdAt": "ISO timestamp",
  "lastModifiedAt": "ISO timestamp",
  "currentPhaseId": "string",
  "phases": [
    {
      "id": "string",
      "name": "string",
      "status": "pending | in_progress | completed | skipped",
      "order": 1,
      "startedAt": "ISO timestamp",
      "lastModifiedAt": "ISO timestamp",
      "completedAt": "ISO timestamp",
      "steps": [...],
      "artifacts": [...]
    }
  ]
}
```

## Quick Reference

| Action | How |
|--------|-----|
| Check status | Load state, show current phase & progress |
| Resume | Find current phase/step, continue from there |
| Complete step | Update step status, set timestamps, save |
| Complete phase | Mark all steps done, move to next phase |
| Add artifact | Append to phase.artifacts array |
| Reset | Delete state file (backup first) |
