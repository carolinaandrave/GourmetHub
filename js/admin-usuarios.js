// Usuarios de ejemplo del sistema
const usuariosIniciales = [
    {
        id: 1,
        run: "111111111",
        nombre: "Ana",
        apellidos: "Pérez Soto",
        correo: "ana@gmail.com",
        region: "Metropolitana de Santiago",
        comuna: "Santiago",
        tipo: "Administrador"
    },
    {
        id: 2,
        run: "222222222",
        nombre: "Luis",
        apellidos: "Rojas Díaz",
        correo: "luis@duoc.cl",
        region: "Valparaíso",
        comuna: "Valparaíso",
        tipo: "Vendedor"
    },
    {
        id: 3,
        run: "333333333",
        nombre: "María",
        apellidos: "Silva Muñoz",
        correo: "maria@gmail.com",
        region: "Biobío",
        comuna: "Concepción",
        tipo: "Cliente"
    }
];

// Recupera los usuarios guardados
function obtenerUsuariosAdmin() {
    const usuariosGuardados =
        localStorage.getItem("usuariosAdminGourmet");

    if (usuariosGuardados === null) {
        localStorage.setItem(
            "usuariosAdminGourmet",
            JSON.stringify(usuariosIniciales)
        );

        return usuariosIniciales;
    }

    return JSON.parse(usuariosGuardados);
}

// Guarda los cambios realizados
function guardarUsuariosAdmin(usuarios) {
    localStorage.setItem(
        "usuariosAdminGourmet",
        JSON.stringify(usuarios)
    );
}

// Muestra los usuarios dentro de la tabla
function mostrarUsuariosAdmin() {
    const tabla =
        document.getElementById("tabla-usuarios-admin");

    if (tabla === null) {
        return;
    }

    const usuarios = obtenerUsuariosAdmin();
    tabla.innerHTML = "";

    if (usuarios.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="7">
                    No existen usuarios registrados.
                </td>
            </tr>
        `;

        return;
    }

    usuarios.forEach(function (usuario) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${usuario.run}</td>

            <td>
                ${usuario.nombre} ${usuario.apellidos}
            </td>

            <td>${usuario.correo}</td>
            <td>${usuario.region}</td>
            <td>${usuario.comuna}</td>
            <td>${usuario.tipo}</td>

            <td>
                <a
                    href="usuario-formulario.html?id=${usuario.id}"
                    class="boton-tabla boton-editar"
                >
                    Editar
                </a>

                <button
                    type="button"
                    class="boton-tabla boton-borrar"
                    onclick="eliminarUsuarioAdmin(${usuario.id})"
                >
                    Eliminar
                </button>
            </td>
        `;

        tabla.appendChild(fila);
    });
}

// Elimina un usuario después de solicitar confirmación
function eliminarUsuarioAdmin(idUsuario) {
    const confirmacion = confirm(
        "¿Deseas eliminar este usuario?"
    );

    if (!confirmacion) {
        return;
    }

    const usuarios = obtenerUsuariosAdmin();

    const usuariosActualizados =
        usuarios.filter(function (usuario) {
            return usuario.id !== idUsuario;
        });

    guardarUsuariosAdmin(usuariosActualizados);
    mostrarUsuariosAdmin();

    const mensaje =
        document.getElementById("mensaje-usuarios-admin");

    mensaje.textContent =
        "Usuario eliminado correctamente.";
}

// Ejecuta la función al cargar la página
mostrarUsuariosAdmin();

// Arreglo que relaciona cada región con sus comunas
const regionesComunas = [
    {
        region: "Arica y Parinacota",
        comunas: ["Arica", "Camarones", "Putre"]
    },
    {
        region: "Tarapacá",
        comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte"]
    },
    {
        region: "Antofagasta",
        comunas: ["Antofagasta", "Calama", "Tocopilla"]
    },
    {
        region: "Atacama",
        comunas: ["Copiapó", "Caldera", "Vallenar"]
    },
    {
        region: "Coquimbo",
        comunas: ["La Serena", "Coquimbo", "Ovalle"]
    },
    {
        region: "Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Quilpué"]
    },
    {
        region: "Metropolitana de Santiago",
        comunas: ["Santiago", "Maipú", "Puente Alto", "Providencia"]
    },
    {
        region: "O'Higgins",
        comunas: ["Rancagua", "Machalí", "San Fernando"]
    },
    {
        region: "Maule",
        comunas: ["Talca", "Curicó", "Linares"]
    },
    {
        region: "Ñuble",
        comunas: ["Chillán", "Bulnes", "San Carlos"]
    },
    {
        region: "Biobío",
        comunas: ["Concepción", "Talcahuano", "Los Ángeles"]
    },
    {
        region: "La Araucanía",
        comunas: ["Temuco", "Villarrica", "Pucón"]
    },
    {
        region: "Los Ríos",
        comunas: ["Valdivia", "La Unión", "Río Bueno"]
    },
    {
        region: "Los Lagos",
        comunas: ["Puerto Montt", "Osorno", "Castro"]
    },
    {
        region: "Aysén",
        comunas: ["Coyhaique", "Aysén", "Chile Chico"]
    },
    {
        region: "Magallanes",
        comunas: ["Punta Arenas", "Puerto Natales", "Porvenir"]
    }
];

const selectorRegion =
    document.getElementById("region-usuario");

const selectorComuna =
    document.getElementById("comuna-usuario");

// Llena el selector de regiones
function cargarRegiones() {
    if (selectorRegion === null) {
        return;
    }

    regionesComunas.forEach(function (elemento) {
        const opcion = document.createElement("option");

        opcion.value = elemento.region;
        opcion.textContent = elemento.region;

        selectorRegion.appendChild(opcion);
    });
}

// Cambia las comunas según la región seleccionada
function cargarComunas() {
    selectorComuna.innerHTML = `
        <option value="">
            Seleccione una comuna
        </option>
    `;

    const regionSeleccionada =
        regionesComunas.find(function (elemento) {
            return elemento.region === selectorRegion.value;
        });

    if (regionSeleccionada === undefined) {
        selectorComuna.disabled = true;
        return;
    }

    regionSeleccionada.comunas.forEach(function (comuna) {
        const opcion = document.createElement("option");

        opcion.value = comuna;
        opcion.textContent = comuna;

        selectorComuna.appendChild(opcion);
    });

    selectorComuna.disabled = false;
}

if (
    selectorRegion !== null &&
    selectorComuna !== null
) {
    cargarRegiones();

    selectorRegion.addEventListener(
        "change",
        cargarComunas
    );
}

// Verifica que el RUN chileno sea correcto
function validarRun(run) {
    const runLimpio = run.trim().toUpperCase();

    if (runLimpio.length < 7 || runLimpio.length > 9) {
        return false;
    }

    const cuerpo = runLimpio.slice(0, -1);
    const digitoIngresado = runLimpio.slice(-1);

    if (!/^[0-9]+$/.test(cuerpo)) {
        return false;
    }

    if (!/^[0-9K]$/.test(digitoIngresado)) {
        return false;
    }

    let suma = 0;
    let factor = 2;

    for (
        let posicion = cuerpo.length - 1;
        posicion >= 0;
        posicion = posicion - 1
    ) {
        suma = suma + Number(cuerpo[posicion]) * factor;
        factor = factor + 1;

        if (factor > 7) {
            factor = 2;
        }
    }

    const resultado = 11 - (suma % 11);
    let digitoCorrecto = "";

    if (resultado === 11) {
        digitoCorrecto = "0";
    } else if (resultado === 10) {
        digitoCorrecto = "K";
    } else {
        digitoCorrecto = String(resultado);
    }

    return digitoIngresado === digitoCorrecto;
}

const formularioUsuario =
    document.getElementById("formulario-usuario");

// Muestra un error debajo del campo
function mostrarErrorUsuario(campo, idMensaje, mensaje) {
    document.getElementById(idMensaje).textContent = mensaje;
    campo.classList.add("campo-error");
}

// Limpia el error de un campo
function limpiarErrorUsuario(campo, idMensaje) {
    document.getElementById(idMensaje).textContent = "";
    campo.classList.remove("campo-error");
}

// Carga la información cuando se selecciona Editar
function cargarUsuarioParaEditar() {
    if (formularioUsuario === null) {
        return;
    }

    const parametros =
        new URLSearchParams(window.location.search);

    const idDireccion = parametros.get("id");

    if (idDireccion === null) {
        return;
    }

    const idUsuario = Number(idDireccion);
    const usuarios = obtenerUsuariosAdmin();

    const usuario =
        usuarios.find(function (item) {
            return item.id === idUsuario;
        });

    if (usuario === undefined) {
        return;
    }

    document.getElementById("usuario-id").value = usuario.id;
    document.getElementById("run-usuario").value = usuario.run;
    document.getElementById("nombre-usuario").value = usuario.nombre;

    document.getElementById("apellidos-usuario").value =
        usuario.apellidos;

    document.getElementById("correo-usuario").value =
        usuario.correo;

    document.getElementById("fecha-usuario").value =
        usuario.fecha || "";

    document.getElementById("tipo-usuario").value =
        usuario.tipo;

    selectorRegion.value = usuario.region;
    cargarComunas();
    selectorComuna.value = usuario.comuna;

    document.getElementById("direccion-usuario").value =
        usuario.direccion || "";

    document.getElementById(
        "titulo-formulario-usuario"
    ).textContent = "Editar usuario";
}

// Valida y guarda el formulario
if (formularioUsuario !== null) {
    formularioUsuario.addEventListener(
        "submit",
        function (evento) {
            evento.preventDefault();

            let formularioValido = true;

            const usuarioId =
                document.getElementById("usuario-id");

            const run =
                document.getElementById("run-usuario");

            const nombre =
                document.getElementById("nombre-usuario");

            const apellidos =
                document.getElementById("apellidos-usuario");

            const correo =
                document.getElementById("correo-usuario");

            const fecha =
                document.getElementById("fecha-usuario");

            const tipo =
                document.getElementById("tipo-usuario");

            const direccion =
                document.getElementById("direccion-usuario");

            if (!validarRun(run.value)) {
                mostrarErrorUsuario(
                    run,
                    "error-run-usuario",
                    "Ingresa un RUN válido sin puntos ni guion."
                );

                formularioValido = false;
            } else {
                limpiarErrorUsuario(
                    run,
                    "error-run-usuario"
                );
            }

            if (nombre.value.trim() === "") {
                mostrarErrorUsuario(
                    nombre,
                    "error-nombre-usuario",
                    "El nombre es obligatorio."
                );

                formularioValido = false;
            } else {
                limpiarErrorUsuario(
                    nombre,
                    "error-nombre-usuario"
                );
            }

            if (apellidos.value.trim() === "") {
                mostrarErrorUsuario(
                    apellidos,
                    "error-apellidos-usuario",
                    "Los apellidos son obligatorios."
                );

                formularioValido = false;
            } else {
                limpiarErrorUsuario(
                    apellidos,
                    "error-apellidos-usuario"
                );
            }

            const correoIngresado =
                correo.value.trim().toLowerCase();

            const dominioValido =
                correoIngresado.endsWith("@duoc.cl") ||
                correoIngresado.endsWith("@profesor.duoc.cl") ||
                correoIngresado.endsWith("@gmail.com");

            if (
                correoIngresado === "" ||
                !dominioValido
            ) {
                mostrarErrorUsuario(
                    correo,
                    "error-correo-usuario",
                    "Utiliza un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
                );

                formularioValido = false;
            } else {
                limpiarErrorUsuario(
                    correo,
                    "error-correo-usuario"
                );
            }

            if (tipo.value === "") {
                mostrarErrorUsuario(
                    tipo,
                    "error-tipo-usuario",
                    "Selecciona un tipo de usuario."
                );

                formularioValido = false;
            } else {
                limpiarErrorUsuario(
                    tipo,
                    "error-tipo-usuario"
                );
            }

            if (selectorRegion.value === "") {
                mostrarErrorUsuario(
                    selectorRegion,
                    "error-region-usuario",
                    "Selecciona una región."
                );

                formularioValido = false;
            } else {
                limpiarErrorUsuario(
                    selectorRegion,
                    "error-region-usuario"
                );
            }

            if (selectorComuna.value === "") {
                mostrarErrorUsuario(
                    selectorComuna,
                    "error-comuna-usuario",
                    "Selecciona una comuna."
                );

                formularioValido = false;
            } else {
                limpiarErrorUsuario(
                    selectorComuna,
                    "error-comuna-usuario"
                );
            }

            if (direccion.value.trim() === "") {
                mostrarErrorUsuario(
                    direccion,
                    "error-direccion-usuario",
                    "La dirección es obligatoria."
                );

                formularioValido = false;
            } else {
                limpiarErrorUsuario(
                    direccion,
                    "error-direccion-usuario"
                );
            }

            if (!formularioValido) {
                return;
            }

            const usuarios = obtenerUsuariosAdmin();

            if (usuarioId.value === "") {
                let nuevoId = 1;

                usuarios.forEach(function (usuario) {
                    if (usuario.id >= nuevoId) {
                        nuevoId = usuario.id + 1;
                    }
                });

                usuarios.push({
                    id: nuevoId,
                    run: run.value.trim().toUpperCase(),
                    nombre: nombre.value.trim(),
                    apellidos: apellidos.value.trim(),
                    correo: correoIngresado,
                    fecha: fecha.value,
                    tipo: tipo.value,
                    region: selectorRegion.value,
                    comuna: selectorComuna.value,
                    direccion: direccion.value.trim()
                });
            } else {
                const idEditar = Number(usuarioId.value);

                const posicion =
                    usuarios.findIndex(function (usuario) {
                        return usuario.id === idEditar;
                    });

                if (posicion !== -1) {
                    usuarios[posicion] = {
                        id: idEditar,
                        run: run.value.trim().toUpperCase(),
                        nombre: nombre.value.trim(),
                        apellidos: apellidos.value.trim(),
                        correo: correoIngresado,
                        fecha: fecha.value,
                        tipo: tipo.value,
                        region: selectorRegion.value,
                        comuna: selectorComuna.value,
                        direccion: direccion.value.trim()
                    };
                }
            }

            guardarUsuariosAdmin(usuarios);

            document.getElementById(
                "mensaje-formulario-usuario"
            ).textContent =
                "Usuario guardado correctamente.";

            setTimeout(function () {
                window.location.href = "usuarios-admin.html";
            }, 1000);
        }
    );
}

cargarUsuarioParaEditar();