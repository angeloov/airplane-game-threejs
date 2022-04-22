import { Mesh, BoxGeometry, MeshPhongMaterial } from "three";

const map = (val, start1, end1, start2, end2) => {
  return start2 + ((val - start1) * (end2 - start2)) / (end1 - start1);
};

class Airplane extends Mesh {
  constructor() {
    const cubeGeom = new BoxGeometry(5, 2, 5);
    const cubeMaterial = new MeshPhongMaterial();
    super(cubeGeom, cubeMaterial);
  }

  handleMovement(mousePosition) {
    if (!mousePosition) return;

    let viewportHeight = document.body.clientHeight;
    let viewportWidth = document.body.clientWidth;

    let targetY = -map(mousePosition.y, 0, viewportHeight, -8, 8);
    this.position.y += (targetY - this.position.y) * 0.1;
    this.rotation.x = (targetY - this.position.y) * 0.08;

    let targetX = -map(mousePosition.x, 0, viewportWidth, -10, 10);
    this.position.x += (targetX - this.position.x) * 0.2;
    this.rotation.z = (this.position.x - targetX) * 0.09;
  }
}

export default Airplane;
