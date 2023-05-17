<template>
    <div>
      <h2>Lista de sedes</h2>
      <ul>
        <li v-for="sede in sedes" :key="sede.idSede">
          <router-link :to="`/sedes/${sede.idSede}`">{{ sede.nombre }}</router-link>
        </li>
        <router-link to="/crearSede" class="nav-item nav-link" href="#">Crear Sede</router-link>
      </ul>
    </div>
</template>
  
  <script>
import { useSedeStore } from '../../stores/Sedes';  
import { onMounted, computed } from 'vue'

export default {
  setup() {
    const sedeStore = useSedeStore()

    // Llamar al método fetchUsers al iniciar la vista
    onMounted(() => {
      sedeStore.currentSede = null
      sedeStore.fetchSedes()
      
    })

    //const users = userStore.getUsers
    const sedes = computed(() => sedeStore.getSedes)

      return {
        sedes,
      }
  },
}
</script>