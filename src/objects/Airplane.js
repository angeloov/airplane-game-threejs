import { Mesh, AnimationMixer } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import model from "../models/Airplane.fbx";

import { map } from "../lib/utils";

class Airplane extends Mesh {
  constructor() {
    // const cubeGeom = new BoxGeometry(4, 4, 4);
    // const cubeMaterial = new MeshPhongMaterial();
    // super(cubeGeom, cubeMaterial);
    super();
    this.load3DModel();

    this.castShadow = true;
  }

  load3DModel() {
    let loader = new FBXLoader();

    loader.load(
      model,
      obj => {
        const mixer = new AnimationMixer(obj);
        this.mixer = mixer;

        const action = mixer.clipAction(obj.animations[1]);
        action.play();

        obj.scale.setScalar(0.015);
        obj.position.y = 1;
        obj.rotateY(Math.PI / 2);

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
    this.position.y += (targetY - this.position.y) * 0.1;
    this.rotation.x = (targetY - this.position.y) * 0.08;
  }
}

export default Airplane;
