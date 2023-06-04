<template>
  <div class="container mt-3">
    <h4 class="text-center">Usuarios</h4>
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
          <th>Mail:</th>
          <th>Contacto:</th>
          <th>DNI:</th>
          <th>Altura:</th>
          <th>Peso:</th>
          <th>Edad:</th>
          <th>Detalles:</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in elementStore.getElements" :key="user.id">
          <td>{{ user.nombre }}</td>
          <td>{{ user.apellido }}</td>
          <td>{{ user.mail }}</td>
          <td>{{ user.contacto }}</td>
          <td>{{ user.dni }}</td>
          <td>{{ user.altura }}</td>
          <td>{{ user.peso }}</td>
          <td>{{ user.edad }}</td>
          <td><router-link :to="`/usuarios/${user.id}`"><strong>Ver detalles</strong></router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useElementStore } from "../../../stores/Common";
import { onMounted } from "vue";

export default {
  setup() {
    const elementStore = useElementStore()
    const url = "https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios";
    const busqueda = "";

    onMounted(() => {
      elementStore.currentElement = null
      elementStore.fetchElements(url)
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