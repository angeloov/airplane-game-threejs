import { MeshBasicMaterial } from "three";
import { SphereBufferGeometry } from "three";
import { BufferAttribute } from "three";
import { BufferGeometry } from "three";
import { SphereGeometry, Mesh, MeshLambertMaterial } from "three";

class Earth extends Mesh {
  constructor(radius) {
    const geometry = new SphereGeometry(radius);
    const material = new MeshLambertMaterial({ color: 0xb9fbc0 });

    // itemSize = 3 because there are 3 values (components) per vertex
    // geometry.setAttribute("position", new BufferAttribute(vertices, 3));
    // const material = new MeshBasicMaterial({ color: 0xb9fbc0 });
    // const mesh = new THREE.Mesh( geometry, material );

    super(geometry, material);

    this.receiveShadow = true;
    // this.castShadow = true;
    this.position.y = -radius;
  }

  loadGLFTModel() {
    const loader = new GLTFLoader();

    loader.load(
      "models/earth.glb",
      function (gltf) {
        console.log(gltf.scene);
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  }
}

export default Earth;
