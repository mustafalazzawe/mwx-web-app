export declare class ThreeScene {
  // Three classes
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;

  // Game loop
  loop: Loop;

  // Addon classes
  controls: EnhancedControls;

  // Class methods
  constructor(container: HTMLElement);
  async init(): void;
  render: () => void;
  start: () => void;
  stop: () => void;

  // Camera methods

  // Movement
  moveCameraTo: (x: number, y: number, z: number, duration?: number) => void;

  // Animation
  stopCameraAnimation: () => void;

  // Preset management
  saveCurrentView: (name: string) => void;
  loadView: (name: string, duration?: number) => void;

  // State management
  getCameraState: () => {
    position: THREE.Vector3;
    target: THREE.Vector3;
    distance: number;
  };

  getAnimationState: () => {
    isActive: boolean;
    isInitialized: boolean;
    isCameraAnimating: boolean;
  };

  dispose: () => void;
}
