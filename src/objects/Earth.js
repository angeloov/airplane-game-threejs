import { MeshPhongMaterial } from "three";
import { Vector3 } from "three";
import { Vector2 } from "three";
import { SphereGeometry, Mesh, MeshLambertMaterial, Group, MathUtils } from "three";
import Asteroid from "./Coin";

import { random } from "../lib/utils";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import earthModel from "../models/Earth.glb";
import { BoxGeometry } from "three";
import Coin from "./Coin";

class Earth extends Mesh {
  constructor(radius) {
    // let earthGeom = new BoxGeometry(32, 32, 32);
    // let earthMater = new MeshPhongMaterial();
    super();
    this.load3DModel();

    this.radius = radius;
    this.position.y = -radius;

    this.coins = [];
    this.angle = Math.PI / 2;

    this.receiveShadow = true;
    this.castShadow = true;
  }

  spawnCoin() {
    const coin = new Coin();

    const offsetAngle = 0.05;
    const angle = this.angle + offsetAngle;

    coin.position.z = (this.radius + 10) * Math.cos(angle);
    coin.position.y = (this.radius + Math.cos(angle * 20) ** 2 * 20) * Math.sin(angle);
    coin.position.x = 0;

    this.coins.push(coin);
    this.add(coin);
  }

  removeCoin() {
    if (this.children.length != 1) {
      this.remove(this.children[1]);
    }
  }

  load3DModel() {
    let loader = new GLTFLoader();

    loader.load(
      earthModel,
      obj => {
        obj.scene.scale.setScalar(250);

        obj.scene.traverse(a => {
          if (a.isMesh) a.castShadow = true;
        });

        this.add(obj.scene);
      },
      null,
      () => console.error("Azz! Errore")
    );
  }
}

export default Earth;
