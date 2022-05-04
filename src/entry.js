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
import * as dat from "dat.gui";

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
const seedScene = new SeedScene();
// scene
scene.add(seedScene);

const gui = new dat.GUI();
gui.add(camera.rotation, "x", -Math.PI, Math.PI);
gui.add(camera.rotation, "y", -Math.PI, Math.PI);
gui.add(camera.rotation, "z", -Math.PI, Math.PI);

// camera
camera.position.set(50, 45, 0);
camera.lookAt(new Vector3(0, 20, 0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x00256f, 1);
// renderer.shadowMap.type = PCFSoftShadowMap;
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.dragToLook = true;
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.3;
controls.minDistance = 10;
controls.maxDistance = 500;

const mousePosition = {
  x: Math.round(document.body.clientWidth / 2),
  y: Math.round(document.body.clientHeight / 2),
};

document.body.addEventListener("mousemove", e => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
});

import { airplaneBody, groundBody, world, asteroidBody } from "./cannonSetup";

let cube = seedScene.airplane;
let collidableMeshList = [];
collidableMeshList.push(seedScene.asteroid);

document.body.addEventListener("keydown", e => {
  if (e.ctrlKey) seedScene.earth.spawnCoin();
  else if (e.key === "\\") seedScene.earth.removeCoin();
});

// render loop
const onAnimationFrameHandler = timeStamp => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);

  seedScene.airplane.handleMovement(mousePosition);

  if (seedScene.earth) seedScene.earth.rotation.x += 0.001;

  seedScene.earth.angle += 0.001;

  for (let coin of seedScene.coins) {
    let d = seedScene.airplane.position.clone().sub(coin.position).length();
    if (d < 1.1) {
      console.log(" HIT ");
    }
  }

  // cannon config
  // airplaneBody.position.copy(seedScene.airplane.position);
  // airplaneBody.quaternion.copy(seedScene.airplane.quaternion);

  // console.log(seedScene.airplane.position.y, airplaneBody.position.y);
  // seedScene.airplane.position.copy(airplaneBody.position);
  // seedScene.airplane.quaternion.copy(airplaneBody.quaternion);

  // console.log(airplaneBody.position.y);

  // seedScene.asteroid.position.copy(asteroidBody.position);
  // seedScene.asteroid.quaternion.copy(asteroidBody.quaternion);

  // cannon end
  // console.log(seedScene.asteroid.position.y);
  // console.log(seedScene.airplane.position.y);

  controls.update();
  world.fixedStep();

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
