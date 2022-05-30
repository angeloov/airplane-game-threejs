import { Mesh, SphereGeometry, MeshLambertMaterial } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import model from "../models/clouds/Cloud_1.fbx";

class Cloud extends Mesh {
  constructor() {
    super();
    this.load3DModel();
  }

  load3DModel() {
    let loader = new FBXLoader();

    loader.load(
      model,
      obj => {
        obj.scale.setScalar(0.1);
        obj.rotateY(Math.PI / 2);

        obj.traverse(function (a) {
          if (a.isMesh) a.castShadow = true;
        });

        this.add(obj);
      },
      null,
      () => console.error("Error in loading Cloud model.")
    );
  }
}

export default Cloud;
