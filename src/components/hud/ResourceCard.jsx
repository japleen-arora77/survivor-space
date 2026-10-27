
/**
 * File: ResourceCard.jsx
 * Purpose: Displays one animated resource indicator.
 * Owner: Team Lead.
 * Responsibilities: Shows resource percentage, status and visual changes.
 */

import { useEffect, useRef, useState } from "react";

function getResourceStatus(value) {
  if (value <= 15) {
    return "CRITICAL";
  }

  if (value <= 30) {
    return "LOW RESERVE";
  }

  return "NOMINAL";
}

function ResourceCard({ name, value }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));

  const [displayedValue, setDisplayedValue] = useState(safeValue);
  const [isChanging, setIsChanging] = useState(false);

  const previousValue = useRef(safeValue);

  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = safeValue;

    let currentProgress = 0;
    const duration = 550;
    const intervalLength = 20;

    setIsChanging(startValue !== endValue);

    const animationInterval = setInterval(() => {
      currentProgress += intervalLength / duration;

      const progress = Math.min(currentProgress, 1);

      // Ease the number toward the new value.
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const nextValue = Math.round(
        startValue + (endValue - startValue) * easedProgress
      );

      setDisplayedValue(nextValue);

      if (progress >= 1) {
        clearInterval(animationInterval);
        setDisplayedValue(endValue);
        previousValue.current = endValue;
      }
    }, intervalLength);

    const highlightTimeout = setTimeout(() => {
      setIsChanging(false);
    }, duration + 100);

    return () => {
      clearInterval(animationInterval);
      clearTimeout(highlightTimeout);
    };
  }, [safeValue]);

  const status = getResourceStatus(safeValue);

  const formattedName =
    name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <article
      className={`resource-card ${
        isChanging ? "resource-card--changing" : ""
      }`}
      aria-label={`${formattedName}: ${displayedValue} percent, ${status}`}
    >
      <div className="resource-heading">
        <span>{formattedName}</span>
        <span className="resource-status">{status}</span>
      </div>

      <div className="resource-value">
        <span>{displayedValue}</span>
        <span className="resource-percent">%</span>
      </div>

      <div
        className="resource-track"
        role="progressbar"
        aria-label={formattedName}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
      >
        <div
          className={`resource-fill ${
            safeValue <= 15 ? "warning" : ""
          }`}
          style={{ width: `${safeValue}%` }}
        />
      </div>

      <div className="resource-status">
        {status === "CRITICAL"
          ? "Immediate attention required"
          : status === "LOW RESERVE"
            ? "Reserve running low"
            : "Systems within safe range"}
      </div>
    </article>
  );
}

export default ResourceCard;
