import * as THREE from "three";
import {
  DRACOLoader,
  GLTFLoader,
  KTX2Loader,
} from "three/examples/jsm/Addons.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

class ModelLoader {
  constructor(renderer, options = {}) {
    this.renderer = renderer;
    this.loadedModels = new Map();
    this.loadingPromises = new Map();

    // Default configuration
    this.config = {
      enableShadows: true,
      enableKTX2: true,
      enableDraco: true,
      enableMeshopt: true,
      autoCenter: false,
      autoScale: false,
      defaultScale: 1,
      ktx2TranscoderPath:
        "https://cdn.jsdelivr.net/npm/three@0.177.0/examples/jsm/libs/basis/",
      dracoDecoderPath:
        "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
      ...options,
    };

    // Event callbacks
    this.onProgress = null;
    this.onLoad = null;
    this.onError = null;
    this.onModelProcessed = null;

    this.setupLoaders();
  }

  setupLoaders() {
    // Initialize GLTF Loader
    this.gltfLoader = new GLTFLoader();

    // Setup KTX2 loader for texture compression
    if (this.config.enableKTX2) {
      this.ktx2Loader = new KTX2Loader()
        .setTranscoderPath(this.config.ktx2TranscoderPath)
        .detectSupport(this.renderer);
      this.gltfLoader.setKTX2Loader(this.ktx2Loader);
    }

    // Setup DRACO loader for geometry compression
    if (this.config.enableDraco) {
      this.dracoLoader = new DRACOLoader();
      this.dracoLoader.setDecoderPath(this.config.dracoDecoderPath);
      this.dracoLoader.setDecoderConfig({ type: "js" });
      this.gltfLoader.setDRACOLoader(this.dracoLoader);
    }

    // Setup Meshopt decoder for additional compression
    if (this.config.enableMeshopt) {
      this.gltfLoader.setMeshoptDecoder(MeshoptDecoder);
    }

    console.log("ModelLoader: Loaders initialized with config:", this.config);
  }

  async loadModel(path, options = {}) {
    const loadOptions = {
      name: options.name || this.extractNameFromPath(path),
      processModel: options.processModel !== false, // Default true
      addToScene: options.addToScene,
      position: options.position || new THREE.Vector3(0, 0, 0),
      rotation: options.rotation || new THREE.Euler(0, 0, 0),
      scale: options.scale || this.config.defaultScale,
      enableShadows:
        options.enableShadows !== undefined
          ? options.enableShadows
          : this.config.enableShadows,
      autoCenter:
        options.autoCenter !== undefined
          ? options.autoCenter
          : this.config.autoCenter,
      autoScale:
        options.autoScale !== undefined
          ? options.autoScale
          : this.config.autoScale,
      targetSize: options.targetSize || 10,
      ...options,
    };

    // Check if already loading
    if (this.loadingPromises.has(path)) {
      console.log(
        `ModelLoader: Already loading ${path}, returning existing promise`
      );
      return this.loadingPromises.get(path);
    }

    // Check if already loaded
    if (this.loadedModels.has(path)) {
      console.log(`ModelLoader: Model ${path} already loaded, cloning...`);
      return this.cloneModel(path, loadOptions);
    }

    // Create loading promise
    const loadingPromise = this.performLoad(path, loadOptions);
    this.loadingPromises.set(path, loadingPromise);

    try {
      const result = await loadingPromise;
      this.loadingPromises.delete(path);
      return result;
    } catch (error) {
      this.loadingPromises.delete(path);
      throw error;
    }
  }

  performLoad(path, options) {
    return new Promise((resolve, reject) => {
      console.log(`ModelLoader: Starting load of ${path}`);

      this.gltfLoader.load(
        path,
        (gltf) => {
          try {
            const processedModel = this.processLoadedModel(gltf, path, options);

            // Store the original for cloning
            this.loadedModels.set(path, {
              gltf: gltf,
              processed: processedModel,
              options: options,
            });

            // Add to scene if requested
            if (options.addToScene && options.addToScene.add) {
              options.addToScene.add(processedModel.scene);
              console.log(`ModelLoader: Added ${options.name} to scene`);
            }

            // Call callbacks
            if (this.onLoad) this.onLoad(processedModel, path);
            if (this.onModelProcessed)
              this.onModelProcessed(processedModel, options);

            console.log(`ModelLoader: Successfully loaded ${options.name}`);
            resolve(processedModel);
          } catch (error) {
            console.error(`ModelLoader: Error processing ${path}:`, error);
            reject(error);
          }
        },
        (progress) => {
          const percentage =
            progress.total > 0 ? (progress.loaded / progress.total) * 100 : 0;
          console.log(
            `ModelLoader: Loading ${options.name}: ${percentage.toFixed(1)}%`
          );

          if (this.onProgress) {
            this.onProgress(progress, percentage, path, options.name);
          }
        },
        (error) => {
          console.error(`ModelLoader: Failed to load ${path}:`, error);
          if (this.onError) this.onError(error, path);
          reject(error);
        }
      );
    });
  }

  processLoadedModel(gltf, path, options) {
    const scene = gltf.scene.clone();
    scene.name = options.name;

    // Apply transformations
    scene.position.copy(options.position);
    scene.rotation.copy(options.rotation);

    if (typeof options.scale === "number") {
      scene.scale.setScalar(options.scale);
    } else {
      scene.scale.copy(options.scale);
    }

    // Get bounding box for calculations
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Auto-center the model
    if (options.autoCenter) {
      scene.position.sub(center);
      console.log(`ModelLoader: Centered ${options.name} at origin`);
    }

    // Auto-scale the model
    if (options.autoScale) {
      const maxDimension = Math.max(size.x, size.y, size.z);
      const scaleFactor = options.targetSize / maxDimension;
      scene.scale.multiplyScalar(scaleFactor);
      console.log(
        `ModelLoader: Auto-scaled ${
          options.name
        } by factor ${scaleFactor.toFixed(3)}`
      );
    }

    // Process materials and meshes
    let meshCount = 0;
    let materialCount = 0;
    const materials = new Set();

    scene.traverse((child) => {
      if (child.isMesh) {
        meshCount++;

        // Configure shadows
        if (options.enableShadows) {
          child.castShadow = true;
          child.receiveShadow = true;
        }

        // Process materials
        if (child.material) {
          materials.add(child.material);

          // Apply material enhancements if needed
          if (options.enhanceMaterials) {
            this.enhanceMaterial(child.material, options);
          }
        }

        // Custom mesh processing
        if (options.processMesh) {
          options.processMesh(child, options);
        }
      }
    });

    materialCount = materials.size;

    // Store animations
    const animations = gltf.animations || [];
    const mixer =
      animations.length > 0 ? new THREE.AnimationMixer(scene) : null;
    const actions = [];

    if (mixer) {
      animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        actions.push({ name: clip.name, action, clip });
      });
      console.log(
        `ModelLoader: Found ${animations.length} animations for ${options.name}`
      );
    }

    const modelData = {
      scene,
      animations,
      mixer,
      actions,
      gltf,
      metadata: {
        name: options.name,
        path,
        meshCount,
        materialCount,
        animationCount: animations.length,
        boundingBox: box,
        size,
        center: center.clone(),
      },
    };

    console.log(
      `ModelLoader: Processed ${options.name} - ${meshCount} meshes, ${materialCount} materials`
    );

    return modelData;
  }

  enhanceMaterial(material, options) {
    // Apply material enhancements based on options
    if (options.materialEnhancements) {
      Object.assign(material, options.materialEnhancements);
    }

    // Standard enhancements
    if (material.map) {
      material.map.colorSpace = THREE.SRGBColorSpace;
    }

    // Enable environment mapping if available
    if (options.envMap && material.isMeshStandardMaterial) {
      material.envMap = options.envMap;
      material.envMapIntensity = options.envMapIntensity || 1;
    }
  }

  // Clone an already loaded model
  cloneModel(path, options = {}) {
    const cached = this.loadedModels.get(path);
    if (!cached) {
      throw new Error(`Model not found in cache: ${path}`);
    }

    return new Promise((resolve) => {
      const clonedModel = this.processLoadedModel(cached.gltf, path, {
        ...cached.options,
        ...options,
      });

      if (options.addToScene && options.addToScene.add) {
        options.addToScene.add(clonedModel.scene);
      }

      resolve(clonedModel);
    });
  }

  // Utility methods
  extractNameFromPath(path) {
    return path.split("/").pop().split(".")[0];
  }

  getLoadedModel(pathOrName) {
    // Try by path first
    if (this.loadedModels.has(pathOrName)) {
      return this.loadedModels.get(pathOrName);
    }

    // Try by name
    for (const [path, model] of this.loadedModels) {
      if (model.processed.metadata.name === pathOrName) {
        return model;
      }
    }

    return null;
  }

  getLoadingProgress() {
    return {
      loading: this.loadingPromises.size,
      loaded: this.loadedModels.size,
      paths: Array.from(this.loadingPromises.keys()),
    };
  }

  // Event handlers
  setProgressCallback(callback) {
    this.onProgress = callback;
    return this;
  }

  setLoadCallback(callback) {
    this.onLoad = callback;
    return this;
  }

  setErrorCallback(callback) {
    this.onError = callback;
    return this;
  }

  setModelProcessedCallback(callback) {
    this.onModelProcessed = callback;
    return this;
  }

  // Cleanup
  dispose() {
    // Dispose loaders
    if (this.ktx2Loader) this.ktx2Loader.dispose();
    if (this.dracoLoader) this.dracoLoader.dispose();

    // Clear caches
    this.loadedModels.clear();
    this.loadingPromises.clear();

    console.log("ModelLoader: Disposed");
  }
}

export default ModelLoader;