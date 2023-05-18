<template>
     <div>
       <h2>Usuarios</h2>
       <ul>
           <li v-for="actividades in elementStore.getElements" :key="actividades.id">
           <router-link :to="`/actividades/${actividades.id}`">{{ actividades.nombre }}</router-link></li>
       </ul>
       <router-link to="/crearActividad" class="nav-item nav-link" href="#">Crear Actividad</router-link>
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
           elementStore.fetchElements("https://6460fabb491f9402f49bfa55.mockapi.io/Actividades")        
       })
       return {
         elementStore,
       }
     },
   }
   </script>
   