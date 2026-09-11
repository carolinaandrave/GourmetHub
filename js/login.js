// Se obtienen los elementos del formulario mediante sus identificadores
const formularioLogin = document.getElementById("formulario-login");
const correoLogin = document.getElementById("correo-login");
const contrasenaLogin = document.getElementById("contrasena-login");
const mensajeLogin = document.getElementById("mensaje-login");

// Muestra un mensaje de error y marca el campo en rojo
function mostrarErrorLogin(campo, idMensaje, mensaje) {
    document.getElementById(idMensaje).textContent = mensaje;
    campo.classList.add("campo-error");
}

// Limpia el mensaje cuando el campo es válido
function limpiarErrorLogin(campo, idMensaje) {
    document.getElementById(idMensaje).textContent = "";
    campo.classList.remove("campo-error");
}

// Valida los datos cuando el usuario presiona Ingresar
formularioLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let formularioValido = true;

    mensajeLogin.textContent = "";
    mensajeLogin.classList.remove("mensaje-login-error");

    const correoIngresado =
        correoLogin.value.trim().toLowerCase();

    const dominioValido =
        correoIngresado.endsWith("@duoc.cl") ||
        correoIngresado.endsWith("@profesor.duoc.cl") ||
        correoIngresado.endsWith("@gmail.com");

    if (correoIngresado === "") {
        mostrarErrorLogin(
            correoLogin,
            "error-correo-login",
            "El correo electrónico es obligatorio."
        );

        formularioValido = false;
    } else if (!dominioValido) {
        mostrarErrorLogin(
            correoLogin,
            "error-correo-login",
            "Utiliza un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );

        formularioValido = false;
    } else {
        limpiarErrorLogin(
            correoLogin,
            "error-correo-login"
        );
    }

    if (contrasenaLogin.value === "") {
        mostrarErrorLogin(
            contrasenaLogin,
            "error-contrasena-login",
            "La contraseña es obligatoria."
        );

        formularioValido = false;
    } else if (
        contrasenaLogin.value.length < 4 ||
        contrasenaLogin.value.length > 10
    ) {
        mostrarErrorLogin(
            contrasenaLogin,
            "error-contrasena-login",
            "La contraseña debe tener entre 4 y 10 caracteres."
        );

        formularioValido = false;
    } else {
        limpiarErrorLogin(
            contrasenaLogin,
            "error-contrasena-login"
        );
    }

    if (formularioValido) {
    mensajeLogin.textContent =
        "Inicio de sesión realizado correctamente.";

    formularioLogin.reset();

    // Espera un segundo y abre el panel administrativo
    setTimeout(function () {
        window.location.href =
            "../admin/inicio-admin.html";
    }, 1000);
}
});