// Se obtienen los elementos del formulario
const formularioContacto =
    document.getElementById("formulario-contacto");

const nombreContacto =
    document.getElementById("nombre-contacto");

const correoContacto =
    document.getElementById("correo-contacto");

const comentarioContacto =
    document.getElementById("comentario-contacto");

const cantidadCaracteres =
    document.getElementById("cantidad-caracteres");

const mensajeContacto =
    document.getElementById("mensaje-contacto");

// Actualiza el contador mientras el usuario escribe
comentarioContacto.addEventListener("input", function () {
    cantidadCaracteres.textContent =
        comentarioContacto.value.length;
});

// Muestra el error debajo del campo correspondiente
function mostrarErrorContacto(campo, idMensaje, mensaje) {
    document.getElementById(idMensaje).textContent = mensaje;
    campo.classList.add("campo-error");
}

// Limpia el mensaje cuando el dato es correcto
function limpiarErrorContacto(campo, idMensaje) {
    document.getElementById(idMensaje).textContent = "";
    campo.classList.remove("campo-error");
}

// Revisa la información antes de enviar el formulario
formularioContacto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let formularioValido = true;
    mensajeContacto.textContent = "";

    if (nombreContacto.value.trim() === "") {
        mostrarErrorContacto(
            nombreContacto,
            "error-nombre-contacto",
            "El nombre es obligatorio."
        );

        formularioValido = false;
    } else {
        limpiarErrorContacto(
            nombreContacto,
            "error-nombre-contacto"
        );
    }

    const correoIngresado =
        correoContacto.value.trim().toLowerCase();

    const dominioValido =
        correoIngresado.endsWith("@duoc.cl") ||
        correoIngresado.endsWith("@profesor.duoc.cl") ||
        correoIngresado.endsWith("@gmail.com");

    if (correoIngresado === "") {
        mostrarErrorContacto(
            correoContacto,
            "error-correo-contacto",
            "El correo electrónico es obligatorio."
        );

        formularioValido = false;
    } else if (!dominioValido) {
        mostrarErrorContacto(
            correoContacto,
            "error-correo-contacto",
            "Utiliza un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );

        formularioValido = false;
    } else {
        limpiarErrorContacto(
            correoContacto,
            "error-correo-contacto"
        );
    }

    if (comentarioContacto.value.trim() === "") {
        mostrarErrorContacto(
            comentarioContacto,
            "error-comentario-contacto",
            "El comentario es obligatorio."
        );

        formularioValido = false;
    } else if (comentarioContacto.value.length > 500) {
        mostrarErrorContacto(
            comentarioContacto,
            "error-comentario-contacto",
            "El comentario no puede superar los 500 caracteres."
        );

        formularioValido = false;
    } else {
        limpiarErrorContacto(
            comentarioContacto,
            "error-comentario-contacto"
        );
    }

    if (formularioValido) {
        mensajeContacto.textContent =
            "Tu mensaje fue enviado correctamente.";

        formularioContacto.reset();
        cantidadCaracteres.textContent = "0";
    }
});