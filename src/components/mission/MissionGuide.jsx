
/**
 * File: MissionGuide.jsx
 * Purpose: Gives the player dynamic instructions throughout Level 1.
 * Owner: Team Lead.
 * Responsibilities:
 * - Explains the result of the last action.
 * - Displays the actual power-system status.
 * - Identifies the next recommended equipment and action.
 * - Distinguishes diagnosis, isolation, repair and recovery.
 */

import {
    Activity,
    ArrowRight,
    BatteryCharging,
    CheckCircle2,
    CircleAlert,
    ClipboardList,
    Crosshair,
    ShieldCheck,
    Wrench,
  } from "lucide-react";
  
  import "./mission-guidance.css";
  
  function MissionGuide({ currentStep, flags = {}, outcome, feedback }) {
    let status = {
      label: "SYSTEMS STANDBY",
      description: "No power fault has been triggered yet.",
      tone: "standby",
      icon: Activity,
    };
  
    let instruction = {
      title: "Begin the mission",
      target: "Lunar Habitat",
      description:
        "Start the habitat systems check. The first electrical incident will then be introduced.",
      action: "Begin Level 1",
    };
  
    if (currentStep === "power_failure") {
      status = {
        label: "FAULT DETECTED",
        description:
          "The power distribution unit is unstable. The root cause has not yet been diagnosed.",
        tone: "warning",
        icon: CircleAlert,
      };
  
      instruction = {
        title: "Inspect the Power Distribution Unit",
        target: "Power Distribution Unit",
        description:
          "Select the power unit in the habitat and run System Diagnostics. This identifies the fault; it does not repair it.",
        action: "Run System Diagnostics",
      };
  
      if (flags.emergencyMode) {
        instruction = {
          title: "Emergency power is active",
          target: "Battery Monitor",
          description:
            "Nonessential systems are restricted, but the original fault remains. Check the battery reserve, then diagnose the electrical connection.",
          action: "Inspect the Battery Monitor",
        };
      }
  
      if (flags.circuitIsolated) {
        instruction = {
          title: "Circuit isolated — fault remains",
          target: "Battery Monitor",
          description:
            "Isolation reduces the immediate risk but does not repair the connection. Check the reserve and continue with diagnostics.",
          action: "Inspect the Battery Monitor",
        };
      }
    }
  
    if (currentStep === "repair_decision") {
      status = {
        label: "FAULT DIAGNOSED",
        description:
          "The faulty connection has been identified, but the connection has not yet been repaired.",
        tone: "warning",
        icon: ClipboardList,
      };
  
      instruction = {
        title: "Repair the identified connection",
        target: "Power Distribution Unit",
        description:
          "Return to the power unit and select Repair Power Connection to restore the electrical bus. Alternatively, keep the circuit isolated for a recovery outcome.",
        action: "Repair Power Connection",
      };
    }
  
    if (currentStep === "power_check") {
      status = {
        label: flags.circuitIsolated
          ? "CIRCUIT ISOLATED"
          : flags.emergencyMode
            ? "EMERGENCY POWER"
            : "FAULT UNRESOLVED",
        description: flags.circuitIsolated
          ? "The circuit is isolated. The underlying connection fault remains."
          : "The habitat is using a temporary response. The underlying fault remains.",
        tone: "warning",
        icon: BatteryCharging,
      };
  
      instruction = {
        title: "Check the battery reserve",
        target: "Battery Monitor",
        description:
          "Inspect the battery monitor, then choose Run System Diagnostics to identify the fault or Keep Circuit Isolated to finish in safe recovery.",
        action: "Inspect the Battery Monitor",
      };
    }
  
    if (outcome === "success") {
      status = {
        label: "CONNECTION RESTORED",
        description:
          "The mission state confirms that the faulty connection has been repaired.",
        tone: "success",
        icon: CheckCircle2,
      };
  
      instruction = {
        title: "Power system restored",
        target: "Power Distribution Unit",
        description:
          "The connection has been repaired. Verify the green system status and review the mission result.",
        action: "Mission complete",
      };
    }
  
    if (outcome === "recovery") {
      status = {
        label: "SAFE RECOVERY",
        description:
          "The immediate risk has been reduced, but the original connection remains unrepaired.",
        tone: "recovery",
        icon: ShieldCheck,
      };
  
      instruction = {
        title: "Habitat stabilized — maintenance pending",
        target: "Circuit Isolation Panel",
        description:
          "The habitat is in a safer state because the faulty circuit remains isolated. This is a recovery outcome, not a full repair.",
        action: "Recovery outcome",
      };
    }
  
    if (outcome === "failure") {
      status = {
        label: "MISSION FAILED",
        description: "The mission has reached a failure outcome.",
        tone: "warning",
        icon: CircleAlert,
      };
  
      instruction = {
        title: "Review the mission result",
        target: "Habitat systems",
        description:
          "Review the reported result and reset the mission to try another strategy.",
        action: "Reset the mission",
      };
    }
  
    const StatusIcon = status.icon;
  
    return (
      <section className="mission-guide" aria-live="polite">
        <div className="mission-guide-header">
          <div className="mission-guide-heading">
            <span className="mission-guide-kicker">
              <Crosshair size={14} />
              MISSION CONTROL
            </span>
            <h3>Mission guidance</h3>
          </div>
  
          <span className={`mission-status-badge tone-${status.tone}`}>
            <StatusIcon size={14} />
            {status.label}
          </span>
        </div>
  
        <div className="mission-status-description">
          {status.description}
        </div>
  
        <div className="mission-next-step">
          <div className="mission-next-icon">
            {outcome === "success" ? (
              <CheckCircle2 size={21} />
            ) : outcome === "recovery" ? (
              <ShieldCheck size={21} />
            ) : (
              <Wrench size={21} />
            )}
          </div>
  
          <div className="mission-next-copy">
            <span className="mission-guide-kicker">
              {outcome ? "MISSION RESULT" : "YOUR NEXT OBJECTIVE"}
            </span>
            <h4>{instruction.title}</h4>
            <p>{instruction.description}</p>
  
            {!outcome && (
              <div className="mission-target">
                <ArrowRight size={15} />
                <span>
                  NEXT: <strong>{instruction.target}</strong>
                </span>
              </div>
            )}
          </div>
        </div>
  
        {feedback && (
          <div className="mission-last-event">
            <Activity size={15} />
            <div>
              <span>LAST SYSTEM UPDATE</span>
              <p>{feedback}</p>
            </div>
          </div>
        )}
      </section>
    );
  }
  
  export default MissionGuide;
  