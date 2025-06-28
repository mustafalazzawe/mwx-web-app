import React, { useState, useEffect } from "react";
import { ModelViewWrapper } from "./ModelView.styled";
import TopNav from "../../Navbars/TopNav/TopNav";
import Tutorial from "../../Tutorial/Tutorial";
import { useThreeState } from "../../../providers/Three/Three.context";

const ModelView: React.FC = () => {
  const { isInitialized } = useThreeState();
  const [showTutorial, setShowTutorial] = useState(false);

  // Check if user has seen controls before
  useEffect(() => {
    const hasSeenControls = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenControls && isInitialized) {
      setShowTutorial(true);
    }
  }, [isInitialized]);

  const handleDismissTutorial = () => {
    localStorage.setItem("hasSeenTutorial", "true");
    setShowTutorial(false);
  };

  return (
    <ModelViewWrapper>
      <TopNav />

      {showTutorial && <Tutorial onDismiss={handleDismissTutorial} />}
    </ModelViewWrapper>
  );
};

export default ModelView;
