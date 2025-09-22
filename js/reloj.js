function actualizarReloj() {
            const ahora = new Date();
            
            // Obtener componentes de tiempo
            const horas = ahora.getHours().toString().padStart(2, '0');
            const minutos = ahora.getMinutes().toString().padStart(2, '0');
            const segundos = ahora.getSeconds().toString().padStart(2, '0');
            
            // Obtener fecha
            const opciones = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const fecha = ahora.toLocaleDateString('es-ES', opciones);
            
            // Actualizar elementos del DOM
            document.getElementById('horas').textContent = horas;
            document.getElementById('minutos').textContent = minutos;
            document.getElementById('segundos').textContent = segundos;
            document.getElementById('fecha').textContent = fecha;
        }
        
        // Actualizar el reloj inmediatamente
        actualizarReloj();
        
        // Configurar actualización cada segundo
        setInterval(actualizarReloj, 1000);
        
        // Añadir efecto visual adicional
        document.addEventListener('DOMContentLoaded', function() {
            const segundero = document.getElementById('segundos');
            
            setInterval(function() {
                segundero.style.color = segundero.style.color === 'rgb(255, 107, 107)' ? '#ffff00' : '#ff6b6b';
            }, 500);
        });