import { Clock } from "three";

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;

    this.isLoopActive = false;

    this.updateables = [];
  }

  start = () => {
    this.renderer.setAnimationLoop(() => {
      this.tick();

      // Render a frame
      this.renderer.render(this.scene, this.camera);
    });

    this.isLoopActive = true;
  };

  stop = () => {
    this.renderer.setAnimationLoop(null);
    this.isLoopActive = false;
  };

  tick = () => {
    const delta = clock.getDelta();

    for (const object of this.updateables) {
      object.tick(delta);
    }
  };
}

export default Loop;
