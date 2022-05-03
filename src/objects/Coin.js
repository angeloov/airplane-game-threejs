import { Mesh, SphereGeometry, MeshLambertMaterial } from "three";

class Coin extends Mesh {
  constructor(radius) {
    const geometry = new SphereGeometry(2);
    const material = new MeshLambertMaterial({ color: 0x666666 });

    super(geometry, material);
  }
}

export default Coin;
