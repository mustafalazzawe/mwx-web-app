import * as THREE from 'three';

export class ThreeScene {

  constructor(container) {
    // Scene setup
    this.scene = new THREE.Scene();

    this.scene.background = new THREE.Color(0xdedede); // Set background color
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    // Create cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true});
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // Start animation
    this.animate();
  }

  animate = () => {
    if (!this.disposed) {
      requestAnimationFrame(this.animate);
      
      // Rotate cube
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;

      this.renderer.render(this.scene, this.camera);
    }
  };

  cleanup() {
    this.disposed = true;
    
    // Dispose of geometry
    this.cube.geometry.dispose();
    this.cube.material.dispose();
    
    // Remove cube from scene
    this.scene.remove(this.cube);
    
    // Dispose of renderer
    this.renderer.dispose();
    this.renderer.domElement.remove();
    
    // Clear references
    this.cube = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
  }
}