import { BoxGeometry } from "three";
import { Mesh, SphereGeometry, MeshLambertMaterial } from "three";

class Asteroid extends Mesh {
  constructor(radius) {
    const geometry = new BoxGeometry(1);
    const material = new MeshLambertMaterial({ color: 0x666666 });

    super(geometry, material);
    this.position.y = radius;
  }
}

export default Asteroid;
