<template>
    <div>
      <h2>Crear Sede</h2>
      <div>
        <input type="text" v-model="currentNombre">
        <input type="text" v-model="currentUbicacion">
        <button @click="createSede">Crear Sede</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useSedeStore } from '../../stores/Sedes';  
  import { useRouter } from 'vue-router'
  import {useRoute} from 'vue-router'
 
  
  
  export default {
    setup() {
      const sedeStore = useSedeStore()
      const router = useRouter()
      const route = useRoute()
      const sedeId = sedeStore.sedes.length
    
    const sedeNueva = {
        idSede : sedeId,
        nombre : sedeStore.currentNombre,
        ubicacion : sedeStore.currentUbicacion
    }
    const createSede = async () => {
        await sedeStore.createSede(sedeNueva)
        router.push('/sedes')
      }

      
  
      return {
        createSede
      }
    },
  }
  </script>