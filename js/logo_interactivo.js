// ========================================
// LOGO 3D BOOTSTRAP OFICIAL - VERSIÓN MEJORADA Y OPTIMIZADA
// Three.js 0.180.0
// Autor: TorKaHD
// Descripción: Logo 3D interactivo de Bootstrap con efecto metálico
// Última actualización: 2025
// ========================================

// Importar la biblioteca Three.js desde CDN
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js';

// ========================================
// CONSTANTES DE CONFIGURACIÓN
// ========================================

/**
 * Configuración general del logo
 * Centraliza todos los valores configurables para fácil mantenimiento
 */
const CONFIG = {
    // Cámara
    camera: {
        fov: 35,                    // Campo de visión
        near: 0.1,                  // Plano cercano
        far: 1000,                  // Plano lejano
        initialZ: 12,               // Posición inicial en Z
        minZ: 4,                    // Zoom mínimo
        maxZ: 20                    // Zoom máximo
    },
    
    // Renderizador
    renderer: {
        maxPixelRatio: 2,           // Límite de pixel ratio para rendimiento
        shadowMapSize: 2048         // Resolución de sombras
    },
    
    // Geometría del fondo
    background: {
        size: 4,                    // Tamaño del cuadrado
        cornerRadius: 0.6,          // Radio de esquinas redondeadas
        depth: 0.65,                // Profundidad de extrusión
        bevelThickness: 0.15,       // Grosor del bisel
        bevelSize: 0.12,            // Tamaño del bisel
        bevelSegments: 12           // Segmentos del bisel
    },
    
    // Geometría de la letra B
    letterB: {
        scale: 0.16,                // Escala de la letra (ajustar para tamaño perfecto)
        offsetX: -4.8,              // Desplazamiento horizontal
        offsetY: 0,                 // Desplazamiento vertical
        positionZ: 0.82,            // Posición en Z (sobre el fondo)
        depth: 0.4,                 // Profundidad de extrusión
        bevelThickness: 0.1,        // Grosor del bisel
        bevelSize: 0.08,            // Tamaño del bisel
        bevelSegments: 10           // Segmentos del bisel
    },
    
    // Materiales
    materials: {
        purple: {
            color: 0x7952b3,        // Color morado de Bootstrap
            metalness: 0.88,        // Nivel metálico
            roughness: 0.18,        // Rugosidad (brillo)
            emissive: 0x3d2463,     // Color emisivo
            emissiveIntensity: 0.12 // Intensidad emisiva
        },
        white: {
            color: 0xffffff,        // Blanco puro
            metalness: 0.65,        // Nivel metálico
            roughness: 0.28,        // Rugosidad
            emissive: 0xe0e0e0,     // Color emisivo
            emissiveIntensity: 0.08 // Intensidad emisiva
        }
    },
    
    // Iluminación
    lights: {
        ambient: { color: 0xffffff, intensity: 0.55 },
        main: { color: 0xffffff, intensity: 1.6, position: [6, 6, 6] },
        fill: { color: 0xb794f4, intensity: 0.65, position: [-5, 3, 4] },
        back: { color: 0x8b5cf6, intensity: 0.75, position: [0, -4, -5] },
        rim1: { color: 0xffffff, intensity: 1.1, position: [5, 5, 4] },
        rim2: { color: 0xddd6fe, intensity: 0.7, position: [-4, -3, 4] },
        spot: { 
            color: 0xffffff, 
            intensity: 0.9, 
            position: [0, 10, 5],
            angle: Math.PI / 5,
            penumbra: 0.4,
            decay: 2
        }
    },
    
    // Animación e interactividad
    animation: {
        rotationSpeed: 0.005,       // Velocidad de rotación automática
        interpolationFactor: 0.075, // Factor de suavizado (lerp)
        dragSensitivity: 0.007,     // Sensibilidad del arrastre
        zoomSpeed: 0.01,            // Velocidad del zoom
        maxVerticalRotation: Math.PI / 4, // Límite rotación vertical
        initialRotation: { x: 0.08, y: 0.15 } // Rotación inicial
    }
};

// ========================================
// INICIALIZACIÓN
// ========================================

/**
 * Verificar el estado del DOM y ejecutar la inicialización
 * Garantiza que todos los elementos HTML estén disponibles
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogo);
} else {
    initLogo();
}

/**
 * Función principal de inicialización del logo 3D
 * Configura toda la escena, objetos 3D, iluminación e interactividad
 */
function initLogo() {
    // ========================================
    // VALIDACIÓN Y OBTENCIÓN DE ELEMENTOS DEL DOM
    // ========================================
    
    const container = document.getElementById('logo-3d-container');
    const canvas = document.getElementById('logo-3d-canvas');
    
    // Validación con logging mejorado
    if (!container || !canvas) {
        console.error('[Bootstrap 3D Logo] Error: Elementos del DOM no encontrados', {
            container: !!container,
            canvas: !!canvas
        });
        return;
    }

    // ========================================
    // OCULTAR EL HINT DE INSTRUCCIONES
    // ========================================
    
    /**
     * Buscar y ocultar el elemento logo-hint si existe
     * Esto elimina el texto de instrucciones sin afectar la funcionalidad
     */
    const logoHint = container.querySelector('.logo-hint');
    if (logoHint) {
        logoHint.style.display = 'none';
        console.log('[Bootstrap 3D Logo] Hint ocultado correctamente');
    }

    // ========================================
    // CONFIGURACIÓN DE LA ESCENA 3D
    // ========================================
    
    /**
     * Scene: Contenedor principal de todos los objetos 3D
     */
    const scene = new THREE.Scene();
    console.log('[Bootstrap 3D Logo] Escena creada');
    
    /**
     * PerspectiveCamera: Cámara con perspectiva realista
     * Simula cómo vemos el mundo con nuestros ojos
     */
    const camera = new THREE.PerspectiveCamera(
        CONFIG.camera.fov,
        container.clientWidth / container.clientHeight,
        CONFIG.camera.near,
        CONFIG.camera.far
    );
    camera.position.set(0, 0, CONFIG.camera.initialZ);
    console.log('[Bootstrap 3D Logo] Cámara configurada', {
        fov: CONFIG.camera.fov,
        position: camera.position
    });

    /**
     * WebGLRenderer: Motor de renderizado que dibuja la escena
     * Optimizado para rendimiento y calidad visual
     */
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,        // Suavizado de bordes
        alpha: true,            // Fondo transparente
        powerPreference: 'high-performance' // Priorizar rendimiento
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, CONFIG.renderer.maxPixelRatio));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    console.log('[Bootstrap 3D Logo] Renderizador configurado', {
        size: { width: container.clientWidth, height: container.clientHeight },
        pixelRatio: renderer.getPixelRatio()
    });

    // ========================================
    // DEFINICIÓN DE MATERIALES
    // ========================================
    
    /**
     * Material PBR (Physically Based Rendering) para el fondo morado
     * Simula propiedades físicas reales de materiales metálicos
     */
    const purpleMaterial = new THREE.MeshStandardMaterial(CONFIG.materials.purple);
    
    /**
     * Material PBR para la letra "B" blanca
     */
    const whiteMaterial = new THREE.MeshStandardMaterial(CONFIG.materials.white);
    
    console.log('[Bootstrap 3D Logo] Materiales creados');

    // ========================================
    // CREACIÓN DEL GRUPO PRINCIPAL DEL LOGO
    // ========================================
    
    /**
     * Group: Agrupa todos los elementos del logo
     * Permite transformar todo como una unidad única
     */
    const logoGroup = new THREE.Group();
    logoGroup.name = 'LogoGroup'; // Para debugging

    // ========================================
    // CONSTRUCCIÓN DEL FONDO MORADO
    // ========================================
    
    /**
     * Función auxiliar para crear el shape del fondo con esquinas redondeadas
     * Utiliza curvas cuadráticas para crear transiciones suaves
     * @returns {THREE.Shape} Shape 2D del fondo
     */
    function createBackgroundShape() {
        const shape = new THREE.Shape();
        const s = CONFIG.background.size;
        const r = CONFIG.background.cornerRadius;
        
        // Dibujar el contorno con esquinas redondeadas
        // Comenzando desde la esquina inferior izquierda y avanzando en sentido horario
        shape.moveTo(-s/2 + r, -s/2);
        shape.lineTo(s/2 - r, -s/2);
        shape.quadraticCurveTo(s/2, -s/2, s/2, -s/2 + r);
        shape.lineTo(s/2, s/2 - r);
        shape.quadraticCurveTo(s/2, s/2, s/2 - r, s/2);
        shape.lineTo(-s/2 + r, s/2);
        shape.quadraticCurveTo(-s/2, s/2, -s/2, s/2 - r);
        shape.lineTo(-s/2, -s/2 + r);
        shape.quadraticCurveTo(-s/2, -s/2, -s/2 + r, -s/2);
        
        return shape;
    }

    const bgShape = createBackgroundShape();
    
    /**
     * Configuración de extrusión para convertir 2D → 3D
     * El bisel crea bordes suaves y redondeados
     */
    const bgExtrudeSettings = {
        depth: CONFIG.background.depth,
        bevelEnabled: true,
        bevelThickness: CONFIG.background.bevelThickness,
        bevelSize: CONFIG.background.bevelSize,
        bevelSegments: CONFIG.background.bevelSegments
    };

    const backgroundGeometry = new THREE.ExtrudeGeometry(bgShape, bgExtrudeSettings);
    const backgroundMesh = new THREE.Mesh(backgroundGeometry, purpleMaterial);
    backgroundMesh.name = 'Background';
    backgroundMesh.castShadow = true;
    backgroundMesh.receiveShadow = true;
    
    logoGroup.add(backgroundMesh);
    console.log('[Bootstrap 3D Logo] Fondo morado creado');

    // ========================================
    // CONSTRUCCIÓN DE LA LETRA "B"
    // ========================================
    
    /**
     * Grupo separado para la letra "B"
     * Facilita el posicionamiento independiente del fondo
     */
    const bGroup = new THREE.Group();
    bGroup.name = 'LetterB';
    bGroup.position.z = CONFIG.letterB.positionZ;

    /**
     * Función auxiliar para crear el shape de la letra "B"
     * Basado en el diseño vectorial oficial de Bootstrap
     * Utiliza coordenadas precisas y curvas de Bézier
     * @returns {THREE.Shape} Shape 2D de la letra "B"
     */
    function createLetterBShape() {
        const shape = new THREE.Shape();
        const scale = CONFIG.letterB.scale;
        const offsetX = CONFIG.letterB.offsetX;
        const offsetY = CONFIG.letterB.offsetY;
        
        // Macro para escalar y desplazar coordenadas
        const transform = (x, y) => [(offsetX + x) * scale, (offsetY + y) * scale];
        
        // Contorno exterior de la "B"
        shape.moveTo(...transform(0, -8.5));
        shape.lineTo(...transform(0, 8.5));
        shape.lineTo(...transform(6, 8.5));
        
        // Curva superior derecha (parte superior de la B)
        shape.bezierCurveTo(
            ...transform(9, 8.5),
            ...transform(11, 7),
            ...transform(11, 4.5)
        );
        
        // Transición entre parte superior e inferior
        shape.bezierCurveTo(
            ...transform(11, 2.3),
            ...transform(9.8, 0.8),
            ...transform(7.5, 0.3)
        );
        
        // Transición al bulbo inferior
        shape.bezierCurveTo(
            ...transform(10, -0.2),
            ...transform(11.5, -2),
            ...transform(11.5, -4.5)
        );
        
        // Curva inferior derecha
        shape.bezierCurveTo(
            ...transform(11.5, -7.2),
            ...transform(9.2, -8.5),
            ...transform(6.2, -8.5)
        );
        
        shape.lineTo(...transform(0, -8.5));
        
        // Hueco superior (espacio circular superior interno)
        const topHole = new THREE.Path();
        topHole.moveTo(...transform(3, 6));
        topHole.lineTo(...transform(5.5, 6));
        topHole.bezierCurveTo(
            ...transform(7.2, 6),
            ...transform(8.2, 5.2),
            ...transform(8.2, 3.8)
        );
        topHole.bezierCurveTo(
            ...transform(8.2, 2.4),
            ...transform(7.2, 1.6),
            ...transform(5.5, 1.6)
        );
        topHole.lineTo(...transform(3, 1.6));
        topHole.lineTo(...transform(3, 6));
        shape.holes.push(topHole);
        
        // Hueco inferior (espacio circular inferior interno)
        const bottomHole = new THREE.Path();
        bottomHole.moveTo(...transform(3, -1.3));
        bottomHole.lineTo(...transform(5.8, -1.3));
        bottomHole.bezierCurveTo(
            ...transform(7.6, -1.3),
            ...transform(8.7, -2.5),
            ...transform(8.7, -4.3)
        );
        bottomHole.bezierCurveTo(
            ...transform(8.7, -6),
            ...transform(7.5, -6.2),
            ...transform(5.8, -6.2)
        );
        bottomHole.lineTo(...transform(3, -6.2));
        bottomHole.lineTo(...transform(3, -1.3));
        shape.holes.push(bottomHole);
        
        return shape;
    }

    const bShape = createLetterBShape();
    
    /**
     * Configuración de extrusión para la letra "B"
     */
    const bExtrudeSettings = {
        depth: CONFIG.letterB.depth,
        bevelEnabled: true,
        bevelThickness: CONFIG.letterB.bevelThickness,
        bevelSize: CONFIG.letterB.bevelSize,
        bevelSegments: CONFIG.letterB.bevelSegments
    };

    const bGeometry = new THREE.ExtrudeGeometry(bShape, bExtrudeSettings);
    const bMesh = new THREE.Mesh(bGeometry, whiteMaterial);
    bMesh.name = 'LetterBMesh';
    bMesh.castShadow = true;
    
    bGroup.add(bMesh);
    logoGroup.add(bGroup);
    scene.add(logoGroup);
    
    console.log('[Bootstrap 3D Logo] Letra "B" creada y agregada a la escena');

    // ========================================
    // SISTEMA DE ILUMINACIÓN AVANZADO
    // ========================================
    
    /**
     * Función auxiliar para crear y configurar luces
     * Centraliza la lógica de creación de luces
     */
    function setupLighting() {
        // Luz ambiental: Iluminación base uniforme
        const ambientLight = new THREE.AmbientLight(
            CONFIG.lights.ambient.color,
            CONFIG.lights.ambient.intensity
        );
        ambientLight.name = 'AmbientLight';
        scene.add(ambientLight);
        
        // Luz direccional principal: Simula el sol
        const mainLight = new THREE.DirectionalLight(
            CONFIG.lights.main.color,
            CONFIG.lights.main.intensity
        );
        mainLight.name = 'MainLight';
        mainLight.position.set(...CONFIG.lights.main.position);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = CONFIG.renderer.shadowMapSize;
        mainLight.shadow.mapSize.height = CONFIG.renderer.shadowMapSize;
        mainLight.shadow.camera.near = 0.5;
        mainLight.shadow.camera.far = 50;
        scene.add(mainLight);
        
        // Fill Light: Luz de relleno con tinte morado
        const fillLight = new THREE.DirectionalLight(
            CONFIG.lights.fill.color,
            CONFIG.lights.fill.intensity
        );
        fillLight.name = 'FillLight';
        fillLight.position.set(...CONFIG.lights.fill.position);
        scene.add(fillLight);
        
        // Back Light: Luz trasera para profundidad
        const backLight = new THREE.DirectionalLight(
            CONFIG.lights.back.color,
            CONFIG.lights.back.intensity
        );
        backLight.name = 'BackLight';
        backLight.position.set(...CONFIG.lights.back.position);
        scene.add(backLight);
        
        // Rim Lights: Luces puntuales para brillos metálicos
        const rimLight1 = new THREE.PointLight(
            CONFIG.lights.rim1.color,
            CONFIG.lights.rim1.intensity
        );
        rimLight1.name = 'RimLight1';
        rimLight1.position.set(...CONFIG.lights.rim1.position);
        scene.add(rimLight1);
        
        const rimLight2 = new THREE.PointLight(
            CONFIG.lights.rim2.color,
            CONFIG.lights.rim2.intensity
        );
        rimLight2.name = 'RimLight2';
        rimLight2.position.set(...CONFIG.lights.rim2.position);
        scene.add(rimLight2);
        
        // Spot Light: Luz focal desde arriba
        const spotLight = new THREE.SpotLight(
            CONFIG.lights.spot.color,
            CONFIG.lights.spot.intensity
        );
        spotLight.name = 'SpotLight';
        spotLight.position.set(...CONFIG.lights.spot.position);
        spotLight.angle = CONFIG.lights.spot.angle;
        spotLight.penumbra = CONFIG.lights.spot.penumbra;
        spotLight.decay = CONFIG.lights.spot.decay;
        scene.add(spotLight);
        
        console.log('[Bootstrap 3D Logo] Sistema de iluminación configurado (7 luces)');
    }
    
    setupLighting();

    // ========================================
    // SISTEMA DE INTERACTIVIDAD
    // ========================================
    
    /**
     * Estado de la interacción del usuario
     */
    const interactionState = {
        isDragging: false,
        previousMouse: { x: 0, y: 0 },
        rotation: { ...CONFIG.animation.initialRotation },
        targetRotation: { ...CONFIG.animation.initialRotation }
    };

    /**
     * Manejador de inicio de arrastre
     * Compatible con mouse y touch
     * @param {MouseEvent|TouchEvent} e - Evento de entrada
     */
    function onPointerDown(e) {
        interactionState.isDragging = true;
        const coords = e.touches ? e.touches[0] : e;
        interactionState.previousMouse = { 
            x: coords.clientX, 
            y: coords.clientY 
        };
        
        // Cambiar cursor para feedback visual
        canvas.style.cursor = 'grabbing';
    }

    /**
     * Manejador de movimiento durante el arrastre
     * Calcula el delta y actualiza la rotación objetivo
     * @param {MouseEvent|TouchEvent} e - Evento de entrada
     */
    function onPointerMove(e) {
        if (!interactionState.isDragging) {
            // Cambiar cursor en hover para indicar interactividad
            canvas.style.cursor = 'grab';
            return;
        }
        
        const coords = e.touches ? e.touches[0] : e;
        const deltaX = coords.clientX - interactionState.previousMouse.x;
        const deltaY = coords.clientY - interactionState.previousMouse.y;
        
        // Actualizar rotación objetivo con sensibilidad configurable
        interactionState.targetRotation.y += deltaX * CONFIG.animation.dragSensitivity;
        interactionState.targetRotation.x += deltaY * CONFIG.animation.dragSensitivity;
        
        // Limitar rotación vertical para evitar dar vueltas completas
        interactionState.targetRotation.x = Math.max(
            -CONFIG.animation.maxVerticalRotation,
            Math.min(CONFIG.animation.maxVerticalRotation, interactionState.targetRotation.x)
        );
        
        interactionState.previousMouse = { 
            x: coords.clientX, 
            y: coords.clientY 
        };
    }

    /**
     * Manejador de fin de arrastre
     */
    function onPointerUp() {
        interactionState.isDragging = false;
        canvas.style.cursor = 'grab';
    }

    /**
     * Manejador de la rueda del mouse (zoom)
     * Permite acercar/alejar la cámara
     * @param {WheelEvent} e - Evento de rueda del mouse
     */
    function onWheel(e) {
        e.preventDefault();
        
        // Ajustar posición Z de la cámara
        camera.position.z += e.deltaY * CONFIG.animation.zoomSpeed;
        
        // Limitar zoom a valores configurados
        camera.position.z = Math.max(
            CONFIG.camera.minZ,
            Math.min(CONFIG.camera.maxZ, camera.position.z)
        );
    }

    // ========================================
    // REGISTRO DE EVENTOS DE INTERACTIVIDAD
    // ========================================
    
    /**
     * NOTA: Para desactivar la interactividad del usuario,
     * comenta todas las líneas addEventListener a continuación.
     * El logo solo rotará automáticamente.
     */
    
    // Eventos del mouse
    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('mouseleave', onPointerUp);
    
    // Eventos táctiles (móviles y tablets)
    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    canvas.addEventListener('touchmove', onPointerMove, { passive: true });
    canvas.addEventListener('touchend', onPointerUp);
    
    // Evento de zoom con rueda del mouse
    canvas.addEventListener('wheel', onWheel, { passive: false });
    
    // Cursor inicial
    canvas.style.cursor = 'grab';
    
    console.log('[Bootstrap 3D Logo] Eventos de interactividad registrados');

    // ========================================
    // BUCLE DE ANIMACIÓN
    // ========================================
    
    /**
     * Función de animación que se ejecuta en cada frame (~60 FPS)
     * Implementa rotación automática e interpolación suave
     */
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotación automática cuando no hay interacción del usuario
        if (!interactionState.isDragging) {
            interactionState.targetRotation.y += CONFIG.animation.rotationSpeed;
        }
        
        // Interpolación lineal (lerp) para movimiento suave
        // Formula: current += (target - current) * factor
        interactionState.rotation.x += (
            interactionState.targetRotation.x - interactionState.rotation.x
        ) * CONFIG.animation.interpolationFactor;
        
        interactionState.rotation.y += (
            interactionState.targetRotation.y - interactionState.rotation.y
        ) * CONFIG.animation.interpolationFactor;
        
        // Aplicar rotación al grupo del logo
        logoGroup.rotation.x = interactionState.rotation.x;
        logoGroup.rotation.y = interactionState.rotation.y;
        
        // Renderizar escena
        renderer.render(scene, camera);
    }

    // ========================================
    // RESPONSIVIDAD (RESIZE HANDLER)
    // ========================================
    
    /**
     * Manejador de redimensionamiento de ventana
     * Ajusta canvas y cámara para mantener proporciones correctas
     */
    let resizeTimeout;
    function onWindowResize() {
        // Debounce para optimizar rendimiento
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            // Actualizar aspect ratio de la cámara
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            
            // Redimensionar renderizador
            renderer.setSize(width, height);
            
            console.log('[Bootstrap 3D Logo] Redimensionado', { width, height });
        }, 100);
    }
    
    window.addEventListener('resize', onWindowResize);
    
    console.log('[Bootstrap 3D Logo] Handler de resize registrado');

    // ========================================
    // INICIAR ANIMACIÓN
    // ========================================
    
    animate();
    console.log('[Bootstrap 3D Logo] Inicialización completada exitosamente ✓');
    
    // ========================================
    // API PÚBLICA (OPCIONAL)
    // ========================================
    
    /**
     * Exponer controles para debugging o control externo
     * Accesible desde la consola del navegador
     */
    window.BootstrapLogo3D = {
        version: '2.0.0',
        scene: scene,
        camera: camera,
        renderer: renderer,
        logoGroup: logoGroup,
        config: CONFIG,
        
        // Métodos de control
        setRotationSpeed: (speed) => {
            CONFIG.animation.rotationSpeed = speed;
            console.log('[Bootstrap 3D Logo] Velocidad de rotación actualizada:', speed);
        },
        
        resetRotation: () => {
            interactionState.rotation = { ...CONFIG.animation.initialRotation };
            interactionState.targetRotation = { ...CONFIG.animation.initialRotation };
            console.log('[Bootstrap 3D Logo] Rotación reiniciada');
        },
        
        setScale: (scale) => {
            logoGroup.scale.set(scale, scale, scale);
            console.log('[Bootstrap 3D Logo] Escala actualizada:', scale);
        },
        
        toggleAutoRotation: () => {
            if (CONFIG.animation.rotationSpeed === 0) {
                CONFIG.animation.rotationSpeed = 0.005;
            } else {
                CONFIG.animation.rotationSpeed = 0;
            }
            console.log('[Bootstrap 3D Logo] Auto-rotación:', 
                CONFIG.animation.rotationSpeed > 0 ? 'activada' : 'desactivada');
        }
    };
    
    console.log('[Bootstrap 3D Logo] API pública disponible en window.BootstrapLogo3D');
}

// ========================================
// FIN DEL CÓDIGO
// ========================================

/**
 * ================================================================================
 * DOCUMENTACIÓN COMPLETA Y GUÍA DE USO
 * ================================================================================
 * 
 * CARACTERÍSTICAS PRINCIPALES:
 * ---------------------------
 * ✓ Logo 3D interactivo de Bootstrap con efecto metálico realista
 * ✓ Rotación automática suave y continua
 * ✓ Control manual mediante mouse/touch (arrastrar para rotar)
 * ✓ Zoom con rueda del mouse
 * ✓ Sistema de iluminación profesional (7 luces)
 * ✓ Materiales PBR (Physically Based Rendering)
 * ✓ Sombras en tiempo real
 * ✓ Totalmente responsive
 * ✓ Optimizado para rendimiento (60 FPS)
 * ✓ Código modular y mantenible
 * ✓ API pública para control externo
 * 
 * CONTROLES DEL USUARIO:
 * ---------------------
 * • Arrastrar con mouse/dedo: Rotar el logo manualmente
 * • Rueda del mouse: Zoom in/out
 * • La rotación automática se pausa al interactuar
 * 
 * CONFIGURACIÓN:
 * -------------
 * Todas las constantes están centralizadas en el objeto CONFIG al inicio.
 * Para personalizar el logo, modifica los valores en CONFIG:
 * 
 * - CONFIG.letterB.scale: Tamaño de la letra B (0.16 es óptimo)
 * - CONFIG.animation.rotationSpeed: Velocidad de rotación automática
 * - CONFIG.materials: Colores y propiedades metálicas
 * - CONFIG.lights: Configuración de iluminación
 * 
 * API PÚBLICA (Desde la consola del navegador):
 * ---------------------------------------------
 * window.BootstrapLogo3D.setRotationSpeed(0.01)    // Cambiar velocidad
 * window.BootstrapLogo3
 *    - Velocidad de rotación: Cambiar el valor 0.0018 en la animación
 *    - Suavidad: Modificar el factor 0.075 en la interpolación
 */

