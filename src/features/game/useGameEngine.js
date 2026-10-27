
/**
 * File: useGameEngine.js
 * Purpose: Provides a reusable React hook for running a mission.
 * Owner: Team Lead.
 *
 * Responsibilities:
 * - Initialize the selected mission.
 * - Connect the reducer to React using useReducer.
 * - Expose resources, current step, flags and feedback.
 * - Provide functions for actions, pause, resume and reset.
 *
 * UI components use this hook instead of implementing game rules themselves.
 */

import { useCallback, useReducer } from "react";

import gameReducer from "./gameReducer.js";
import { createInitialGameState } from "./gameRules.js";

/**
 * Creates the game engine for the supplied mission.
 *
 * Usage:
 * const game = useGameEngine(level01Mission);
 */
export default function useGameEngine(mission) {
  const [state, dispatch] = useReducer(
    gameReducer,
    mission,
    createInitialGameState
  );

  /**
   * Sends a selected action to the reducer.
   *
   * Supports either an action ID string or an action object
   * from the existing ActionPanel component.
   */
  const performAction = useCallback(
    (actionOrId) => {
      const actionId =
        typeof actionOrId === "string"
          ? actionOrId
          : actionOrId?.id;

      if (!actionId) {
        return;
      }

      dispatch({
        type: "PERFORM_ACTION",
        mission,
        actionId,
      });
    },
    [mission]
  );

  /**
   * Toggles pause/resume.
   */
  const togglePause = useCallback(() => {
    dispatch({ type: "TOGGLE_PAUSE" });
  }, []);

  /**
   * Explicitly resumes the simulation.
   */
  const resumeGame = useCallback(() => {
    dispatch({
      type: "SET_PAUSED",
      paused: false,
    });
  }, []);

  /**
   * Explicitly pauses the simulation.
   */
  const pauseGame = useCallback(() => {
    dispatch({
      type: "SET_PAUSED",
      paused: true,
    });
  }, []);

  /**
   * Restarts this mission with its initial resources and step.
   */
  const resetGame = useCallback(() => {
    dispatch({
      type: "RESET_GAME",
      mission,
    });
  }, [mission]);

  // Look up the currently active step from the mission definition.
  const currentMissionStep =
    mission?.steps?.[state.currentStep] ?? null;

  return {
    resources: state.resources,
    currentStep: state.currentStep,
    currentMissionStep,
    flags: state.flags,
    feedback: state.feedback,
    outcome: state.outcome,
    paused: state.paused,
    actionHistory: state.actionHistory,

    performAction,
    togglePause,
    resumeGame,
    pauseGame,
    resetGame,
  };
}
