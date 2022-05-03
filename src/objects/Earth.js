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
    coin.position.z = (this.radius + 10) * Math.cos(this.angle);
    coin.position.y = (this.radius + (Math.abs(Math.sin(this.angle*20)) * 20)) * Math.sin(this.angle);
    coin.position.x = 0;

    console.log(coin.position.y);

    this.coins.push(coin);
    this.add(coin);
  }

  // spawnAsteroids() {
  //   const earthAngle = -this.rotation.x - Math.PI / 6;
  //   const radius = this.radius;

  //   // if (world && world.bodies.length >= 10) {
  //   //   for (let i = 0; i < 10; i++) {
  //   //     world.removeBody(world[0]);
  //   //   }
  //   // }

  //   for (let i = 0; i < 1; i++) {
  //     const asteroid = new Asteroid(radius);
  //     // asteroid.position.x = random(25, 50);
  //     asteroid.position.x = 0;

  //     let yComponent = Math.cos(earthAngle) * 15;
  //     let zComponent = Math.sin(earthAngle) * 15;

  //     let y = random(0, yComponent);
  //     let z = random(0, zComponent);

  //     // asteroid.position.y = Math.cos(earthAngle) * radius + y;
  //     // asteroid.position.z = Math.sin(earthAngle) * radius + z;
  //     // asteroid.position.z = 0;
  //     asteroid.position.y = 210;
  //     asteroid.position.z = 0;

  //     // const sphere = new Body({
  //     //   mass: 0,
  //     //   shape: new Sphere(2),
  //     // });

  //     // let vec = new Vector3(0, 0, 0);
  //     // asteroid.getWorldPosition(vec);
  //     // console.log(vec);

  //     // sphere.position.set(vec.x, vec.y - 200, vec.z);
  //     // sphere.quaternion.copy(asteroid.quaternion);
  //     // sphere.addEventListener("collide", () => {
  //     //   console.log("Collision");
  //     // });
  //     // world.addBody(sphere);

  //     setInterval(() => {
  //       console.log("sphere", sphere.position);
  //     }, 1500);

  //     // console.log(asteroid.position.x, Math.abs(y), Math.abs(z));

  //     this.add(asteroid);
  //   }

  //   // console.log(world.bodies);
  // }

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
