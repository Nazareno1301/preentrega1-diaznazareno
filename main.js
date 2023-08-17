class Producto {
    constructor(id, nombre, marca, precio, talle, color) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.marca = marca;
        this.talle = talle;
        this.color = color;
        this.vendido = false;
    }

    vender() {
        this.vendido = true;
    }
}

const productos = [];
productos.push(new Producto(1, "remera", "adidas", 4000, "L", "rojo"));
productos.push(new Producto(2, "jogging", "nike", 6750, "m", "negro"));
productos.push(new Producto(3, "buzo", "underarmour", 9720, "xl", "blanco"));
productos.push(new Producto(4, "short", "topper", 3010, "s", "rojo"));
productos.push(new Producto(5, "calza", "topper", 30140, "l", "rosa"));

let contenedor = document.getElementById("contenedor");
productos.forEach((item) => {
    let div = document.createElement("div");
    div.innerHTML = `
    <h2>${item.nombre}</h2>
    <h4>id: ${item.id}</h4>
    <p>Nombre: ${item.marca}</p>
    <b>$${item.precio}</b>
    <button class="boton">calcular descuento</button>
    `;

    contenedor.append(div);
});

// Agregar evento de clic a todos los botones
let botones = document.getElementsByClassName("boton");
for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", () => {
        let precioProducto = prompt("Coloque el precio del producto seleccionado");
        precioProducto = parseInt(precioProducto);

        if (isNaN(precioProducto)) {
            alert("Por favor ingrese un precio válido");
            return;
        }

        let descuento;
        if (precioProducto >= 10000) {
            descuento = 0.30;
        } else if (precioProducto >= 5000 && precioProducto < 10000) {
            descuento = 0.15;
        } else {
            descuento = 0.05;
        }

        function calcularPrecioConDescuento(precio, descuento) {
            return precio - (precio * descuento);
        }

        let nuevoPrecio = calcularPrecioConDescuento(precioProducto, descuento);
        const codigoAleatorio = generadorDeCodigo();
        alert(`Tu precio con descuento es ${nuevoPrecio}`);
        alert(`Tu código de 8 dígitos es: #${codigoAleatorio} copielo, se lo pediremos al finalizar la compra`);
    });
}

function generadorDeCodigo() {
    let codigo = '';
    for (let i = 0; i < 8; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 10);
        codigo += numeroAleatorio;
    }
    return codigo;
}

alert("Gracias por usar la calculadora de descuentos");
