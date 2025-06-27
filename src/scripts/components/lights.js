import * as THREE from "three";

function createLights() {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);

  // Directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 10.13);
  directionalLight.position.set(10,50,-25);
  directionalLight.shadow.bias = -0.001;

  // DL - Color
  directionalLight.color.setHSL(0.1, 1, 0.95);

  // DL - Shadow
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(2048, 2048);
  directionalLight.shadow.camera.top = 50;
  directionalLight.shadow.camera.bottom = -75;
  directionalLight.shadow.camera.left = -105;
  directionalLight.shadow.camera.right = 70;
  directionalLight.shadow.camera.near = 10;
  directionalLight.shadow.camera.far = 100;

  const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);

  return { ambientLight, directionalLight, cameraHelper };
}

export { createLights };
