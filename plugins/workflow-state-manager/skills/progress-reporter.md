# Progress Reporter Skill

Generate formatted progress reports for workflows.

## Trigger Phrases

- "show workflow progress"
- "generate progress report"
- "workflow summary"

## Instructions

This skill generates human-readable progress reports from workflow state.

### Report Types

#### 1. Summary Report (Default)

A concise overview of current progress.

```
## {workflowName} - Progress Report

**Project**: {projectName}
**Started**: {createdAt}
**Last Activity**: {lastModifiedAt}

### Overall Progress: {progressBar} {percentage}%

**Current Phase**: {currentPhase.name}
**Next Step**: {nextStep.name}
```

#### 2. Detailed Report

Full breakdown of all phases and steps.

```
## {workflowName} - Detailed Progress

### Phase 1: {phaseName} {statusEmoji}
Started: {startedAt} | Last Modified: {lastModifiedAt}

Steps:
  {statusEmoji} {stepName} - {status}
  {statusEmoji} {stepName} - {status}
  ...

Artifacts:
  - {artifactPath}
  ...

---
(repeat for each phase)
```

### Progress Bar Generation

Create ASCII progress bars:
- 0-10%: `[=         ]`
- 50%:   `[=====     ]`
- 100%:  `[==========]`

### Status Emojis

Use text representations:
- completed: `[x]`
- in_progress: `[>]`
- pending: `[ ]`
- skipped: `[-]`

### Time Formatting

Display timestamps in human-readable relative format when possible:
- "2 hours ago"
- "Yesterday"
- "3 days ago"
- Full date for older entries

### Output

The skill outputs formatted markdown text suitable for display in the terminal.
