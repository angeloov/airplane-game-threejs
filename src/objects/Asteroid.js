import { MeshPhysicalMaterial } from "three";
import { Mesh, TetrahedronGeometry, MeshPhongMaterial, MeshBasicMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import asteroidModel from "../models/Asteroid.glb";

class Asteroid extends Mesh {
  constructor() {
    let geometry = new TetrahedronGeometry(4, 2);
    let material = new MeshPhysicalMaterial({ color: "#ef233c" });
    super(geometry, material);
    // super();
    this.radius = 4;
    // this.load3DModel();
  }

}

export default Asteroid;
