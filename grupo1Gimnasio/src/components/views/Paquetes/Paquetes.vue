<template>
     <div>
       <h2>Paquetes</h2>
       <ul>
           <li v-for="paquetes in elementStore.getElements" :key="paquetes.id">
           <router-link :to="`/paquetes/${paquetes.id}`">{{ paquetes.nombre }}</router-link>
          </li>
       </ul>
       <router-link to="/crearPaquete" class="nav-item nav-link" href="#">Crear Paquete</router-link>
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
           elementStore.fetchElements("https://646937ca03bb12ac208876f1.mockapi.io/paquetes")        
       })
       return {
         elementStore,
       }
     },
   }
   </script>
   