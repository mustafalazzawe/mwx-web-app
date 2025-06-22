import * as THREE from "three";

function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });

  // TODO: Add addtional renderer settings

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xf0f0f0);

  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 0.91;

  renderer.shadowMap.enabled = true;
  renderer.localClippingEnabled = true;
  renderer.info.autoReset = false;

  renderer.transmissionResolutionScale = 1.0;

  // Turn on the physically correct lighting model
  renderer.physicallyCorrectLights = true;

  return renderer;
}

export { createRenderer };
