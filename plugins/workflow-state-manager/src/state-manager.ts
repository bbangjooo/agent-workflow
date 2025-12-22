/**
 * Core state management logic for workflow-state-manager
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  WorkflowState,
  WorkflowConfig,
  Phase,
  Step,
  PhaseConfig,
  StepConfig,
  PhaseStatus,
  StepStatus,
  OperationResult,
  WorkflowProgress,
} from './types';

const STATE_FILE_NAME = 'state.json';
const DEFAULT_STORAGE_DIR = '.workflow';
const STATE_VERSION = '1.0.0';

export class WorkflowStateManager {
  private config: WorkflowConfig;
  private basePath: string;

  constructor(config: WorkflowConfig, basePath: string = process.cwd()) {
    this.config = config;
    this.basePath = basePath;
  }

  /**
   * Get the full path to the storage directory
   */
  private getStoragePath(): string {
    return path.join(this.basePath, this.config.storageDir || DEFAULT_STORAGE_DIR);
  }

  /**
   * Get the full path to the state file
   */
  private getStateFilePath(): string {
    return path.join(this.getStoragePath(), STATE_FILE_NAME);
  }

  /**
   * Ensure storage directory exists
   */
  private ensureStorageDir(): void {
    const storagePath = this.getStoragePath();
    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(storagePath, { recursive: true });
    }
  }

  /**
   * Get current ISO timestamp
   */
  private now(): string {
    return new Date().toISOString();
  }

  /**
   * Initialize a new workflow state from config
   */
  private createInitialState(projectName?: string): WorkflowState {
    const timestamp = this.now();

    const phases: Phase[] = this.config.phases.map((phaseConfig: PhaseConfig) => ({
      id: phaseConfig.id,
      name: phaseConfig.name,
      description: phaseConfig.description,
      status: 'pending' as PhaseStatus,
      order: phaseConfig.order,
      steps: phaseConfig.steps.map((stepConfig: StepConfig) => ({
        id: stepConfig.id,
        name: stepConfig.name,
        description: stepConfig.description,
        status: 'pending' as StepStatus,
      })),
      artifacts: phaseConfig.artifacts || [],
    }));

    return {
      workflowId: this.config.workflowId,
      workflowName: this.config.workflowName,
      projectName,
      version: STATE_VERSION,
      createdAt: timestamp,
      lastModifiedAt: timestamp,
      phases,
    };
  }

  /**
   * Check if a workflow state exists
   */
  exists(): boolean {
    return fs.existsSync(this.getStateFilePath());
  }

  /**
   * Initialize a new workflow
   */
  initialize(projectName?: string): OperationResult<WorkflowState> {
    try {
      if (this.exists()) {
        return {
          success: false,
          error: 'Workflow already exists. Use reset() to start over.',
        };
      }

      this.ensureStorageDir();
      const state = this.createInitialState(projectName);
      this.saveState(state);

      return { success: true, data: state };
    } catch (error) {
      return {
        success: false,
        error: `Failed to initialize workflow: ${error}`,
      };
    }
  }

  /**
   * Load existing workflow state
   */
  load(): OperationResult<WorkflowState> {
    try {
      if (!this.exists()) {
        return {
          success: false,
          error: 'No workflow state found. Use initialize() first.',
        };
      }

      const content = fs.readFileSync(this.getStateFilePath(), 'utf-8');
      const state: WorkflowState = JSON.parse(content);

      return { success: true, data: state };
    } catch (error) {
      return {
        success: false,
        error: `Failed to load workflow state: ${error}`,
      };
    }
  }

  /**
   * Save workflow state to disk
   */
  private saveState(state: WorkflowState): void {
    state.lastModifiedAt = this.now();
    this.ensureStorageDir();
    fs.writeFileSync(
      this.getStateFilePath(),
      JSON.stringify(state, null, 2),
      'utf-8'
    );
  }

  /**
   * Reset workflow to initial state
   */
  reset(projectName?: string): OperationResult<WorkflowState> {
    try {
      const stateFilePath = this.getStateFilePath();
      if (fs.existsSync(stateFilePath)) {
        fs.unlinkSync(stateFilePath);
      }

      return this.initialize(projectName);
    } catch (error) {
      return {
        success: false,
        error: `Failed to reset workflow: ${error}`,
      };
    }
  }

  /**
   * Start a phase
   */
  startPhase(phaseId: string): OperationResult<Phase> {
    const loadResult = this.load();
    if (!loadResult.success || !loadResult.data) {
      return { success: false, error: loadResult.error };
    }

    const state = loadResult.data;
    const phase = state.phases.find((p) => p.id === phaseId);

    if (!phase) {
      return { success: false, error: `Phase not found: ${phaseId}` };
    }

    const timestamp = this.now();
    phase.status = 'in_progress';
    phase.startedAt = phase.startedAt || timestamp;
    phase.lastModifiedAt = timestamp;
    state.currentPhaseId = phaseId;

    this.saveState(state);
    return { success: true, data: phase };
  }

  /**
   * Complete a phase
   */
  completePhase(phaseId: string): OperationResult<Phase> {
    const loadResult = this.load();
    if (!loadResult.success || !loadResult.data) {
      return { success: false, error: loadResult.error };
    }

    const state = loadResult.data;
    const phase = state.phases.find((p) => p.id === phaseId);

    if (!phase) {
      return { success: false, error: `Phase not found: ${phaseId}` };
    }

    const timestamp = this.now();
    phase.status = 'completed';
    phase.completedAt = timestamp;
    phase.lastModifiedAt = timestamp;

    // Mark all steps as completed if not already
    phase.steps.forEach((step) => {
      if (step.status !== 'completed' && step.status !== 'skipped') {
        step.status = 'completed';
        step.completedAt = timestamp;
      }
    });

    // Move to next phase if available
    const nextPhase = state.phases.find(
      (p) => p.order === phase.order + 1 && p.status === 'pending'
    );
    state.currentPhaseId = nextPhase?.id;

    this.saveState(state);
    return { success: true, data: phase };
  }

  /**
   * Start a step within a phase
   */
  startStep(phaseId: string, stepId: string): OperationResult<Step> {
    const loadResult = this.load();
    if (!loadResult.success || !loadResult.data) {
      return { success: false, error: loadResult.error };
    }

    const state = loadResult.data;
    const phase = state.phases.find((p) => p.id === phaseId);

    if (!phase) {
      return { success: false, error: `Phase not found: ${phaseId}` };
    }

    const step = phase.steps.find((s) => s.id === stepId);
    if (!step) {
      return { success: false, error: `Step not found: ${stepId}` };
    }

    const timestamp = this.now();
    step.status = 'in_progress';
    step.startedAt = step.startedAt || timestamp;
    phase.lastModifiedAt = timestamp;

    // Ensure phase is in progress
    if (phase.status === 'pending') {
      phase.status = 'in_progress';
      phase.startedAt = phase.startedAt || timestamp;
      state.currentPhaseId = phaseId;
    }

    this.saveState(state);
    return { success: true, data: step };
  }

  /**
   * Complete a step within a phase
   */
  completeStep(
    phaseId: string,
    stepId: string,
    data?: Record<string, unknown>
  ): OperationResult<Step> {
    const loadResult = this.load();
    if (!loadResult.success || !loadResult.data) {
      return { success: false, error: loadResult.error };
    }

    const state = loadResult.data;
    const phase = state.phases.find((p) => p.id === phaseId);

    if (!phase) {
      return { success: false, error: `Phase not found: ${phaseId}` };
    }

    const step = phase.steps.find((s) => s.id === stepId);
    if (!step) {
      return { success: false, error: `Step not found: ${stepId}` };
    }

    const timestamp = this.now();
    step.status = 'completed';
    step.completedAt = timestamp;
    if (data) {
      step.data = { ...step.data, ...data };
    }
    phase.lastModifiedAt = timestamp;

    this.saveState(state);
    return { success: true, data: step };
  }

  /**
   * Add an artifact to a phase
   */
  addArtifact(phaseId: string, artifactPath: string): OperationResult<Phase> {
    const loadResult = this.load();
    if (!loadResult.success || !loadResult.data) {
      return { success: false, error: loadResult.error };
    }

    const state = loadResult.data;
    const phase = state.phases.find((p) => p.id === phaseId);

    if (!phase) {
      return { success: false, error: `Phase not found: ${phaseId}` };
    }

    if (!phase.artifacts.includes(artifactPath)) {
      phase.artifacts.push(artifactPath);
      phase.lastModifiedAt = this.now();
      this.saveState(state);
    }

    return { success: true, data: phase };
  }

  /**
   * Store custom data for a phase
   */
  setPhaseData(
    phaseId: string,
    data: Record<string, unknown>
  ): OperationResult<Phase> {
    const loadResult = this.load();
    if (!loadResult.success || !loadResult.data) {
      return { success: false, error: loadResult.error };
    }

    const state = loadResult.data;
    const phase = state.phases.find((p) => p.id === phaseId);

    if (!phase) {
      return { success: false, error: `Phase not found: ${phaseId}` };
    }

    phase.data = { ...phase.data, ...data };
    phase.lastModifiedAt = this.now();
    this.saveState(state);

    return { success: true, data: phase };
  }

  /**
   * Get workflow progress summary
   */
  getProgress(): OperationResult<WorkflowProgress> {
    const loadResult = this.load();
    if (!loadResult.success || !loadResult.data) {
      return { success: false, error: loadResult.error };
    }

    const state = loadResult.data;
    const totalPhases = state.phases.length;
    const completedPhases = state.phases.filter(
      (p) => p.status === 'completed'
    ).length;

    const currentPhase = state.currentPhaseId
      ? state.phases.find((p) => p.id === state.currentPhaseId)
      : state.phases.find((p) => p.status === 'in_progress');

    let currentPhaseProgress;
    if (currentPhase) {
      const totalSteps = currentPhase.steps.length;
      const completedSteps = currentPhase.steps.filter(
        (s) => s.status === 'completed'
      ).length;
      currentPhaseProgress = {
        id: currentPhase.id,
        name: currentPhase.name,
        totalSteps,
        completedSteps,
      };
    }

    // Calculate overall progress
    let totalWeight = 0;
    let completedWeight = 0;

    state.phases.forEach((phase) => {
      const phaseWeight = phase.steps.length || 1;
      totalWeight += phaseWeight;

      if (phase.status === 'completed') {
        completedWeight += phaseWeight;
      } else if (phase.status === 'in_progress') {
        const stepProgress =
          phase.steps.filter((s) => s.status === 'completed').length /
          (phase.steps.length || 1);
        completedWeight += phaseWeight * stepProgress;
      }
    });

    const overallProgress =
      totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;

    return {
      success: true,
      data: {
        totalPhases,
        completedPhases,
        currentPhase: currentPhaseProgress,
        overallProgress,
      },
    };
  }

  /**
   * Get current phase
   */
  getCurrentPhase(): OperationResult<Phase | null> {
    const loadResult = this.load();
    if (!loadResult.success || !loadResult.data) {
      return { success: false, error: loadResult.error };
    }

    const state = loadResult.data;
    const currentPhase = state.currentPhaseId
      ? state.phases.find((p) => p.id === state.currentPhaseId)
      : state.phases.find((p) => p.status === 'in_progress') ||
        state.phases.find((p) => p.status === 'pending');

    return { success: true, data: currentPhase || null };
  }

  /**
   * Get next pending step in current phase
   */
  getNextStep(): OperationResult<{ phase: Phase; step: Step } | null> {
    const currentPhaseResult = this.getCurrentPhase();
    if (!currentPhaseResult.success) {
      return { success: false, error: currentPhaseResult.error };
    }

    const phase = currentPhaseResult.data;
    if (!phase) {
      return { success: true, data: null };
    }

    const nextStep = phase.steps.find(
      (s) => s.status === 'pending' || s.status === 'in_progress'
    );

    if (!nextStep) {
      return { success: true, data: null };
    }

    return { success: true, data: { phase, step: nextStep } };
  }
}

/**
 * Factory function to create a WorkflowStateManager instance
 */
export function createWorkflowManager(
  config: WorkflowConfig,
  basePath?: string
): WorkflowStateManager {
  return new WorkflowStateManager(config, basePath);
}
