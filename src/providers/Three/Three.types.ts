import * as THREE from "three";

import type { ThreeScene } from "../../scripts/main";
import type { RefObject } from "react";

interface ICameraState {
  position: THREE.Vector3;
  target: THREE.Vector3;
  distance: number;
}

interface IAnimationState {
  isActive: boolean;
  isInitialized: boolean;
  isCameraAnimating: boolean;
}

export interface IThreeState {
  //States
  isInitialized: boolean;
  isAnimating: boolean;
  isCameraAnimating: boolean;

  // Refs
  threeSceneRef: RefObject<ThreeScene | null>;
  containerRef: RefObject<HTMLDivElement | null>;

  // Animation controls
  onStartAnimations: () => void;
  onStopAnimations: () => void;

  // Camera controls
  moveCameraTo: (x: number, y: number, z: number, duration?: number) => void;
  stopCameraAnimation: () => void;

  // View presets
  saveCurrentView: (name: string) => void;
  loadView: (name: string, duration?: number) => void;

  // Utility functions
  getCameraState: () => ICameraState | null;
  getAnimationState: () => IAnimationState;

  // Getters for safe access
  getRenderer: () => THREE.WebGLRenderer | null;
  getScene: () => THREE.Scene | null;
  getCamera: () => THREE.PerspectiveCamera | null;
}
