import { SphereGeometry, Mesh, MeshLambertMaterial, Group, MathUtils } from "three";

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
    const coin = new Coin(1);

    const offsetAngle = 0.05;
    const angle = this.angle + offsetAngle;

    const radius = this.radius + 10;

    const c = 8;
    const d = 50;

    coin.position.z = Math.cos(angle) * radius + c * Math.cos(d * angle);
    coin.position.y = Math.sin(angle) * radius + c * Math.sin(d * angle);
    coin.position.x = 0;

    this.coins.push(coin);
    this.add(coin);
  }

  spawnCoins() {
    let numOfCoins = Math.ceil(3 + Math.random() * 5);

    const radius = this.radius + 10;

    const c = 8;
    const d = 50;

    let angle = this.angle + 0.05;
    for (let i = 0; i < numOfCoins; i++) {
      const coin = new Coin(1);

      angle += i * 0.004;
      coin.position.z = Math.cos(angle) * radius + c * Math.cos(d * angle);
      coin.position.y = Math.sin(angle) * radius + c * Math.sin(d * angle);
      coin.position.x = 0;

      this.coins.push(coin);
      this.add(coin);
    }
  }

  removeCoin() {
    if (this.children.length != 1) {
      this.remove(this.children[1]);
      this.coins.shift();
    }
  }

  load3DModel() {
    let loader = new GLTFLoader();

    loader.load(
      earthModel,
      obj => {
        obj.scene.scale.setScalar(199);

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
