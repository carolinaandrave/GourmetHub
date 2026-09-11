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

// Actualiza el número mostrado junto al carrito
function actualizarContadorCarrito() {
    const contador =
        document.getElementById("cantidad-carrito");

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

// Agrega un producto al carrito
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

// Muestra los productos almacenados
function mostrarCarrito() {
    const contenedor =
        document.getElementById("productos-carrito");

    const totalCarrito =
        document.getElementById("total-carrito");

    if (contenedor === null || totalCarrito === null) {
        return;
    }

    const carrito = obtenerCarrito();
    contenedor.innerHTML = "";

    let totalCompra = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <h2>Tu carrito está vacío</h2>

                <p>
                    Visita nuestro catálogo y agrega productos.
                </p>

                <a href="productos.html" class="boton">
                    Ver productos
                </a>
            </div>
        `;

        totalCarrito.textContent = "$0";
        return;
    }

    carrito.forEach(function (producto) {
        const subtotal =
            producto.precio * producto.cantidad;

        totalCompra = totalCompra + subtotal;

        const elemento = document.createElement("article");
        elemento.classList.add("producto-carrito");

        elemento.innerHTML = `
            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
            >

            <div class="informacion-producto-carrito">
                <h2>${producto.nombre}</h2>

                <p>
                    Precio:
                    $${producto.precio.toLocaleString("es-CL")}
                </p>

                <p>
                    Subtotal:
                    $${subtotal.toLocaleString("es-CL")}
                </p>

                <div class="controles-cantidad">
                    <button
                        type="button"
                        onclick="disminuirCantidad(${producto.id})"
                    >
                        -
                    </button>

                    <span>${producto.cantidad}</span>

                    <button
                        type="button"
                        onclick="aumentarCantidad(${producto.id})"
                    >
                        +
                    </button>
                </div>

                <button
                    type="button"
                    class="boton-eliminar"
                    onclick="eliminarProducto(${producto.id})"
                >
                    Eliminar
                </button>
            </div>
        `;

        contenedor.appendChild(elemento);
    });

    totalCarrito.textContent =
        "$" + totalCompra.toLocaleString("es-CL");
}

// Aumenta una unidad del producto
function aumentarCantidad(idProducto) {
    const carrito = obtenerCarrito();

    const producto =
        carrito.find(function (item) {
            return item.id === idProducto;
        });

    if (producto !== undefined) {
        producto.cantidad = producto.cantidad + 1;

        guardarCarrito(carrito);
        actualizarContadorCarrito();
        mostrarCarrito();
    }
}

// Disminuye una unidad sin bajar de uno
function disminuirCantidad(idProducto) {
    const carrito = obtenerCarrito();

    const producto =
        carrito.find(function (item) {
            return item.id === idProducto;
        });

    if (
        producto !== undefined &&
        producto.cantidad > 1
    ) {
        producto.cantidad = producto.cantidad - 1;

        guardarCarrito(carrito);
        actualizarContadorCarrito();
        mostrarCarrito();
    }
}

// Elimina completamente un producto
function eliminarProducto(idProducto) {
    const carrito = obtenerCarrito();

    const carritoActualizado =
        carrito.filter(function (producto) {
            return producto.id !== idProducto;
        });

    guardarCarrito(carritoActualizado);
    actualizarContadorCarrito();
    mostrarCarrito();
}

// Vacía todos los productos del carrito
function vaciarCarrito() {
    localStorage.removeItem("carritoGourmetHub");

    actualizarContadorCarrito();
    mostrarCarrito();
}

const botonVaciar =
    document.getElementById("vaciar-carrito");

if (botonVaciar !== null) {
    botonVaciar.addEventListener("click", vaciarCarrito);
}

// Ejecuta las funciones al cargar la página
actualizarContadorCarrito();
mostrarCarrito();