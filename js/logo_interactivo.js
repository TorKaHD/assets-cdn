// ========================================
// LOGO 3D BOOTSTRAP CON EFECTO METÁLICO
// Three.js 0.180.0
// ========================================

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

// Configuración inicial
const container = document.getElementById('logo-3d-container');
const canvas = document.getElementById('logo-3d-canvas');

// Crear escena
const scene = new THREE.Scene();

// Configurar cámara
const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);
camera.position.z = 8;

// Crear renderizador
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Material metálico para el logo
const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0x7952b3, // Color morado de Bootstrap
    metalness: 0.8,
    roughness: 0.2,
    envMapIntensity: 1.5
});

// Crear el logo de Bootstrap (forma de "B" estilizada)
const logoGroup = new THREE.Group();

// Crear la base rectangular del logo
const baseGeometry = new THREE.BoxGeometry(3, 4, 0.5);
const baseMesh = new THREE.Mesh(baseGeometry, metalMaterial);
baseMesh.castShadow = true;
baseMesh.receiveShadow = true;
logoGroup.add(baseMesh);

// Crear las curvas de la "B" usando esferas y cilindros
// Curva superior
const topCurveGeometry = new THREE.SphereGeometry(0.8, 32, 32, 0, Math.PI);
const topCurve = new THREE.Mesh(topCurveGeometry, metalMaterial);
topCurve.position.set(0.5, 0.8, 0.3);
topCurve.rotation.z = -Math.PI / 2;
topCurve.castShadow = true;
logoGroup.add(topCurve);

// Curva inferior
const bottomCurveGeometry = new THREE.SphereGeometry(0.9, 32, 32, 0, Math.PI);
const bottomCurve = new THREE.Mesh(bottomCurveGeometry, metalMaterial);
bottomCurve.position.set(0.5, -0.8, 0.3);
bottomCurve.rotation.z = -Math.PI / 2;
bottomCurve.castShadow = true;
logoGroup.add(bottomCurve);

// Barra vertical de la "B"
const verticalBarGeometry = new THREE.BoxGeometry(0.6, 3.8, 0.5);
const verticalBar = new THREE.Mesh(verticalBarGeometry, metalMaterial);
verticalBar.position.set(-1, 0, 0.3);
verticalBar.castShadow = true;
logoGroup.add(verticalBar);

// Barra horizontal superior
const topBarGeometry = new THREE.BoxGeometry(1.2, 0.5, 0.5);
const topBar = new THREE.Mesh(topBarGeometry, metalMaterial);
topBar.position.set(0.1, 0.8, 0.3);
topBar.castShadow = true;
logoGroup.add(topBar);

// Barra horizontal inferior
const bottomBarGeometry = new THREE.BoxGeometry(1.3, 0.5, 0.5);
const bottomBar = new THREE.Mesh(bottomBarGeometry, metalMaterial);
bottomBar.position.set(0.15, -0.8, 0.3);
bottomBar.castShadow = true;
logoGroup.add(bottomBar);

// Barra horizontal media
const middleBarGeometry = new THREE.BoxGeometry(1.1, 0.5, 0.5);
const middleBar = new THREE.Mesh(middleBarGeometry, metalMaterial);
middleBar.position.set(0.05, 0, 0.3);
middleBar.castShadow = true;
logoGroup.add(middleBar);

scene.add(logoGroup);

// Iluminación para efecto metálico
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
mainLight.position.set(5, 5, 5);
mainLight.castShadow = true;
mainLight.shadow.mapSize.width = 2048;
mainLight.shadow.mapSize.height = 2048;
scene.add(mainLight);

const fillLight = new THREE.DirectionalLight(0x6c42a3, 0.6);
fillLight.position.set(-5, 3, -5);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
rimLight.position.set(0, -5, -5);
scene.add(rimLight);

// Luces puntuales para reflejos metálicos
const pointLight1 = new THREE.PointLight(0xffffff, 0.5);
pointLight1.position.set(3, 3, 3);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x7952b3, 0.3);
pointLight2.position.set(-3, -3, 2);
scene.add(pointLight2);

// Variables para interactividad
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };

// Control del mouse
canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        
        targetRotation.y += deltaX * 0.01;
        targetRotation.x += deltaY * 0.01;
        
        previousMousePosition = { x: e.clientX, y: e.clientY };
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
    isDragging = false;
});

// Control táctil
canvas.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    previousMousePosition = { x: touch.clientX, y: touch.clientY };
});

canvas.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - previousMousePosition.x;
        const deltaY = touch.clientY - previousMousePosition.y;
        
        targetRotation.y += deltaX * 0.01;
        targetRotation.x += deltaY * 0.01;
        
        previousMousePosition = { x: touch.clientX, y: touch.clientY };
    }
});

canvas.addEventListener('touchend', () => {
    isDragging = false;
});

// Control de zoom con scroll
canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    camera.position.z += e.deltaY * 0.01;
    camera.position.z = Math.max(4, Math.min(15, camera.position.z));
});

// Animación
function animate() {
    requestAnimationFrame(animate);
    
    // Rotación suave automática cuando no se arrastra
    if (!isDragging) {
        targetRotation.y += 0.003;
    }
    
    // Interpolación suave de la rotación
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;
    
    logoGroup.rotation.x = currentRotation.x;
    logoGroup.rotation.y = currentRotation.y;
    
    renderer.render(scene, camera);
}

// Responsive
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// Iniciar animación
animate();
