<template>
     <div>
       <h2>Turnos</h2>
       <ul>
           <li v-for="turnos in elementStore.getElements" :key="turnos.id">
           <router-link :to="`/turnos/${turnos.id}`">Turno {{ turnos.id }}</router-link>
          </li>
       </ul>
       <router-link to="/crearTurno" class="nav-item nav-link" href="#">Crear Turno</router-link>
     </div>
   </template>
   
   <script>
   import { useElementStore } from "../../../stores/Common";
   import { onMounted } from "vue";
   
   export default {
     setup() {
       const elementStore = useElementStore()
   
       onMounted(() => {
           elementStore.currentElement = null
           elementStore.fetchElements("https://6460fabb491f9402f49bfa55.mockapi.io/Turno")        
       })
       return {
         elementStore,
       }
     },
   }
   </script>
   