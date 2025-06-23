import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

class EnhancedControls {
  constructor(camera, canvas) {
    this.camera = camera;
    this.controls = new OrbitControls(camera, canvas);

    // Animation state
    this.isAnimating = false;

    // Start and end positions
    this.targetPosition = new THREE.Vector3();
    this.targetTarget = new THREE.Vector3();
    this.startPosition = new THREE.Vector3();
    this.startTarget = new THREE.Vector3();

    // Animation information
    this.animationStartTime = 0;
    this.animationProgress = 0;
    this.animationDuration = 1000;

    // Default easing function
    this.easing = this.easeInOutCubic;

    // Animation callbacks
    this.onAnimationStart = null;
    this.onAnimationUpdate = null;
    this.onAnimationComplete = null;

    // Preset position
    this.presets = new Map();

    this.setupControls();
  }

  setupControls() {
    // Basic setup
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    this.controls.minDistance = 1;
    this.controls.maxDistance = 1000;

    this.controls.maxPolarAngle = Math.PI * 0.5;

    this.controls.screenSpacePanning = false;

    // Custom tick that handles both updates and animations
    this.controls.tick = () => {
      if (this.isAnimating) {
        this.updateAnimation();
      }

      this.controls.update();
    };

    // Event listeners
    this.controls.addEventListener("change", () => {
      this.onChange();
    });

    this.controls.addEventListener("start", () => {
      this.onControlStart();
    });

    this.controls.addEventListener("end", () => {
      this.onControlEnd();
    });
  }

  // Easing functions
  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  // Animation state functions
  updateAnimation() {
    const now = performance.now();
    const elapsed = now - this.animationStartTime;
    this.animationProgress = Math.min(elapsed / this.animationDuration, 1);

    // Apply easing
    const easedProgress = this.easing(this.animationProgress);

    // Interpolate camera position
    this.camera.position.lerpVectors(
      this.startPosition,
      this.targetPosition,
      easedProgress
    );

    // Interpolate controls target
    this.controls.target.lerpVectors(
      this.startTarget,
      this.targetTarget,
      easedProgress
    );

    // Call update callback
    if (this.onAnimationUpdate) {
      this.onAnimationUpdate(easedProgress);
    }

    // Check if animation is complete
    if (this.animationProgress >= 1) {
      this.completeAnimation();
    }
  }

  completeAnimation() {
    this.isAnimating = false;
    this.controls.enabled = true;

    // Ensure final positions are exact
    this.camera.position.copy(this.targetPosition);
    this.controls.target.copy(this.targetTarget);

    // Call completion callback
    if (this.onAnimationComplete) {
      this.onAnimationComplete();
    }
  }

  stopAnimation() {
    if (this.isAnimating) {
      this.isAnimating = false;
      this.controls.enabled = true;
    }
  }

  // Preset management
  savePreset(name, position = null, target = null) {
    const preset = {
      position: position ? position.clone() : this.camera.position.clone(),
      target: target ? target.clone() : this.controls.target.clone(),
    };

    this.presets.set(name, preset);
    console.log(`Controls: Preset '${name}' saved`);
  }

  // USE: Load preset with animation
  loadPreset(name, duration = 1000, easingFunction = null) {
    const preset = this.presets.get(name);
    if (preset) {
      this.animateToTarget(
        preset.position,
        preset.target,
        duration,
        easingFunction
      );
      console.log(`Controls: Loading preset '${name}'`);
    } else {
      console.warn(`Controls: Preset '${name}' not found`);
    }
  }

  // USE: Instantly load preset without animation
  loadPresetInstant(name) {
    const preset = this.presets.get(name);
    if (preset) {
      this.moveTo(preset.position, preset.target);
      console.log(`Controls: Instantly loaded preset '${name}'`);
    } else {
      console.warn(`Controls: Preset '${name}' not found`);
    }
  }

  // Movement methods without animations

  // USE: Move instantly to target position
  moveTo(targetPosition, targetTarget = null) {
    // Stop any existing animation
    this.stopAnimation();

    // Set camera position immediately
    this.camera.position.copy(targetPosition);

    // Set controls target if provided
    if (targetTarget) {
      this.controls.target.copy(targetTarget);
    }

    // Update controls to reflect new position
    this.controls.update();
  }

  // USE: Instantly focus on an object
  moveToObject(object, distance = 10) {
    // Calculate position behind the object
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Position camera to view the object
    const direction = new THREE.Vector3(1, 0.5, 1).normalize();
    const cameraPosition = center
      .clone()
      .add(direction.multiplyScalar(distance || maxDim * 2));

    this.moveTo(cameraPosition, center);
  }

  // USE: Instantly focus on given position
  moveToPosition(position, distance = 5, offset = { x: 1, y: 0.5, z: 1 }) {
    const targetPos = new THREE.Vector3(position.x, position.y, position.z);
    const offsetVec = new THREE.Vector3(
      offset.x,
      offset.y,
      offset.z
    ).normalize();
    const cameraPos = targetPos.clone().add(offsetVec.multiplyScalar(distance));

    this.moveTo(cameraPos, targetPos);
  }

  // Movement methods with animations

  // Smooth animation to target position
  // USE: Basic smooth movement
  animateToTarget(
    targetPosition,
    targetTarget = null,
    duration = 1500,
    easingFunction = null
  ) {
    // Stop any exisiting animation
    this.stopAnimation();

    // Set up animation parameters
    this.animationDuration = duration;
    this.easing = easingFunction || this.easeInOutCubic;

    // Store start positions
    this.startPosition.copy(this.camera.position);
    this.startTarget.copy(this.controls.target);

    // Set target positions
    this.targetPosition.copy(targetPosition);
    if (targetTarget) {
      this.targetTarget.copy(targetTarget);
    } else {
      this.targetTarget.copy(this.controls.target);
    }

    // Start animation
    this.isAnimating = true;
    this.animationProgress = 0;
    this.animationStartTime = performance.now();

    // Diable controls during animation
    this.controls.enabled = false;

    // Call start callback
    if (this.onAnimationStart) {
      this.onAnimationStart();
    }
  }

  // USE: Focus on an object with smart positioning
  focusOnObject(object, distance = 5, duration = 1500) {
    // Calculate position behind the object
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Position camera to view the object
    const direction = new THREE.Vector3(1, 0.5, 1).normalize();
    const cameraPosition = center
      .clone()
      .add(direction.multiplyScalar(distance || maxDim * 2));

    this.animateToTarget(cameraPosition, center, duration);
  }

  // USE: Focus on given position
  focusOnPosition(
    position,
    distance = 5,
    duration = 1000,
    offset = { x: 1, y: 0.5, z: 1 }
  ) {
    const targetPos = new THREE.Vector3(position.x, position.y, position.z);
    const offsetVec = new THREE.Vector3(
      offset.x,
      offset.y,
      offset.z
    ).normalize();
    const cameraPos = targetPos.clone().add(offsetVec.multiplyScalar(distance));

    this.animateToTarget(cameraPos, targetPos, duration);
  }

  // State management

  // Get current state
  getCurrentState() {
    return {
      position: this.camera.position.clone(),
      target: this.controls.target.clone(),
      distance: this.camera.position.distanceTo(this.controls.target),
    };
  }

  // Utility methods
  setEasing(easingFunction) {
    this.easing = easingFunction;
  }

  setDefaultDuration(duration) {
    this.animationDuration = duration;
  }

  // Event handlers (override these)
  onChange() {
    // Override in subclass or set externally
  }

  onControlStart() {
    // Called when user starts interacting with controls
  }

  onControlEnd() {
    // Called when user stops interacting with controls
  }

  // Get the underlying OrbitControls instance
  getControls() {
    return this.controls;
  }

  // Cleanup
  dispose() {
    this.stopAnimation();
    this.controls.dispose();
    this.presets.clear();
  }
}

export default EnhancedControls;
