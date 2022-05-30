import { Group, AxesHelper, BoxGeometry, Mesh } from "three";

import Airplane from "./Airplane";
import Asteroid from "./Asteroid";
import Earth from "./Earth";

import { AmbientLight } from "three";
import { CameraHelper } from "three";
import { MeshPhongMaterial } from "three";
import { DirectionalLight } from "three";
import { Vector3 } from "three";
import { HemisphereLight, Fog } from "three";
import Cloud from "./Cloud";

class Scene extends Group {
  constructor() {
    super();

    this.objects = [];

    this.earth = new Earth(1000);
    this.airplane = new Airplane();

    this.objects.push(this.airplane, this.earth);
    this.addAllObjectsToScene();

    this.setupLights();
    // this.toggleAxisHelper();

    
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
    light.position.y = 35;

    light.shadow.camera.top = 15;
    light.shadow.camera.bottom = -15;
    light.shadow.camera.left = -20;
    light.shadow.camera.right = 20;

    // light.target = this.airplane;
    light.target.position.set(0, 0, 0);
    light.shadow.camera.updateProjectionMatrix();

    light.castShadow = true;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 80;
    // light.lookAt(0, 0, 0)
    // light.shadow.mapSize.set(100, 100)

    // let a = new CameraHelper(light.shadow.camera);
    // this.add(a);

    let ambientLight = new AmbientLight(0xdc8874, 0.7);
    this.add(ambientLight);

    let hemisphereLight = new HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    this.add(hemisphereLight);

    this.add(light);
    this.add(light.target);
  }
}

export default Scene;
