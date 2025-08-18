const d = document;
let rolInput = d.querySelector("#rol-usuario");
let usuarioInput = d.querySelector("#nombre-usuario-input");
let contrasenaInput = d.querySelector("#contrasena-usuario");
let confirmarContrasenaInput = d.querySelector("#confirmar-contrasena");
let btnCreate;
let btnUpdate;



// Evento al cargar el DOM
d.addEventListener("DOMContentLoaded", () => { 
    btnCreate = d.querySelector(".btn-create");
    btnUpdate = d.querySelector(".btn-update");

    // Evento para crear usuario
    btnCreate.addEventListener("click", () => {
        let dataUser = getDataUser();
        if (dataUser) {
            sendDataUser(dataUser);
        }
    });
    let userEdit = JSON.parse(localStorage.getItem("userEdit"));
    if (userEdit != null) {
        localStorage.removeItem("userEdit");
        updateDataUser(userEdit);
    } else {
        prepararFormularioParaCrear();
    }

});

let prepararFormularioParaCrear = () => {
    btnCreate.classList.remove("d-none");
    btnUpdate.classList.add("d-none");
};

let getDataUser = () => {
    if (
        rolInput.value &&
        usuarioInput.value &&
        contrasenaInput.value &&
        confirmarContrasenaInput.value
    ) {
        if (contrasenaInput.value !== confirmarContrasenaInput.value) {
            alert("Las contraseñas no coinciden");
            return null;
        }

        let usuario = {
            rol: rolInput.value,
            usuario: usuarioInput.value,
            contrasena: contrasenaInput.value
        };

        // Limpiar campos
        rolInput.value = "";
        usuarioInput.value = "";
        contrasenaInput.value = "";
        confirmarContrasenaInput.value = "";

        return usuario;
    } else {
        alert("Todos los campos son obligatorios");
        return null;
    }
};

let sendDataUser = async (data) => {
    let url = "http://localhost/backend-apicrud/index.php?url=usuarios";

    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (respuesta.status === 406) {
            alert("Los datos enviados no son válidos");
        } else {
            let mensaje = await respuesta.json();
            alert("✅ Usuario creado con éxito");
            location.href = "../listado-usuarios.html";
        }

    } catch (error) {
        console.error("Error al enviar datos:", error);
    }
};

let updateDataUser = (userEdit) => {
    // Rellenar campos del formulario
    rolInput.value = userEdit.rol;
    usuarioInput.value = userEdit.usuario;
    contrasenaInput.value = userEdit.contrasena;
    confirmarContrasenaInput.value = userEdit.contrasena;

    // Alternar botones
    btnCreate.classList.add("d-none");
    btnUpdate.classList.remove("d-none");

    // Evento para actualizar
    btnUpdate.addEventListener("click", () => {
        if (contrasenaInput.value !== confirmarContrasenaInput.value) {
            alert("Las contraseñas no coinciden");
            return;
        }

        let user = {
            id_usuario: userEdit.id_usuario,
            rol: rolInput.value,
            usuario: usuarioInput.value,
            contrasena: contrasenaInput.value
        };

        sendUpdateUser(user);
    });
};

let sendUpdateUser = async (user) => {
    let url = "http://localhost/backend-apicrud/index.php?url=usuarios";

    try {
        let respuesta = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (respuesta.status === 406) {
            alert("Los datos enviados no son válidos");
        } else {
            let mensaje = await respuesta.json();
            alert("✅ Usuario actualizado con éxito");
            location.href = "../listado-usuarios.html";
        }
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
    }
};
