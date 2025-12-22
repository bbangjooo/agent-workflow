# State Loader Skill

Load and parse workflow state from the file system.

## Trigger Phrases

- "load workflow state"
- "get current workflow"
- "check workflow progress"

## Instructions

This skill loads a workflow state file and returns structured information.

### Steps

1. **Locate State File**
   Search for state file in default location:
   ```
   .workflow/state.json
   ```

2. **Parse State**
   Read and parse the JSON file. Expected structure:
   ```json
   {
     "workflowId": "string",
     "workflowName": "string",
     "projectName": "string",
     "version": "1.0.0",
     "createdAt": "ISO timestamp",
     "lastModifiedAt": "ISO timestamp",
     "currentPhaseId": "string",
     "phases": [...]
   }
   ```

3. **Validate State**
   - Check version compatibility
   - Verify all required fields exist
   - Validate phase structure

4. **Return State Object**
   Return the parsed state or an error message if:
   - File not found
   - Invalid JSON
   - Schema mismatch

### Output Format

```json
{
  "success": true,
  "state": { ... },
  "stateFilePath": "/path/to/workflow-state.json"
}
```

Or on error:

```json
{
  "success": false,
  "error": "Error description"
}
```
