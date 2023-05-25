<template>
  <div class="text-center">
    <h4>Login</h4>
  </div>
  <form>
    <h5>{{ mensaje }}</h5>

    <label for="inputMail">Ingresa tu mail para ingresar</label>
    <input type="email" id="inputMail" class="form-control" v-model="usuario" placeholder="yourMail@example.com"
      required />

    <label for="inputPassword">Ingresa tu contraseña</label>
    <input type="password" id="inputPassword" class="form-control" v-model="password" placeholder="tuContraseña"
      required />

    <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" v-on:click="iniciarSession()">Log
      in</button>
  </form>
  <div class="d-flex align-items-center justify-content-center pb-4">
    <p class="mb-0 me-2">¿No tienes una cuenta?</p>
    <button type="button" class="btn btn-success" v-on:click="routerRegister()">¡Create una!</button>
  </div>
</template>

<script>
import { sessionStore } from "../../stores/session";
import { useRouter } from "vue-router";
import axios from 'axios'

export default {
  data() {
    return {
      usuario: "",
      password: "",
      mensaje: "",
      storeSession: sessionStore(),
      router: useRouter(),
    };
  },
  methods: {
    async iniciarSession() {
      const url = ("https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios");
      let json = {
        "usuario": this.usuario,
        "password": this.password
      };

      if (json.usuario != "" && json.password != "") {
        axios.get(url).then(response => {
          const user = response.data.filter(user => user.mail === json.usuario && user.password === json.password);
          if (user.length > 0) {
            this.storeSession.login(user);
            this.$router.push('/').then(() => { location.reload() });
          } else { this.mensaje = "Usuario no encontrado"; }
        })  
        this.mensaje = "";
      } else {
        this.mensaje = "Usuario no encontrado";
      }
    },
    routerRegister() {
      this.router.push('/crearUsuario');
    }
  },

};
</script>
