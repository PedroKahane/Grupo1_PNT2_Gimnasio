<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar shadow-sm">
      <div class="container-fluid">
        <div class="navbar-nav mr-auto">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
          <router-link to="/actividades" class="nav-item nav-link">Actividades</router-link>
          <router-link to="/paquetes" class="nav-item nav-link">Paquetes</router-link>
          <router-link to="/turnos" class="nav-item nav-link">Turnos</router-link>
          <router-link to="/sedes" class="nav-item nav-link">Sedes</router-link>
          <router-link to="/profesores" class="nav-item nav-link" href="#">Profesores</router-link>
          <router-link to="/usuarios" class="nav-item nav-link" href="#">Usuarios</router-link>
        </div>
        <div class="navbar-nav ml-auto">
          <router-link v-if="usuario != null" :to="`/usuarios/${id}`" class="nav-item nav-link d-flex align-items-center"
            href="#">
            <span class="ml-2">{{ nombreUsuario }}</span>
            <img src="../src/icons/User Icon.svg" style="width: 20px; height: 20px; margin-left: 8px; opacity: 0.8;"
              alt="Icono de Usuario">
          </router-link>
          <div v-else class="d-flex">
            <router-link to="/login" class="nav-item nav-link mr-2">Iniciar Sesión</router-link>
            <router-link to="/crearUsuario" class="nav-item nav-link">Registrate</router-link>
          </div>
          <router-link v-if="usuario != null" to="/" class="nav-item nav-link" v-on:click="cerrarSesion">Log out</router-link>
        </div>

      </div>
    </nav>

  </header>
  <RouterView></RouterView>
</template>
<script>
import Cookies from "js-cookie";

export default {
  setup() {
    const usuario = Cookies.get('usuario');
    var admin = null;
    var nombreUsuario = null;
    var id = null;

    if (usuario) {
      var objeto = JSON.parse(usuario)[0];
      admin = objeto.administrador; // PARA LAS ACCIONES QUE REQUIERAN SOLO EL ADMIN, USEN v-if="admin"
      nombreUsuario = objeto.nombre;
      id = objeto.id;
      //console.log(admin)
    }

    function cerrarSesion() {
      document.cookie = 'usuario' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      location.reload();
    }

    return {
      id,
      nombreUsuario,
      admin,
      usuario,
      cerrarSesion,
    }
  }
}
</script>