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
          <th>Profesor:</th>
          <th>Sede:</th>
          <th>Actividad:</th>
          <th>fecha:</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="turno in turnos" :key="turno.id">
          <td >Turno {{ turno.id }}</td>
          <td v-if="turno.profesor != undefined">{{ turno.profesor.nombre }} {{ turno.profesor.apellido }}</td>
          <td v-else></td>
          <td v-if="turno.sede != undefined"> {{ turno.sede.nombre }}</td>
          <td v-else></td>
          <td v-if="turno.actividad != undefined">{{ turno.actividad.nombre }}</td>
          <td v-else></td>
          <td >{{ turno.fecha }}</td>
         
          <td><router-link :to="`/turnos/${turno.id}`"><strong>Ver detalles</strong></router-link></td>
        </tr>
      </tbody>
      </table>
      <button class="btn btn-danger"><router-link to="/crearTurno" class="nav-item nav-link" href="#">Crear Turno</router-link></button>
      </div>

   
   </template>
   
   <script>
   import { useElementStore } from "../../../stores/Common";
   import { useTurnoStore } from "../../../stores/turnos";
   import { onMounted, computed } from "vue";
   
   export default {
     setup() {
       const elementStore = useElementStore()
       const turnoStore = useTurnoStore()
       const busqueda = "";
   
       onMounted(async () => {
            await turnoStore.fetchProfesores();
            await turnoStore.fetchSedes();
            await turnoStore.fetchActividades();
            await turnoStore.fetchTurnos()        
       })
       
       function buscar(){
      elementStore.filtrarXString(this.busqueda);
      }

       function reiniciar(){
      location.reload();
      }

      const turnos = computed (() => turnoStore.getTurnos);
       return {
        turnos,
        buscar,
        busqueda,
        reiniciar
       }
     },
   }
   </script>
   