import { Group } from "three";
import { Mesh, BoxGeometry, MeshPhongMaterial } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import model from "../models/Plane.fbx";

const map = (val, start1, end1, start2, end2) => {
  return start2 + ((val - start1) * (end2 - start2)) / (end1 - start1);
};

class Airplane extends Mesh {
  constructor() {
    // const cubeGeom = new BoxGeometry(5, 2, 5);
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
        console.log(obj);
        obj.scale.setScalar(0.01);
        obj.position.y = 1;
        obj.rotateY(Math.PI);
        // obj.receiveShadow = true;

        obj.traverse(function (a) {
          if (a.isMesh) a.castShadow = true;
        });

        this.add(obj);
      },
      null,
      () => console.error("Azz! Errore")
    );
  }

  handleMovement(mousePosition) {
    if (!mousePosition) return;

    let viewportHeight = document.body.clientHeight;
    let viewportWidth = document.body.clientWidth;

    let targetY = map(mousePosition.y, 0, viewportHeight, 15, 0);
    this.position.y += (targetY - this.position.y) * 0.1;
    this.rotation.x = (targetY - this.position.y) * 0.08;
    // this.position.y = targetY;

    let targetX = map(mousePosition.x, 0, viewportWidth, -10, 10);
    this.position.x += (targetX - this.position.x) * 0.2;
    this.rotation.z = (this.position.x - targetX) * 0.09;
  }
}

export default Airplane;
