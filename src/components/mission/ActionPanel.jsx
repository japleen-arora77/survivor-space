
/**
 * File: ActionPanel.jsx
 * Purpose: Displays the actions available during a mission.
 * Owner: Team Lead.
 * Responsibilities: Renders action cards and reports the selected action
 * to the shared game shell.
 */

function ActionPanel({ actions, onAction, paused }) {
    return (
      <section className="actions-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">MISSION CONTROL</div>
            <h2>Choose your next action</h2>
          </div>
  
          <span className="muted-text">ACTION SELECTION</span>
        </div>
  
        <div className="action-grid">
          {actions.map((action, index) => (
            <button
              key={action.id}
              className="action-card"
              onClick={() => onAction(action)}
              disabled={paused}
            >
              <span className="action-number">
                {String(index + 1).padStart(2, "0")}
              </span>
  
              <strong>{action.label}</strong>
  
              <span className="action-description">
                {action.description}
              </span>
  
              <span className="action-cta">
                EXECUTE ACTION ↗
              </span>
            </button>
          ))}
        </div>
      </section>
    );
  }
  
  export default ActionPanel;
  