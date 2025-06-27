import * as THREE from 'three';

async function loadShader(path) {
  const response = await fetch(path);
  return response.text();
}

export default class Sensor extends THREE.Mesh {
  constructor(data, camera) {
    super();

    this.camera = camera;
    this.position.copy(data.position);
    this.name = data.name || 'Unnamed Sensor';
    this.userData = {
      isSensor: true,
      metadata: data,
    };

    // Load shaders and initialize visual
    this.init();
  }

  async init() {
    const vertexShader = await loadShader('/shaders/sensor.vert.glsl');
    const fragmentShader = await loadShader('/shaders/sensor.frag.glsl');

    this.uniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0xff4444) },
      uOpacity: { value: 1.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const geometry = new THREE.PlaneGeometry(1.5, 1.5);

    this.geometry = geometry;
    this.material = material;
  }

  update(deltaTime) {
    this.uniforms.uTime.value += deltaTime;
    this.lookAt(this.camera.position);
  }
}
