/**
 * entry.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */

import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from "three";
import SeedScene from "./objects/Scene.js";

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true, alpha: true });
const seedScene = new SeedScene();

scene.fog = new Fog(0xefd2a0, 350, 700);
scene.add(seedScene);

export const gameStats = {
  energy: 100,
  timeInSec: 0,
  airplaneYCoord: 0,
  rotationSpeed: 0.0025,
  minRotationSpeed: 0.002,
  maxRotationSpeed: 0.0028,
  isPlaying: true,
  meters: 0,
  addMeters: function () {
    this.meters++;
  },
};

// Configure camera
camera.position.set(70, 25, 0);
camera.lookAt(new Vector3(0, 20, 0));

// Configure renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;

const mousePosition = {
  x: Math.round(document.body.clientWidth / 2),
  y: Math.round(document.body.clientHeight / 2),
};

document.body.addEventListener("mousemove", e => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
});

// --- Setup styles

import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

// Compile styles, apply plugins, insert to DOM.
import { sheet } from "./styles";
sheet.attach();

const energyElem = document.querySelector("#energy-bar");
const decreaseEnergy = () => {
  if (gameStats.energy > 0) {
    gameStats.energy -= 2;
  } else {
    gameStats.energy = 0;
  }

  energyElem.style.width = gameStats.energy * 2 + "px";
};

// ---

// Uncomment in case you want to spawn coins/asteroids.
document.body.addEventListener("keydown", e => {
  if (e.ctrlKey) seedScene.earth.spawnCoin();
  else if (e.key === "\\") seedScene.earth.spawnAsteroid();
});

const endgameOverlay = document.querySelector("#endgame-overlay");
const showEndScreen = () => {
  endgameOverlay.style.display = "grid";
  endgameOverlay.addEventListener("click", () => location.reload());

  const distance = document.querySelector("#travelled-distance");
  distance.innerText += ` ${gameStats.meters} meters`;
};

const updateMetersCounter = () => {
  document.getElementById("meter-counter").innerText = gameStats.meters + " meters";
};

const onEverySecondHandler = () => {
  const seconds = gameStats.timeInSec;

  if (gameStats.energy > 20 && gameStats.energy < 80) {
    gameStats.rotationSpeed = gameStats.maxRotationSpeed;
  } else {
    gameStats.rotationSpeed = gameStats.minRotationSpeed;
  }

  const nextTimeAsteroidWillSpawn = Math.round(random(1, 3));
  const nextTimeCoinWillSpawn = 4;

  if (seconds % nextTimeCoinWillSpawn === 0) seedScene.earth.spawnCoins();
  else if (seconds % nextTimeAsteroidWillSpawn === 0) seedScene.earth.spawnAsteroid();

  decreaseEnergy();

  gameStats.timeInSec++;
};

setInterval(onEverySecondHandler, 1000);

import { Clock } from "three";
import { random } from "./lib/utils.js";
import { Fog } from "three";
const clock = new Clock();

// Render loop
const onAnimationFrameHandler = timeStamp => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);

  seedScene.airplane.handleMovement(mousePosition);

  // Meters counter
  if (gameStats.isPlaying) {
    gameStats.addMeters();
    updateMetersCounter();

    // Game over screen
    if (gameStats.energy === 0) {
      showEndScreen();
      gameStats.isPlaying = false;
      seedScene.airplane.isAlive = false;
    }
  }

  // Rotate earth
  if (seedScene.earth) seedScene.earth.rotation.x += gameStats.rotationSpeed;
  seedScene.earth.angle += gameStats.rotationSpeed;
  gameStats.airplaneYCoord = seedScene.airplane.position.y;

  // Animations
  const delta = clock.getDelta();
  if (seedScene.airplane.mixer) {
    seedScene.airplane.mixer.update(delta);
  }

  // Collisions
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

      seedScene.airplane.shake();

      gameStats.energy -= 10;
    }
  }

  if (seedScene.earth.coins.length > 32) {
    for (let i = 0; i < 20; i++) {
      let coin = seedScene.earth.coins[i];
      seedScene.earth.remove(coin)
    }

    seedScene.earth.coins.splice(0, 20);
  }
  
  if (seedScene.earth.asteroids.length > 32) {
    for (let i = 0; i < 20; i++) {
      let asteroid = seedScene.earth.asteroids[i];
      seedScene.earth.remove(asteroid)
    }

    seedScene.earth.asteroids.splice(0, 20);
  }

  
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
