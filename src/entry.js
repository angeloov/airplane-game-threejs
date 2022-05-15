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

scene.fog = new Fog(0xefd2a0, 350, 700);
// scene.background = new Color(0x00ff00);
// scene
scene.add(seedScene);

export const gameStats = {
  energy: 100,
  timeInSec: 0,
  airplaneYCoord: 0,
  rotationSpeed: 0.002,
  minRotationSpeed: 0.002,
  maxRotationSpeed: 0.0035,
  isPlaying: true,
  resetEnergy: () => (this.energy = 100),
};

const gui = new dat.GUI();
gui.add(camera.rotation, "x", -Math.PI, Math.PI);
// gui.add(camera.rotation, "y", -Math.PI, Math.PI);
gui.add(camera.rotation, "z", -Math.PI, Math.PI);
gui.add(gameStats, "rotationSpeed", 0.001, 0.004, 0.0001);

const fncs = {
  spawnCoins: () => seedScene.earth.spawnCoins(),
};
gui.add(fncs, "spawnCoins");

// camera
camera.position.set(70, 35, 0);
camera.lookAt(new Vector3(0, 20, 0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setClearColor(0x000, 0);
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
controls.maxDistance = 1000;

const mousePosition = {
  x: Math.round(document.body.clientWidth / 2),
  y: Math.round(document.body.clientHeight / 2),
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
  if (gameStats.energy <= 0) {
    gameStats.energy = 0;
    energyElem.style.width = gameStats.energy * 2 + "px";
    return;
  }

  gameStats.energy -= 2;
  energyElem.style.width = gameStats.energy * 2 + "px";
};

// ---

document.body.addEventListener("mousemove", e => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
});

document.body.addEventListener("keydown", e => {
  if (e.ctrlKey) seedScene.earth.spawnCoin();
  else if (e.key === "\\") seedScene.earth.spawnAsteroid();
});

import { Clock } from "three";
import { random } from "./lib/utils.js";
import { Fog } from "three";
import { Color } from "three";
import { WebGLMultipleRenderTargets } from "three";
const clock = new Clock();

let nextTimeAsteroidWillSpawn;

// render loop
const onAnimationFrameHandler = timeStamp => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);

  seedScene.airplane.handleMovement(mousePosition);

  // Ran each second
  const seconds = Math.floor(timeStamp / 1000);
  if (seconds > gameStats.timeInSec) {
    gameStats.timeInSec = seconds;

    nextTimeAsteroidWillSpawn = Math.floor(random(1, 3));
    decreaseEnergy();

    if (gameStats.energy > 20 && gameStats.energy < 80) {
      gameStats.rotationSpeed = gameStats.maxRotationSpeed;
    } else {
      gameStats.rotationSpeed = gameStats.minRotationSpeed;
    }

    if (seconds % 4 === 0) seedScene.earth.spawnCoins();
    else if (seconds % nextTimeAsteroidWillSpawn === 0) seedScene.earth.spawnAsteroid();
  }

  if (gameStats.energy === 0 && gameStats.isPlaying) {
    console.log("Game over");
    gameStats.isPlaying = false;
    seedScene.airplane.isAlive = false;
  }

  if (seedScene.earth) seedScene.earth.rotation.x += gameStats.rotationSpeed;
  seedScene.earth.angle += gameStats.rotationSpeed;

  gameStats.airplaneYCoord = seedScene.airplane.position.y;

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

    if (distanceAirplaneCoin < coin.radius + 3) {
      seedScene.earth.remove(coin);
      seedScene.earth.coins.splice(i, 1);
      i--;

      gameStats.energy += 2;
    }
  }

  for (let i = 0; i < seedScene.earth.asteroids.length; i++) {
    let asteroid = seedScene.earth.asteroids[i];

    const { x: x1, y: y1, z: z1 } = seedScene.airplane.position;
    const { x: x2, y: y2, z: z2 } = asteroid.getWorldPosition(new Vector3(0, 0, 0));

    const distanceAirplaneAsteroid = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);

    if (distanceAirplaneAsteroid < asteroid.radius + 2 && gameStats.energy != 0) {
      seedScene.earth.remove(asteroid);
      seedScene.earth.asteroids.splice(i, 1);
      i--;

      gameStats.energy -= 10;
      console.log(gameStats.energy);
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
document.body.appendChild(renderer.domElement);
