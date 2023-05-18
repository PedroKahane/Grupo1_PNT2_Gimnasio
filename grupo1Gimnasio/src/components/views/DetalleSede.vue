<template>
    <div>
      <h2>Detalle sede</h2>
      <div v-if="sede">
        <input type="text" v-model="sede.nombre">
        <p>Ubicacion: {{ sede.ubicacion }}</p> 
        <button @click="deleteSede">Borrar Sede</button>
        <button @click="updateSede">Actualizar Sede</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useSedeStore } from '../../stores/Sedes';  
  import { useRouter } from 'vue-router'
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'
  
  
  export default {
    setup() {
      const sedeStore = useSedeStore()
      const router = useRouter()
      const route = useRoute()
      const sedeId = route.params.id.toString()
      
      sedeStore.fetchSedeById(sedeId)
      // const user = userStore.currentUser

      const sede = computed(() => sedeStore.currentSede)

      const updateSede = async () => {
        await sedeStore.updateSede(sedeStore.currentSede)
        router.push('/sedes')
      }

    const deleteSede = async () => {
        await sedeStore.deleteSede(sedeId)
        router.push('/sedes')
      }

      
  
      return {
        sede,
        deleteSede,
        updateSede
      }
    },
  }
  </script>