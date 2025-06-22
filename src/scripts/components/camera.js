import * as THREE from "three";

function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );

  camera.layers.enable(1);
  camera.position.set(0, 150, 0);

  return camera;
}

export { createCamera };
