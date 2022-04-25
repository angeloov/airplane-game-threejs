import { MeshPhongMaterial } from "three";
import { Vector3 } from "three";
import { Vector2 } from "three";
import { SphereGeometry, Mesh, MeshLambertMaterial, Group, MathUtils } from "three";
import Asteroid from "./Asteorid";

const random = (min, max) => min + Math.random() * max;

class Earth extends Mesh {
  constructor(radius) {
    const geometry = new SphereGeometry(radius);
    const material = new MeshLambertMaterial({ color: 0xb9fbc0, wireframe: false });

    super(geometry, material);
    // let earthMesh = new Mesh(geometry, material);
    // this.add(earthMesh);

    this.radius = radius;
    this.position.y = -radius;

    this.receiveShadow = true;
    this.castShadow = true;

    setInterval(() => this.spawnAsteroids(), 2000);
    // this.spawnAsteroids();
  }

  spawnAsteroids() {
    // let sign = 1;

    // let earthAngle = this.rotation.x % Math.PI;
    // if (earthAngle > Math.PI / 2 && earthAngle < 1.5 * Math.PI) {
    //   sign = -1;
    // }

    // console.log(
    //   MathUtils.radToDeg(earthAngle),
    //   earthAngle > Math.PI / 2 && earthAngle < 1.5 * Math.PI
    // );
    const earthAngle = -this.rotation.x - Math.PI / 6;
    const radius = this.radius;

    for (let i = 0; i < 10; i++) {
      let asteroid = new Asteroid(radius);
      asteroid.position.x = (Math.random() * 50 - 25).toFixed(2);

      let yComponent = Math.cos(earthAngle) * 15;
      let zComponent = Math.sin(earthAngle) * 15;

      asteroid.position.y = Math.cos(earthAngle) * radius + random(0, yComponent);
      asteroid.position.z = Math.sin(earthAngle) * radius + random(0, zComponent);

      // console.log(asteroid.position.y);

      asteroid.rotateX(Math.PI / 4);

      // asteroid.rotateOnAxis(new Vector3(1, 0, 0), Math.PI/4)
      // console.log(asteroid.rotation.x);

      this.add(asteroid);
    }
  }

  load3DModel() {
    const loader = new GLTFLoader();

    loader.load(
      "models/earth.glb",
      function (gltf) {
        console.log(gltf.scene);
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  }
}

export default Earth;
