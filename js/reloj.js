// SCRIPT DEL RELOJ
        function actualizarReloj() {
            const ahora = new Date();
            
            // Obtener horas, minutos y segundos
            const horas = ahora.getHours().toString().padStart(2, '0');
            const minutos = ahora.getMinutes().toString().padStart(2, '0');
            const segundos = ahora.getSeconds().toString().padStart(2, '0');
            
            // Actualizar elementos del reloj
            document.getElementById('horas').textContent = horas;
            document.getElementById('minutos').textContent = minutos;
            document.getElementById('segundos').textContent = segundos;
            
            // Obtener fecha
            const opciones = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const fecha = ahora.toLocaleDateString('es-ES', opciones);
            document.getElementById('fecha').textContent = fecha;
        }
        
        // Inicializar el reloj
        actualizarReloj();
        // Actualizar cada segundo
        setInterval(actualizarReloj, 1000);
