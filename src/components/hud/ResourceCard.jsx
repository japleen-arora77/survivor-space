
/**
 * File: ResourceCard.jsx
 * Purpose: Displays one resource's current value and status.
 * Owner: Team Lead.
 * Responsibilities: Renders the resource label, percentage, progress bar
 * and reserve status. It does not modify game state.
 */

function ResourceCard({ name, value }) {
    const status =
      value <= 15
        ? "CRITICAL"
        : value <= 30
          ? "LOW RESERVE"
          : "NOMINAL";
  
    return (
      <article className="resource-card">
        <div className="resource-heading">{name.toUpperCase()}</div>
  
        <div className="resource-value">
          {value}
          <span>%</span>
        </div>
  
        <div
          className="resource-track"
          role="progressbar"
          aria-label={`${name} reserve`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
        >
          <div
            className={`resource-fill ${value <= 30 ? "warning" : ""}`}
            style={{ width: `${value}%` }}
          />
        </div>
  
        <div
          className="resource-status"
          data-status={status.toLowerCase().replace(" ", "-")}
        >
          {status}
        </div>
      </article>
    );
  }
  
  export default ResourceCard;
  