        // IIFE (Immediately Invoked Function Expression) para encapsular el código
        // Evita contaminar el scope global con variables
        (function() {
            // ========================================
            // CONFIGURACIÓN INICIAL
            // ========================================
            
            // Obtener referencias a los elementos HTML
            const container = document.getElementById('logo-3d-container'); // Contenedor del canvas
            const canvas = document.getElementById('logo-3d-canvas');       // Canvas donde se renderiza 3D
            
            // Crear la escena 3D - Es como el "mundo" donde viven los objetos 3D
            const scene = new THREE.Scene();
            // Crear degradado que coincida con el fondo de la página
            scene.background = null; // Hacer transparente para que se vea el fondo del contenedor
            
            // ========================================
            // CÁMARA - Define desde dónde miramos la escena
            // ========================================
            const camera = new THREE.PerspectiveCamera(
                45,                                           // FOV (Field of View) - Ángulo de visión en grados
                container.clientWidth / container.clientHeight, // Aspect ratio (ancho/alto)
                0.1,                                          // Near plane - objetos más cerca no se ven
                1000                                          // Far plane - objetos más lejos no se ven
            );
            camera.position.set(0, 0, 8); // Posición inicial de la cámara (x, y, z)
            
            // ========================================
            // RENDERER - El "pintor" que dibuja la escena en el canvas
            // ========================================
            const renderer = new THREE.WebGLRenderer({ 
                canvas: canvas,           // Canvas HTML donde renderizar
                antialias: true,          // Suaviza los bordes (mejor calidad)
                alpha: true               // Permite transparencia en el fondo
            });
            renderer.setSize(container.clientWidth, container.clientHeight); // Tamaño del render
            renderer.setPixelRatio(window.devicePixelRatio);                // Ajusta para pantallas Retina/4K
            
            // ========================================
            // GRUPO DEL LOGO - Agrupa fondo y letra para rotarlos juntos
            // ========================================
            const logoGroup = new THREE.Group();
            
            // ========================================
            // CREAR EL FONDO (Cuadrado redondeado morado)
            // ========================================
            
            // Crear forma 2D usando puntos y curvas
            const fondoShape = new THREE.Shape();
            const size = 1.8;      // Tamaño del cuadrado
            const radius = 0.3;    // Radio de las esquinas redondeadas
            
            // Dibujar el contorno del cuadrado con esquinas redondeadas
            // Se dibuja en sentido horario empezando desde arriba-izquierda
            fondoShape.moveTo(-size + radius, size);                         // Punto inicial
            fondoShape.lineTo(size - radius, size);                          // Línea superior
            fondoShape.quadraticCurveTo(size, size, size, size - radius);   // Esquina superior derecha
            fondoShape.lineTo(size, -size + radius);                         // Línea derecha
            fondoShape.quadraticCurveTo(size, -size, size - radius, -size); // Esquina inferior derecha
            fondoShape.lineTo(-size + radius, -size);                        // Línea inferior
            fondoShape.quadraticCurveTo(-size, -size, -size, -size + radius); // Esquina inferior izquierda
            fondoShape.lineTo(-size, size - radius);                         // Línea izquierda
            fondoShape.quadraticCurveTo(-size, size, -size + radius, size); // Esquina superior izquierda
            
            // Configuración de extrusión - convierte la forma 2D en 3D
            const extrudeSettings = {
                depth: 0.4,              // Profundidad del objeto (grosor)
                bevelEnabled: true,      // Activar biselado de bordes
                bevelThickness: 0.05,    // Grosor del bisel
                bevelSize: 0.05,         // Tamaño del bisel
                bevelSegments: 5         // Segmentos para suavizar el bisel
            };
            
            // Crear geometría 3D a partir de la forma 2D
            const fondoGeometry = new THREE.ExtrudeGeometry(fondoShape, extrudeSettings);
            
            // Material metálico morado para el fondo
            const fondoMaterial = new THREE.MeshStandardMaterial({
                color: 0x9933ff,      // Color morado brillante (formato hexadecimal)
                metalness: 0.9,       // Qué tan metálico es (0=mate, 1=completamente metálico)
                roughness: 0.2        // Qué tan rugoso es (0=espejo, 1=mate)
            });
            
            // Crear el mesh (geometría + material) y añadirlo al grupo
            const fondoMesh = new THREE.Mesh(fondoGeometry, fondoMaterial);
            logoGroup.add(fondoMesh);
            
            // ========================================
            // CREAR LA LETRA B (Texto 3D blanco)
            // ========================================
            
            // Cargar la fuente desde CDN (asíncrono)
            const loader = new THREE.FontLoader();
            loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function(font) {
                // Callback que se ejecuta cuando la fuente se carga correctamente
                
                // Crear geometría del texto 3D
                const textGeometry = new THREE.TextGeometry('B', {
                    font: font,              // Fuente a usar
                    size: 1.3,               // Tamaño del texto
                    height: 0.15,            // Profundidad/grosor del texto
                    curveSegments: 12,       // Segmentos para curvas (más = más suave)
                    bevelEnabled: true,      // Activar biselado
                    bevelThickness: 0.02,    // Grosor del bisel
                    bevelSize: 0.02,         // Tamaño del bisel
                    bevelSegments: 5         // Segmentos del bisel
                });
                
                // Centrar la geometría en el origen (0,0,0)
                textGeometry.center();
                
                // Material blanco brillante para la letra
                const textMaterial = new THREE.MeshStandardMaterial({
                    color: 0xffffff,           // Blanco puro
                    metalness: 0.3,            // Ligeramente metálico
                    roughness: 0.2,            // Bastante suave
                    emissive: 0xffffff,        // Color de emisión (brillo propio)
                    emissiveIntensity: 0.1     // Intensidad del brillo (10%)
                });
                
                // Crear mesh del texto
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.z = 0.5;  // Mover hacia adelante para que esté sobre el fondo
                logoGroup.add(textMesh);    // Añadir al grupo
            });
            
            // Añadir el grupo completo a la escena
            scene.add(logoGroup);
            
            // ========================================
            // ILUMINACIÓN - Luces para ver los objetos
            // ========================================
            
            // Luz ambiente - Ilumina todo uniformemente
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
            scene.add(ambientLight);
            
            // Luz direccional principal - Simula el sol
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
            directionalLight.position.set(5, 5, 5); // Posición de la luz
            scene.add(directionalLight);
            
            // Luz puntual 1 - Luz morada para efectos
            const light1 = new THREE.PointLight(0x8844ff, 1.2, 50);
            light1.position.set(-3, 3, 5);
            scene.add(light1);
            
            // Luz puntual 2 - Luz azul para efectos
            const light2 = new THREE.PointLight(0x4488ff, 1.0, 50);
            light2.position.set(3, -2, 5);
            scene.add(light2);
            
            // Luz frontal - Ilumina la letra B desde el frente
            const frontLight = new THREE.DirectionalLight(0xffffff, 0.8);
            frontLight.position.set(0, 0, 10);
            scene.add(frontLight);
            
            // ========================================
            // CONTROLES DE MOUSE - Interactividad
            // ========================================
            
            // Variables para el sistema de arrastre
            let isDragging = false;                       // ¿Está el usuario arrastrando?
            let previousMousePosition = { x: 0, y: 0 };   // Posición anterior del mouse
            let rotation = { x: 0.2, y: 0 };              // Rotación actual del logo
            let targetRotation = { x: 0.2, y: 0 };        // Rotación objetivo (para suavizado)
            
            // Evento: Usuario presiona el botón del mouse
            canvas.addEventListener('mousedown', (e) => {
                isDragging = true;
                previousMousePosition = { x: e.clientX, y: e.clientY };
            });
            
            // Evento: Usuario mueve el mouse
            canvas.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    // Calcular cuánto se movió el mouse
                    const deltaX = e.clientX - previousMousePosition.x;
                    const deltaY = e.clientY - previousMousePosition.y;
                    
                    // Actualizar rotación objetivo basado en el movimiento
                    targetRotation.y += deltaX * 0.01;  // Rotación horizontal
                    targetRotation.x += deltaY * 0.01;  // Rotación vertical
                    
                    // Actualizar posición anterior del mouse
                    previousMousePosition = { x: e.clientX, y: e.clientY };
                }
            });
            
            // Evento: Usuario suelta el botón del mouse
            canvas.addEventListener('mouseup', () => {
                isDragging = false;
            });
            
            // Evento: Usuario hace scroll con la rueda del mouse (zoom)
            canvas.addEventListener('wheel', (e) => {
                e.preventDefault();                          // Prevenir scroll de la página
                camera.position.z += e.deltaY * 0.01;       // Acercar/alejar cámara
                camera.position.z = Math.max(5, Math.min(12, camera.position.z)); // Limitar zoom (min: 5, max: 12)
            });
            
            // ========================================
            // CONTROLES TÁCTILES - Para dispositivos móviles
            // ========================================
            
            let touchStartX = 0, touchStartY = 0; // Posición inicial del toque
            
            // Evento: Usuario toca la pantalla
            canvas.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            });
            
            // Evento: Usuario arrastra el dedo
            canvas.addEventListener('touchmove', (e) => {
                e.preventDefault(); // Prevenir scroll en móviles
                
                // Calcular movimiento del dedo
                const deltaX = e.touches[0].clientX - touchStartX;
                const deltaY = e.touches[0].clientY - touchStartY;
                
                // Actualizar rotación
                targetRotation.y += deltaX * 0.01;
                targetRotation.x += deltaY * 0.01;
                
                // Actualizar posición inicial para el siguiente frame
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            });
            
            // ========================================
            // BUCLE DE ANIMACIÓN - Se ejecuta ~60 veces por segundo
            // ========================================
            function animate() {
                // Solicitar el siguiente frame de animación
                requestAnimationFrame(animate);
                
                // Suavizar la rotación (interpolación lineal)
                // La rotación actual se acerca gradualmente a la rotación objetivo
                rotation.x += (targetRotation.x - rotation.x) * 0.1;
                rotation.y += (targetRotation.y - rotation.y) * 0.1;
                
                // Aplicar la rotación al grupo del logo
                logoGroup.rotation.x = rotation.x;
                logoGroup.rotation.y = rotation.y;
                
                // Si no está arrastrando, rotar automáticamente
                if (!isDragging) {
                    targetRotation.y += 0.003; // Rotación automática lenta
                }
                
                // Animar las luces (movimiento sinusoidal)
                const time = Date.now() * 0.001;              // Tiempo en segundos
                light1.position.x = Math.sin(time * 0.5) * 3; // Luz 1 se mueve en X
                light2.position.x = Math.cos(time * 0.5) * 3; // Luz 2 se mueve en X (desfasado)
                
                // Renderizar la escena desde la perspectiva de la cámara
                renderer.render(scene, camera);
            }
            
            // Iniciar el bucle de animación
            animate();
            
            // ========================================
            // RESPONSIVIDAD - Ajustar cuando cambia el tamaño de ventana
            // ========================================
            window.addEventListener('resize', () => {
                // Obtener nuevas dimensiones
                const width = container.clientWidth;
                const height = container.clientHeight;
                
                // Actualizar aspect ratio de la cámara
                camera.aspect = width / height;
                camera.updateProjectionMatrix();  // IMPORTANTE: Aplicar cambios
                
                // Actualizar tamaño del renderer
                renderer.setSize(width, height);
            });
        })(); // Fin del IIFE