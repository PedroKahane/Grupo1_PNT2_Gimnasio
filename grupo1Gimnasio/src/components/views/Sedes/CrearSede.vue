<template>
    <div>
      <h2>Crear Sede</h2>
      <div>
    <strong>Nombre </strong>
         <input class="m-2" type="text" v-model="sede.nombre">
         <br />
         <strong>ubicacion </strong>
         <input class="m-2" type="text" v-model="sede.ubicacion">
         <br />
         <button class="m-3" @click="createSede">Crear Sede</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useElementStore } from '../../../stores/Store';
  import { useRouter } from 'vue-router'
  import {useRoute} from 'vue-router'
  import { computed } from "vue";

 
  
  
  export default {
    setup() {
      const elementStore = useElementStore()
      elementStore.setCurrentElement({ nombre: "", ubicacion: ""})
      const sede = computed(() => elementStore.currentElement);
      const router = useRouter()
      const url = "https://645ae28c95624ceb210d09ed.mockapi.io/Sede";
    
  
    const createSede = async () => {
        await elementStore.createElement(url, sede.value)
        router.push('/sedes')
      }

      
  
      return {
        createSede,
        sede
      }
    },
  }
  </script>