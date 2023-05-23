<template>
    <div>
      <h2>Crear Sede</h2>
      <div>
    <strong>Nombre </strong>
         <input class="m-2" type="text" v-model="sedeNueva.nombre">
         <br />
         <strong>ubicacion </strong>
         <input class="m-2" type="text" v-model="sedeNueva.ubicacion">
         <br />
        <button @click="createSede">Crear Sede</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useSedeStore } from '../../../stores/Sedes';  
  import { useRouter } from 'vue-router'
  import {useRoute} from 'vue-router'
 
  
  
  export default {
    setup() {
      const sedeStore = useSedeStore()
      const router = useRouter()
    
    const sedeNueva = {
        nombre : "",
        ubicacion : ""
    }
    const createSede = async () => {
        await sedeStore.createSede(sedeNueva)
        router.push('/sedes')
      }

      
  
      return {
        createSede,
        sedeNueva
      }
    },
  }
  </script>