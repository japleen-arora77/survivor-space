
/**
 * File: gameRules.js
 * Purpose: Defines the core rules of Survivor: Space.
 * Owner: Team Lead.
 *
 * Responsibilities:
 * - Create the initial game state.
 * - Validate mission actions and their requirements.
 * - Apply resource changes safely.
 * - Update mission flags and progress.
 * - Determine mission outcomes.
 *
 * This file contains game logic, not UI or CSS.
 */

export const RESOURCE_NAMES = [
    "oxygen",
    "water",
    "food",
    "power",
  ];
  
  const DEFAULT_RESOURCES = {
    oxygen: 100,
    water: 100,
    food: 100,
    power: 100,
  };
  
  /**
   * Creates a fresh state for the supplied mission.
   *
   * The mission can define its own initialResources and initialStep.
   * Otherwise, the game starts with all resources at 100%.
   */
  export function createInitialGameState(mission) {
    const resources = {
      ...DEFAULT_RESOURCES,
      ...(mission?.initialResources ?? {}),
    };
  
    // Keep all resource values between 0 and 100.
    RESOURCE_NAMES.forEach((name) => {
      const value = Number(resources[name]);
  
      resources[name] = Number.isFinite(value)
        ? Math.max(0, Math.min(100, value))
        : DEFAULT_RESOURCES[name];
    });
  
    return {
      resources,
      currentStep: mission?.initialStep ?? null,
      flags: {},
      feedback: "Mission ready. Awaiting astronaut input.",
      outcome: null,
      paused: false,
      actionHistory: [],
    };
  }
  
  /**
   * Checks whether an action's requirements are satisfied.
   *
   * Example mission action:
   * requiresFlags: { systemDiagnosed: true }
   * requiresResources: { power: 5 }
   */
  export function validateAction(state, action) {
    if (state.paused) {
      return {
        allowed: false,
        feedback: "Simulation is paused. Resume to continue.",
      };
    }
  
    if (state.outcome) {
      return {
        allowed: false,
        feedback: "This mission has ended. Reset to play again.",
      };
    }
  
    for (const [flag, expectedValue] of Object.entries(
      action.requiresFlags ?? {}
    )) {
      if (state.flags[flag] !== expectedValue) {
        return {
          allowed: false,
          feedback:
            action.requirementFeedback ??
            "The requirements for this action have not been met.",
        };
      }
    }
  
    for (const [resource, requiredAmount] of Object.entries(
      action.requiresResources ?? {}
    )) {
      if (
        !(resource in state.resources) ||
        state.resources[resource] < requiredAmount
      ) {
        return {
          allowed: false,
          feedback:
            action.requirementFeedback ??
            `Insufficient ${resource} to perform this action.`,
        };
      }
    }
  
    return { allowed: true, feedback: "" };
  }
  
  /**
   * Applies resource effects and prevents values outside 0–100.
   *
   * Effects are percentage-point changes, not percentages of the
   * current value. For example, power: -5 changes 75 to 70.
   */
  export function applyResourceEffects(resources, effects = {}) {
    const updatedResources = { ...resources };
  
    for (const [resource, change] of Object.entries(effects)) {
      if (!RESOURCE_NAMES.includes(resource)) {
        continue;
      }
  
      const amount = Number(change);
  
      if (!Number.isFinite(amount)) {
        continue;
      }
  
      updatedResources[resource] = Math.max(
        0,
        Math.min(100, updatedResources[resource] + amount)
      );
    }
  
    return updatedResources;
  }
  
  /**
   * Processes a selected mission action.
   *
   * Supported action fields:
   * id, effects, setFlags, feedback, nextStep, outcome,
   * requiresFlags, requiresResources, requirementFeedback.
   */
  export function resolveMissionAction(state, mission, actionId) {
    const step = mission?.steps?.[state.currentStep];
  
    if (!step) {
      return {
        ...state,
        feedback: "Mission step not found. Please reset the mission.",
      };
    }
  
    const action = step.actions?.find(
      (item) => item.id === actionId
    );
  
    if (!action) {
      return {
        ...state,
        feedback: "That action is not available in this mission step.",
      };
    }
  
    const validation = validateAction(state, action);
  
    if (!validation.allowed) {
      return {
        ...state,
        feedback: validation.feedback,
      };
    }
  
    const resources = applyResourceEffects(
      state.resources,
      action.effects
    );
  
    const flags = {
      ...state.flags,
      ...(action.setFlags ?? {}),
    };
  
    // An outcome marks the mission as finished or in recovery.
    // Accepted values: success, failure, recovery.
    const validOutcomes = ["success", "failure", "recovery"];
    const outcome = validOutcomes.includes(action.outcome)
      ? action.outcome
      : null;
  
    let currentStep = state.currentStep;
  
    if (!outcome && action.nextStep) {
      if (mission.steps?.[action.nextStep]) {
        currentStep = action.nextStep;
      } else {
        return {
          ...state,
          feedback:
            `The next mission step "${action.nextStep}" was not found.`,
        };
      }
    }
  
    return {
      ...state,
      resources,
      flags,
      currentStep,
      outcome,
      feedback: action.feedback ?? "Action completed.",
      actionHistory: [
        ...state.actionHistory,
        {
          actionId: action.id,
          stepId: state.currentStep,
          outcome,
        },
      ],
    };
  }
  