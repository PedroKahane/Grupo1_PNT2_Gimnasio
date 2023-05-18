<template>
  <div>
    <h2>Profesores</h2>
    <ul>
        <li v-for="profesor in elementStore.getElements" :key="profesor.id">
        <router-link :to="`/profesores/${profesor.id}`">{{ profesor.nombre }}</router-link></li>
    </ul>
    <router-link to="/crearProfesor" class="nav-item nav-link" href="#">Crear Profesor</router-link>
  </div>
</template>

<script>
import { useelementstore } from "../../../stores/Common";
import { onMounted } from "vue";

export default {
  setup() {
    const elementStore = useelementstore()

    onMounted(() => {
        elementStore.currentElement = null
        elementStore.fetchElements("https://64662c65228bd07b355ddc69.mockapi.io/profesores")        
    })
    return {
      elementStore,
    }
  },
}
</script>
