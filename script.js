import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Portal
const geometry = new THREE.TorusGeometry(1.5, 0.3, 32, 200);

const material = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  emissive: 0x00ffff,
  emissiveIntensity: 2,
  metalness: 1,
  roughness: 0
});

const portal = new THREE.Mesh(geometry, material);
scene.add(portal);

// Controls
const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping = true;

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
});

// Animation
function animate() {
  requestAnimationFrame(animate);

  portal.rotation.x += 0.005;
  portal.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();

