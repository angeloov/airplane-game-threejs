import { MeshPhysicalMaterial } from "three";
import { Mesh, TetrahedronGeometry, MeshPhongMaterial, MeshBasicMaterial } from "three";

class Asteroid extends Mesh {
  constructor() {
    const RADIUS = 4;

    let geometry = new TetrahedronGeometry(RADIUS, 2);
    let material = new MeshPhysicalMaterial({ color: "#ef233c" });
    super(geometry, material);

    this.radius = RADIUS;
  }
}

export default Asteroid;
