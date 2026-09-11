let cantidadCarrito = 0;

const botonExplorar = document.querySelector('.boton-empezar');

const tarjetasProductos = document.querySelectorAll('.tarjeta-producto');


// ==========================================
// 2. FUNCIÓN PARA MOSTRAR MENSAJES (NOTIFICACIÓN)
// ==========================================
function mostrarMensaje(texto) {
    let mensajeExistente = document.getElementById('notificacion-toast');
    
    if (!mensajeExistente) {
        mensajeExistente = document.createElement('div');
        mensajeExistente.id = 'notificacion-toast';

        mensajeExistente.style.position = 'fixed';
        mensajeExistente.style.bottom = '20px';
        mensajeExistente.style.right = '20px';
        mensajeExistente.style.backgroundColor = '#ffffff';
        mensajeExistente.style.color = '#000000';
        mensajeExistente.style.padding = '12px 20px';
        mensajeExistente.style.borderRadius = '6px';
        mensajeExistente.style.fontWeight = 'bold';
        mensajeExistente.style.boxShadow = '0 4px 10px rgba(0,0,0,0.5)';
        mensajeExistente.style.zIndex = '1000';
        mensajeExistente.style.transition = 'all 0.3s ease';

        document.body.appendChild(mensajeExistente);
    }

    mensajeExistente.innerText = texto;
    mensajeExistente.style.opacity = '1';

    setTimeout(function() {
        mensajeExistente.style.opacity = '0';
    }, 2500);
}


// ==========================================
// 3. AGREGAR BOTONES A LOS PRODUCTOS
// ==========================================
tarjetasProductos.forEach(function(tarjeta) {

    const botonComprar = document.createElement('button');
    botonComprar.innerText = 'AGREGAR AL CARRITO';
    
    botonComprar.style.marginTop = '10px';
    botonComprar.style.width = '100%';
    botonComprar.style.padding = '10px';
    botonComprar.style.backgroundColor = '#2a2a2a';
    botonComprar.style.color = '#ffffff';
    botonComprar.style.border = '1px solid #444';
    botonComprar.style.borderRadius = '4px';
    botonComprar.style.cursor = 'pointer';
    botonComprar.style.fontWeight = 'bold';

    botonComprar.onmouseover = function() {
        botonComprar.style.backgroundColor = '#ffffff';
        botonComprar.style.color = '#000000';
    };
    botonComprar.onmouseout = function() {
        botonComprar.style.backgroundColor = '#2a2a2a';
        botonComprar.style.color = '#ffffff';
    };

    botonComprar.addEventListener('click', function(e) {
        e.preventDefault();

        cantidadCarrito = cantidadCarrito + 1;

        const tituloProducto = tarjeta.querySelector('h4').innerText;

        mostrarMensaje('¡Añadido! ' + tituloProducto + ' (Total: ' + cantidadCarrito + ')');
    });

    const infoArticulo = tarjeta.querySelector('.info-articulo');
    if (infoArticulo) {
        infoArticulo.appendChild(botonComprar);
    }
});


// ==========================================
// 4. DESPLAZAMIENTO SUAVE AL PULSAR EXPLORAR
// ==========================================
if (botonExplorar) {
    botonExplorar.addEventListener('click', function(evento) {
        evento.preventDefault();
        
        const seccionDestino = document.getElementById('seccion-productos');
        
        if (seccionDestino) {
            seccionDestino.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}