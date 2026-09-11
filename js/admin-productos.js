// Productos iniciales del área administrativa
const productosIniciales = [
    {
        id: 1,
        codigo: "PROD001",
        nombre: "Aceite de oliva extra virgen",
        precio: 12990,
        stock: 12,
        stockCritico: 5,
        categoria: "Aceites"
    },
    {
        id: 2,
        codigo: "PROD002",
        nombre: "Chocolate para repostería",
        precio: 8990,
        stock: 4,
        stockCritico: 5,
        categoria: "Repostería"
    },
    {
        id: 3,
        codigo: "PROD003",
        nombre: "Café de especialidad",
        precio: 10990,
        stock: 15,
        stockCritico: 5,
        categoria: "Café"
    }
];

// Obtiene los productos guardados
function obtenerProductosAdmin() {
    const productosGuardados =
        localStorage.getItem("productosAdminGourmet");

    if (productosGuardados === null) {
        localStorage.setItem(
            "productosAdminGourmet",
            JSON.stringify(productosIniciales)
        );

        return productosIniciales;
    }

    return JSON.parse(productosGuardados);
}

// Guarda los cambios realizados
function guardarProductosAdmin(productos) {
    localStorage.setItem(
        "productosAdminGourmet",
        JSON.stringify(productos)
    );
}

// Muestra los productos dentro de la tabla
function mostrarProductosAdmin() {
    const tabla =
        document.getElementById("tabla-productos-admin");

    if (tabla === null) {
        return;
    }

    const productos = obtenerProductosAdmin();
    tabla.innerHTML = "";

    if (productos.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="7">
                    No existen productos registrados.
                </td>
            </tr>
        `;

        return;
    }

    productos.forEach(function (producto) {
        const fila = document.createElement("tr");

        let estadoStock = "Disponible";
        let claseStock = "estado-disponible";

        if (producto.stock <= producto.stockCritico) {
            estadoStock = "Stock crítico";
            claseStock = "estado-critico";
        }

        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>

            <td>
                $${producto.precio.toLocaleString("es-CL")}
            </td>

            <td>${producto.stock}</td>
            <td>${producto.categoria}</td>

            <td>
                <span class="${claseStock}">
                    ${estadoStock}
                </span>
            </td>

            <td>
                <a
                    href="producto-formulario.html?id=${producto.id}"
                    class="boton-tabla boton-editar"
                >
                    Editar
                </a>

                <button
                    type="button"
                    class="boton-tabla boton-borrar"
                    onclick="eliminarProductoAdmin(${producto.id})"
                >
                    Eliminar
                </button>
            </td>
        `;

        tabla.appendChild(fila);
    });
}

// Elimina un producto después de solicitar confirmación
function eliminarProductoAdmin(idProducto) {
    const confirmacion = confirm(
        "¿Deseas eliminar este producto?"
    );

    if (!confirmacion) {
        return;
    }

    const productos = obtenerProductosAdmin();

    const productosActualizados =
        productos.filter(function (producto) {
            return producto.id !== idProducto;
        });

    guardarProductosAdmin(productosActualizados);
    mostrarProductosAdmin();

    const mensaje =
        document.getElementById("mensaje-productos-admin");

    mensaje.textContent =
        "Producto eliminado correctamente.";
}

// Ejecuta la función cuando carga la página
mostrarProductosAdmin();