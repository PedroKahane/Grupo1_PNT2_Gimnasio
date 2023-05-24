<script setup>

</script>

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
        </div>
      </nav>
  </header>
  <RouterView></RouterView>
</template>

<style scoped>
</style>
