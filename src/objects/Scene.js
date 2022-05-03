import {
  Group,
  HemisphereLight,
  Mesh,
  PlaneGeometry,
  SpotLight,
  MeshBasicMaterial,
  Fog,
  SphereGeometry,
  AxesHelper,
  PointLight,
} from "three";

import Airplane from "./Airplane";
import Asteroid from "./Coin";
import Earth from "./Earth";

import { AmbientLight } from "three";
import { CameraHelper } from "three";
import { Plane } from "three";
import { MeshPhongMaterial } from "three";
import { DirectionalLight } from "three";
import Coin from "./Coin";

class Scene extends Group {
  constructor() {
    super();

    this.objects = [];

    this.earth = new Earth(1000);
    this.airplane = new Airplane();
    this.coins = [];

    this.objects.push(this.airplane, this.earth);
    this.addAllObjectsToScene();

    this.setupLights();
    this.toggleAxisHelper();
  }

  addAllObjectsToScene() {
    for (let obj of this.objects) {
      this.add(obj);
    }
  }

  toggleAxisHelper() {
    const axesHelper = new AxesHelper(5);
    axesHelper.position.set(0, 0, 0);
    this.add(axesHelper);
  }

  setupLights() {
    let light = new DirectionalLight(0xf0f0f0, 2);
    light.position.y = 40;
    // light.position.z = 100;
    // light.rotation.x = Math.PI / 2;

    light.target = this.airplane;

    light.castShadow = true;
    light.shadow.camera.near = 2;
    light.shadow.camera.far = 50;
    // light.shadow.mapSize.set(100, 100)

    let a = new CameraHelper(light.shadow.camera);
    this.add(a);

    this.add(light);
    this.add(light.target);
  }
}

export default Scene;
