// Recupera el carrito guardado en el navegador
function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem(
        "carritoGourmetHub"
    );

    if (carritoGuardado === null) {
        return [];
    }

    return JSON.parse(carritoGuardado);
}

// Guarda el carrito actualizado en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem(
        "carritoGourmetHub",
        JSON.stringify(carrito)
    );
}

// Actualiza el número mostrado junto al enlace del carrito
function actualizarContadorCarrito() {
    const contador = document.getElementById(
        "cantidad-carrito"
    );

    if (contador !== null) {
        const carrito = obtenerCarrito();
        let cantidadTotal = 0;

        carrito.forEach(function (producto) {
            cantidadTotal =
                cantidadTotal + producto.cantidad;
        });

        contador.textContent = cantidadTotal;
    }
}

// Agrega un producto o aumenta su cantidad
function agregarAlCarrito(idProducto) {
    const productoSeleccionado =
        listaProductos.find(function (producto) {
            return producto.id === idProducto;
        });

    if (productoSeleccionado === undefined) {
        alert("No se pudo encontrar el producto.");
        return;
    }

    const carrito = obtenerCarrito();

    const productoEnCarrito =
        carrito.find(function (producto) {
            return producto.id === idProducto;
        });

    if (productoEnCarrito === undefined) {
        carrito.push({
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            precio: productoSeleccionado.precio,
            imagen: productoSeleccionado.imagen,
            cantidad: 1
        });
    } else {
        productoEnCarrito.cantidad =
            productoEnCarrito.cantidad + 1;
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();

    alert("Producto agregado correctamente al carrito.");
}

// Actualiza el contador al cargar la página
actualizarContadorCarrito();