import { Mesh, BoxGeometry, MeshPhongMaterial } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import model from "../models/Plane.fbx";

import { map } from "../lib/utils";

import { airplaneBody } from "../cannonSetup";

class Airplane extends Mesh {
  constructor() {
    const cubeGeom = new BoxGeometry(4, 4, 4);
    const cubeMaterial = new MeshPhongMaterial();
    super(cubeGeom, cubeMaterial);
    // super();
    // this.load3DModel();

    this.castShadow = true;
  }

  load3DModel() {
    let loader = new FBXLoader();

    loader.load(
      model,
      obj => {
        obj.scale.setScalar(0.01);
        obj.position.y = 1;
        obj.rotateY(Math.PI);

        obj.traverse(function (a) {
          if (a.isMesh) a.castShadow = true;
        });

        this.add(obj);
      },
      null,
      () => console.error("Error in loading Airplane model.")
    );
  }

  handleMovement(mousePosition) {
    if (!mousePosition) return;

    const MIN_Y = 0;
    const MAX_Y = 25;

    const viewportHeight = document.body.clientHeight;

    const targetY = map(mousePosition.y, 0, viewportHeight, MAX_Y, MIN_Y);
    // airplaneBody.position.y += (targetY - airplaneBody.position.y) * 0.1;
    this.position.y += (targetY - this.position.y) * 0.1;
    this.rotation.x = (targetY - this.position.y) * 0.08;

    // let viewportWidth = document.body.clientWidth;
    // let targetX = map(mousePosition.x, 0, viewportWidth, -10, 10);
    // this.position.x += (targetX - this.position.x) * 0.2;
    // this.rotation.z = (this.position.x - targetX) * 0.09;
  }
}

export default Airplane;
