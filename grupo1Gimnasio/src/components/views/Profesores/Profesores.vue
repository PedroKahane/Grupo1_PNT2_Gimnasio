<template>
  <div class="container mt-3">
    <h4 class="text-center">Profesores</h4>
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
          <th>Apellido:</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="profesor in elementStore.getElements" :key="profesor.id">
          <td>{{ profesor.nombre }}</td>
          <td>{{ profesor.apellido }}</td>
        <td><router-link :to="`/profesores/${profesor.id}`"><strong>Ver detalles</strong></router-link></td>
        </tr>
      </tbody>
      <br>
      <button class="btn btn-danger"><router-link to="/crearProfesor" class="nav-item nav-link" href="#">Crear Profesor</router-link></button>
      </table>
      </div>
 
</template>

<script>
import { useElementStore } from "../../../stores/Store";
import { onMounted } from "vue";

export default {
  setup() {
    const elementStore = useElementStore("profesores")()
    const busqueda = "";

    onMounted(() => {
        elementStore.currentElement = null
        elementStore.fetchElements("https://64662c65228bd07b355ddc69.mockapi.io/profesores")        
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
