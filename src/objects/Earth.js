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
    const coin = new Coin(1);

    const offsetAngle = 0.05;
    const angle = this.angle + offsetAngle;

    // coin.position.z = (this.radius + 10) * Math.cos(angle);
    // coin.position.y = (this.radius + 1.1 * Math.cos(angle * 20) ** 2 * 20) * Math.sin(angle);
    coin.position.z = Math.cos(angle) * this.radius + 24 * Math.cos(angle * 20) ** 3;
    coin.position.y = Math.sin(angle) * this.radius + 10 * Math.cos(angle * 24) ** 2;
    coin.position.x = 0;
    
    this.coins.push(coin);
    this.add(coin);
  }
  
  spawnCoins() {
    let numOfCoins = Math.ceil(3 + Math.random() * 5);

    let angle = this.angle + 0.05;
    for (let i = 0; i < numOfCoins; i++) {
      const coin = new Coin(1);

      angle += i * 0.004;
      coin.position.z = Math.cos(angle) * this.radius;
      coin.position.y = Math.sin(angle) * this.radius + 10 * Math.cos(angle * 24) ** 2;
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
        obj.scene.scale.setScalar(245);

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
