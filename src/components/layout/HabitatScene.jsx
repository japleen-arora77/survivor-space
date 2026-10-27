
/**
 * File: HabitatScene.jsx
 * Purpose: Renders the interactive 2.5D lunar habitat for Survivor: Space.
 * Owner: Team Lead.
 * Responsibilities:
 * - Displays clickable equipment hotspots.
 * - Shows actions relevant to the selected equipment.
 * - Reveals projected resource consequences before an action is chosen.
 * - Sends player choices to the existing game engine.
 */

import { useEffect, useState } from "react";
import {
  Activity,
  BatteryCharging,
  CheckCircle2,
  CircuitBoard,
  ClipboardCheck,
  Crosshair,
  Power,
  ShieldAlert,
  SolarPanel,
  Wrench,
  X,
  Zap,
} from "lucide-react";

import "./habitat-scene.css";

const HABITAT_OBJECTS = [
  {
    id: "power-unit",
    name: "Power Distribution Unit",
    shortName: "POWER UNIT",
    description: "Inspect the electrical bus and locate the connection fault.",
    icon: CircuitBoard,
    position: { left: "27%", top: "38%" },
    steps: {
      power_failure: ["diagnose", "isolate_circuit"],
      repair_decision: ["repair_power"],
      power_check: ["run_diagnostics"],
    },
  },
  {
    id: "battery",
    name: "Battery Monitor",
    shortName: "BATTERY",
    description: "Check the habitat's remaining electrical reserve.",
    icon: BatteryCharging,
    position: { left: "70%", top: "44%" },
    steps: {
      power_failure: ["emergency_mode"],
      power_check: ["safe_shutdown"],
    },
  },
  {
    id: "solar-monitor",
    name: "Solar Array Monitor",
    shortName: "SOLAR ARRAY",
    description: "Review the power connection between the solar array and habitat.",
    icon: SolarPanel,
    position: { left: "49%", top: "27%" },
    steps: {
      power_failure: ["diagnose"],
      repair_decision: ["repair_power"],
      power_check: ["run_diagnostics"],
    },
  },
  {
    id: "emergency-console",
    name: "Emergency Power Console",
    shortName: "EMERGENCY POWER",
    description: "Restrict nonessential electrical systems to protect life support.",
    icon: Power,
    position: { left: "78%", top: "65%" },
    steps: {
      power_failure: ["emergency_mode"],
      repair_decision: ["emergency_shutdown"],
      power_check: ["safe_shutdown"],
    },
  },
  {
    id: "circuit-breaker",
    name: "Circuit Isolation Panel",
    shortName: "CIRCUIT BREAKER",
    description: "Isolate the suspected faulty circuit to protect the habitat.",
    icon: Zap,
    position: { left: "31%", top: "65%" },
    steps: {
      power_failure: ["isolate_circuit"],
      repair_decision: ["emergency_shutdown"],
      power_check: ["safe_shutdown"],
    },
  },
];

function formatEffect(resource, change, resources) {
  const current = Number(resources?.[resource] ?? 0);
  const next = Math.max(0, Math.min(100, current + Number(change)));
  const sign = Number(change) > 0 ? "+" : "";

  const resourceName =
    resource.charAt(0).toUpperCase() + resource.slice(1);

  return {
    resourceName,
    change: `${sign}${change} points`,
    projection: `${current}% → ${next}%`,
    positive: Number(change) > 0,
  };
}

function HabitatScene({
  currentStep,
  actions = [],
  resources,
  feedback,
  outcome,
  paused,
  onAction,
}) {
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [expandedActionId, setExpandedActionId] = useState(null);

  const isArrival = currentStep === "arrival";
  const selectedObject = HABITAT_OBJECTS.find(
    (item) => item.id === selectedObjectId
  );

  useEffect(() => {
    setSelectedObjectId(null);
    setExpandedActionId(null);
  }, [currentStep]);

  const visibleActions = selectedObject
    ? actions.filter((action) =>
        selectedObject.steps?.[currentStep]?.includes(action.id)
      )
    : [];

  function selectObject(objectId) {
    if (paused || outcome || isArrival) {
      return;
    }

    setSelectedObjectId(objectId);
    setExpandedActionId(null);
  }

  function performAction(action) {
    if (paused || outcome) {
      return;
    }

    onAction(action.id);
    setSelectedObjectId(null);
    setExpandedActionId(null);
  }

  return (
    <section className="habitat-gameplay" aria-label="Lunar habitat gameplay">
      <div className="habitat-topline">
        <div>
          <span className="habitat-kicker">
            <Crosshair size={13} />
            HABITAT MODULE / INTERACTIVE ENVIRONMENT
          </span>

          <h2>
            {isArrival ? "Lunar Habitat" : "Power Systems Bay"}
          </h2>
        </div>

        <div className={`habitat-system-state ${outcome ? "is-resolved" : ""}`}>
          <span className="habitat-state-light" />
          {outcome
            ? outcome === "success"
              ? "POWER RESTORED"
              : outcome === "recovery"
                ? "EMERGENCY STABILIZED"
                : "MISSION FAILED"
            : isArrival
              ? "SYSTEMS STANDBY"
              : "ELECTRICAL FAULT"}
        </div>
      </div>

      <div className={`habitat-scene ${isArrival ? "is-arrival" : ""}`}>
        <div className="habitat-back-wall" />
        <div className="habitat-ceiling-light light-one" />
        <div className="habitat-ceiling-light light-two" />

        <div className="habitat-window">
          <div className="habitat-window-glow" />
          <div className="habitat-earth" />
          <div className="habitat-moon-surface" />
          <div className="habitat-window-frame" />
        </div>

        <div className="habitat-wall-seam seam-one" />
        <div className="habitat-wall-seam seam-two" />

        <div className="habitat-cable cable-one" />
        <div className="habitat-cable cable-two" />

        <div className="habitat-power-unit">
          <div className="equipment-top" />
          <div className="equipment-face">
            <div className="equipment-title">PDU / 01</div>
            <div className="equipment-screen">
              <Activity size={19} />
              <span>{isArrival ? "STANDBY" : "BUS FAULT"}</span>
            </div>
            <div className="equipment-lights">
              <i />
              <i />
              <i />
            </div>
            <div className="equipment-vents">
              <i /><i /><i /><i /><i />
            </div>
          </div>
          <div className="equipment-side" />
        </div>

        <div className="habitat-battery-unit">
          <div className="battery-label">ENERGY RESERVE</div>
          <div className="battery-screen">
            <BatteryCharging size={21} />
            <strong>{resources?.power ?? 100}%</strong>
          </div>
          <div className="battery-bars">
            {[1, 2, 3, 4, 5].map((bar) => (
              <i
                key={bar}
                className={
                  bar <= Math.ceil((resources?.power ?? 100) / 20)
                    ? "active"
                    : ""
                }
              />
            ))}
          </div>
        </div>

        <div className="habitat-emergency-console">
          <div className="console-label">EMERGENCY CONTROL</div>
          <div className="console-switch">
            <span />
          </div>
          <div className="console-readout">LIFE SUPPORT / ON</div>
        </div>

        <div className="habitat-breaker">
          <div className="breaker-label">CIRCUIT ISOLATION</div>
          <div className="breaker-switch">
            <span />
          </div>
        </div>

        <div className="habitat-floor">
          <div className="floor-grid" />
          <div className="floor-reflection" />
        </div>

        {!isArrival &&
          HABITAT_OBJECTS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedObjectId === item.id;
            const available = (item.steps?.[currentStep] ?? []).some(
              (actionId) => actions.some((action) => action.id === actionId)
            );

            return (
              <button
                key={item.id}
                type="button"
                className={[
                  "habitat-hotspot",
                  isSelected ? "is-selected" : "",
                  available ? "has-action" : "",
                ].filter(Boolean).join(" ")}
                style={{
                  left: item.position.left,
                  top: item.position.top,
                }}
                onClick={() => selectObject(item.id)}
                disabled={paused || Boolean(outcome)}
                aria-label={`Inspect ${item.name}`}
                title={`Inspect ${item.name}`}
              >
                <span className="hotspot-pulse" />
                <Icon size={17} />
                <span className="hotspot-label">{item.shortName}</span>
              </button>
            );
          })}

        {isArrival && (
          <div className="habitat-arrival-card">
            <span className="habitat-kicker">LUNAR DAY 01 / ARRIVAL</span>
            <h3>Welcome to the habitat.</h3>
            <p>
              Life-support systems are stable. Begin your initial checks to
              enter the power systems bay.
            </p>

            <button
              type="button"
              className="habitat-primary-action"
              onClick={() => actions[0] && performAction(actions[0])}
              disabled={paused || !actions[0] || Boolean(outcome)}
            >
              <Power size={17} />
              BEGIN LEVEL 1
            </button>
          </div>
        )}

        {!isArrival && !selectedObject && !outcome && (
          <div className="habitat-exploration-hint">
            <Crosshair size={15} />
            SELECT A GLOWING EQUIPMENT MARKER TO INSPECT IT
          </div>
        )}

        {paused && (
          <div className="habitat-overlay-message">
            <Activity size={24} />
            <strong>SIMULATION PAUSED</strong>
            <span>Resume the mission to interact with equipment.</span>
          </div>
        )}

        {outcome && (
          <div className="habitat-overlay-message outcome-message">
            <CheckCircle2 size={28} />
            <strong>
              {outcome === "success"
                ? "POWER CONNECTION RESTORED"
                : outcome === "recovery"
                  ? "HABITAT STABILIZED"
                  : "MISSION FAILED"}
            </strong>
            <span>{feedback}</span>
          </div>
        )}
      </div>

      {!isArrival && (
        <div className="habitat-interaction-area">
          {selectedObject ? (
            <div className="equipment-inspector">
              <div className="inspector-heading">
                <div className="inspector-icon">
                  <selectedObject.icon size={21} />
                </div>

                <div className="inspector-title">
                  <span className="habitat-kicker">EQUIPMENT INSPECTION</span>
                  <h3>{selectedObject.name}</h3>
                </div>

                <button
                  type="button"
                  className="inspector-close"
                  onClick={() => setSelectedObjectId(null)}
                  aria-label="Close equipment inspection"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="inspector-description">
                {selectedObject.description}
              </p>

              {visibleActions.length > 0 ? (
                <div className="contextual-actions">
                  {visibleActions.map((action) => {
                    const isExpanded = expandedActionId === action.id;

                    return (
                      <article
                        key={action.id}
                        className="contextual-action"
                      >
                        <div className="contextual-action-main">
                          <div className="contextual-action-copy">
                            <h4>{action.label}</h4>
                            <p>{action.description}</p>
                          </div>

                          <button
                            type="button"
                            className="consequence-toggle"
                            onClick={() =>
                              setExpandedActionId(
                                isExpanded ? null : action.id
                              )
                            }
                            aria-expanded={isExpanded}
                          >
                            {isExpanded ? "Hide" : "Consequences"}
                            <span>{isExpanded ? "−" : "+"}</span>
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="consequence-details">
                            <span className="consequence-heading">
                              <ClipboardCheck size={14} />
                              PROJECTED RESOURCE CHANGE
                            </span>

                            {Object.entries(action.effects ?? {}).length > 0 ? (
                              Object.entries(action.effects).map(
                                ([resource, change]) => {
                                  const effect = formatEffect(
                                    resource,
                                    change,
                                    resources
                                  );

                                  return (
                                    <div
                                      className="consequence-resource"
                                      key={resource}
                                    >
                                      <span>{effect.resourceName}</span>
                                      <strong
                                        className={
                                          effect.positive
                                            ? "effect-positive"
                                            : "effect-negative"
                                        }
                                      >
                                        {effect.change}
                                      </strong>
                                      <span className="effect-projection">
                                        {effect.projection}
                                      </span>
                                    </div>
                                  );
                                }
                              )
                            ) : (
                              <p>No direct resource change is specified.</p>
                            )}

                            <p className="consequence-note">
                              Projection assumes this action is executed now.
                              Actual results follow the mission rules.
                            </p>
                          </div>
                        )}

                        <button
                          type="button"
                          className="execute-action"
                          onClick={() => performAction(action)}
                          disabled={paused || Boolean(outcome)}
                        >
                          <Wrench size={15} />
                          Execute Action
                        </button>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="no-equipment-actions">
                  <ShieldAlert size={18} />
                  <span>
                    No actions are available for this equipment at this stage.
                    Inspect another unit.
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="habitat-inspection-prompt">
              <div className="prompt-icon">
                <Crosshair size={21} />
              </div>
              <div>
                <strong>Explore the power systems bay</strong>
                <p>
                  Select a glowing marker in the habitat to inspect equipment
                  and reveal your available actions.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default HabitatScene;
