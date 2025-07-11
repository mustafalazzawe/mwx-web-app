import { useState, useEffect } from "react";
import type { FC } from "react";

import {
  useThree,
  useThreeState,
} from "../../../providers/Three/Three.context";

import TopNav from "../../Navbars/TopNav/TopNav";
import BottomNav from "../../Navbars/BottomNav/BottomNav";
import Tutorial from "../../Tutorial/Tutorial";
import type { TBottomModes } from "../../Navbars/BottomNav/BottomNav.types";

import { ModelContentArea, ModelViewWrapper } from "./ModelView.styled";

const ModelView: FC = () => {
  const { isInitialized } = useThreeState();
  const { threeSceneRef } = useThree();

  const [showTutorial, setShowTutorial] = useState(false);
  const [activeMode, setActiveMode] = useState<TBottomModes>("Overview");

  // Check if user has seen controls before
  useEffect(() => {
    const hasSeenControls = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenControls && isInitialized) {
      setShowTutorial(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (!threeSceneRef.current) return;

    // TODO: Handle any interaction with 3d model here
    // Camera animations, toggling sensors, etc.
    switch (activeMode) {
      case "Overview":
        console.log("Overview mode: Standard 3D view");
        // Reset any special interactions

        break;
      case "Sensors":
        console.log("Sensors mode: Enable sensors widgets");
        // Enable sensor-specific interactions

        break;
      case "Scenario":
        console.log("Scenario mode: Enable scerario features");
        // Enable scenario interactions

        break;
    }
  }, [activeMode, threeSceneRef]);

  const handleDismissTutorial = () => {
    localStorage.setItem("hasSeenTutorial", "true");
    setShowTutorial(false);
  };

  const handleModeChange = (mode: TBottomModes) => {
    setActiveMode(mode);
  };

  return (
    <ModelViewWrapper>
      <TopNav />

      <ModelContentArea>
        {/* Conditionally render content based on active mode */}
        {activeMode === "Sensors" && (
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              background: "rgba(0,0,0,0.8)",
              color: "white",
              padding: 20,
              borderRadius: 8,
              pointerEvents: "auto",
            }}
          >
            <h3>Sensors Overlay</h3>
            <p>Sensor list will go here...</p>
          </div>
        )}

        {activeMode === "Scenario" && (
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "rgba(0,0,0,0.8)",
              color: "white",
              padding: 20,
              borderRadius: 8,
              pointerEvents: "auto",
            }}
          >
            <h3>Scenario Mode</h3>
            <p>Interactive 3D controls will go here...</p>
          </div>
        )}

        {showTutorial && <Tutorial onDismiss={handleDismissTutorial} />}
      </ModelContentArea>

      <BottomNav activeMode={activeMode} onModeChange={handleModeChange} />
    </ModelViewWrapper>
  );
};

export default ModelView;
