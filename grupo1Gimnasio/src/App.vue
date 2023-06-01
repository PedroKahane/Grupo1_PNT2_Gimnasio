<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
          <router-link v-if="usuario != null" :to="`/usuarios/${id}`" class="nav-item nav-link" href="#">{{ nombreUsuario }}</router-link>
          <router-link v-if="usuario == null" to="/login" class="nav-item nav-link">Iniciar Sesión</router-link>
          <router-link v-if="usuario == null" to="/crearUsuario" class="nav-item nav-link">Registrate</router-link>
          <router-link v-else to="/" class="nav-item nav-link" v-on:click="cerrarSesion">Log out</router-link>
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