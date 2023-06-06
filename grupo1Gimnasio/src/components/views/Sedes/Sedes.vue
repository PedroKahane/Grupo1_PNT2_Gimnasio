<template>
  <div class="container mt-3">
    <h4 class="text-center">Sedes</h4>
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
          <th>Ubicacion:</th>
          <th v-if="isAuthenticated() && isAdmin()">Detalles:</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sede in elementStore.getElements" :key="sede.id">
          <td>{{ sede.nombre }}</td>
          <td>{{ sede.ubicacion }}</td>
          
          <td v-if="isAuthenticated() && isAdmin()"><router-link :to="`/sedes/${sede.id}`"><strong>Ver detalles</strong></router-link></td>
        </tr>
      </tbody>
      <br>
      <button v-if="isAdmin()" class="btn btn-danger"><router-link to="/crearSede" class="nav-item nav-link" href="#">Crear Sede</router-link></button>
    </table>
  </div>


</template>
  
  <script>
import { useElementStore } from "../../../stores/Store";  
import { onMounted, computed } from 'vue'
import { isAdmin, isAuthenticated } from "../../../utils/Auth";

export default {
  setup() {
    const elementStore = useElementStore("sedes")()
    const busqueda = "";

    // Llamar al método fetchUsers al iniciar la vista
    onMounted(() => {
       elementStore.currentElement = null
      elementStore.fetchElements("https://645ae28c95624ceb210d09ed.mockapi.io/Sede")
      
    })

    function buscar(){
      elementStore.filtrarXString(this.busqueda);
    }

    function reiniciar(){
      location.reload();
    }

    //const users = userStore.getUsers
    const sedes = computed(() => sedeStore.getSedes)

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