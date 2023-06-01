<template>
  <div class="container mt-3">
    <h4 class="text-center">Turnos</h4>
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
          <th>Turno:</th>
        
        </tr>
      </thead>
      <tbody>
        <tr v-for="turnos in elementStore.getElements" :key="turnos.id">
          <td>Turno {{ turnos.id }}</td>
         
          <td><router-link :to="`/turnos/${turnos.id}`"><strong>Ver detalles</strong></router-link></td>
        </tr>
      </tbody>
      </table>
      <button class="btn btn-danger"><router-link to="/crearTurno" class="nav-item nav-link" href="#">Crear Turno</router-link></button>
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
           elementStore.fetchElements("https://6460fabb491f9402f49bfa55.mockapi.io/Turno")        
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
         reiniciar,
         busqueda
       }
     },
   }
   </script>
   