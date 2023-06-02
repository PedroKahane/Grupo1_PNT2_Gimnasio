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
    <div class="d-flex justify-content-center">
          <p style="color: red; font-size: 16px; font-weight: bold;font-family: Arial, Helvetica, sans-serif;" v-if="error1">El cupo de este turno se encuentra lleno</p>
          <p style="color: red; font-size: 16px; font-weight: bold;font-family: Arial, Helvetica, sans-serif;" v-if="error2">No le quedan tickets por usar</p>
          <p style="color: red; font-size: 16px; font-weight: bold;font-family: Arial, Helvetica, sans-serif;" v-if="error3">Ya estas anotado en este turno</p>
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
         
          <td v-if="usuario && usuario[0].administrador"><router-link :to="`/turnos/${turno.id}`"><strong>Ver detalles</strong></router-link></td>
          <td v-if="usuario">  
            <button v-if="sacasteElTurno(turno.id)" class="btn btn-primary" @click="sacarTurno(turno.id)">Sacar Turno</button>
            <button v-else class="btn btn-danger" @click="cancelarTurno(turno.id)">Cancelar Turno</button>
          </td>
        </tr>
      </tbody>
      </table>
      <button class="btn btn-danger"><router-link to="/crearTurno" class="nav-item nav-link" href="#">Crear Turno</router-link></button>
      </div>

   
   </template>
   
   <script>
    import { useElementStore } from "../../../stores/Common";
    import { useTurnoStore } from "../../../stores/turnos";
    import { useRouter } from "vue-router";
    import { useRoute } from "vue-router";
    import { onMounted, computed } from "vue";
    import Cookies from "js-cookie";
   
   export default {
     setup() {
        var usuario = Cookies.get('usuario');
        if (usuario) {
          usuario = JSON.parse(usuario)
        }
        const elementStore = useElementStore()
        const turnoStore = useTurnoStore()
        const busqueda = "";
        const router = useRouter();
        const route = useRoute();
   
       onMounted(async () => {
            await turnoStore.fetchProfesores();
            await turnoStore.fetchSedes();
            await turnoStore.fetchActividades();
            await turnoStore.fetchTurnos()
            await turnoStore.fetchTurnosPersonas();
            await turnoStore.fetchUsuarios();
            await turnoStore.fetchPaquetes();
            //await turnoStore.contarTurno(turnoId)
               //console.log(usuario[0]);
       })
          const error1 = computed (()=> turnoStore.getError1)
          const error2 = computed (()=> turnoStore.getError2)
          const error3 = computed (()=> turnoStore.getError3)
          //console.log(turnosPersonas.value);
       
       function buscar(){
      elementStore.filtrarXString(this.busqueda);
      }

       function reiniciar(){
      location.reload();
      }
      const sacarTurno = async (idTurno) => {
              await turnoStore.sacarTurno(idTurno, usuario[0].id);
              if(!error1.value && !error2.value && !error3.value) {
                window.alert("Pudiste sacar el turno correctamente")
                location.reload();
              }
      };
      const sacasteElTurno = computed(() => (idTurno) => {
        const  turnoExistente = turnoStore.getTurnosPersonas.find((e) => {
                return e.idTurno == idTurno && e.idPersona == usuario[0].id
        })
        if(turnoExistente == null) {
          return true
        } else{
          return false
        }
      })
      const cancelarTurno = async (idTurno) => {
              await turnoStore.cancelarTurno(idTurno, usuario[0].id);
              window.alert("Pudiste cancelar el turno correctamente")
              location.reload();

      }
      const turnos = computed (() => turnoStore.getTurnos);
       return {
        turnos,
        buscar,
        busqueda,
        reiniciar,
        sacarTurno,
        sacasteElTurno,
        cancelarTurno,
        usuario,
        error1,
        error2,
        error3
       }
     },
   }
   </script>
   