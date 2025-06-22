import { createContext, useContext } from "react";
import type { IThreeState } from "./Three.types";

export const ThreeContext = createContext<IThreeState | undefined>(undefined);

// Three.js context
export const useThree = () => {
  const context = useContext(ThreeContext);

  if (!context) {
    throw new Error("useThree must be used within a ThreeProvider");
  }

  return context;
};

// Additional custom hooks for specific functionality
export const useThreeScene = () => {
  const { threeSceneRef } = useThree();

  return threeSceneRef.current;
};

export const useThreeActions = () => {
  const { onStartAnimations, onStopAnimations, moveCameraTo, getCameraState } =
    useThree();

  return {
    startAnimations: onStartAnimations,
    stopAnimations: onStopAnimations,
    setCameraPosition: moveCameraTo,
    getCameraPosition: () => getCameraState()?.position || null,
  };
};

export const useThreeState = () => {
  const { isInitialized, isAnimating } = useThree();

  return { isInitialized, isAnimating };
};
