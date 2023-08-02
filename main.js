function geeradorDeCodigo() {
    let codigo = '';
    for (let i = 0; i < 8; i++) {
      const numeroAleatorio = Math.floor(Math.random() * 5);
      codigo = codigo + numeroAleatorio;
    }
    return codigo;
  }

function CalculadoraDeDescuentos() {
    let descuento;
    function calcularPrecioConDescuento(precio, descuento) {
        return precio - (precio * descuento);
    }
    let continuar = true;
    while (continuar) {
        let precioProducto = parseInt(prompt("Ingrese el precio del producto:"));
        if (isNaN(precioProducto)) {
            alert("Por favor escriba el precio de su producto en numeros")
            continue;
        }
        else if(precioProducto >= 10000) {
            descuento = 0.30;
        } else if (precioProducto >= 5000 && precioProducto < 10000) {
            descuento = 0.15;
        } else {
            descuento = 0.05;
        }
        let nuevoPrecio = calcularPrecioConDescuento(precioProducto, descuento);
        const codigoAleatorio = geeradorDeCodigo();
        alert(`Tu precio con descuento es ${nuevoPrecio}`);
        alert(`Tu código de 8 dígitos es: #${codigoAleatorio}`);
        continuar = confirm("Si quiere ver el descuento de otro producto, seleccione aceptar");
    }

    alert("Gracias por usar la calculadora de descuentos");
}



CalculadoraDeDescuentos();


