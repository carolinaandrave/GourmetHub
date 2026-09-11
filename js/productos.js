// Contiene la información de los productos
const listaProductos = [
    {
        id: 1,
        nombre: "Aceite de oliva extra virgen",
        precio: 12990,
        imagen: "../images/aceite-oliva.jpg",
        descripcion: "Aceite de oliva de sabor suave y aroma intenso."
    },
    {
        id: 2,
        nombre: "Chocolate para repostería",
        precio: 8990,
        imagen: "../images/chocolate.jpg",
        descripcion: "Chocolate ideal para postres y preparaciones dulces."
    },
    {
        id: 3,
        nombre: "Café de especialidad",
        precio: 10990,
        imagen: "../images/cafe.jpg",
        descripcion: "Café en grano seleccionado y de tueste medio."
    }
];

// Se obtiene el contenedor donde aparecerán los productos
const contenedorProductos =
    document.getElementById("lista-productos");

// recorre el arreglo y crea una tarjeta por producto
function mostrarProductos() {
    contenedorProductos.innerHTML = "";

    listaProductos.forEach(function (producto) {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");

        tarjeta.innerHTML = `
            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
            >

            <h3>${producto.nombre}</h3>

            <p>${producto.descripcion}</p>

            <p class="precio">
                $${producto.precio.toLocaleString("es-CL")}
            </p>

            <a
                href="detalle-producto.html?id=${producto.id}"
                class="boton"
            >
                Ver detalle
            </a>

            <button
                type="button"
                class="boton"
                data-id="${producto.id}"
            >
                Añadir al carrito
            </button>
        `;

        const botonAgregar = tarjeta.querySelector("button");

        botonAgregar.addEventListener("click", function () {
            agregarAlCarrito(producto);
        });

        contenedorProductos.appendChild(tarjeta);
    });
}

mostrarProductos();