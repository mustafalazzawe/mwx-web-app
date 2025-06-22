import * as THREE from "three";

function createCube() {
  const geomentry = new THREE.BoxGeometry(2, 2, 2);

  const material = new THREE.MeshStandardMaterial({ color: "red" });

  const cube = new THREE.Mesh(geomentry, material);

  cube.rotation.set(-0.5, -0.1, 0.8);

  const radiansPerSecond = THREE.MathUtils.degToRad(30);

  // called once per frame
  cube.tick = (delta) => {
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  return cube;
}

export { createCube };
