import * as THREE from "three";

export declare class Loop {
  isLoopActive: boolean;
  updateables: [];

  constructor(camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer)
  start: () => void;
  stop: () => void;
  tick: () => void;
}