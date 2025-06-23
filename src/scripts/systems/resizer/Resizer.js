const setSize = (container, camera, renderer) => {
  // TODO: Container width, height may be better here
  // In the case we want the three.js scene to be beside a  react component rather than under
  // Also update renderer if change is made

  // Set the camera's aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;

  // Update the camera's frustum
  camera.updateProjectionMatrix();

  // Update the size of the renderer AND the canvas
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Set the pixel ratio (for mobile devices)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

class Resizer {
  constructor(container, camera, renderer) {
    // Set initial size on load
    setSize(container, camera, renderer);

    window.addEventListener("resize", () => {
      // Set the size again if a resize occurs
      setSize(container, camera, renderer);

      // Perform any custom actions
      this.onResize();
    });
  }

  onResize() {}
}

export default Resizer;
