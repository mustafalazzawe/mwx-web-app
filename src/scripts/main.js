import * as THREE from "three";

import * as echarts from 'echarts';

import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createRenderer } from "./components/renderer";
import { createLights } from "./components/lights";
import Sensor from "./components/Sensor";

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
    this.contextModel = null;


    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.sensors = [];
    this.tempSensorsToRemove = [];

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredSensor = null;
    this.sensorOverlay = this.createOverlay();


    // Append renderer to the provided container (canvas)
    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.addEventListener("mousemove", this.handleMouseMove);
    
    // Initialize game loop
    this.loop = new Loop(this.camera, this.scene, this.renderer);

    // Initialize controls
    this.controls = new EnhancedControls(this.camera, this.renderer.domElement);

    // Set up control callbacks
    this.setupControlCallbacks();
    
    // Add controls to game loop
    this.loop.updateables.push(this.controls.controls);
    this.loop.updateables.push({
      tick: (delta) => {
        for (const sensor of this.sensors) {
          sensor.update(0.1); 
        }
      }
    });
    
    // Initialize model loader
    this.modelLoader = new ModelLoader(this.renderer);

    // Create scene lighting
    const { ambientLight, directionalLight, cameraHelper } = createLights();

    // Add lights to scene
    this.scene.add(ambientLight, directionalLight, directionalLight.target, cameraHelper);

    // Ensure shadow map is updated after adding components to scene (esp. lights)
    this.renderer.shadowMap.needsUpdate = true;

    // Initialize scene resizer
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
  }

  // Set up callback functions
  setupControlCallbacks() {
    // Animation callbacks
    this.controls.onAnimationStart = () => {
      console.log("ThreeScene: Camera animation started");
    };

    this.controls.onAnimationUpdate = (progress) => {
      // TODO: Add progress-based effects here

      // Force render if loop is not active
      if (!this.loop.isLoopActive) {
        this.render();
      }
    };

    this.controls.onAnimationComplete = () => {
      console.log("ThreeScene: Camera animation completed");

      // Force render if loop is not active
      if (!this.loop.isLoopActive) {
        this.render();
      }
    };
  }

  async init() {
    try {
      // TODO: Any initialization to the scene happens here
      // Loading models, load animations, etc.

      console.log("ThreeScene: Starting initialization...");

      // Load school model
      this.schoolModel = await this.loadSchoolModel();
      this.contextModel = await this.loadContextModel();

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

  createOverlay() {
    const div = document.createElement("div");
    div.id = "sensorOverlay";
    Object.assign(div.style, {
      position: "absolute",
      display: "none",
      pointerEvents: "none",
      background: "rgba(0,0,0,0.7)",
      color: "white",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      zIndex: 1000,
    });
    document.body.appendChild(div);
    return div;
  }

  handleMouseMove = (event) => {
    const bounds = this.renderer.domElement.getBoundingClientRect();
  
    this.mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    this.mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.raycaster.layers.set(1);
  
    const sensorMeshes = this.sensors.filter(Boolean);
  
    if (sensorMeshes.length === 0) {
      if (this.hoveredSensor) {
        this.hideSensorOverlay();
        this.hoveredSensor = null;
      }
      return;
    }
  
    const intersects = this.raycaster.intersectObjects(sensorMeshes, false);
  
    if (intersects.length > 0) {
      const intersected = intersects[0].object;
      if (this.hoveredSensor !== intersected) {
        this.hoveredSensor = intersected;
        this.showSensorOverlay(intersected, event.clientX, event.clientY);
      } else {
        this.updateSensorOverlay(event.clientX, event.clientY);
      }
    } else {
      if (this.hoveredSensor) {
        this.hideSensorOverlay();
        this.hoveredSensor = null;
      }
    }
  };

  initECharts() {
    const pieContainer = document.getElementById("echart-pie");
    const lineContainer = document.getElementById("echart-line");
  
    if (!pieContainer || !lineContainer) return;
  
    const pieChart = echarts.init(pieContainer);
    pieChart.setOption({
      title: {
        text: "Sensor Distribution",
        left: "center",
        textStyle: { color: "#fff", fontSize: 14 },
      },
      tooltip: { trigger: "item" },
      series: [
        {
          name: "Readings",
          type: "pie",
          radius: "50%",
          data: [
            { value: Math.random() * 100, name: "Temperature" },
            { value: Math.random() * 100, name: "Humidity" },
            { value: Math.random() * 100, name: "CO2" },
          ],
          label: { color: "#fff" },
        },
      ],
      backgroundColor: "transparent",
    });
  
    const lineChart = echarts.init(lineContainer);
    lineChart.setOption({
      title: {
        text: "Live Sensor Values",
        left: "center",
        textStyle: { color: "#fff", fontSize: 14 },
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: ["1s", "2s", "3s", "4s", "5s"],
        axisLabel: { color: "#ccc" },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#ccc" },
      },
      series: [
        {
          data: Array.from({ length: 5 }, () => Math.random() * 100),
          type: "line",
          smooth: true,
          lineStyle: { color: "#67e0e3" },
          itemStyle: { color: "#67e0e3" },
        },
      ],
      backgroundColor: "transparent",
    });
  }
  
  
  showSensorOverlay(sensor, x, y) {
    if (!this.overlay) {
      this.overlay = document.createElement("div");
      this.overlay.style.position = "fixed";
      this.overlay.style.pointerEvents = "none";
      this.overlay.style.zIndex = 1000;
      this.overlay.style.background = "rgba(0,0,0,0.85)";
      this.overlay.style.color = "#fff";
      this.overlay.style.padding = "10px";
      this.overlay.style.borderRadius = "8px";
      this.overlay.style.fontSize = "12px";
      this.overlay.style.maxWidth = "300px";
  
      this.overlay.innerHTML = `
        <div style="margin-bottom: 8px;"><strong>${sensor.name}</strong></div>
        <div id="echart-pie" style="width: 250px; height: 150px; margin-bottom: 10px;"></div>
        <div id="echart-line" style="width: 250px; height: 150px;"></div>
      `;
  
      document.body.appendChild(this.overlay);
  
      // Give DOM time to attach before initializing charts
      setTimeout(() => {
        this.initECharts();
      }, 10);
    }
  
    this.overlay.style.left = `${x + 10}px`;
    this.overlay.style.top = `${y + 10}px`;
  }
  
  updateSensorOverlay(x, y) {
    this.sensorOverlay.style.left = `${x + 10}px`;
    this.sensorOverlay.style.top = `${y + 10}px`;
  }
  
  hideSensorOverlay() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
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
          onProgress: (progress, percentage, path) => {
            console.log(`Loading ${path}: ${percentage.toFixed(1)}%`);

            // Emit progress event for React UI updates
            this.emitLoadingProgress?.(path, percentage);
          },
          onLoad: (modelData, path) => {
            console.log("Model loaded successfully:", modelData.metadata);

            // Emit loaded event for React UI updates
            this.emitModelLoaded?.(modelData);
          },
          onError: (error, path) => {
            console.error("Failed to load model:", path, error);

            // Emit error event for React UI updates
            this.emitModelError?.(path, error);
          },
        }
      );

      schoolModel.scene.traverse((child) => {
        if (child.isMesh && child.name.toLowerCase().includes('sensors')) {
          console.log("Found sensor: ", child.name);
          const worldPos = new THREE.Vector3();
          child.getWorldPosition(worldPos);
      
          const sensor = new Sensor({
            name: child.name,
            position: worldPos,
          }, this.camera);
     
          this.scene.add(sensor);

          sensor.traverse(obj => obj.layers.set(1));
          
          this.sensors.push(sensor);
          this.tempSensorsToRemove.push(child);
          } else {
            child.layers.disable(1);
          }
      });

      for (const mesh of this.tempSensorsToRemove) {
        if (mesh.parent) {
          mesh.parent.remove(mesh);
        }
      }

      console.log("School model loaded:", schoolModel.metadata);
      return schoolModel;
    } catch (error) {
      console.error("Failed to load school model:", error);
    }
  }

  async loadContextModel() {
    try {
      const contextModel = await this.modelLoader.loadModel(
        "/models/Context.glb",
        {
          name: "Context",
          addToScene: this.scene,
          position: new THREE.Vector3(0, 0, 0),
          enableShadows: false,
          onProgress: (progress, percentage, path) => {
            console.log(`Loading ${path}: ${percentage.toFixed(1)}%`);

            // Emit progress event for React UI updates
            this.emitLoadingProgress?.(path, percentage);
          },
          onLoad: (modelData, path) => {
            console.log("Context Model loaded successfully:", modelData.metadata);

            // Emit loaded event for React UI updates
            this.emitModelLoaded?.(modelData);
          },
          onError: (error, path) => {
            console.error("Failed to load context model:", path, error);

            // Emit error event for React UI updates
            this.emitModelError?.(path, error);
          },
        }
      );

      console.log("Context model loaded:", contextModel.metadata);
      return contextModel;
    } catch (error) {
      console.error("Failed to load context model:", error);
    }
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
      this.controls.focusOnObject(this.schoolModel.scene, 300, 1500);
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
      this.controls.focusOnObject(this.schoolModel.scene, 300, duration);
    }

    console.log("ThreeScene: Focused on school");
  };

  // Event emitters for React integration
  // These are set this in the React provider
  emitLoadingProgress = null;
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

    if (this.sensorOverlay && this.sensorOverlay.parentNode) {
      this.sensorOverlay.parentNode.removeChild(this.sensorOverlay);
    }
    this.renderer.domElement.removeEventListener("mousemove", this.handleMouseMove);

    console.log("ThreeScene: Three.js scene disposed");
  };
}
