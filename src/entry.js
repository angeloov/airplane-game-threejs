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
import style from "./styles";

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true, alpha: true });
const seedScene = new SeedScene();
// scene
scene.add(seedScene);

const gui = new dat.GUI();
gui.add(camera.rotation, "x", -Math.PI, Math.PI);
gui.add(camera.rotation, "y", -Math.PI, Math.PI);
gui.add(camera.rotation, "z", -Math.PI, Math.PI);

const fncs = {
  spawnCoins: () => seedScene.earth.spawnCoins(),
};
gui.add(fncs, "spawnCoins");

// camera
camera.position.set(70, 35, 0);
camera.lookAt(new Vector3(0, 20, 0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);
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

const gameStats = {
  energy: 50,
};

// --- Setup styles

import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

// Compile styles, apply plugins, insert to DOM.
import { sheet } from "./styles";
sheet.attach();

const energyElem = document.querySelector("#energy-bar");
const decreaseEnergy = () => {
  gameStats.energy -= 0.5;
  energyElem.style.width = gameStats.energy * 4 + "px";
};

setInterval(() => {
  decreaseEnergy();
}, 500);

console.log(seedScene.children);

// let scoreP = document.querySelector("#score");
// updateScore();

// ---

document.body.addEventListener("mousemove", e => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
});

document.body.addEventListener("keydown", e => {
  if (e.ctrlKey) seedScene.earth.spawnCoin();
  else if (e.key === "\\") seedScene.earth.removeCoin();
});

import { Clock } from "three";
const clock = new Clock();

// render loop
const onAnimationFrameHandler = timeStamp => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);

  seedScene.airplane.handleMovement(mousePosition);

  if (seedScene.earth) seedScene.earth.rotation.x += 0.001;

  seedScene.earth.angle += 0.001;

  const delta = clock.getDelta();

  if (seedScene.airplane.mixer) {
    seedScene.airplane.mixer.update(delta);
  }

  for (let i = 0; i < seedScene.earth.coins.length; i++) {
    let coin = seedScene.earth.coins[i];

    const { x: x1, y: y1, z: z1 } = seedScene.airplane.position;
    const { x: x2, y: y2, z: z2 } = coin.getWorldPosition(new Vector3(0, 0, 0));
    const distanceAirplaneCoin = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);

    coin.rotation.y += 0.1;

    if (distanceAirplaneCoin < coin.radius + 2.8) {
      seedScene.earth.remove(coin);
      seedScene.earth.coins.splice(i, 1);
      i--;

      gameStats.energy++;
    }
  }

  controls.update();

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
