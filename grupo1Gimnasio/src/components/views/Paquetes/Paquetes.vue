<template>
     <div class="container mt-3">
       <h4 class="text-center">Paquetes</h4>
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
                <th>Precio:</th>
                <th>Cantidad Tickets:</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="paquetes in elementStore.getElements" :key="paquetes.id">
                  <td>{{ paquetes.nombre }}</td>
                  <td>{{ paquetes.precio }}</td>
                  <td>{{ paquetes.cantTickets }}</td>
          <td><router-link :to="`/paquetes/${paquetes.id}`"><strong>Ver detalles</strong></router-link></td>
        </tr>
      </tbody>
      <br>
      <button class="btn btn-danger"><router-link to="/crearPaquete" class="nav-item nav-link" href="#">Crear Paquete</router-link></button>
    </table>
    </div>
     
   </template>
   
   <script>
   import { useElementStore } from "../../../stores/Store";
   import { onMounted } from "vue";
   
   export default {
     setup() {
       const elementStore = useElementStore()
       const busqueda = "";
   
       onMounted(() => {
           elementStore.currentElement = null
           elementStore.fetchElements("https://646937ca03bb12ac208876f1.mockapi.io/paquetes")        
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
   