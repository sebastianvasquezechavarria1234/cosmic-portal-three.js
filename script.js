import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050510);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 6);

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

document.body.appendChild(
  renderer.domElement
);

// Controls
const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping = true;

// Lights

const ambientLight = new THREE.AmbientLight(
  0xffffff,
  0.5
);

scene.add(ambientLight);

const blueLight = new THREE.PointLight(
  0x00ffff,
  30,
  100
);

blueLight.position.set(
  4,
  2,
  4
);

scene.add(blueLight);

const pinkLight = new THREE.PointLight(
  0xff00ff,
  30,
  100
);

pinkLight.position.set(
  -4,
  -2,
  4
);

scene.add(pinkLight);

// Crystal

const crystalGeometry =
  new THREE.OctahedronGeometry(
    1.5,
    2
  );

const crystalMaterial =
  new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0,
    transmission: 1,
    thickness: 1.5,
    transparent: true,
    ior: 2.3
  });

const crystal = new THREE.Mesh(
  crystalGeometry,
  crystalMaterial
);

scene.add(crystal);

// Orbit Ring

const ring = new THREE.Mesh(
  new THREE.TorusGeometry(
    2.5,
    0.05,
    32,
    200
  ),
  new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    emissive: 0x00ffff,
    emissiveIntensity: 3
  })
);

ring.rotation.x = Math.PI / 2;

scene.add(ring);

// Resize

window.addEventListener(
  'resize',
  () => {
    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }
);

// Animation

function animate() {
  requestAnimationFrame(
    animate
  );

  const time =
    Date.now() * 0.001;

  crystal.rotation.y += 0.01;
  crystal.rotation.x += 0.003;

  ring.rotation.z += 0.01;

  crystal.position.y =
    Math.sin(time * 2) * 0.2;

  blueLight.intensity =
    20 + Math.sin(time * 3) * 5;

  pinkLight.intensity =
    20 + Math.cos(time * 3) * 5;

  controls.update();

  renderer.render(
    scene,
    camera
  );
}

animate();