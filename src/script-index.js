import * as THREE from "three";
import { OrbitControls } from "OrbitControl";

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z += 8;
camera.position.x += 10;
camera.position.y += 6;
camera.rotation.z += Math.PI;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 25;

controls.maxAzimuthAngle = Math.PI / 3;
controls.minAzimuthAngle = Math.PI / 6;

controls.maxPolarAngle = Math.PI / 2.5;
controls.minPolarAngle = Math.PI / 6;

controls.update();

const geometry = new THREE.SphereGeometry(0.01, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

const particles = [];

for (let i = 0; i < 2000; i++) {
  particles.push(new THREE.Mesh(geometry, material));
}

particles.map((mesh) => {
  mesh.position.set(Math.random() * 20, Math.random() * 20, Math.random() * 20);
  scene.add(mesh);
});

function animate() {
  requestAnimationFrame(animate);

  particles.map((mesh) => {
    if (mesh.position.y < 0) {
      mesh.position.x = Math.random() * 20;
      mesh.position.y = Math.random() * 20;
      mesh.position.z = Math.random() * 20;
    } else {
      mesh.position.y -= 0.01;
    }
  });

  controls.update();

  renderer.render(scene, camera);
}

animate();
