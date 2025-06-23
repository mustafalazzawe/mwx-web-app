import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";

import { ThreeContext } from "./Three.context";
import { ThreeScene } from "../scripts/main";

// Always check isInitialized before calling Three.js methods
// Use the provided action methods instead of directly accessing Three.js objects
// The context provides both direct access (via refs) and safe methods
// Force renders are automatically handled when animations are stopped

const ThreeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isCameraAnimating, setIsCameraAnimating] = useState<boolean>(false);

  // Refs for Three.js objects to avoid stale closures
  const threeSceneRef = useRef<ThreeScene | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initializationRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const initializeThreeScene = async () => {
      if (!containerRef.current || threeSceneRef.current) {
        console.log("Container not ready or scene already exists");
        return;
      }

      console.log(
        "ThreeProvider: Initializing Three.js scene...",
        containerRef.current
      );

      try {
        const newThreeScene = new ThreeScene(containerRef.current);
        threeSceneRef.current = newThreeScene;

        console.log("ThreeProvider: ThreeScene created, setting up callbacks");

        // Set up camera animation callbacks
        newThreeScene.controls.onAnimationStart = () => {
          console.log("ThreeProvider: Camera animation started");
          setIsCameraAnimating(true);
        };

        newThreeScene.controls.onAnimationComplete = () => {
          console.log("ThreeProvider: Camera animation completed");
          setIsCameraAnimating(false);
        };

        console.log("Starting async init...");

        // Complete async init
        await newThreeScene.init();

        console.log("Starting animation loop...");

        // Start animation loop
        newThreeScene.start();

        setIsInitialized(true);
        setIsAnimating(true);

        console.log("Three.js scene initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Three.js scene:", error);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Prevent multiple initializations
      if (!initializationRef.current) {
        initializationRef.current = initializeThreeScene();
      }
    }, 100);

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      if (threeSceneRef.current) {
        threeSceneRef.current.dispose();
      }
    };
  }, []);

  // Animation controls
  const onStartAnimations = useCallback(() => {
    if (threeSceneRef.current && !isAnimating) {
      threeSceneRef.current.start();

      setIsAnimating(true);

      console.log("Three Provider: ▶ Animations started");
    }
  }, [isAnimating]);

  const onStopAnimations = useCallback(() => {
    if (threeSceneRef.current && isAnimating) {
      threeSceneRef.current.stop();

      setIsAnimating(false);

      console.log("Three Provider: ⏹ Animations stopped");
    }
  }, [isAnimating]);

  const moveCameraTo = useCallback(
    (x: number, y: number, z: number, duration = 1000) => {
      if (threeSceneRef.current && isInitialized) {
        threeSceneRef.current.moveCameraTo(x, y, z, duration);
        console.log(`Three Provider: Moving camera to (${x}, ${y}, ${z})`);
      }
    },
    [isInitialized]
  );

  const stopCameraAnimation = useCallback(() => {
    if (threeSceneRef.current && isInitialized) {
      threeSceneRef.current.stopCameraAnimation();
      setIsCameraAnimating(false);
      console.log("Three Provider: Camera animation stopped");
    }
  }, [isInitialized]);

  // View presets
  const saveCurrentView = useCallback(
    (name: string) => {
      if (threeSceneRef.current && isInitialized) {
        threeSceneRef.current.saveCurrentView(name);
        console.log(`Three Provider: View '${name}' saved`);
      }
    },
    [isInitialized]
  );

  const loadView = useCallback(
    (name: string, duration = 1000) => {
      if (threeSceneRef.current && isInitialized) {
        threeSceneRef.current.loadView(name, duration);
        console.log(`Three Provider: Loading view '${name}'`);
      }
    },
    [isInitialized]
  );

  // Utility functions
  const getCameraState = useCallback(() => {
    if (threeSceneRef.current && isInitialized) {
      return threeSceneRef.current.getCameraState();
    }
    return null;
  }, [isInitialized]);

  const getAnimationState = useCallback(() => {
    if (threeSceneRef.current && isInitialized) {
      return threeSceneRef.current.getAnimationState();
    }
    return { isActive: false, isInitialized: false, isCameraAnimating: false };
  }, [isInitialized]);

  const value = {
    // State
    isInitialized,
    isAnimating,
    isCameraAnimating,

    // Refs for direct access
    threeSceneRef,
    containerRef,

    // Animation controls
    onStartAnimations,
    onStopAnimations,

    // Camera controls
    moveCameraTo,
    stopCameraAnimation,

    // View presets
    saveCurrentView,
    loadView,

    // Utility functions
    getCameraState,
    getAnimationState,

    // Getters
    getRenderer: () => threeSceneRef.current?.renderer || null,
    getScene: () => threeSceneRef.current?.scene || null,
    getCamera: () => threeSceneRef.current?.camera || null,
  };

  return (
    <ThreeContext.Provider value={value}>
      {/* Three.js container - this is where the canvas will be appended */}
      <div
        ref={containerRef}
        className="scene-container"
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
          background: "#000",
        }}
      >
        {/* Loading indicator */}
        {!isInitialized && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 5,
              color: "white",
              fontSize: "18px",
              background: "rgba(0,0,0,0.8)",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            Loading Three.js Scene...
          </div>
        )}
      </div>

      {/* React overlay content */}
      <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
    </ThreeContext.Provider>
  );
};

export default ThreeProvider;
