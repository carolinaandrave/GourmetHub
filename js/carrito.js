// Obtiene el carrito guardado en el navegador
function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem("carritoGourmet");

    if (carritoGuardado === null) {
        return [];
    }

    return JSON.parse(carritoGuardado);
}

// Guarda el carrito para que no se pierda al cambiar de página
function guardarCarrito(carrito) {
    localStorage.setItem(
        "carritoGourmet",
        JSON.stringify(carrito)
    );
}

// Actualiza la cantidad mostrada junto al enlace Carrito
function actualizarCantidadCarrito() {
    const carrito = obtenerCarrito();
    const contador = document.getElementById("cantidad-carrito");

    let cantidadTotal = 0;

    carrito.forEach(function (producto) {
        cantidadTotal = cantidadTotal + producto.cantidad;
    });

    if (contador !== null) {
        contador.textContent = cantidadTotal;
    }
}

// Añade un producto o aumenta su cantidad
function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();

    const productoExistente = carrito.find(function (item) {
        return item.id === producto.id;
    });

    if (productoExistente === undefined) {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    } else {
        productoExistente.cantidad =
            productoExistente.cantidad + 1;
    }

    guardarCarrito(carrito);
    actualizarCantidadCarrito();

    alert("Producto añadido al carrito.");
}

// Muestra el número de productos cuando carga la página
actualizarCantidadCarrito();