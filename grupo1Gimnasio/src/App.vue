<script setup>

</script>

<template>
  <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="navbar-nav">


            <router-link to="/" class="nav-item nav-link" href="#">Home</router-link>
            <router-link to="/actividades" class="nav-item nav-link" href="#">Ver Actividades</router-link>
            <router-link to="/planes" class="nav-item nav-link" href="#">Ver Planes</router-link>
            <router-link to="/sedes" class="nav-item nav-link" href="#">Ver Sedes</router-link>

     
        </div>
      </nav>
  </header>

  
  <RouterView></RouterView>
</template>

<style scoped>

</style>
