document.addEventListener("DOMContentLoaded", () => {
    const inputBuscar = document.querySelector(".caja-buscar");
    const contenedorTarjetas = document.querySelector(".seccion-imagenes");
    
    // Guardamos una copia fija del orden original de las tarjetas de productos
    const tarjetasOriginales = Array.from(document.querySelectorAll(".tarjeta"));
    let tarjetas = Array.from(tarjetasOriginales);
    
    const botonesFiltro = document.querySelectorAll(".mi-boton");

    // Identificamos si existen los elementos de "Volver al inicio" y "Explorar más"
    // (buscándolos por su texto o clase dentro del contenedor)
    const elementosEspeciales = Array.from(contenedorTarjetas.children).filter(item => {
        const t = item.textContent.toLowerCase();
        return t.includes("volver al inicio") || t.includes("explorar más");
    });

    // Función auxiliar para volver a adjuntar los botones especiales al final
    function reposicionarEspecialesAlFinal() {
        elementosEspeciales.forEach(el => {
            contenedorTarjetas.appendChild(el);
        });
    }

    // 1. Buscador en tiempo real
    inputBuscar.addEventListener("input", (e) => {
        const textoBusqueda = e.target.value.toLowerCase().trim();

        tarjetas.forEach((tarjeta) => {
            const contenidoTarjeta = tarjeta.textContent.toLowerCase();
            if (contenidoTarjeta.includes(textoBusqueda)) {
                tarjeta.style.display = "block";
            } else {
                tarjeta.style.display = "none";
            }
        });
        reposicionarEspecialesAlFinal();
    });

    // 2. Funcionalidad de los botones laterales
    botonesFiltro.forEach((boton) => {
        boton.addEventListener("click", () => {
            const textoBoton = boton.textContent.toLowerCase().trim();

            if (textoBoton.includes("general")) {
                // Restaurar el orden original de los productos
                tarjetasOriginales.forEach((tarjeta) => {
                    tarjeta.style.display = "block";
                    contenedorTarjetas.appendChild(tarjeta);
                });
                tarjetas = Array.from(tarjetasOriginales);
            } 
            else if (textoBoton.includes("precios")) {
                // Ordenar tarjetas de menor a mayor precio
                tarjetas.sort((a, b) => {
                    const precioA = extraerNumero(a.querySelector(".descripcion").textContent, "precio");
                    const precioB = extraerNumero(b.querySelector(".descripcion").textContent, "precio");
                    return precioA - precioB;
                });
                tarjetas.forEach(tarjeta => {
                    tarjeta.style.display = "block";
                    contenedorTarjetas.appendChild(tarjeta);
                });
            }
            else if (textoBoton.includes("ubicación")) {
                // Ordenar alfabéticamente por ubicación
                tarjetas.sort((a, b) => {
                    const ubA = extraerTextoCampo(a.querySelector(".descripcion").textContent, "ubicación");
                    const ubB = extraerTextoCampo(b.querySelector(".descripcion").textContent, "ubicación");
                    return ubA.localeCompare(ubB);
                });
                tarjetas.forEach(tarjeta => {
                    tarjeta.style.display = "block";
                    contenedorTarjetas.appendChild(tarjeta);
                });
            }
            else if (textoBoton.includes("categoría")) {
                // Ordenar alfabéticamente por categoría
                tarjetas.sort((a, b) => {
                    const catA = extraerTextoCampo(a.querySelector(".descripcion").textContent, "categoría");
                    const catB = extraerTextoCampo(b.querySelector(".descripcion").textContent, "categoría");
                    return catA.localeCompare(catB);
                });
                tarjetas.forEach(tarjeta => {
                    tarjeta.style.display = "block";
                    contenedorTarjetas.appendChild(tarjeta);
                });
            }

            // Aseguramos que los botones de "Volver al inicio" y "Explorar más" se muevan al final de todo
            reposicionarEspecialesAlFinal();
        });
    });

    // Funciones auxiliares para leer los datos de las tarjetas correctamente
    function extraerNumero(texto, campo) {
        const lineas = texto.split("\n");
        for (let linea of lineas) {
            if (linea.toLowerCase().includes(campo)) {
                const soloNumeros = linea.replace(/[^0-9]/g, "");
                return parseInt(soloNumeros) || 0;
            }
        }
        return 0;
    }

    function extraerTextoCampo(texto, campo) {
        const lineas = texto.split("\n");
        for (let linea of lineas) {
            if (linea.toLowerCase().includes(campo)) {
                const partes = linea.split(":");
                if (partes.length > 1) {
                    return partes[1].trim().toLowerCase();
                }
            }
        }
        return "";
    }
});