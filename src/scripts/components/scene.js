import * as THREE from "three";

import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

function createScene() {
  const scene = new THREE.Scene();

  const hdrEnv = new RGBELoader().loadAsync('/textures/HDRISky.hdr').then( hdrEnv => {
    hdrEnv.mapping = THREE.EquirectangularReflectionMapping;

    scene.environment = hdrEnv;
    scene.background = hdrEnv;
    scene.environmentIntensity = 0.1;
  })

  const fog = new THREE.Fog(0xf0f0f0,100,1000);

  scene.frustumCulled = true;

  // Scene environment
  //scene.fog = fog;

  return scene;
}

export { createScene };
