// ========================================
// LOGO 3D BOOTSTRAP OFICIAL - VERSIÓN FINAL
// Three.js 0.180.0
// ========================================

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogo);
} else {
    initLogo();
}

function initLogo() {
    const container = document.getElementById('logo-3d-container');
    const canvas = document.getElementById('logo-3d-canvas');
    
    if (!container || !canvas) {
        console.error('Contenedor o canvas no encontrado');
        return;
    }

    // === CONFIGURACIÓN DE LA ESCENA ===
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
        35,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // === MATERIALES ===
    const purpleMaterial = new THREE.MeshStandardMaterial({
        color: 0x7952b3,
        metalness: 0.88,
        roughness: 0.18,
        emissive: 0x3d2463,
        emissiveIntensity: 0.12
    });

    const whiteMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.65,
        roughness: 0.28,
        emissive: 0xe0e0e0,
        emissiveIntensity: 0.08
    });

    // === CREAR LOGO ===
    const logoGroup = new THREE.Group();

    // === FONDO MORADO CON ESQUINAS REDONDEADAS ===
    const bgSize = 4;
    const bgRadius = 0.6;
    const bgShape = new THREE.Shape();

    bgShape.moveTo(-bgSize/2 + bgRadius, -bgSize/2);
    bgShape.lineTo(bgSize/2 - bgRadius, -bgSize/2);
    bgShape.quadraticCurveTo(bgSize/2, -bgSize/2, bgSize/2, -bgSize/2 + bgRadius);
    bgShape.lineTo(bgSize/2, bgSize/2 - bgRadius);
    bgShape.quadraticCurveTo(bgSize/2, bgSize/2, bgSize/2 - bgRadius, bgSize/2);
    bgShape.lineTo(-bgSize/2 + bgRadius, bgSize/2);
    bgShape.quadraticCurveTo(-bgSize/2, bgSize/2, -bgSize/2, bgSize/2 - bgRadius);
    bgShape.lineTo(-bgSize/2, -bgSize/2 + bgRadius);
    bgShape.quadraticCurveTo(-bgSize/2, -bgSize/2, -bgSize/2 + bgRadius, -bgSize/2);

    const extrudeSettings = {
        depth: 0.65,
        bevelEnabled: true,
        bevelThickness: 0.15,
        bevelSize: 0.12,
        bevelSegments: 12
    };

    const backgroundGeometry = new THREE.ExtrudeGeometry(bgShape, extrudeSettings);
    const backgroundMesh = new THREE.Mesh(backgroundGeometry, purpleMaterial);
    backgroundMesh.castShadow = true;
    backgroundMesh.receiveShadow = true;
    logoGroup.add(backgroundMesh);

    // === LETRA "B" BLANCA - DISEÑO OFICIAL BOOTSTRAP ===
    const bGroup = new THREE.Group();
    bGroup.position.z = 0.82;

    // Crear la forma exacta de la "B" del logo oficial
    const bShape = new THREE.Shape();
    
    // Ajustar escala y posición para centrar perfectamente
    const scale = 0.16;
    const offsetX = -4.8;
    const offsetY = 0;
    
    // Contorno exterior de la B (siguiendo el diseño vectorial oficial de Bootstrap)
    bShape.moveTo((offsetX + 0) * scale, (offsetY - 8.5) * scale);
    bShape.lineTo((offsetX + 0) * scale, (offsetY + 8.5) * scale);
    bShape.lineTo((offsetX + 6) * scale, (offsetY + 8.5) * scale);
    bShape.bezierCurveTo(
        (offsetX + 9) * scale, (offsetY + 8.5) * scale,
        (offsetX + 11) * scale, (offsetY + 7) * scale,
        (offsetX + 11) * scale, (offsetY + 4.5) * scale
    );
    bShape.bezierCurveTo(
        (offsetX + 11) * scale, (offsetY + 2.3) * scale,
        (offsetX + 9.8) * scale, (offsetY + 0.8) * scale,
        (offsetX + 7.5) * scale, (offsetY + 0.3) * scale
    );
    bShape.bezierCurveTo(
        (offsetX + 10) * scale, (offsetY - 0.2) * scale,
        (offsetX + 11.5) * scale, (offsetY - 2) * scale,
        (offsetX + 11.5) * scale, (offsetY - 4.5) * scale
    );
    bShape.bezierCurveTo(
        (offsetX + 11.5) * scale, (offsetY - 7.2) * scale,
        (offsetX + 9.2) * scale, (offsetY - 8.5) * scale,
        (offsetX + 6.2) * scale, (offsetY - 8.5) * scale
    );
    bShape.lineTo((offsetX + 0) * scale, (offsetY - 8.5) * scale);

    // Hueco superior de la B
    const topHole = new THREE.Path();
    topHole.moveTo((offsetX + 3) * scale, (offsetY + 6) * scale);
    topHole.lineTo((offsetX + 5.5) * scale, (offsetY + 6) * scale);
    topHole.bezierCurveTo(
        (offsetX + 7.2) * scale, (offsetY + 6) * scale,
        (offsetX + 8.2) * scale, (offsetY + 5.2) * scale,
        (offsetX + 8.2) * scale, (offsetY + 3.8) * scale
    );
    topHole.bezierCurveTo(
        (offsetX + 8.2) * scale, (offsetY + 2.4) * scale,
        (offsetX + 7.2) * scale, (offsetY + 1.6) * scale,
        (offsetX + 5.5) * scale, (offsetY + 1.6) * scale
    );
    topHole.lineTo((offsetX + 3) * scale, (offsetY + 1.6) * scale);
    topHole.lineTo((offsetX + 3) * scale, (offsetY + 6) * scale);
    bShape.holes.push(topHole);

    // Hueco inferior de la B
    const bottomHole = new THREE.Path();
    bottomHole.moveTo((offsetX + 3) * scale, (offsetY - 1.3) * scale);
    bottomHole.lineTo((offsetX + 5.8) * scale, (offsetY - 1.3) * scale);
    bottomHole.bezierCurveTo(
        (offsetX + 7.6) * scale, (offsetY - 1.3) * scale,
        (offsetX + 8.7) * scale, (offsetY - 2.5) * scale,
        (offsetX + 8.7) * scale, (offsetY - 4.3) * scale
    );
    bottomHole.bezierCurveTo(
        (offsetX + 8.7) * scale, (offsetY - 6) * scale,
        (offsetX + 7.5) * scale, (offsetY - 6.2) * scale,
        (offsetX + 5.8) * scale, (offsetY - 6.2) * scale
    );
    bottomHole.lineTo((offsetX + 3) * scale, (offsetY - 6.2) * scale);
    bottomHole.lineTo((offsetX + 3) * scale, (offsetY - 1.3) * scale);
    bShape.holes.push(bottomHole);

    const bExtrudeSettings = {
        depth: 0.4,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.08,
        bevelSegments: 10
    };

    const bGeometry = new THREE.ExtrudeGeometry(bShape, bExtrudeSettings);
    const bMesh = new THREE.Mesh(bGeometry, whiteMaterial);
    bMesh.castShadow = true;
    bGroup.add(bMesh);

    logoGroup.add(bGroup);
    scene.add(logoGroup);

    // === ILUMINACIÓN PROFESIONAL ===
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.6);
    mainLight.position.set(6, 6, 6);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xb794f4, 0.65);
    fillLight.position.set(-5, 3, 4);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0x8b5cf6, 0.75);
    backLight.position.set(0, -4, -5);
    scene.add(backLight);

    const rimLight1 = new THREE.PointLight(0xffffff, 1.1);
    rimLight1.position.set(5, 5, 4);
    scene.add(rimLight1);

    const rimLight2 = new THREE.PointLight(0xddd6fe, 0.7);
    rimLight2.position.set(-4, -3, 4);
    scene.add(rimLight2);

    const spotLight = new THREE.SpotLight(0xffffff, 0.9);
    spotLight.position.set(0, 10, 5);
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.4;
    spotLight.decay = 2;
    scene.add(spotLight);

    // === INTERACTIVIDAD ===
    let isDragging = false;
    let previousMouse = { x: 0, y: 0 };
    let rotation = { x: 0.08, y: 0.15 };
    let targetRotation = { x: 0.08, y: 0.15 };

    function onPointerDown(e) {
        isDragging = true;
        const coords = e.touches ? e.touches[0] : e;
        previousMouse = { x: coords.clientX, y: coords.clientY };
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        
        const coords = e.touches ? e.touches[0] : e;
        const deltaX = coords.clientX - previousMouse.x;
        const deltaY = coords.clientY - previousMouse.y;
        
        targetRotation.y += deltaX * 0.007;
        targetRotation.x += deltaY * 0.007;
        targetRotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotation.x));
        
        previousMouse = { x: coords.clientX, y: coords.clientY };
    }

    function onPointerUp() {
        isDragging = false;
    }

    function onWheel(e) {
        e.preventDefault();
        camera.position.z += e.deltaY * 0.01;
        camera.position.z = Math.max(6, Math.min(20, camera.position.z));
    }

    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('mouseleave', onPointerUp);
    
    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    canvas.addEventListener('touchmove', onPointerMove, { passive: true });
    canvas.addEventListener('touchend', onPointerUp);
    
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // === ANIMACIÓN ===
    function animate() {
        requestAnimationFrame(animate);
        
        if (!isDragging) {
            targetRotation.y += 0.0018;
        }
        
        rotation.x += (targetRotation.x - rotation.x) * 0.075;
        rotation.y += (targetRotation.y - rotation.y) * 0.075;
        
        logoGroup.rotation.x = rotation.x;
        logoGroup.rotation.y = rotation.y;
        
        renderer.render(scene, camera);
    }

    // === RESPONSIVE ===
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    animate();
}
