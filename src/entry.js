/**
 * entry.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */

import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import SeedScene from "./objects/Scene.js";

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
const seedScene = new SeedScene();
console.log(seedScene);
// scene
scene.add(seedScene);

// camera
camera.position.set(0, 10, -20);
camera.lookAt(new Vector3(0, 0, 0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x00256f, 1);

const mousePosition = { x: 0, y: 0 };

document.body.addEventListener("mousemove", e => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
});

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.3;
controls.minDistance = 10;
controls.maxDistance = 500;

import { airplaneBody, groundBody, world, sphere } from "./cannonSetup";
import { Vec3 } from "cannon-es";

// render loop
const onAnimationFrameHandler = timeStamp => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);

  seedScene.airplane.handleMovement(mousePosition);

  // cannon
  let { x, y, z } = seedScene.airplane.getWorldPosition(new Vector3(0, 0, 0));
  airplaneBody.position.set(x, y, z);
  // airplaneBody.quaternion.copy(seedScene.airplane.quaternion);

  let { x2, y2, z2 } = seedScene.asteroid.getWorldPosition(new Vector3(0, 0, 0));
  sphere.position.set(x2, y2, z2);
  // sphere.quaternion.copy(seedScene.asteroid.quaternion);

  // console.log(sphere.position);

  // seedScene.airplane.position.copy(airplaneBody.position);
  // seedScene.airplane.quaternion.copy(airplaneBody.quaternion);
  controls.update();
  world.fixedStep();

  seedScene.pivotPoint.rotation.y += 0.05;
  window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener("resize", windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);
