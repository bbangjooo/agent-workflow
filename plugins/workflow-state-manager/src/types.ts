/**
 * workflow-state-manager - Persistent workflow state management plugin
 *
 * This plugin provides reusable phase-based workflow state management
 * that can be used by other plugins to track progress across sessions.
 */

export type PhaseStatus = 'pending' | 'in_progress' | 'completed' | 'skipped';
export type StepStatus = 'pending' | 'in_progress' | 'completed' | 'skipped';

export interface Step {
  id: string;
  name: string;
  description?: string;
  status: StepStatus;
  startedAt?: string;      // ISO 8601 timestamp
  completedAt?: string;    // ISO 8601 timestamp
  data?: Record<string, unknown>;  // Step-specific data
}

export interface Phase {
  id: string;
  name: string;
  description?: string;
  status: PhaseStatus;
  order: number;           // Phase execution order (1-based)
  steps: Step[];
  artifacts: string[];     // Relative paths to generated artifacts
  startedAt?: string;      // ISO 8601 timestamp
  lastModifiedAt?: string; // ISO 8601 timestamp
  completedAt?: string;    // ISO 8601 timestamp
  data?: Record<string, unknown>;  // Phase-specific data
}

export interface WorkflowState {
  workflowId: string;      // Unique identifier for the workflow type
  workflowName: string;    // Human-readable workflow name
  projectName?: string;    // User's project name
  version: string;         // State schema version for migrations
  createdAt: string;       // ISO 8601 timestamp
  lastModifiedAt: string;  // ISO 8601 timestamp
  currentPhaseId?: string; // Currently active phase
  phases: Phase[];
  metadata?: Record<string, unknown>;  // Workflow-specific metadata
}

export interface WorkflowConfig {
  workflowId: string;
  workflowName: string;
  storageDir?: string;     // Default: ".workflow"
  phases: PhaseConfig[];
}

export interface PhaseConfig {
  id: string;
  name: string;
  description?: string;
  order: number;
  steps: StepConfig[];
  artifacts?: string[];
}

export interface StepConfig {
  id: string;
  name: string;
  description?: string;
}

// Result types for operations
export interface OperationResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface WorkflowProgress {
  totalPhases: number;
  completedPhases: number;
  currentPhase?: {
    id: string;
    name: string;
    totalSteps: number;
    completedSteps: number;
  };
  overallProgress: number;  // 0-100 percentage
}
