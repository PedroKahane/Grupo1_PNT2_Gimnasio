<template>
  <div>
    <h2>Crear usuario</h2>
    <div v-if="user">
      <p>
        <strong>Nombre: </strong><input type="text" v-model="user.nombre" />
      </p>
      <p>
        <strong>Apellido: </strong><input type="text" v-model="user.apellido" />
      </p>
      <p><strong>Mail: </strong><input type="email" v-model="user.mail" /></p>
      <p>
        <strong>Contraseña: </strong
        ><input type="password" v-model="user.password" />
      </p>
      <p>
        <strong>Altura: </strong><input type="number" v-model="user.altura" />
      </p>
      <p><strong>Peso: </strong><input type="number" v-model="user.peso" /></p>
      <p><strong>Edad: </strong><input type="number" v-model="user.edad" /></p>
      <p>
        <strong>Contacto: </strong><input type="tel" v-model="user.contacto" />
      </p>
      <p hidden>
        <strong>Administrador: </strong
        ><input type="checkbox" v-model="user.administrador" />
      </p>
      <p><strong>Dni: </strong><input type="number" v-model="user.dni" /></p>
      <button @click="createUsuario">Crear Usuario</button>
    </div>
  </div>
</template>

<script>
import { useElementStore } from "../../../stores/Common";
import { useRouter } from "vue-router";
import { computed } from "vue";

export default {
  setup() {
    const elementStore = useElementStore();
    elementStore.setCurrentElement({ 
  nombre : "",
  apellido : "",
  mail : "",
  password : "",
  altura : "",
  peso : "",
  edad : "",
  contacto : "",
  administrador : false,
  dni : "", 
  idPaquete: "",
  fechaVencimiento : "",
  pago : false,
  ticketUsados : 0,
});
    const user = computed(() => elementStore.currentElement);
    const router = useRouter();
    const url = "https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios";

    const createUsuario = async () => {
      await elementStore.createElement(url, user.value);
      router.push("/usuarios");
    };

    return {
     createUsuario,
     user,
    };
  },
};
</script>
