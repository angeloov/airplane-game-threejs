import { Mesh, SphereGeometry, MeshLambertMaterial } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import model from "../models/Coin.fbx";

class Coin extends Mesh {
  constructor(radius) {
    // const geometry = new SphereGeometry(radius);
    // const material = new MeshLambertMaterial({ color: 0x666666 });

    // super(geometry, material);
    super();
    this.load3DModel();
    this.radius = radius;
  }

  load3DModel() {
    let loader = new FBXLoader();

    loader.load(
      model,
      obj => {
        obj.scale.setScalar(0.04)
        obj.position.y = 1;
        obj.rotateY(Math.PI);

        obj.traverse(function (a) {
          if (a.isMesh) a.castShadow = true;
        });

        this.add(obj);
      },
      null,
      () => console.error("Error in loading Coin model.")
    );
  }
}

export default Coin;
