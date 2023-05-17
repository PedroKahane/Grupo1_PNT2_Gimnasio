<template>
  <div>
    <h2>Usuarios</h2>
    <ul>
        <li v-for="user in elementStore.getElements" :key="user.id">
        <router-link :to="`/usuarios/${user.id}`">{{ user.nombre }}</router-link></li>
    </ul>
    <router-link to="/crearUsuario" class="nav-item nav-link" href="#">Crear Usuario</router-link>
  </div>
</template>

<script>
import { useelementstore } from "../../stores/Common";
import { onMounted } from "vue";

export default {
  setup() {
    const elementStore = useelementstore()

    onMounted(() => {
        elementStore.currentElement = null
        elementStore.fetchElements("https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios")        
    })
    return {
      elementStore,
    }
  },
}
</script>
