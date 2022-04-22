import {
  Group,
  MeshPhongMaterial,
  Mesh,
  PlaneGeometry,
  SpotLight,
  MeshBasicMaterial,
  Fog,
  SphereGeometry,
  AxesHelper,
  Object3D,
} from "three";

import Airplane from "./Airplane";

class Scene extends Group {
  constructor() {
    super();

    const geometry = new PlaneGeometry(50, 50);
    const material = new MeshBasicMaterial({ color: 0x787878 });
    const plane = new Mesh(geometry, material);
    plane.receiveShadow = true;
    plane.position.y = -5;

    plane.rotateX(-Math.PI / 2);

    let a = new Airplane();

    let asteroidGeometry = new SphereGeometry(2);
    let asteroidMaterial = new MeshBasicMaterial({ color: 0x666666 });

    let asteroid = new Mesh(asteroidGeometry, asteroidMaterial);
    asteroid.position.z = 10;

    const pivotPoint = new Object3D();
    pivotPoint.add(asteroid);

    this.pivotPoint = pivotPoint;
    this.airplane = a;
    this.asteroid = asteroid;

    this.add(a);
    this.add(plane);
    // this.add(asteroid);
    this.add(pivotPoint);

    this.setupLights();
    this.toggleAxisHelper();
  }

  toggleAxisHelper() {
    const axesHelper = new AxesHelper(5);
    this.add(axesHelper);
  }

  setupLights() {
    let light = new SpotLight(0xffffff, 0.5);
    light.position.y = 10;
    light.position.z = -5;

    this.add(light);
  }
}

export default Scene;
