<template>
     <div class="container mt-3">
       <h4 class="text-center">Actividades</h4>
       <div class="d-flex justify-content-end input-group mb-3">
          <form class="d-flex" v-on:submit.prevent="buscar">
          <input type="text" class="form-control bg-light border-1 mr-2" placeholder="Buscar..." v-model="busqueda">
          <button class="btn btn-success">Buscar</button>
          <button class="btn btn-danger" v-on:click="reiniciar">Reiniciar</button>
          </form>
       </div>
       <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre:</th>
            <th>Duracion(minutos):</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="actividades in elementStore.getElements" :key="actividades.id">
            <td>{{ actividades.nombre }}</td>
            <td>{{ actividades.duracion }}</td>
            <td><router-link :to="`/actividades/${actividades.id}`"><strong>Ver detalles</strong></router-link></td>
          </tr>
        </tbody>
        <br>
        <button class="btn btn-danger"><router-link to="/crearActividad" class="nav-item nav-link" href="#">Crear Actividad</router-link></button>
      </table>
    </div>
</template>
   
   <script>
   import { useElementStore } from "../../../stores/Common";
   import { onMounted } from "vue";
   
   export default {
     setup() {
       const elementStore = useElementStore()
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
         reiniciar
       }
     },
   }
   </script>
   