<template>
  <div class="container mt-4 ">
    <div class="text-center">
      <h4>Registrarse</h4>
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3" v-if="user">
        <div class="card bg-light text-dark mb-5">
          <div class="card-body">
            <p>
              <strong>Nombre: </strong><input class="form-control" type="text" v-model="user.nombre"
                placeholder="tuNombre" />
            </p>
            <p>
              <strong>Apellido: </strong><input class="form-control" type="text" v-model="user.apellido"
                placeholder="tuApellido" />
            </p>
            <p><strong>Mail: </strong><input class="form-control" type="email" v-model="user.mail"
                placeholder="tuMail@ejemplo.com" /></p>
            <p>
              <strong>Contraseña: </strong><input class="form-control" type="password" v-model="user.password"
                placeholder="tuContraseña" />
            </p>
            <p>
              <strong>Altura: </strong><input class="form-control" type="number" v-model="user.altura"
                placeholder="180 (en cm)" />
            </p>
            <p><strong>Peso: </strong><input class="form-control" type="number" v-model="user.peso"
                placeholder="80 (en kg)" /></p>
            <p><strong>Edad: </strong><input class="form-control" type="number" v-model="user.edad"
                placeholder="45 (0 - 100)" /></p>
            <p>
              <strong>Contacto: </strong><input class="form-control" type="tel" v-model="user.contacto"
                placeholder="11 12345678" />
            </p>
            <p hidden>
              <strong>Administrador: </strong><input class="form-control" type="checkbox" v-model="user.administrador" />
            </p>
            <p><strong>Dni: </strong><input class="form-control" type="number" v-model="user.dni"
                placeholder="12345678" /></p>
            <button class="btn btn-primary mx-auto d-block" @click="createUsuario">Crear cuenta</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useElementStore } from "../../../stores/Store";
import { useRouter } from "vue-router";
import { computed } from "vue";

export default {
  setup() {
    const elementStore = useElementStore("usuarios")();
    elementStore.setCurrentElement({
      nombre: "",
      apellido: "",
      mail: "",
      password: "",
      altura: "",
      peso: "",
      edad: "",
      contacto: "",
      administrador: false,
      dni: "",
      ticketsRestantes: 0,
    });
    const user = computed(() => elementStore.currentElement);
    const router = useRouter();
    const url = "https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios";

    const createUsuario = async () => {
      if(elementStore.confirm("crear", "registrado", "Usuario")){
        await elementStore.createElement(url, user.value);
        router.push("/login");
      }
    };

    return {
      createUsuario,
      user,
    };
  },
};
</script>
