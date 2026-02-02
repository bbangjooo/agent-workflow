/**
 * workflow-state-manager - Persistent workflow state management plugin
 *
 * This plugin provides reusable phase-based workflow state management
 * that can be used by other plugins to track progress across sessions.
 */

export type PhaseStatus = 'pending' | 'in_progress' | 'completed' | 'skipped';
export type StepStatus = 'pending' | 'in_progress' | 'completed' | 'skipped';
export type GoalStatus = 'active' | 'achieved' | 'abandoned' | 'revised';

/**
 * Represents a goal to track progress against
 */
export interface Goal {
  id: string;                          // Unique goal ID (e.g., "goal-1")
  description: string;                 // Goal description
  successIndicators: string[];         // Measurable success criteria
  currentProgress: number;             // 0-100 percentage
  progressHistory: ProgressEntry[];    // History of progress updates
  status: GoalStatus;
  createdAt: string;                   // ISO 8601 timestamp
  achievedAt?: string;                 // ISO 8601 timestamp (when achieved)
}

/**
 * Records a progress update for a goal
 */
export interface ProgressEntry {
  timestamp: string;                   // ISO 8601 timestamp
  progress: number;                    // Progress value at this point (0-100)
  reason: string;                      // Why progress changed
  iterationId?: string;                // Related iteration (if any)
  phase?: string;                      // Phase where progress was made
}

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

  // Iteration & Version Management (added for feedback loop)
  productVersion: number;              // Current product version (1, 2, 3...)
  iterations: Iteration[];             // History of iterations within this version
  decisions: Decision[];               // Decision log
  archivedVersions: string[];          // List of archived version paths
  feedbackSummary?: FeedbackSummary;   // Aggregated feedback from all stages

  // Goal-Aligned Iteration (added for divergence prevention)
  goals: Goal[];                       // Goals to track progress against
  consecutiveNoProgress: number;       // Counter for divergence detection
}

/**
 * Represents an iteration within a version - going back to a previous stage
 */
export interface Iteration {
  id: string;                          // Unique iteration ID
  fromPhase: string;                   // Phase where iteration was triggered
  toPhase: string;                     // Phase to return to
  reason: string;                      // Why this iteration happened
  timestamp: string;                   // ISO 8601 timestamp
  restorePoint?: string;               // Path to restore point (if created)
  changes: string[];                   // What was changed in this iteration
  completedAt?: string;                // When this iteration cycle completed
}

/**
 * Records an important decision made during the workflow
 */
export interface Decision {
  id: string;                          // Unique decision ID
  phase: string;                       // Phase where decision was made
  title: string;                       // Brief decision title
  context: string;                     // Situation that led to this decision
  options: DecisionOption[];           // Options that were considered
  chosenOptionId: string;              // ID of the chosen option
  rationale: string;                   // Why this option was chosen
  expectedOutcome: string;             // What outcome is expected
  timestamp: string;                   // ISO 8601 timestamp
  actualOutcome?: string;              // What actually happened (filled later)
  tags?: string[];                     // Categorization tags
}

export interface DecisionOption {
  id: string;
  description: string;
  pros?: string[];
  cons?: string[];
}

/**
 * Aggregated feedback summary across all stages
 */
export interface FeedbackSummary {
  lastUpdated: string;                 // ISO 8601 timestamp
  totalReflections: number;            // Number of reflections recorded
  keyLearnings: string[];              // Top learnings across all stages
  recurringIssues: string[];           // Issues that appeared multiple times
  suggestedImprovements: SuggestedImprovement[];
}

export interface SuggestedImprovement {
  id: string;
  description: string;
  affectedStages: string[];
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'deferred';
  targetVersion?: number;              // Which version to implement this
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
