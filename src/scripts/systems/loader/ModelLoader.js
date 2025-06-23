import * as THREE from "three";
import {
  DRACOLoader,
  GLTFLoader,
  KTX2Loader,
} from "three/examples/jsm/Addons.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

class ModelLoader {
  constructor(renderer) {
    this.renderer = renderer;

    // Cache loaded models
    this.cache = new Map();

    // Trach loading promises
    this.loadingPromises = new Map();

    // Default configuration
    this.config = {
      enableShadows: true,
      ktx2TranscoderPath:
        "https://cdn.jsdelivr.net/npm/three@0.177.0/examples/jsm/libs/basis/",
      dracoDecoderPath:
        "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
    };

    this.setupLoaders();
  }

  setupLoaders() {
    // Setup GLTF loader with compression support
    this.gltfLoader = new GLTFLoader();

    // Setup KTX2 loader for texture compression
    this.ktx2Loader = new KTX2Loader()
      .setTranscoderPath(this.config.ktx2TranscoderPath)
      .detectSupport(this.renderer);
    this.gltfLoader.setKTX2Loader(this.ktx2Loader);

    // Setup DRACO loader for geometry compression
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath(this.config.dracoDecoderPath);
    this.dracoLoader.setDecoderConfig({ type: "js" });
    this.gltfLoader.setDRACOLoader(this.dracoLoader);

    // Setup Meshopt decoder for additional compression
    this.gltfLoader.setMeshoptDecoder(MeshoptDecoder);
  }

  async loadModel(path, options = {}) {
    const safeOptions = {
      name: options.name ?? this.getNameFromPath(path),
      position: options.position ?? new THREE.Vector3(0, 0, 0),
      rotation: options.rotation ?? new THREE.Euler(0, 0, 0),
      scale: options.scale ?? 1,
      enableShadows: options.enableShadows ?? this.config.enableShadows,
      addToScene: options.addToScene ?? null,
      onProgress: options.onProgress ?? null,
      onLoad: options.onLoad ?? null,
      onError: options.onError ?? null,
    };

    // Check cache first
    if (this.cache.has(path)) {
      console.log(`ModelLoader: Model ${path} already loaded, cloning...`);
      return this.cloneModel(path, safeOptions);
    }

    // Check if already loading
    if (this.loadingPromises.has(path)) {
      console.log(
        `ModelLoader: Already loading ${path}, returning existing promise`
      );
      return this.loadingPromises.get(path);
    }

    // Start loading
    const loadingPromise = this.performLoad(path, safeOptions);
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
      console.log(`ModelLoader: Loading ${options.name || path}`);

      this.gltfLoader.load(
        path,
        (gltf) => {
          try {
            // Process and cache model
            const processedModel = this.processModel(gltf, path, options);

            // Cache original gltf
            this.cache.set(path, gltf);

            // Add to scene if requested
            if (options.addToScene) {
              options.addToScene.add(processedModel.scene);
              console.log(`ModelLoader: Added ${options.name} to scene`);
            }

            // Call Loaded callback
            if (options.onLoad) {
              options.onLoad(processedModel, path);
            }

            console.log(`ModelLoader: Successfully loaded ${options.name}`);
            resolve(processedModel);
          } catch (error) {
            console.error(`ModelLoader: Error processing ${path}:`, error);
            reject(error);
          }
        },
        (progress) => {
          if (options.onProgress) {
            const percentage =
              progress.total > 0 ? (progress.loaded / progress.total) * 100 : 0;
            options.onProgress(progress, percentage, path);
          }
        },
        (error) => {
          console.error(`ModelLoader: Failed to load ${path}:`, error);
          if (options.onError) {
            options.onError(error, path);
          }
          reject(error);
        }
      );
    });
  }

  processModel(gltf, path, options) {
    const scene = gltf.scene.clone();
    scene.name = options.name;

   // Apply position
    if (options.position) {
      scene.position.copy(options.position);
    }

    // Apply rotation
    if (options.rotation) {
      scene.rotation.copy(options.rotation);
    }

    // Apply scale
    if (options.scale !== undefined && options.scale !== null) {
      if (typeof options.scale === "number") {
        scene.scale.setScalar(options.scale);
      } else if (options.scale.isVector3) {
        scene.scale.copy(options.scale);
      }
    }

    // Setup shadows if enabled
    if (options.enableShadows) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    // Return object with essential data
    return {
      scene,
      gltf,
      metadata: {
        name: options.name,
        path
      }
    };
  }

  // Clone a cached model
  cloneModel(path, options = {}) {
    const cachedGltf = this.cache.get(path);
    if (!cachedGltf) {
      throw new Error(`Model not found in cache: ${path}`);
    }

    return new Promise((resolve) => {
      const safeOptions = {
        name: options.name ?? this.getNameFromPath(path),
        position: options.position ?? new THREE.Vector3(0, 0, 0),
        rotation: options.rotation ?? new THREE.Euler(0, 0, 0),
        scale: options.scale ?? 1,
        enableShadows: options.enableShadows ?? this.config.enableShadows,
        addToScene: options.addToScene ?? null,
        onProgress: options.onProgress ?? null,
        onLoad: options.onLoad ?? null,
        onError: options.onError ?? null
      };

      const processedModel = this.processModel(cachedGltf, path, safeOptions);
      
      if (safeOptions.addToScene) {
        safeOptions.addToScene.add(processedModel.scene);
      }

      // Call loaded callback for cloned models
      if (safeOptions.onLoad) {
        safeOptions.onLoad(processedModel, path);
      }

      resolve(processedModel);
    });
  }
  
  // Utility methods
  getNameFromPath(path) {
    return path.split('/').pop().split('.')[0];
  }

  isLoaded(path) {
    return this.cache.has(path);
  }

  isLoading(path) {
    return this.loadingPromises.has(path);
  }

  getLoadingStatus() {
    return {
      loaded: this.cache.size,
      loading: this.loadingPromises.size
    };
  }

  // Cleanup
  dispose() {
    // Dispose loaders
    if (this.ktx2Loader) this.ktx2Loader.dispose();
    if (this.dracoLoader) this.dracoLoader.dispose();

    // Clear caches
    this.cache.clear();
    this.loadingPromises.clear();

    console.log("ModelLoader: Disposed");
  }
}

export default ModelLoader;
