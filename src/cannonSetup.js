import { World, Body, Plane, Vec3, Sphere, Box } from "cannon-es";

// Setup our physics world
const world = new World({
  gravity: new Vec3(0, 0, 0), // m/s²
});

// Create a sphere body
const airplaneBody = new Body({
  mass: 1, // kg
  shape: new Box(new Vec3(5, 2, 5)),
});
airplaneBody.position.set(0, 40, 0); // m

// world.addBody(airplaneBody);

const sphere = new Body({
  mass: 1,
  shape: new Sphere(2),
});
sphere.position.set(0, 10, 0);
sphere.addEventListener("collide", () => {
  console.log("Collision!!");
});
// world.addBody(sphere);

// Create a static plane for the ground
// const groundBody = new Body({
//   type: Body.STATIC, // can also be achieved by setting the mass to 0
//   shape: new Plane(),
// });
// groundBody.position.y = -5;
// groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up
// world.addBody(groundBody);

export { airplaneBody, world, sphere };
