function compartirw() {
    const selector1 = document.getElementById('selector1').value;
    const selector2 = document.getElementById('selector2').value;
    const selector3 = document.getElementById('selector3').value;
    const direccion = document.getElementById('direccion').value;
    const anotaciones = document.getElementById('anotaciones').value;

    const message = `Hola, estas son mis selecciones: %0APrimer plato: ${selector1} %0ASegundo plato: ${selector2} %0APostre: ${selector3} %0ADireccion: ${direccion} %0AAnotaciones: ${anotaciones}`;
    const whatsappUrl = `https://wa.me/<+34655815417>?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
}

