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

// Obtiene el formulario si estamos en la página de creación
const formularioProducto =
    document.getElementById("formulario-producto");

// Muestra un error debajo de un campo
function mostrarErrorProducto(campo, idMensaje, mensaje) {
    document.getElementById(idMensaje).textContent = mensaje;
    campo.classList.add("campo-error");
}

// Limpia el error cuando el campo es válido
function limpiarErrorProducto(campo, idMensaje) {
    document.getElementById(idMensaje).textContent = "";
    campo.classList.remove("campo-error");
}

// Carga los datos cuando se selecciona Editar
function cargarProductoParaEditar() {
    if (formularioProducto === null) {
        return;
    }

    const parametros =
        new URLSearchParams(window.location.search);

    const idDireccion = parametros.get("id");

    if (idDireccion === null) {
        return;
    }

    const idProducto = Number(idDireccion);
    const productos = obtenerProductosAdmin();

    const producto =
        productos.find(function (item) {
            return item.id === idProducto;
        });

    if (producto === undefined) {
        return;
    }

    document.getElementById("producto-id").value =
        producto.id;

    document.getElementById("codigo-producto").value =
        producto.codigo;

    document.getElementById("nombre-producto").value =
        producto.nombre;

    document.getElementById("descripcion-producto").value =
        producto.descripcion;

    document.getElementById("precio-producto").value =
        producto.precio;

    document.getElementById("stock-producto").value =
        producto.stock;

    document.getElementById("stock-critico-producto").value =
        producto.stockCritico;

    document.getElementById("categoria-producto").value =
        producto.categoria;

    document.getElementById(
        "titulo-formulario-producto"
    ).textContent = "Editar producto";
}

// Valida y guarda el producto
if (formularioProducto !== null) {
    formularioProducto.addEventListener(
        "submit",
        function (evento) {
            evento.preventDefault();

            let formularioValido = true;

            const productoId =
                document.getElementById("producto-id");

            const codigo =
                document.getElementById("codigo-producto");

            const nombre =
                document.getElementById("nombre-producto");

            const descripcion =
                document.getElementById(
                    "descripcion-producto"
                );

            const precio =
                document.getElementById("precio-producto");

            const stock =
                document.getElementById("stock-producto");

            const stockCritico =
                document.getElementById(
                    "stock-critico-producto"
                );

            const categoria =
                document.getElementById(
                    "categoria-producto"
                );

            if (codigo.value.trim().length < 3) {
                mostrarErrorProducto(
                    codigo,
                    "error-codigo-producto",
                    "El código debe tener al menos 3 caracteres."
                );

                formularioValido = false;
            } else {
                limpiarErrorProducto(
                    codigo,
                    "error-codigo-producto"
                );
            }

            if (nombre.value.trim() === "") {
                mostrarErrorProducto(
                    nombre,
                    "error-nombre-producto",
                    "El nombre es obligatorio."
                );

                formularioValido = false;
            } else {
                limpiarErrorProducto(
                    nombre,
                    "error-nombre-producto"
                );
            }

            if (descripcion.value.length > 500) {
                mostrarErrorProducto(
                    descripcion,
                    "error-descripcion-producto",
                    "La descripción no puede superar 500 caracteres."
                );

                formularioValido = false;
            } else {
                limpiarErrorProducto(
                    descripcion,
                    "error-descripcion-producto"
                );
            }

            const precioNumero = Number(precio.value);

            if (
                precio.value === "" ||
                precioNumero < 0
            ) {
                mostrarErrorProducto(
                    precio,
                    "error-precio-producto",
                    "El precio debe ser igual o superior a cero."
                );

                formularioValido = false;
            } else {
                limpiarErrorProducto(
                    precio,
                    "error-precio-producto"
                );
            }

            const stockNumero = Number(stock.value);

            if (
                stock.value === "" ||
                stockNumero < 0 ||
                !Number.isInteger(stockNumero)
            ) {
                mostrarErrorProducto(
                    stock,
                    "error-stock-producto",
                    "El stock debe ser un número entero igual o superior a cero."
                );

                formularioValido = false;
            } else {
                limpiarErrorProducto(
                    stock,
                    "error-stock-producto"
                );
            }

            let stockCriticoNumero = 0;

            if (stockCritico.value !== "") {
                stockCriticoNumero =
                    Number(stockCritico.value);

                if (
                    stockCriticoNumero < 0 ||
                    !Number.isInteger(stockCriticoNumero)
                ) {
                    mostrarErrorProducto(
                        stockCritico,
                        "error-stock-critico-producto",
                        "El stock crítico debe ser un número entero."
                    );

                    formularioValido = false;
                } else {
                    limpiarErrorProducto(
                        stockCritico,
                        "error-stock-critico-producto"
                    );
                }
            } else {
                limpiarErrorProducto(
                    stockCritico,
                    "error-stock-critico-producto"
                );
            }

            if (categoria.value === "") {
                mostrarErrorProducto(
                    categoria,
                    "error-categoria-producto",
                    "Debes seleccionar una categoría."
                );

                formularioValido = false;
            } else {
                limpiarErrorProducto(
                    categoria,
                    "error-categoria-producto"
                );
            }

            if (!formularioValido) {
                return;
            }

            const productos = obtenerProductosAdmin();

            if (productoId.value === "") {
                let nuevoId = 1;

                productos.forEach(function (producto) {
                    if (producto.id >= nuevoId) {
                        nuevoId = producto.id + 1;
                    }
                });

                productos.push({
                    id: nuevoId,
                    codigo: codigo.value.trim(),
                    nombre: nombre.value.trim(),
                    descripcion: descripcion.value.trim(),
                    precio: precioNumero,
                    stock: stockNumero,
                    stockCritico: stockCriticoNumero,
                    categoria: categoria.value
                });
            } else {
                const idEditar = Number(productoId.value);

                const posicion =
                    productos.findIndex(function (producto) {
                        return producto.id === idEditar;
                    });

                if (posicion !== -1) {
                    productos[posicion] = {
                        id: idEditar,
                        codigo: codigo.value.trim(),
                        nombre: nombre.value.trim(),
                        descripcion: descripcion.value.trim(),
                        precio: precioNumero,
                        stock: stockNumero,
                        stockCritico: stockCriticoNumero,
                        categoria: categoria.value
                    };
                }
            }

            guardarProductosAdmin(productos);

            document.getElementById(
                "mensaje-formulario-producto"
            ).textContent =
                "Producto guardado correctamente.";

            setTimeout(function () {
                window.location.href =
                    "productos-admin.html";
            }, 1000);
        }
    );
}

cargarProductoParaEditar();