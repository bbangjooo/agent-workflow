# Workflow Reset

Reset the workflow to start fresh.

## Arguments

- `--keep-artifacts`: Keep generated artifacts but reset progress (optional)
- `--confirm`: Skip confirmation prompt (optional)

## Instructions

1. Find the workflow state file at `.workflow/state.json`

2. If no workflow exists:
   - Inform the user there's nothing to reset
   - Exit gracefully

3. If workflow exists, show what will be affected:
   ```
   ## Reset Workflow

   **Project**: {projectName}
   **Current Progress**: {overallProgress}%
   **Completed Phases**: {completedCount}/{totalCount}

   ### This will reset:
   - All phase and step progress
   - Current position tracking
   - Timestamps

   ### Artifacts (will be {kept/deleted}):
   - {list of artifact files}
   ```

4. Unless `--confirm` is provided, ask for confirmation:
   ```
   Are you sure you want to reset this workflow? This cannot be undone.
   Type 'reset' to confirm:
   ```

5. Upon confirmation:
   - If `--keep-artifacts`:
     - Only reset the `.workflow/state.json`
     - Preserve all files in the `.workflow/artifacts/` directory
   - Otherwise:
     - Delete `.workflow/state.json`
     - Optionally delete artifact files (with user confirmation)

6. After reset:
   - Confirm the reset was successful
   - Inform user they can start fresh with the workflow's init command

7. Safety measures:
   - Never delete files outside the `.workflow/` directory
   - Create a backup of the state before deletion: `.workflow/state.backup.json`
