import * as THREE from "three";

import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createRenderer } from "./components/renderer";
import { createLights } from "./components/lights";

import Loop from "./systems/loop/Loop";
import Resizer from "./systems/resizer/Resizer";
import EnhancedControls from "./systems/controls/EnhancedControls";
import ModelLoader from "./systems/loader/ModelLoader";

export class ThreeScene {
  constructor(container) {
    console.log("ThreeScene constructor called with container:", container);

    if (!container) {
      throw new Error("Container element is required");
    }

    this.container = container;

    this.isInitialized = false;
    this.schoolModel = null;

    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();

    this.loop = new Loop(this.camera, this.scene, this.renderer);

    // Append renderer to the provided container (canvas)
    container.appendChild(this.renderer.domElement);

    this.controls = new EnhancedControls(this.camera, this.renderer.domElement);

    // Initialize ModelLoader
    this.setupModelLoader();

    // Set up control callbacks
    this.setupControlCallbacks();

    const { ambientLight, directionalLight } = createLights();

    // Add items to game loop
    this.loop.updateables.push(this.controls.controls);

    // Add items to scene
    this.scene.add(ambientLight, directionalLight, directionalLight.target);

    // Ensure shadow map is updated after adding components to scene (esp. lights)
    this.renderer.shadowMap.needsUpdate = true;

    const resizer = new Resizer(container, this.camera, this.renderer);

    // Render on demand if animation loop is not active
    if (!this.loop.isLoopActive) {
      resizer.onResize = () => {
        this.render();
      };

      this.controls.onChange = () => {
        this.render();
      };
    }

    this.controls.savePreset("initial");
  }

  setupModelLoader() {
    this.modelLoader = new ModelLoader(this.renderer, {
      enableShadows: true,
      autoCenter: false,
      autoScale: false,
      defaultScale: 1,
    });

    // Set up model loader callbacks
    this.modelLoader
      .setProgressCallback((progress, percentage, path, name) => {
        console.log(`Loading ${name}: ${percentage.toFixed(1)}%`);
        // You can emit progress events here for React UI updates
        this.emitLoadingProgress?.(name, percentage);
      })
      .setLoadCallback((modelData, path) => {
        console.log("Model loaded successfully:", modelData.metadata);
        this.emitModelLoaded?.(modelData);
      })
      .setErrorCallback((error, path) => {
        console.error("Failed to load model:", path, error);
        this.emitModelError?.(path, error);
      });
  }

  // Set up callback functions
  setupControlCallbacks() {
    // Animation callbacks
    this.controls.onAnimationStart = () => {
      console.log("ThreeScene: Camera animation started");
    };

    this.controls.onAnimationComplete = () => {
      console.log("ThreeScene: Camera animation completed");

      // Force render if loop is not active
      if (!this.loop.isLoopActive) {
        this.render();
      }
    };

    this.controls.onAnimationUpdate = (progress) => {
      // TODO: Add progress-based effects here

      // Force render if loop is not active
      if (!this.loop.isLoopActive) {
        this.render();
      }
    };
  }

  setupModelLoaderCallbacks() {
    this.modelLoader
      .setProgressCallback((progress, percentage, path, name) => {
        console.log(`Loading ${name}: ${percentage.toFixed(1)}%`);
        // Update UI progress bar here
        this.updateLoadingProgress(name, percentage);
      })
      .setLoadCallback((modelData, path) => {
        console.log("Model loaded:", modelData.metadata);
        // Handle successful load
        this.onModelLoaded(modelData);
      })
      .setErrorCallback((error, path) => {
        console.error("Failed to load model:", path, error);
        // Handle error
        this.onModelLoadError(path, error);
      })
      .setModelProcessedCallback((modelData, options) => {
        // Model is fully processed and ready to use
        this.configureModelAnimations(modelData);
      });
  }

  async init() {
    try {
      // TODO: Any initialization to the scene happens here
      // Loading models, load animations, etc.

      console.log("ThreeScene: Starting initialization...");

      // Load school model
      this.schoolModel = await this.loadSchoolModel();

      // Set up focus targets
      this.setupFocusTargets();

      // Set initial camera focus
      this.setInitialCameraFocus();

      this.isInitialized = true;

      console.log("ThreeScene: Initialized scene successfully");
    } catch (error) {
      console.error("ThreeScene: Failed to initialize scene: ", error);
      throw error;
    }
  }

  // Manually render a frame
  render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  // Start game loop
  start = () => {
    this.loop.start();

    console.log("ThreeScene: Starting animations...");
  };

  // Stop game loop
  stop = () => {
    this.loop.stop();

    console.log("ThreeScene: Stoping animations...");
  };

  // Load models
  async loadSchoolModel() {
    try {
      const schoolModel = await this.modelLoader.loadModel(
        "/models/MWX_School.glb",
        {
          name: "MWX_School",
          addToScene: this.scene,
          position: new THREE.Vector3(0, 0, 0),
          enableShadows: true,
          // Optional: Enable these if you want the model auto-sized
          // autoCenter: true,
          // autoScale: true,
          // targetSize: 20
        }
      );

      console.log("School model loaded:", schoolModel.metadata);
      return schoolModel;
    } catch (error) {
      console.error("Failed to load school model:", error);
    }
  }

  // Utility methods
  updateLoadingProgress(modelName, percentage) {
    // Update your UI progress bar
    const progressElement = document.getElementById(`progress-${modelName}`);
    if (progressElement) {
      progressElement.style.width = `${percentage}%`;
    }
  }

  onModelLoaded(modelData) {
    // Handle successful model load
    // Maybe update camera to focus on the model
    if (modelData.metadata.name === "MWX_School") {
      this.controls.focusOnObject(modelData.scene, 20, 2000);
    }
  }

  onModelLoadError(path, error) {
    // Handle loading errors
    console.error(`Failed to load ${path}:`, error);
    // Show user-friendly error message
  }

  setupFocusTargets() {
    this.focusTargets = [];

    // Add school model as focus target
    if (this.schoolModel) {
      this.focusTargets.push({
        name: "school",
        type: "model",
        object: this.schoolModel.scene,
        offset: { x: 10, y: 10, z: 10 },
      });

      // Save preset for school
      const position = this.schoolModel.scene.position.clone();
      const offset = new THREE.Vector3(10, 10, 10);
      const cameraPos = position.clone().add(offset.multiplyScalar(2));

      this.controls.savePreset("school", cameraPos, position);
    }

    console.log(`ThreeScene: Set up ${this.focusTargets.length} focus targets`);
  }

  setInitialCameraFocus() {
    if (this.schoolModel) {
      console.log("ThreeScene: Setting initial focus on school");
      // Focus on the school with a good distance to see the whole building
      this.controls.focusOnObject(this.schoolModel.scene, 300, 3000);
    }
  }

  focusOnSchool = (duration = 1500) => {
    if (!this.isInitialized || !this.schoolModel) {
      console.warn(
        "ThreeScene: Cannot focus on school: scene not initialized or model not found"
      );
      return;
    }

    if (this.controls.presets.has("school")) {
      this.controls.loadPreset("school", duration);
    } else {
      this.controls.focusOnObject(this.schoolModel.scene, 25, duration);
    }

    console.log("ThreeScene: Focused on school");
  };

  // Get loading progress info
  getLoadingProgress = () => {
    return this.modelLoader
      ? this.modelLoader.getLoadingProgress()
      : { loading: 0, loaded: 0 };
  };

  // Event emitters for React integration (optional)
  emitLoadingProgress = null; // Set this from React provider
  emitModelLoaded = null;
  emitModelError = null;

  // Smooth camera movement methods
  moveCameraTo = (x, y, z, duration = 1000) => {
    const targetPosition = new THREE.Vector3(x, y, z);
    this.controls.animateToTarget(targetPosition, null, duration);
  };

  moveCameraAndTarget = (cameraPos, targetPos, duration = 1000) => {
    this.controls.animateToTarget(cameraPos, targetPos, duration);
  };

  orbitAroundTarget = (angle, duration = 2000) => {
    this.controls.orbitTo(angle, null, duration);
  };

  // Preset management
  saveCurrentView = (name) => {
    this.controls.savePreset(name);
    console.log(`ThreeScene: Current view saved as '${name}'`);
  };

  loadView = (name, duration = 1000) => {
    this.controls.loadPreset(name, duration);
  };

  // Get current camera state
  getCameraState = () => {
    return this.controls.getCurrentState();
  };

  // Animation control
  stopCameraAnimation = () => {
    this.controls.stopAnimation();
  };

  // Get the current animation state
  getAnimationState = () => {
    return {
      isActive: this.loop.isLoopActive,
      isInitialized: this.isInitialized,
      isCameraAnimating: this.controls.isAnimating,
    };
  };

  // Cleanup
  dispose = () => {
    this.stop();
    this.controls.dispose();

    // Dispose model loader
    if (this.modelLoader) {
      this.modelLoader.dispose();
    }

    // Dispose of geometries, materials, textures
    this.scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose();
      }

      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });

    this.renderer.dispose();

    // Remove renderer from DOM
    if (
      this.container &&
      this.renderer.domElement.parentNode === this.container
    ) {
      this.container.removeChild(this.renderer.domElement);
    }

    console.log("ThreeScene: Three.js scene disposed");
  };
}
