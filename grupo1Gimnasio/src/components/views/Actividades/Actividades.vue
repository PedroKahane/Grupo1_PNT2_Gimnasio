<template>
     <div class="container mt-3">
       <h4 class="text-center">Actividades</h4>
       <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre:</th>
            <th>Duracion(minutos):</th>
            <th  v-if="isAuthenticated() && isAdmin()">Detalles:</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="actividades in elementStore.getElements" :key="actividades.id">
            <td>{{ actividades.nombre }}</td>
            <td>{{ actividades.duracion }}</td>
            <td  v-if="isAuthenticated() && isAdmin()"><router-link :to="`/actividades/${actividades.id}`"><strong>Ver detalles</strong></router-link></td>
          </tr>
        </tbody>
        <br>
        <button v-if="isAdmin()" class="btn btn-danger"><router-link to="/crearActividad" class="nav-item nav-link" href="#">Crear Actividad</router-link></button>
      </table>
    </div>
    <br>
</template>
   <script>
   import { useElementStore } from "../../../stores/Store";
   import { onMounted } from "vue";
   import { isAdmin, isAuthenticated } from "../../../utils/Auth";
   
   export default {
     setup() {
       const elementStore = useElementStore("actividades")();
       const busqueda = "";
   
       onMounted(() => {
           elementStore.currentElement = null
           elementStore.fetchElements("https://6460fabb491f9402f49bfa55.mockapi.io/Actividades")        
       })

       function buscar(){
        elementStore.filtrarXString(this.busqueda);
       }

       function reiniciar(){
        location.reload();

       }
       return {
         elementStore,
         buscar,
         busqueda,
         reiniciar,
         isAdmin,
         isAuthenticated
       }
     },
   }
   </script>
   