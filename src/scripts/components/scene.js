import * as THREE from "three";

function createScene() {
  const scene = new THREE.Scene();
  
  const fog = new THREE.Fog(0xf0f0f0,100,1000);

  scene.frustumCulled = true;

  // Scene environment
  scene.fog = fog;

  return scene;
}

export { createScene };
