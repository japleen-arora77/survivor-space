
/**
 * File: mission.js
 * Purpose: Defines Level 1, Power Failure on the Moon.
 * Owner: Team Lead.
 * Responsibilities:
 * - Defines mission steps, player actions and resource effects.
 * - Tracks diagnosis, emergency mode, circuit isolation and repair.
 * - Provides meaningful success and recovery outcomes.
 *
 * Resource effects are illustrative game values, not engineering measurements.
 */

const level01Mission = {
    id: 1,
    level: 1,
    lunarDay: 1,
    title: "Power Failure on the Moon",
    severity: "HIGH",
  
    initialResources: {
      oxygen: 100,
      water: 100,
      food: 100,
      power: 100,
    },
  
    initialStep: "arrival",
  
    steps: {
      arrival: {
        title: "Welcome to the Lunar Base",
        severity: "NORMAL",
        description:
          "You have arrived at the lunar habitat. All life-support resources are stable. Begin the systems check to enter the power systems bay.",
        objective:
          "Begin Level 1 and respond to the first electrical emergency.",
  
        actions: [
          {
            id: "begin_level",
            label: "Begin Level 1",
            description:
              "Start the habitat systems check and investigate the incident.",
            effects: {
              power: -25,
            },
            setFlags: {
              powerFailureTriggered: true,
              powerConnectionRepaired: false,
              systemDiagnosed: false,
              circuitIsolated: false,
              emergencyMode: false,
            },
            feedback:
              "POWER FAILURE DETECTED. Power has dropped to 75%. The power distribution unit is intermittently disconnecting the solar array from the habitat electrical bus. Inspect the Power Distribution Unit and run diagnostics.",
            nextStep: "power_failure",
          },
        ],
      },
  
      power_failure: {
        title: "Power Bus Malfunction",
        severity: "HIGH",
        description:
          "The solar array is intermittently disconnecting from the habitat electrical bus. The battery reserve is draining, but life support is still operating.",
        objective:
          "Investigate the power distribution unit and identify the cause of the fault.",
  
        actions: [
          {
            id: "diagnose",
            label: "Run System Diagnostics",
            description:
              "Inspect the power distribution unit to identify the fault.",
            effects: {
              power: -5,
            },
            setFlags: {
              systemDiagnosed: true,
            },
            feedback:
              "DIAGNOSTICS COMPLETE. A faulty connection between the solar array and habitat electrical bus has been identified. The fault is NOT repaired yet. Return to the Power Distribution Unit and select Repair Power Connection, or use emergency isolation if repair is not possible.",
            nextStep: "repair_decision",
          },
  
          {
            id: "emergency_mode",
            label: "Activate Emergency Power",
            description:
              "Restrict nonessential electrical systems to protect life support.",
            effects: {
              power: -2,
            },
            setFlags: {
              emergencyMode: true,
            },
            feedback:
              "EMERGENCY POWER ACTIVE. Nonessential systems have been restricted. The habitat is temporarily protected, but the electrical fault remains. Inspect the Battery Monitor and continue troubleshooting.",
            nextStep: "power_check",
          },
  
          {
            id: "isolate_circuit",
            label: "Isolate Faulty Circuit",
            description:
              "Disconnect the suspected faulty circuit to protect the habitat.",
            effects: {
              power: -10,
            },
            setFlags: {
              circuitIsolated: true,
            },
            feedback:
              "CIRCUIT ISOLATED. The suspected circuit is disconnected, reducing the immediate risk. The root fault has not been repaired. Inspect the Battery Monitor, then run diagnostics or maintain the safe isolation.",
            nextStep: "power_check",
          },
        ],
      },
  
      repair_decision: {
        title: "Repair the Power System",
        severity: "HIGH",
        description:
          "Diagnostics have identified a faulty connection. Choose whether to repair the connection or keep the faulty circuit disconnected.",
        objective:
          "Restore stable power or establish a safe recovery state.",
  
        actions: [
          {
            id: "repair_power",
            label: "Repair Power Connection",
            description:
              "Use the diagnostic findings to repair the faulty electrical connection.",
            requiresFlags: {
              systemDiagnosed: true,
            },
            requirementFeedback:
              "Run System Diagnostics before attempting this repair.",
            effects: {
              power: 15,
            },
            setFlags: {
              powerConnectionRepaired: true,
              circuitIsolated: false,
              emergencyMode: false,
            },
            feedback:
              "REPAIR SUCCESSFUL. The faulty connection has been restored and the electrical bus is stable. The power connection is repaired. Level 1 is complete.",
            outcome: "success",
          },
  
          {
            id: "emergency_shutdown",
            label: "Keep Faulty Circuit Isolated",
            description:
              "Leave the faulty circuit disconnected to protect the habitat while maintenance is pending.",
            effects: {
              power: 5,
            },
            setFlags: {
              circuitIsolated: true,
              powerConnectionRepaired: false,
            },
            feedback:
              "SAFE RECOVERY ESTABLISHED. The faulty circuit remains isolated and the habitat is in a safer state. The connection has NOT been repaired; further maintenance is still required.",
            outcome: "recovery",
          },
        ],
      },
  
      power_check: {
        title: "Power System Status",
        severity: "HIGH",
        description:
          "The immediate response has been completed, but the underlying fault remains unresolved.",
        objective:
          "Inspect the battery status, then diagnose the fault or keep the circuit isolated.",
  
        actions: [
          {
            id: "run_diagnostics",
            label: "Run System Diagnostics",
            description:
              "Identify the underlying fault before attempting a repair.",
            effects: {
              power: -3,
            },
            setFlags: {
              systemDiagnosed: true,
            },
            feedback:
              "DIAGNOSTICS COMPLETE. The faulty connection has been identified. Emergency mode or circuit isolation may have protected the habitat, but neither action repaired the connection. Return to the Power Distribution Unit and repair it, or choose safe recovery.",
            nextStep: "repair_decision",
          },
  
          {
            id: "safe_shutdown",
            label: "Keep Circuit Isolated",
            description:
              "Maintain the isolation to protect the habitat while accepting that the fault remains unresolved.",
            effects: {
              power: 5,
            },
            setFlags: {
              circuitIsolated: true,
              powerConnectionRepaired: false,
            },
            feedback:
              "SAFE RECOVERY ESTABLISHED. The faulty circuit remains isolated. The habitat is protected from that circuit, but the original connection has not been repaired.",
            outcome: "recovery",
          },
        ],
      },
    },
  };
  
  export default level01Mission;
  