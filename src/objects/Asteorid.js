import { Mesh, SphereGeometry, MeshLambertMaterial } from "three";

class Asteroid extends Mesh {
  constructor() {
    const geometry = new SphereGeometry(1);
    const material = new MeshLambertMaterial({ color: 0x666666 });

    const asteroid = new Mesh(geometry, material);
    asteroid.position.z = 10;

    super(geometry, material);
  }
}

export default Asteroid;
