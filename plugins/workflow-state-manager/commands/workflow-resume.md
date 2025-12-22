# Workflow Resume

Resume a workflow from where it was left off.

## Instructions

1. Find and load the workflow state file at `.workflow/state.json`

2. If no workflow state exists:
   - Inform the user that no workflow to resume
   - Suggest they start a new workflow

3. If workflow exists:
   - Display a brief status summary (current phase, progress)
   - Identify the next action to take:
     - If a step is in_progress, continue from that step
     - If a phase is in_progress but no step is active, start the next pending step
     - If current phase is complete, move to the next phase

4. Ask the user for confirmation before proceeding:
   ```
   Found workflow: {projectName}
   Current phase: {phaseName} ({progress}%)
   Next action: {nextStep or nextPhase}

   Ready to continue? (y/n)
   ```

5. Upon confirmation:
   - Update the state to mark the current step as in_progress
   - Update lastModifiedAt timestamps
   - Proceed with the workflow action

6. Important considerations:
   - Preserve all existing data and artifacts
   - Don't re-do completed steps unless explicitly requested
   - Handle cases where the workflow config has changed since last session
