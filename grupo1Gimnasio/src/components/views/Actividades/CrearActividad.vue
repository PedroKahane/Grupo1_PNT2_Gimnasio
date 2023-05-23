<template>
     <div>
       <h2>Crear Paquete</h2>
       <div>
         <strong>Nombre </strong>
         <input class="m-2" type="text" v-model="actividad.nombre">
         <br />
         <strong>Duracion </strong>
         <input class="m-2" type="text" v-model="actividad.duracion">
         <br />
         <button class="m-3" @click="createActividad">Crear Actividad</button>
       </div>
     </div>
   </template>
      
   <script>
   import { useElementStore } from '../../../stores/Common';
   import { useRouter } from 'vue-router'
   import { computed } from "vue";
   
   
   export default {
     setup() {
       const elementStore = useElementStore()
       elementStore.setCurrentElement({ nombre: "", duracion: "", })
       const actividad = computed(() => elementStore.currentElement);
       const router = useRouter()
       const url = "https://6460fabb491f9402f49bfa55.mockapi.io/Actividades";
   
       const createActividad = async () => {
         await elementStore.createElement(url, actividad.value)
         router.push('/actividades')
       }
   
       return {
         createActividad,
         actividad
       }
     },
   }
   </script>