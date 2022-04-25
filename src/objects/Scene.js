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
import Asteroid from "./Asteorid";
import Earth from "./Earth";

import { AmbientLight } from "three";
import { CameraHelper } from "three";
import { Plane } from "three";
import { MeshPhongMaterial } from "three";
import { DirectionalLight } from "three";

class Scene extends Group {
  constructor() {
    super();

    this.objects = [];

    let g = new SphereGeometry(1);
    let m = new MeshBasicMaterial({ color: 0xffffff });
    this.point = new Mesh(g, m);
    this.point.position.set(0, 0, 0);

    this.earth = new Earth(200);
    this.airplane = new Airplane();
    this.asteroid = new Asteroid();

    // let geom = new PlaneGeometry(100, 100);
    // let mater = new MeshPhongMaterial({ color: 0xb9fbc0 });
    // this.earth = new Mesh(geom, mater);
    // this.earth.rotateX(-Math.PI / 2);
    // this.earth.receiveShadow = true;

    this.objects.push(this.airplane, this.earth);
    this.addAllObjectsToScene();
    // const pivotPoint = new Object3D();
    // pivotPoint.add(asteroid);

    // this.pivotPoint = pivotPoint;

    // this.add(pivotPoint);

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
