
/**
 * File: ResourceHUD.jsx
 * Purpose: Displays the shared mission resource dashboard.
 * Owner: Team Lead.
 * Responsibilities: Maps the current resource state into reusable cards.
 */

import ResourceCard from "./ResourceCard.jsx";

const RESOURCE_LABELS = {
  oxygen: "Oxygen",
  water: "Water",
  food: "Food",
  power: "Power",
};

function ResourceHUD({ resources }) {
  return (
    <section className="resource-grid" aria-label="Mission resources">
      {Object.entries(RESOURCE_LABELS).map(([key, label]) => (
        <ResourceCard
          key={key}
          name={label}
          value={resources[key]}
        />
      ))}
    </section>
  );
}

export default ResourceHUD;
