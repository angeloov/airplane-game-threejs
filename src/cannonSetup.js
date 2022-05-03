import { World, Body, Vec3, Box, Sphere } from "cannon-es";

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import airplaneModel from "./models/Plane.fbx";

// Setup our physics world
const world = new World({
  gravity: new Vec3(0, 0, 0), // m/s²
});

// let loader = new FBXLoader();

// loader.load(
//   airplaneModel,
//   obj => {
//     console.log(obj);
//   },
//   null,
//   () => console.error("Azz! Errore")
// );

// Create a sphere body
const airplaneBody = new Body({
  mass: 1, // kg
  shape: new Box(new Vec3(4, 4, 4)),
  type: Body.STATIC
});
airplaneBody.position.set(0, 10, 0); // m

world.addBody(airplaneBody);

const asteroidBody = new Body({
  mass: 1,
  shape: new Sphere(2),
  type: Body.STATIC
});
asteroidBody.position.set(0, 10, 0);

airplaneBody.addEventListener("collide", () => {
  console.log("Collision!");
});
world.addBody(asteroidBody);

export { airplaneBody, world, asteroidBody };
