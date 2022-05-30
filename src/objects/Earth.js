import { Mesh, MeshPhongMaterial, Group, CylinderBufferGeometry } from "three";

import { random } from "../lib/utils";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import earthModel from "../models/Earth.glb";
import Coin from "./Coin";
import Asteroid from "./Asteroid";

import { gameStats } from "../entry";

import { BoxGeometry } from "three";
import cloudOne from "../models/Cloud_1.fbx";

class Earth extends Mesh {
  constructor(radius) {
    let geom = new CylinderBufferGeometry(radius - 10, radius - 10, 2000, 40, 10, false);
    let earthMater = new MeshPhongMaterial({
      color: 0x68c3c0,
      opacity: 1,
      transparent: true,
      flatShading: true,
    });

    super();
    this.mesh = new Mesh(geom, earthMater);
    this.mesh.rotateZ(-Math.PI / 2);
    this.add(this.mesh);

    let waves = [];

    for (let i = 0; i < geom.attributes.position.count; i++) {
      let x = geom.attributes.position.getX(i);
      let y = geom.attributes.position.getY(i);

      waves.push({
        x,
        y,
        ang: Math.random() * Math.PI * 2, // A random angle.
        amp: 5 + Math.random() * 20, // A random distance.
        speed: 0.0116 + Math.random() * 0.032, // A random speed between
      });
    }

    for (let i = 0; i < geom.attributes.position.count; i++) {
      let newX = waves[i].x + Math.cos(waves[i].ang) * waves[i].amp;
      let newY = waves[i].y + Math.sin(waves[i].ang) * waves[i].amp;

      geom.attributes.position.setX(i, newX);
      geom.attributes.position.setY(i, newY);
    }

    // geom.merge();
    // geom.morphAttributes

    // super();
    // this.load3DModel();

    this.radius = radius;
    this.position.y = -(radius + 10);

    this.coins = [];
    this.asteroids = [];
    this.angle = Math.PI / 2;

    this.receiveShadow = true;
    this.castShadow = true;

    // this.spawnClouds();
  }

  spawnCoin() {
    const coin = new Coin(1);

    const offsetAngle = 0.1;
    const angle = this.angle + offsetAngle;

    const radius = this.radius + 15;

    const c = 12;
    const d = 50;

    coin.position.z = Math.cos(angle) * radius + c * Math.cos(d * angle);
    coin.position.y = Math.sin(angle) * radius + c * Math.sin(d * angle);
    coin.position.x = 0;

    this.coins.push(coin);
    this.add(coin);
  }

  spawnCoins() {
    let numOfCoins = Math.ceil(random(3, 8));

    const radius = this.radius + 20;

    const c = 10;
    const d = 50;

    let angle = this.angle + 0.1;
    for (let i = 0; i < numOfCoins; i++) {
      const coin = new Coin(1);

      angle += i * 0.006;
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

  spawnAsteroid() {
    const asteroid = new Asteroid();
    const angle = this.angle + 0.1;
    const r = gameStats.airplaneYCoord + this.radius + 10;

    asteroid.position.z = r * Math.cos(angle);
    asteroid.position.y = r * Math.sin(angle);

    this.asteroids.push(asteroid);
    this.add(asteroid);
  }

  load3DModel() {
    let loader = new GLTFLoader();

    loader.load(
      earthModel,
      obj => {
        obj.scene.scale.setScalar(199);

        obj.scene.traverse(a => {
          if (a.isMesh) {
            a.castShadow = true;
            a.receiveShadow = true;
          }
        });

        this.add(obj.scene);
      },
      null,
      e => console.error("Error in loading Earth model", e)
    );
  }

  spawnClouds() {
    let loader = new FBXLoader();
    let clouds = [];

    loader.load(
      cloudOne,
      obj => {
        // clouds.push(JSON.parse(JSON.stringify(obj)));

        // let c = clouds[0];

        obj.position.y = 1060;
        obj.scale.setScalar(0.1);
        this.add(obj);
      },
      null,
      e => console.error(e)
    );
  }
}

export default Earth;
