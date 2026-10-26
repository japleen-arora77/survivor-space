
/**
 * File: SpacecraftScene.jsx
 * Purpose: Renders the simulated lunar surface viewport.
 * Owner: Team Lead.
 * Responsibilities: Displays the Earth, lunar horizon, surface ridges
 * and location readout using CSS.
 */

function SpacecraftScene() {
    return (
      <div className="spacecraft-scene">
        <div className="scene-label">
          LIVE SIMULATION / LUNAR SURFACE
        </div>
  
        <div className="earth-orb" aria-hidden="true" />
        <div className="lunar-horizon" aria-hidden="true" />
        <div className="lunar-ridge ridge-back" aria-hidden="true" />
        <div className="lunar-ridge ridge-front" aria-hidden="true" />
  
        <div className="scene-readout">
          <span>LOCATION</span>
          <strong>SOUTHERN HIGHLANDS</strong>
          <span>EXTERNAL CONDITIONS: UNSTABLE</span>
        </div>
      </div>
    );
  }
  
  export default SpacecraftScene;
  