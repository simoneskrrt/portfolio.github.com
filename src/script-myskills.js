import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sphereGeometry = new THREE.SphereGeometry(7, 30, 30);
const sphereMaterial = new THREE.MeshStandardMaterial();

const loaderTexture = new THREE.TextureLoader();
const texture = loaderTexture.load("../public/saturn_texture.jpg");
texture.colorSpace = THREE.SRGBColorSpace;
sphereMaterial.map = texture;

const pointLight = new THREE.PointLight(0xf1ebc8, 50, 100, 1.5);
pointLight.position.set(-3, 5, 12);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

scene.add(sphere, pointLight, ambientLight);

camera.position.z += 30;
camera.position.x = 50 * Math.sin(0.01 * (window.scrollY /
(document.documentElement.scrollHeight - window.innerHeight)) *
100) - 20;

const satellites = [];

const satellitesGeometry = new THREE.SphereGeometry(0.2, 10, 10);
const satellitesMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

for (let i = 0; i < 3; i++) {
  satellites.push(new THREE.Mesh(satellitesGeometry, satellitesMaterial));
}

satellites.map((mesh) => {
  scene.add(mesh);
});

let scrollPercentage = 0;

document.body.onscroll = () => {
  camera.position.x = 50 * Math.sin(0.01 * scrollPercentage) - 20;

  scrollPercentage =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
};

let t = 0;

function animate() {
  requestAnimationFrame(animate);

  satellites[0].position.y = Math.sin(t) * 10;
  satellites[0].position.x = Math.cos(t) * 9;

  satellites[1].position.x = Math.sin(t) * 10;
  satellites[1].position.y = Math.cos(t) * 9;

  satellites[2].position.z = Math.sin(t) * 10;
  satellites[2].position.y = Math.cos(t) * 9;

  t += 0.01;

  renderer.render(scene, camera);
}

animate();
