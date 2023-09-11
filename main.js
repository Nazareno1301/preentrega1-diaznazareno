const buscarInput = document.getElementById("buscar");
const contenedor = document.getElementById("contenedor");
let productos = [];

function obtenerProductos() {
    fetch('https://fakestoreapi.com/products?limit=5')
        .then((res) => res.json())
        .then((data) => {
            productos = data;
            mostrarProductos(productos); 
        });
}

function mostrarProductos(productosAMostrar) {
    contenedor.innerHTML = ""; 

    productosAMostrar.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
            <h2>${producto.title}</h2>
            <img src="${producto.image}" alt="${producto.title}">
            <p>${producto.description}</p>
            <b>$${producto.price}</b>
            <button class="boton">Agregar al Carrito</button>
        `;

        contenedor.appendChild(productoDiv);

        productoDiv.querySelector(".boton").addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
    });
}

buscarInput.addEventListener("input", () => {
    const consulta = buscarInput.value.toLowerCase(); 

    const productosFiltrados = productos.filter((producto) => {
        return producto.title.toLowerCase().includes(consulta);
    });

    mostrarProductos(productosFiltrados);
});

obtenerProductos();

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1500
    });

    mostrarCarrito();
}

function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let carritoDiv = document.createElement("div");
    carritoDiv.innerHTML = "<h2>Carrito de Compras</h2>";

    let total = 0;

    carrito.forEach((producto) => {
        let productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
            <p>${producto.title} - $${producto.price}</p>
        `;
        carritoDiv.appendChild(productoDiv);

        total += producto.price;
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
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Carrito eliminado',
                showConfirmButton: false,
                timer: 1500
            });

            mostrarCarrito();
        });

        let finalizarCompra = document.createElement("button");
        finalizarCompra.textContent = "Finalizar compra";
        finalizarCompra.id = "fin";
        carritoDiv.appendChild(finalizarCompra);

        finalizarCompra.addEventListener("click", () => {
            Swal.fire({
                icon: 'success',
                title: '¡Compra Finalizada!',
                text: 'Gracias por tu compra.',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("carrito");
                    mostrarCarrito();
                }
            });
        });
    }

    document.getElementById("carrito-contenedor").innerHTML = "";
    document.getElementById("carrito-contenedor").appendChild(carritoDiv);
}

mostrarCarrito();
