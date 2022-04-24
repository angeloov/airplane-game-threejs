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

// camera
camera.position.set(0, 15, 15);
camera.rotateX(-Math.PI / 5);
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

import { airplaneBody, groundBody, world, sphere } from "./cannonSetup";
import { Vec3 } from "cannon-es";
import { PCFSoftShadowMap } from "three";

// render loop
const onAnimationFrameHandler = timeStamp => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);

  seedScene.airplane.handleMovement(mousePosition);

  if (seedScene.earth) seedScene.earth.rotation.x += 0.0025;

  // let geometry = seedScene.earth.geometry;
  // let count = geometry.attributes.position.count;

  // for (let i = 0; i < count; i++) {
  //   const x = geometry.attributes.position.getX(i);
  //   const y = geometry.attributes.position.getY(i);

  //   const xangle = x;
  //   const xsin = Math.sin(xangle) * 30;
  //   const yangle = y;
  //   const ycos = Math.cos(yangle) * 30;

  //   geometry.attributes.position.setZ(i, xsin + ycos);
  // }

  // geometry.computeVertexNormals();
  // geometry.attributes.position.needsUpdate = true;

  // console.log(scene);
  // cannon config
  // let { x, y, z } = seedScene.airplane.getWorldPosition(new Vector3(0, 0, 0));
  // airplaneBody.position.set(x, y, z);
  // airplaneBody.quaternion.copy(seedScene.airplane.quaternion);

  // let { x: x2, y: y2, z: z2 } = seedScene.asteroid.getWorldPosition(new Vector3(0, 0, 0));
  // sphere.position.set(x2, y2, z2);
  // sphere.quaternion.copy(seedScene.asteroid.quaternion);
  // cannon end
  // console.log(seedScene.airplane.position);

  controls.update();
  world.fixedStep();

  // seedScene.pivotPoint.rotation.y += 0.05;
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
