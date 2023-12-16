import * as THREE from "three";
import { OrbitControls } from "OrbitControl";
import { OBJLoader } from "Loader";

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.set(0, 500, 1250);
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0xffffff, 100);
light.position.y += 6;

scene.add(light);

let pts = [];
let v3 = new THREE.Vector3();

let tree;

const loader = new OBJLoader();
loader.load("../public/spruce.obj", (mesh) => {
  mesh.traverse((child) => {
    if (child.isMesh) {
      let pos = child.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);

        if (v3.x < 450) {
          pts.push(v3.clone());
        }
      }
    }
  });

  const geometry = new THREE.BufferGeometry().setFromPoints(pts);
  const material = new THREE.PointsMaterial({ color: "white", size: 0.05 });

  tree = new THREE.Points(geometry, material);
  tree.position.x += 700;
  scene.add(tree);
});


function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  tree.rotation.y += 0.01;
}

animate();
