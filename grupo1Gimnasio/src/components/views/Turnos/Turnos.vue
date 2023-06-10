<template>
  <div class="container mt-3">
    <h4 class="text-center">Turnos</h4>
    <div class="d-flex justify-content-end input-group mb-3">
      <form class="d-flex" v-on:submit.prevent="buscar">
        <div class="d-flex justify-content-center mt-2">
          <label class="input-group"><strong>Filtrar: </strong></label>
        </div>
        <input type="date" class="form-control bg-light border-1 mr-2" v-model="busqueda">
        <button class="btn btn-success">Buscar</button>
        <button class="btn btn-danger" v-on:click="reiniciar">Reiniciar</button>
      </form>
    </div>
    <div class="d-flex flex-column align-items-center">
      <h5 class="text-center" v-if="user">Tickets restantes: <strong>{{ user.ticketsRestantes }}</strong></h5>
    </div>
    <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="error1">
      <strong>Error, cupos de turnos agotados</strong>
    </h6>
    <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="error2">
      <strong>Error, no le quedan tickets por gastar, vaya a <RouterLink to="/paquetes"><strong>PAQUETES</strong></RouterLink> para comprar mas</strong>
    </h6>
    <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="error3">
      <strong>Turno existecte</strong>
    </h6>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Profesor:</th>
          <th>Sede:</th>
          <th>Actividad:</th>
          <th>Fecha:</th>
          <th v-if="usuario">Reservar:</th>
          <th v-if="usuario && usuario.administrador">Detalles:</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="turno in turnos" :key="turno.id">
          <td v-if="turno.profesor != undefined">{{ turno.profesor.nombre }} {{ turno.profesor.apellido }}</td>
          <td v-else></td>
          <td v-if="turno.sede != undefined"> {{ turno.sede.nombre }}</td>
          <td v-else></td>
          <td v-if="turno.actividad != undefined">{{ turno.actividad.nombre }}</td>
          <td v-else></td>
          <td>{{ turno.fecha }}</td>
          <td v-if="usuario">
            <button v-if="sacasteElTurno(turno.id)" class="btn btn-primary" @click="sacarTurno(turno.id)">Sacar
              Turno</button>
            <button v-else class="btn btn-danger" @click="cancelarTurno(turno.id)">Cancelar Turno</button>
          </td>
          <td v-if="usuario && usuario.administrador"><router-link :to="`/turnos/${turno.id}`"><strong>Ver
                detalles</strong></router-link></td>
        </tr>
      </tbody>
    </table>
    <button v-if="usuario && usuario.administrador" class="btn btn-danger"><router-link to="/crearTurno"
        class="nav-item nav-link" href="#">Crear Turno</router-link></button>
  </div>
  <br>
</template>
   
<script>
import { useElementStore } from "../../../stores/Store";
import { useTurnoStore } from "../../../stores/turnos";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import { getCookie } from "../../../stores/Cookies";

export default {
  setup() {

    const elementStore = useElementStore("usuarios")()
    const turnoStore = useTurnoStore()
    const busqueda = "";
    const router = useRouter();
    const route = useRoute();
    const turnosStore2 = useElementStore("turnos")()
    const date = new Date();
    var usuario = getCookie();
    if (!!usuario) {
      usuario = JSON.parse(usuario)
      usuario = usuario[0]
      elementStore.fetchElementById("https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios", usuario.id);
      var user = computed(() => elementStore.currentElement);
      //user = usuario.value;
      //console.log(user);
    }

    onMounted(async () => {
      await turnoStore.fetchProfesores();
      await turnoStore.fetchSedes();
      await turnoStore.fetchActividades();
      await turnoStore.fetchTurnos()
      await turnoStore.fetchTurnosPersonas();
      await turnoStore.fetchUsuarios();
      await turnoStore.fetchPaquetes();
      await turnosStore2.fetchElements("https://6460fabb491f9402f49bfa55.mockapi.io/Turno");
      //await turnoStore.contarTurno(turnoId)

    })
    const error1 = computed(() => turnoStore.getError1)
    const error2 = computed(() => turnoStore.getError2)
    const error3 = computed(() => turnoStore.getError3)
    //console.log(turnosPersonas.value);

    function buscar() {
      turnoStore.filtrarXFecha(this.busqueda);
    }

    function reiniciar() {
      location.reload();
    }

    const sacarTurno = async (idTurno) => {
      if ( (error1 || error2 || error3) ) {
        await turnoStore.sacarTurno(idTurno, usuario.id);
        console.log(error1.value, error2.value, error3.value);
        if (!error1.value && !error2.value && !error3.value) {
          location.reload();
        }
      }
    };

    const sacasteElTurno = computed(() => (idTurno) => {
      const turnoExistente = turnoStore.getTurnosPersonas.find((e) => {
        return e.idTurno == idTurno && e.idPersona == usuario.id
      })
      if (turnoExistente == null) {
        return true
      } else {
        return false
      }
    })

    const cancelarTurno = async (idTurno) => {
      if (elementStore.confirm("cancelar", "cancelado", "Turno")) {
        await turnoStore.cancelarTurno(idTurno, usuario.id);
        location.reload();
      }
    }
    const turnos = computed(() => turnoStore.getTurnos);
    return {
      turnos,
      buscar,
      busqueda,
      reiniciar,
      sacarTurno,
      sacasteElTurno,
      cancelarTurno,
      usuario,
      user,
      error1,
      error2,
      error3
    }
  },
}
</script>
   