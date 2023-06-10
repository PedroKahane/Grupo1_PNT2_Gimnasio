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
    const profesoresStore = useElementStore("profesores")()
    const sedesStore = useElementStore("sedes")()
    const actividadesStore = useElementStore("actividades")
    const turnosStore = useElementStore("turnos")()
    const turnosPersonasStore = useElementStore("turnosPersonas")()
    const paquetesStore = useElementStore("paquetes")()
  
    const turnoStore = useTurnoStore()
    const busqueda = "";
    const router = useRouter();
    const route = useRoute();
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
      await profesoresStore.fetchElements("https://64662c65228bd07b355ddc69.mockapi.io/profesores");
      await sedesStore.fetchElements("https://645ae28c95624ceb210d09ed.mockapi.io/Sede");
      await actividadesStore.fetchElements("https://6460fabb491f9402f49bfa55.mockapi.io/Actividades");
      await turnosStore.fetchElements("https://6460fabb491f9402f49bfa55.mockapi.io/Turno")
      await turnosPersonasStore.fetchElements("https://64662c65228bd07b355ddc69.mockapi.io/turnoPersona");
      await elementStore.fetchElements('https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios');
      await paquetesStore.fetchElements('https://646937ca03bb12ac208876f1.mockapi.io/paquetes');
      //await turnoStore.contarTurno(turnoId)

    })
    //const error1 = computed(() => turnoStore.getError1)
    //const error2 = computed(() => turnoStore.getError2)
    //const error3 = computed(() => turnoStore.getError3)
    //console.log(turnosPersonas.value);

    function buscar() {
      turnoStore.filtrarXFecha(this.busqueda);
    }

    function reiniciar() {
      location.reload();
    }

    const sacarTurno = async (idTurno) => {
      try {
        this.error1 = false;
        this.error2 = false;
        this.error3 = false;
        const turnoNuevo = {
          idTurno,
          idPersona
        }
        const turno = turnosStore.getElements.find((e) => e.id === idTurno)
        const turnosMaximos = turno.cantPersonasLim
        const contador = contarTurno(idTurno);
        console.log(contador);
        const usuario = elementStore.getElements.find((e) => e.id === idPersona)

        try {
          if (usuario.ticketsRestantes == 0) {
            //console.log("no quedan tickets");

            this.error2 = true
          } else {
            try {
              if (contador < turnosMaximos) {
                const turnoExistente = turnosPersonasStore.getElements.find((e) => { return e.idTurno == idTurno && e.idPersona == idPersona })
                if (turnoExistente == null) {
                  const response = await turnosPersonasStore.createElement(`https://64662c65228bd07b355ddc69.mockapi.io/turnoPersona`, turnoNuevo)

                  usuario.ticketsRestantes--
                  //console.log(usuario.ticketsRestantes);
                  const response2 = await elementStore.updateElement(`https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios`, usuario)
                  //console.log(response2);
                  //console.log(response)

                } else {
                  this.error3 = true
                  //console.log(turnoExistente);
                }

              } else {
                this.error1 = true
              }
            } catch (error) {
              console.error(`Error updating turno`, error)
            }

          }
        } catch (error) {
          //console.log(error);

        }
      } catch (error) {
        console.error(`Error updating Element with id ${idPersona}:`, error)
      }
    }; 
    const  contarTurno = async (id) => {
      var contador = 0
      this.turnosPersonas.forEach(element => {
        if (element.idTurno == id) {
          contador++
        }
        return contador
      });
    }

    const sacasteElTurno = computed(() => (idTurno) => {
      const turnoExistente = turnosPersonasStore.getElements.find((e) => {
        return e.idTurno == idTurno && e.idPersona == usuario.id
      })
      if (turnoExistente == null) {
        return true
      } else {
        return false
      }
    })

    const cancelarTurno = async (idTurno) => {
      const turnoExistente = turnosPersonasStore.getElements.find((e) => {
        return e.idTurno == idTurno && e.idPersona == idPersona
      })
      if (turnoExistente) {
        const usuario = elementStore.getElements.find((e) => e.id === idPersona)
        usuario.ticketsRestantes++
        const response2 = await elementStore.updateElement(`https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios`, usuario)
        //console.log(response2);
        const response = await turnosPersonasStore.deleteElement('https://64662c65228bd07b355ddc69.mockapi.io/turnoPersona' , turnoExistente.id)
        //console.log(response);
      }
    }
    const turnos = computed(() => turnosStore.elements);
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
   