// ========================================
// LOGO 3D BOOTSTRAP OFICIAL - VERSIÓN FINAL
// Three.js 0.180.0
// Autor: TorKaHD
// Descripción: Logo 3D interactivo de Bootstrap con efecto metálico
// ========================================

// Importar la biblioteca Three.js desde CDN
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

// ========================================
// INICIALIZACIÓN
// ========================================

/**
 * Verificar el estado del DOM y ejecutar la inicialización
 * Se asegura de que todos los elementos HTML estén cargados antes de iniciar
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogo);
} else {
    initLogo();
}

/**
 * Función principal de inicialización del logo 3D
 * Configura la escena, cámara, renderizador, materiales, geometrías, 
 * iluminación e interactividad
 */
function initLogo() {
    // ========================================
    // OBTENER ELEMENTOS DEL DOM
    // ========================================
    
    // Contenedor principal del logo
    const container = document.getElementById('logo-3d-container');
    // Canvas donde se renderizará el 3D
    const canvas = document.getElementById('logo-3d-canvas');
    
    // Validar que los elementos existen en el DOM
    if (!container || !canvas) {
        console.error('Contenedor o canvas no encontrado');
        return;
    }

    // ========================================
    // OCULTAR EL HINT DE INSTRUCCIONES
    // ========================================
    
    /**
     * Buscar y ocultar el elemento logo-hint si existe
     * Esto elimina el texto de "Arrastra para rotar • Scroll para zoom"
     */
    const logoHint = container.querySelector('.logo-hint');
    if (logoHint) {
        logoHint.style.display = 'none';
    }

    // ========================================
    // CONFIGURACIÓN DE LA ESCENA 3D
    // ========================================
    
    /**
     * Scene: Contenedor principal donde se colocan todos los objetos 3D
     */
    const scene = new THREE.Scene();
    
    /**
     * PerspectiveCamera: Define la vista en perspectiva de la escena
     * Parámetros:
     * - FOV (35): Campo de visión en grados
     * - Aspect ratio: Proporción ancho/alto del canvas
     * - Near plane (0.1): Distancia mínima de renderizado
     * - Far plane (1000): Distancia máxima de renderizado
     */
    const camera = new THREE.PerspectiveCamera(
        35,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    // Posicionar la cámara en el eje Z (alejada del logo)
    camera.position.set(0, 0, 12);

    /**
     * WebGLRenderer: Motor de renderizado que dibuja la escena
     * Configuración:
     * - canvas: Elemento HTML donde se dibuja
     * - antialias: Suaviza los bordes (mejor calidad visual)
     * - alpha: Permite fondo transparente
     */
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    // Ajustar tamaño del renderizador al contenedor
    renderer.setSize(container.clientWidth, container.clientHeight);
    // Ajustar la densidad de píxeles para pantallas de alta resolución
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Habilitar sombras en la escena
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Sombras suaves

    // ========================================
    // DEFINICIÓN DE MATERIALES
    // ========================================
    
    /**
     * Material morado metálico para el fondo del logo
     * MeshStandardMaterial: Material físicamente realista
     * - color: Color morado oficial de Bootstrap (#7952b3)
     * - metalness: Qué tan metálico es (0-1)
     * - roughness: Qué tan rugoso/brillante es (0-1)
     * - emissive: Color que emite luz propia
     * - emissiveIntensity: Intensidad de la luz emitida
     */
    const purpleMaterial = new THREE.MeshStandardMaterial({
        color: 0x7952b3,      // Morado oficial de Bootstrap
        metalness: 0.88,       // Muy metálico
        roughness: 0.18,       // Muy brillante
        emissive: 0x3d2463,    // Emisión morada oscura
        emissiveIntensity: 0.12 // Brillo sutil
    });

    /**
     * Material blanco metálico para la letra "B"
     * Configurado para ser ligeramente menos metálico que el fondo
     */
    const whiteMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,       // Blanco puro
        metalness: 0.65,       // Metálico medio
        roughness: 0.28,       // Brillo medio
        emissive: 0xe0e0e0,    // Emisión gris clara
        emissiveIntensity: 0.08 // Brillo muy sutil
    });

    // ========================================
    // CREACIÓN DEL GRUPO PRINCIPAL DEL LOGO
    // ========================================
    
    /**
     * Group: Contenedor que agrupa todos los objetos del logo
     * Permite rotar y transformar todo el logo como una unidad
     */
    const logoGroup = new THREE.Group();

    // ========================================
    // CREACIÓN DEL FONDO MORADO CON ESQUINAS REDONDEADAS
    // ========================================
    
    /**
     * Parámetros del cuadrado con esquinas redondeadas
     */
    const bgSize = 4;          // Tamaño del cuadrado
    const bgRadius = 0.6;      // Radio de las esquinas redondeadas
    
    /**
     * Shape: Define una forma 2D que luego se puede extruir a 3D
     * Dibujamos un cuadrado con esquinas redondeadas usando:
     * - moveTo: Mueve el "lápiz" sin dibujar
     * - lineTo: Dibuja una línea recta
     * - quadraticCurveTo: Dibuja una curva cuadrática (para esquinas)
     */
    const bgShape = new THREE.Shape();

    // Comenzar en la esquina inferior izquierda (ajustada por el radio)
    bgShape.moveTo(-bgSize/2 + bgRadius, -bgSize/2);
    // Lado inferior
    bgShape.lineTo(bgSize/2 - bgRadius, -bgSize/2);
    // Esquina inferior derecha (curva)
    bgShape.quadraticCurveTo(bgSize/2, -bgSize/2, bgSize/2, -bgSize/2 + bgRadius);
    // Lado derecho
    bgShape.lineTo(bgSize/2, bgSize/2 - bgRadius);
    // Esquina superior derecha (curva)
    bgShape.quadraticCurveTo(bgSize/2, bgSize/2, bgSize/2 - bgRadius, bgSize/2);
    // Lado superior
    bgShape.lineTo(-bgSize/2 + bgRadius, bgSize/2);
    // Esquina superior izquierda (curva)
    bgShape.quadraticCurveTo(-bgSize/2, bgSize/2, -bgSize/2, bgSize/2 - bgRadius);
    // Lado izquierdo
    bgShape.lineTo(-bgSize/2, -bgSize/2 + bgRadius);
    // Esquina inferior izquierda (curva)
    bgShape.quadraticCurveTo(-bgSize/2, -bgSize/2, -bgSize/2 + bgRadius, -bgSize/2);

    /**
     * ExtrudeSettings: Configuración para convertir la forma 2D en 3D
     * - depth: Profundidad de la extrusión
     * - bevelEnabled: Activar bordes biselados (redondeados)
     * - bevelThickness: Grosor del bisel
     * - bevelSize: Tamaño del bisel
     * - bevelSegments: Suavidad del bisel (más segmentos = más suave)
     */
    const extrudeSettings = {
        depth: 0.65,
        bevelEnabled: true,
        bevelThickness: 0.15,
        bevelSize: 0.12,
        bevelSegments: 12
    };

    /**
     * ExtrudeGeometry: Crea geometría 3D a partir de la forma 2D
     */
    const backgroundGeometry = new THREE.ExtrudeGeometry(bgShape, extrudeSettings);
    
    /**
     * Mesh: Combina geometría + material para crear un objeto visible
     */
    const backgroundMesh = new THREE.Mesh(backgroundGeometry, purpleMaterial);
    backgroundMesh.castShadow = true;    // El objeto proyecta sombras
    backgroundMesh.receiveShadow = true; // El objeto recibe sombras
    
    // Agregar el fondo al grupo principal
    logoGroup.add(backgroundMesh);

    // ========================================
    // CREACIÓN DE LA LETRA "B" BLANCA
    // ========================================
    
    /**
     * Grupo separado para la letra "B"
     * Permite posicionarla independientemente del fondo
     */
    const bGroup = new THREE.Group();
    // Desplazar la "B" hacia adelante en el eje Z (sobre el fondo)
    bGroup.position.z = 0.82;

    /**
     * Shape para la letra "B"
     * Se dibuja usando coordenadas del diseño vectorial oficial de Bootstrap
     */
    const bShape = new THREE.Shape();
    
    /**
     * Parámetros de transformación para la "B"
     * - scale: Factor de escala (0.16 para tamaño perfecto)
     * - offsetX: Desplazamiento horizontal para centrado
     * - offsetY: Desplazamiento vertical
     */
    const scale = 0.19;        // NOTA: Ajustar a 0.16 para tamaño perfecto
    const offsetX = -4.8;
    const offsetY = 0;
    
    /**
     * Dibujar el contorno exterior de la "B"
     * Usando coordenadas del diseño oficial de Bootstrap
     * bezierCurveTo: Curva de Bézier cúbica (permite curvas suaves complejas)
     */
    
    // Comenzar en la esquina inferior izquierda de la "B"
    bShape.moveTo((offsetX + 0) * scale, (offsetY - 8.5) * scale);
    // Lado izquierdo (barra vertical)
    bShape.lineTo((offsetX + 0) * scale, (offsetY + 8.5) * scale);
    // Parte superior
    bShape.lineTo((offsetX + 6) * scale, (offsetY + 8.5) * scale);
    // Curva superior derecha de la "B"
    bShape.bezierCurveTo(
        (offsetX + 9) * scale, (offsetY + 8.5) * scale,
        (offsetX + 11) * scale, (offsetY + 7) * scale,
        (offsetX + 11) * scale, (offsetY + 4.5) * scale
    );
    // Curva interior superior
    bShape.bezierCurveTo(
        (offsetX + 11) * scale, (offsetY + 2.3) * scale,
        (offsetX + 9.8) * scale, (offsetY + 0.8) * scale,
        (offsetX + 7.5) * scale, (offsetY + 0.3) * scale
    );
    // Transición al bulbo inferior
    bShape.bezierCurveTo(
        (offsetX + 10) * scale, (offsetY - 0.2) * scale,
        (offsetX + 11.5) * scale, (offsetY - 2) * scale,
        (offsetX + 11.5) * scale, (offsetY - 4.5) * scale
    );
    // Curva inferior derecha
    bShape.bezierCurveTo(
        (offsetX + 11.5) * scale, (offsetY - 7.2) * scale,
        (offsetX + 9.2) * scale, (offsetY - 8.5) * scale,
        (offsetX + 6.2) * scale, (offsetY - 8.5) * scale
    );
    // Cerrar en la base
    bShape.lineTo((offsetX + 0) * scale, (offsetY - 8.5) * scale);

    /**
     * HUECO SUPERIOR DE LA "B"
     * Path: Define un "agujero" en la forma principal
     * Se dibuja en sentido contrario para crear el hueco
     */
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
    // Agregar el hueco a la forma principal
    bShape.holes.push(topHole);

    /**
     * HUECO INFERIOR DE LA "B"
     * Similar al hueco superior pero en la parte inferior
     */
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
    // Agregar el hueco a la forma principal
    bShape.holes.push(bottomHole);

    /**
     * Configuración de extrusión para la "B"
     * Similar al fondo pero con menor profundidad
     */
    const bExtrudeSettings = {
        depth: 0.4,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.08,
        bevelSegments: 10
    };

    /**
     * Crear la geometría y mesh de la "B"
     */
    const bGeometry = new THREE.ExtrudeGeometry(bShape, bExtrudeSettings);
    const bMesh = new THREE.Mesh(bGeometry, whiteMaterial);
    bMesh.castShadow = true; // La "B" proyecta sombras
    
    // Agregar la "B" a su grupo
    bGroup.add(bMesh);
    // Agregar el grupo de la "B" al grupo principal del logo
    logoGroup.add(bGroup);
    // Agregar todo el logo a la escena
    scene.add(logoGroup);

    // ========================================
    // SISTEMA DE ILUMINACIÓN
    // ========================================
    
    /**
     * AmbientLight: Luz ambiental que ilumina toda la escena uniformemente
     * Parámetros:
     * - color: Color de la luz (blanco)
     * - intensity: Intensidad de la luz (0-infinito)
     */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    /**
     * DirectionalLight principal: Simula la luz del sol
     * Ilumina desde una dirección específica
     */
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.6);
    mainLight.position.set(6, 6, 6); // Posición superior derecha frontal
    mainLight.castShadow = true;     // Esta luz proyecta sombras
    // Configuración de sombras
    mainLight.shadow.mapSize.width = 2048;  // Resolución de sombras
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    scene.add(mainLight);

    /**
     * Fill Light: Luz de relleno con tinte morado
     * Suaviza las sombras y añade color morado sutil
     */
    const fillLight = new THREE.DirectionalLight(0xb794f4, 0.65);
    fillLight.position.set(-5, 3, 4); // Lateral izquierda
    scene.add(fillLight);

    /**
     * Back Light: Luz trasera
     * Ilumina desde atrás para crear profundidad
     */
    const backLight = new THREE.DirectionalLight(0x8b5cf6, 0.75);
    backLight.position.set(0, -4, -5); // Abajo y atrás
    scene.add(backLight);

    /**
     * Rim Light 1: Luz puntual para crear brillos metálicos
     * PointLight: Emite luz en todas direcciones desde un punto
     */
    const rimLight1 = new THREE.PointLight(0xffffff, 1.1);
    rimLight1.position.set(5, 5, 4); // Superior derecha
    scene.add(rimLight1);

    /**
     * Rim Light 2: Segunda luz puntual con tinte morado claro
     */
    const rimLight2 = new THREE.PointLight(0xddd6fe, 0.7);
    rimLight2.position.set(-4, -3, 4); // Inferior izquierda
    scene.add(rimLight2);

    /**
     * SpotLight: Luz focal que ilumina desde arriba
     * Crea un efecto de foco teatral
     */
    const spotLight = new THREE.SpotLight(0xffffff, 0.9);
    spotLight.position.set(0, 10, 5);    // Arriba
    spotLight.angle = Math.PI / 5;        // Ángulo del cono de luz
    spotLight.penumbra = 0.4;             // Suavidad de los bordes
    spotLight.decay = 2;                  // Atenuación de la luz
    scene.add(spotLight);

    // ========================================
    // SISTEMA DE INTERACTIVIDAD
    // ========================================
    
    /**
     * Variables para controlar la interacción del usuario
     */
    let isDragging = false;                    // ¿Está el usuario arrastrando?
    let previousMouse = { x: 0, y: 0 };        // Posición anterior del mouse
    let rotation = { x: 0.08, y: 0.15 };       // Rotación actual del logo
    let targetRotation = { x: 0.08, y: 0.15 }; // Rotación objetivo (interpolada)

    /**
     * Manejador de inicio de arrastre
     * Se ejecuta cuando el usuario hace clic o toca la pantalla
     * @param {Event} e - Evento del mouse o touch
     */
    function onPointerDown(e) {
        isDragging = true;
        // Obtener coordenadas según el tipo de evento (mouse o touch)
        const coords = e.touches ? e.touches[0] : e;
        previousMouse = { x: coords.clientX, y: coords.clientY };
    }

    /**
     * Manejador de movimiento durante el arrastre
     * Calcula el delta (cambio) del mouse y actualiza la rotación objetivo
     * @param {Event} e - Evento del mouse o touch
     */
    function onPointerMove(e) {
        if (!isDragging) return; // Solo actuar si se está arrastrando
        
        const coords = e.touches ? e.touches[0] : e;
        // Calcular cuánto se movió el mouse/dedo
        const deltaX = coords.clientX - previousMouse.x;
        const deltaY = coords.clientY - previousMouse.y;
        
        // Actualizar rotación objetivo basado en el movimiento
        targetRotation.y += deltaX * 0.007; // Rotación horizontal (eje Y)
        targetRotation.x += deltaY * 0.007; // Rotación vertical (eje X)
        
        // Limitar la rotación vertical para evitar dar vueltas completas
        targetRotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotation.x));
        
        // Guardar posición actual para el próximo frame
        previousMouse = { x: coords.clientX, y: coords.clientY };
    }

    /**
     * Manejador de fin de arrastre
     * Se ejecuta cuando el usuario suelta el clic o levanta el dedo
     */
    function onPointerUp() {
        isDragging = false;
    }

    /**
     * Manejador de la rueda del mouse (zoom)
     * Ajusta la distancia de la cámara al logo
     * @param {WheelEvent} e - Evento de la rueda del mouse
     */
    function onWheel(e) {
        e.preventDefault(); // Evitar el scroll de la página
        // Ajustar posición Z de la cámara basado en el scroll
        camera.position.z += e.deltaY * 0.01;
        // Limitar el zoom entre valores mínimo y máximo
        camera.position.z = Math.max(6, Math.min(20, camera.position.z));
    }

    // ========================================
    // REGISTRO DE EVENTOS
    // ========================================
    
    /**
     * NOTA: Si deseas DESACTIVAR la interactividad del usuario (rotación manual y zoom),
     * comenta las siguientes líneas. El logo solo rotará automáticamente.
     * Para reactivar la interactividad, descomenta estas líneas.
     */
    
    /**
     * Eventos del mouse
     */
    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('mouseleave', onPointerUp); // También al salir del canvas
    
    /**
     * Eventos táctiles (móviles y tablets)
     */
    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    canvas.addEventListener('touchmove', onPointerMove, { passive: true });
    canvas.addEventListener('touchend', onPointerUp);
    
    /**
     * Evento de la rueda del mouse (zoom)
     */
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // ========================================
    // BUCLE DE ANIMACIÓN
    // ========================================
    
    /**
     * Función de animación que se ejecuta en cada frame
     * Actualiza la rotación del logo y renderiza la escena
     */
    function animate() {
        // Solicitar el siguiente frame de animación
        requestAnimationFrame(animate);
        
        /**
         * Rotación automática cuando el usuario no está interactuando
         * Velocidad aumentada para rotación más rápida
         */
        if (!isDragging) {
            targetRotation.y += 0.005; // Rotación más rápida (antes: 0.0018)
        }
        
        /**
         * Interpolación suave (lerp) de la rotación
         * Hace que la rotación sea suave en lugar de instantánea
         * Formula: valor_actual += (valor_objetivo - valor_actual) * factor
         */
        rotation.x += (targetRotation.x - rotation.x) * 0.075;
        rotation.y += (targetRotation.y - rotation.y) * 0.075;
        
        // Aplicar la rotación al grupo del logo
        logoGroup.rotation.x = rotation.x;
        logoGroup.rotation.y = rotation.y;
        
        // Renderizar la escena desde la perspectiva de la cámara
        renderer.render(scene, camera);
    }

    // ========================================
    // RESPONSIVIDAD
    // ========================================
    
    /**
     * Manejador de redimensionamiento de ventana
     * Ajusta el canvas y la cámara cuando cambia el tamaño de la ventana
     */
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        // Actualizar aspect ratio de la cámara
        camera.aspect = width / height;
        // Aplicar los cambios a la matriz de proyección
        camera.updateProjectionMatrix();
        // Redimensionar el renderizador
        renderer.setSize(width, height);
    });

    // ========================================
    // INICIAR ANIMACIÓN
    // ========================================
    
    /**
     * Llamar a la función de animación por primera vez
     * Esto inicia el bucle de renderizado infinito
     */
    animate();
}

// ========================================
// FIN DEL CÓDIGO
// ========================================

/**
 * NOTAS IMPORTANTES:
 * 
 * 1. AJUSTE DE ESCALA:
 *    Para el tamaño perfecto del logo, cambiar la variable 'scale' 
 *    en la línea donde se define (buscar "const scale = 0.19;")
 *    El valor ideal según pruebas es: 0.16
 * 
 * 2. CONTROLES:
 *    - Arrastrar con el mouse: Rotar el logo
 *    - Rueda del mouse: Hacer zoom in/out
 *    - Touch en móviles: Arrastrar para rotar
 * 
 * 3. RENDIMIENTO:
 *    - El código está optimizado para 60 FPS
 *    - Las sombras pueden afectar el rendimiento en dispositivos antiguos
 *    - El pixelRatio está limitado a 2 para mejor rendimiento
 * 
 * 4. COMPATIBILIDAD:
 *    - Requiere navegadores con soporte para WebGL
 *    - ES6 Modules (import/export)
 *    - Three.js versión 0.180.0
 * 
 * 5. PERSONALIZACIÓN:
 *    - Colores: Modificar los valores hexadecimales en los materiales
 *    - Iluminación: Ajustar intensidad y posición de las luces
 *    - Velocidad de rotación: Cambiar el valor 0.0018 en la animación
 *    - Suavidad: Modificar el factor 0.075 en la interpolación
 */
