# State Updater Skill

Update workflow state (phases, steps, artifacts).

## Trigger Phrases

- "update workflow state"
- "mark phase complete"
- "mark step complete"
- "start phase"
- "add artifact"

## Operations

### 1. Start Phase

Mark a phase as in_progress and set timestamps.

**Input:**
```json
{
  "operation": "startPhase",
  "phaseId": "ideation"
}
```

**Actions:**
- Set phase.status = "in_progress"
- Set phase.startedAt = current timestamp (if not already set)
- Set phase.lastModifiedAt = current timestamp
- Set state.currentPhaseId = phaseId
- Save state

### 2. Complete Phase

Mark a phase as completed.

**Input:**
```json
{
  "operation": "completePhase",
  "phaseId": "ideation"
}
```

**Actions:**
- Set phase.status = "completed"
- Set phase.completedAt = current timestamp
- Set phase.lastModifiedAt = current timestamp
- Mark all incomplete steps as completed
- Update state.currentPhaseId to next pending phase
- Save state

### 3. Start Step

Mark a step as in_progress.

**Input:**
```json
{
  "operation": "startStep",
  "phaseId": "ideation",
  "stepId": "problem-definition"
}
```

**Actions:**
- Set step.status = "in_progress"
- Set step.startedAt = current timestamp (if not already set)
- Ensure phase is in_progress
- Set phase.lastModifiedAt = current timestamp
- Save state

### 4. Complete Step

Mark a step as completed with optional data.

**Input:**
```json
{
  "operation": "completeStep",
  "phaseId": "ideation",
  "stepId": "problem-definition",
  "data": { "key": "value" }
}
```

**Actions:**
- Set step.status = "completed"
- Set step.completedAt = current timestamp
- Merge data into step.data
- Set phase.lastModifiedAt = current timestamp
- Save state

### 5. Add Artifact

Register an artifact file for a phase.

**Input:**
```json
{
  "operation": "addArtifact",
  "phaseId": "ideation",
  "artifactPath": "artifacts/idea.md"
}
```

**Actions:**
- Add path to phase.artifacts (if not already present)
- Set phase.lastModifiedAt = current timestamp
- Save state

### 6. Set Phase Data

Store custom data for a phase.

**Input:**
```json
{
  "operation": "setPhaseData",
  "phaseId": "ideation",
  "data": { "targetUser": "solo founders" }
}
```

**Actions:**
- Merge data into phase.data
- Set phase.lastModifiedAt = current timestamp
- Save state

## Output Format

```json
{
  "success": true,
  "operation": "completeStep",
  "updatedEntity": { ... },
  "message": "Step 'problem-definition' marked as completed"
}
```
