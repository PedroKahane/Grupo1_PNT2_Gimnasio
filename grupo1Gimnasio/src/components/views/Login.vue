<template>
  <div class="container mt-4">
    <div class="text-center">
      <h4>Iniciar sesión</h4>
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card bg-light text-dark">
          <div class="card-body">
        <form>
          <label class="form group" for="inputMail"><strong>Ingresa tu mail:</strong></label>
          <input type="email" id="inputMail" class="form-control" v-model="usuario" placeholder="tuMail@ejemplo.com"
            required />
          <label class="form group" for="inputPassword"><strong>Ingresa tu contraseña:</strong></label>
          <input type="password" id="inputPassword" class="form-control" v-model="password" placeholder="tuContraseña"
            required />

          <h6 class="alert alert-danger alert-dismissible alert-sm mb-0 text-center mt-2" v-if="mensaje != ''">
            <strong>{{ mensaje }}</strong>
          </h6>

          <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mt-2 mx-auto d-block" type="button"
            v-on:click="iniciarSession()">Log in
          </button>
        </form>
        <div class="d-flex align-items-center justify-content-center mt-3">
          <p class="mb-0 me-2">¿No tienes una cuenta?</p>
          <button type="button" class="btn btn-success" v-on:click="routerRegister()">¡Create una!</button>
        </div>
      </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { sessionStore } from "../../stores/session";
import { getCookie,setCookie } from "../../stores/Cookies";
import { useRouter } from "vue-router";
import axios from 'axios'

export default {
  data() {
    return {
      usuario: "",
      password: "",
      mensaje: "",
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
            setCookie(user);
            this.$router.push('/').then(() => { location.reload() });
          } else { this.mensaje = "Mail o Contraseña incorrectos."; }
        })
        this.mensaje = "";
      } else {
        this.mensaje = "Complete los campos para acceder a su cuenta.";
      }
    },
    routerRegister() {
      this.router.push('/crearUsuario');
    }
  },

};
</script>
