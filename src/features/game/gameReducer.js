
/**
 * File: gameReducer.js
 * Purpose: Updates the Survivor: Space game state in response to events.
 * Owner: Team Lead.
 *
 * Responsibilities:
 * - Process player choices.
 * - Handle pause and resume.
 * - Reset a mission to its initial state.
 * - Keep state transitions consistent and predictable.
 *
 * The reducer does not render UI or directly modify existing state.
 */

import {
    createInitialGameState,
    resolveMissionAction,
  } from "./gameRules.js";
  
  /**
   * Receives the current state and an event, then returns the new state.
   */
  export function gameReducer(state, action) {
    switch (action.type) {
      case "PERFORM_ACTION": {
        return resolveMissionAction(
          state,
          action.mission,
          action.actionId
        );
      }
  
      case "TOGGLE_PAUSE": {
        // Do not allow a completed mission to be paused.
        if (state.outcome) {
          return state;
        }
  
        const paused = !state.paused;
  
        return {
          ...state,
          paused,
          feedback: paused
            ? "Simulation paused."
            : "Simulation resumed. Awaiting astronaut input.",
        };
      }
  
      case "SET_PAUSED": {
        if (state.outcome && action.paused) {
          return state;
        }
  
        return {
          ...state,
          paused: Boolean(action.paused),
          feedback: action.paused
            ? "Simulation paused."
            : "Simulation resumed. Awaiting astronaut input.",
        };
      }
  
      case "RESET_GAME": {
        return createInitialGameState(action.mission);
      }
  
      default: {
        // Unknown events leave the state unchanged.
        return state;
      }
    }
  }
  
  export default gameReducer;
  