# Workflow Status

Display the current workflow progress and state.

## Instructions

1. Look for workflow state file at: `.workflow/state.json`

2. If found, parse and display:
   - Project name and workflow type
   - Overall progress (percentage)
   - Current phase and its status
   - Completed phases with timestamps
   - Pending phases
   - Current step if in progress

3. Format the output as:

```
## Workflow Status

**Project**: {projectName}
**Workflow**: {workflowName}
**Progress**: {overallProgress}%

### Phases

| # | Phase | Status | Started | Last Modified |
|---|-------|--------|---------|---------------|
| 1 | {name} | {status_emoji} {status} | {startedAt} | {lastModifiedAt} |
...

### Current Position

**Phase**: {currentPhase.name} ({completedSteps}/{totalSteps} steps)
**Next Step**: {nextStep.name}
```

4. Status emojis:
   - completed: checkmark
   - in_progress: arrow
   - pending: circle
   - skipped: skip symbol

5. If no workflow state found, inform the user that no active workflow exists.
