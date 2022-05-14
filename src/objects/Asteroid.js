import { MeshPhysicalMaterial } from "three";
import { Mesh, SphereGeometry, MeshPhongMaterial, MeshBasicMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import asteroidModel from "../models/Asteroid.glb";
console.log(asteroidModel);

class Asteroid extends Mesh {
  constructor() {
    // let geometry = new SphereGeometry(5, 12, 5);
    // let material = new MeshPhysicalMaterial({ color: "#F35E52" });
    // super(geometry, material);
    super();
    this.load3DModel();
  }

  load3DModel() {
    let loader = new GLTFLoader();

    loader.load(
      asteroidModel,
      obj => {
        console.log(obj);

        obj.scene.scale.setScalar(10);
        // obj.position.y = 1;

        obj.scene.traverse(function (a) {
          if (a.isMesh) a.castShadow = true;
        });

        this.add(obj.scene);
      },
      null,
      e => console.error("Error in loading Asteroid model.", e)
    );
  }
}

export default Asteroid;
