<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="navbar-nav">
        <router-link to="/" class="nav-item nav-link" href="#">Home</router-link>
        <router-link to="/actividades" class="nav-item nav-link" href="#">Ver Actividades</router-link>
        <router-link to="/paquetes" class="nav-item nav-link" href="#">Paquetes</router-link>
        <router-link to="/turnos" class="nav-item nav-link" href="#">Turnos</router-link>
        <router-link to="/sedes" class="nav-item nav-link" href="#">Ver Sedes</router-link>
        <router-link to="/usuarios" class="nav-item nav-link" href="#">Usuarios</router-link>
        <router-link to="/profesores" class="nav-item nav-link" href="#">Profesores</router-link>
        <router-link v-if="usuario == null" to="/login" class="nav-item nav-link" href="#">Iniciar Sesión</router-link>
        <router-link v-if="usuario == null" to="/crearUsuario" class="nav-item nav-link" href="#">Registrate</router-link>
        <router-link v-else to="/" class="nav-item nav-link" href="#" v-on:click="cerrarSesion">Log out</router-link>
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

    function cerrarSesion(){
      document.cookie = 'usuario' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      location.reload();
    }

    return {
      usuario,
      cerrarSesion
    }
  }
}
</script>