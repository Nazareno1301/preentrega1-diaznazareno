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

//agregar un producto al carrito
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(); 
}

// mostrar el carrito
function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let carritoDiv = document.createElement("div");
    carritoDiv.innerHTML = "<h2>Este es tu carrito</h2>";


    let total = 0; 
    carrito.forEach((producto) => {
        let productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            
        `;
        carritoDiv.appendChild(productoDiv);

        total += producto.precio;
    });

    if (carrito.length > 0) {
        let totalCarrito = document.createElement("p");
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
        carritoDiv.appendChild(totalCarrito);

        let vaciarCarritoBtn = document.createElement("button");
        vaciarCarritoBtn.textContent = "Vaciar Carrito";
        vaciarCarritoBtn.id = "vaciar-carrito";
        carritoDiv.appendChild(vaciarCarritoBtn);

        vaciarCarritoBtn.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            mostrarCarrito();
        });
    }

    document.getElementById("carrito-contenedor").innerHTML = "";
    document.getElementById("carrito-contenedor").appendChild(carritoDiv);
}

mostrarCarrito();

let contenedor = document.getElementById("contenedor");
productos.forEach((item) => {
    let div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
        <h2>${item.nombre}</h2>
        <h4>id: ${item.id}</h4>
        <p>Nombre: ${item.marca}</p>
        <b>$${item.precio}</b>
        <button class="boton">calcular descuento y agregar al carrito</button>
    `;

    contenedor.append(div);
});

let botones = document.getElementsByClassName("boton");
for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", () => {
        const precioProducto = productos[i].precio;
        if (isNaN(precioProducto)) {
            alert("Por favor escriba el precio de su producto en números");
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

        agregarAlCarrito(productos[i]);
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