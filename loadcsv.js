document.addEventListener('DOMContentLoaded', function() {
    const fechaHoy = new Date();
    const anio = fechaHoy.getFullYear();
    const mes = ('0' + (fechaHoy.getMonth() + 1)).slice(-2); // Asegura que el mes siempre tenga dos dígitos
    const dia = ('0' + fechaHoy.getDate()).slice(-2); // Asegura que el día siempre tenga dos dígitos
    const nombreArchivo = `${anio}${mes}${dia}.txt`; // Formato: AÑOMESDIA.txt
    cargaSelectoresUnicoArchivo(nombreArchivo);
});

function cargaSelectoresUnicoArchivo(archivo) {
    const descripcion = {
        'selector1': 'Selecciona el primer plato',
        'selector2': 'Selecciona el segundo plato',
        'selector3': 'Selecciona el postre'
    };

    fetch(archivo)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontró el archivo: ' + archivo);
            }
            return response.text();
        })
        .then(data => {
            const lineas = data.split('\n');
            lineas.forEach(linea => {
                const partes = linea.split(', ');
                const selectorId = partes[0];
                const select = document.getElementById(selectorId);

                // Limpiar opciones existentes
                select.innerHTML = '';

                // Crear una opción inicial descriptiva que no sea seleccionable
                const elemInicial = document.createElement('option');
                elemInicial.textContent = descripcion[selectorId];
                elemInicial.value = "";
                elemInicial.disabled = true;
                elemInicial.selected = true;
                select.appendChild(elemInicial);

                // Agregar las opciones válidas para el selector
                const opciones = partes.slice(1);
                opciones.forEach(opcion => {
                    const elem = document.createElement('option');
                    elem.textContent = opcion;
                    elem.value = opcion;
                    select.appendChild(elem);
                });
            });
        })
        .catch(error => console.error('Error cargando el archivo:', error));
}
