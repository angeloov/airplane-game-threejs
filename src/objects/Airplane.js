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
    this.isAlive = true;
    this.x = 0;
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

  shake() {
    // console.log("Shaking");
    this.isShaking = true;
  }

  handleMovement(mousePosition) {
    if (!mousePosition) return;

    if (this.isAlive) {
      const MIN_Y = 0;
      const MAX_Y = 25;

      const viewportHeight = document.body.clientHeight;

      const targetY = map(mousePosition.y, 0, viewportHeight, MAX_Y, MIN_Y);
      this.position.y += (targetY - this.position.y) * 0.1;
      this.rotation.x = (targetY - this.position.y) * 0.08;

      if (this.isShaking) {
        if (this.x === 0) this.x = Math.PI;

        if (this.x >= 7*Math.PI/2) {
          this.x = 0;
          this.isShaking = false;
          this.rotation.z = 0;
          return;
        }

        const a = 12;
        const f = x => 2*(Math.E)**(-0.5*x)*Math.sin(6*x);

        this.x += 0.1;
        this.rotation.z = f(this.x);
      }
    } else {
      const f = x => (-12 * x ** 2) / 600 + (7 * x) / 60 + this.position.y;
      this.position.x = this.x;
      this.position.y = f(this.x);

      this.rotation.x = -Math.sin(0.15 * this.x);

      this.x += 0.25;
    }
  }
}

export default Airplane;
