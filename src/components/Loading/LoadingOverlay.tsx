import React from "react";
import { LoadingOverlayWrapper } from "./LoadingOverlay.styled";

const LoadingOverlay: React.FC = () => {
  return (
    <LoadingOverlayWrapper>
      <div className="loading-spinner" />
      <h2>Loading 3D Scene...</h2>
      <p>Initializing Three.js and loading models</p>
    </LoadingOverlayWrapper>
  );
};

export default LoadingOverlay;
