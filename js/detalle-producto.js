// Obtiene el número del producto desde la dirección de la página
const parametrosDireccion =
    new URLSearchParams(window.location.search);

const idProducto = Number(
    parametrosDireccion.get("id")
);

// Busca el producto correspondiente dentro del arreglo
const productoEncontrado =
    listaProductos.find(function (producto) {
        return producto.id === idProducto;
    });

const contenedorDetalle =
    document.getElementById("detalle-producto");

// Muestra un aviso si el producto no existe.
if (productoEncontrado === undefined) {
    contenedorDetalle.innerHTML = `
        <article class="producto-no-encontrado">
            <h2>Producto no encontrado</h2>

            <p>
                No fue posible encontrar la información solicitada.
            </p>

            <a href="productos.html" class="boton">
                Volver a productos
            </a>
        </article>
    `;
} else {
    // Muestra la información del producto seleccionado
    contenedorDetalle.innerHTML = `
        <article class="detalle-producto-contenido">

            <div class="detalle-producto-imagen">
                <img
                    src="${productoEncontrado.imagen}"
                    alt="${productoEncontrado.nombre}"
                >
            </div>

            <div class="detalle-producto-informacion">
                <h2>${productoEncontrado.nombre}</h2>

                <p>${productoEncontrado.descripcion}</p>

                <p>
                    Producto seleccionado especialmente para
                    preparaciones gastronómicas y repostería.
                </p>

                <p class="precio">
                    $${productoEncontrado.precio.toLocaleString("es-CL")}
                </p>

                <button
                    type="button"
                    class="boton"
                    onclick="agregarAlCarrito(${productoEncontrado.id})"
                >
                    Añadir al carrito
                </button>

                <a href="productos.html" class="boton boton-secundario">
                    Volver a productos
                </a>
            </div>

        </article>
    `;
}