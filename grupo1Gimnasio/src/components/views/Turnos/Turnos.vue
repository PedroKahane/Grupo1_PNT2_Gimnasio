<template>
  <div class="container mt-3">
    <h4 class="text-center">Turnos</h4>
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
  <div class="btn-group my-3" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-outline-primary" @click="mostrarTurnos(true)">Proximos turnos</button>
    <button type="button" class="btn btn-outline-primary" @click="mostrarTurnos(false)">Turnos pasados</button>
  </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Profesor:</th>
          <th>Sede:</th>
          <th>Actividad:</th>
          <th>Fecha:</th>
          <th v-if="usuario && permiteSacarTurno">Reservar:</th>
          <th v-if="usuario && usuario.administrador && permiteSacarTurno">Detalles:</th>
        </tr>
      </thead>
      <tbody  v-if="turnosMostrados">
        <tr v-for="turno in turnosMostrados" :key="turno.id">
          <td v-if="turno.profesor != undefined">{{ turno.profesor.nombre }} {{ turno.profesor.apellido }}</td>
          <td v-else></td>
          <td v-if="turno.sede != undefined"> {{ turno.sede.nombre }}</td>
          <td v-else></td>
          <td v-if="turno.actividad != undefined">{{ turno.actividad.nombre }}</td>
          <td v-else></td>
          <td v-if="turno.sede != undefined">{{ turno.fecha }}</td>
          <td v-else></td>
          <td v-if="usuario && permiteSacarTurno">
            <button v-if="sacasteElTurno(turno.id)" class="btn btn-primary" @click="sacarTurno(turno.id)">Sacar
              Turno</button>
            <button v-else class="btn btn-danger" @click="cancelarTurno(turno.id)">Cancelar Turno</button>
          </td>
          <td v-if="usuario && usuario.administrador && permiteSacarTurno"><router-link :to="`/turnos/${turno.id}`"><strong>Ver
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
//import { useTurnoStore } from "../../../stores/turnos";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted, computed, ref } from "vue";
import { getCookie } from "../../../stores/Cookies";

export default {
  setup() {
    const elementStore = useElementStore("usuarios")()
    const profesoresStore = useElementStore("profesores")()
    const sedesStore = useElementStore("sedes")()
    const actividadesStore = useElementStore("actividades")()
    const turnosStore = useElementStore("turnos")()
    const turnosPersonasStore = useElementStore("turnosPersonas")()
    const paquetesStore = useElementStore("paquetes")()
  
    //const turnoStore = useTurnoStore()
    const busqueda = "";
    const router = useRouter();
    const route = useRoute();
    var usuario = getCookie();
    if (!!usuario) {
      usuario = JSON.parse(usuario)
      usuario = usuario[0]
      elementStore.fetchElementById("https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios", usuario.id);
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
      tablaTurnos()

    })
 
    const turnos = computed(() => turnosStore.getElements)
    const usuarios = computed(() => elementStore.getElements)
    const turnosPersonas = computed(() => turnosPersonasStore.getElements)
    const sedes = computed(() => sedesStore.getElements)
    const actividades = computed(() => actividadesStore.getElements)
    const profesores = computed(() => profesoresStore.getElements)
    var user = computed(() => elementStore.currentElement)

    // function buscar() {
    //   turnosStore.filtrarXFecha(this.busqueda);
    // }

    function reiniciar() {
      location.reload();
    }
    
    var error1 = ref(false)
    var error2 = ref(false)
    var error3 = ref(false)
    var turnosPasados = ref([])
    var turnosPosteriores = ref([])
    var turnosMostrados = ref(null)
    var permiteSacarTurno = ref(true)
    var formateoFecha = ref(false)
    const contarTurno = (id) => {
      try {
        var contador = 0 
        const turnosyPersonas = turnosPersonas.value
        turnosyPersonas.forEach(element => {
          if(element.idTurno == id){
            contador++
            //console.log(contador);
          }
        });
        return contador
      } catch (error) {
        console.log(error);
      }
    
    }
    function setearEnFalse(){
      error1.value = false;
      error2.value = false;
      error3.value = false;
    }
   
    const sacarTurno = async (idTurno) => {
      setearEnFalse();
      try {
        //error1.value = false;
        //error2.value = false;
        //error3.value = false;
        var usuario = getCookie();
        usuario = JSON.parse(usuario)
        console.log(usuario[0]);
        const idPersona = usuario[0].id
        const turnoNuevo = {
          idTurno,
          idPersona
        }
        const turno = turnos.value.find((e) => e.id === idTurno)
        const turnosMaximos = turno.cantPersonasLim
        const contador = contarTurno(idTurno);
        console.log(contador);
        usuario = usuarios.value.find((e) => e.id === usuario[0].id)
        //console.log(usuario.ticketsRestantes);
        try {
          if (usuario.ticketsRestantes == 0) {
            error2.value = true
            console.log(error2.value);
          } else {
            try {
              if (contador < turnosMaximos) {
                const turnoExistente = turnosPersonas.value.find((e) => { return e.idTurno == idTurno && e.idPersona == usuario.id })
                if (turnoExistente == null) {
                  if(turnosStore.confirm("sacar", "obtenido", "Turno")){
                    const response = await turnosPersonasStore.createElement(`https://64662c65228bd07b355ddc69.mockapi.io/turnoPersona`, turnoNuevo)
                    usuario.ticketsRestantes--
                    const response2 = await elementStore.updateElement(`https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios`, usuario)
                    console.log(response2);
                    console.log(response)
                    elementStore.fetchElementById("https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios", usuario.id);
                    //location.reload();
                  }
               

                } else {
                  error3.value = true
                }

              } else {
                error1.value = true
              }
            } catch (error) {
              console.error(`Error updating turno`, error)
            }

          }
        } catch (error) {
          console.log(error);

        }
      } catch (error) {
        console.error(`Error updating Element with id ${usuario.id}:`, error)
      }
    }; 

    const sacasteElTurno = computed(() => (idTurno) => {
      if(turnosPersonas.value){
        const turnoExistente = turnosPersonas.value.find((e) => {
          return e.idTurno == idTurno && e.idPersona == usuario.id
        })
        if (!turnoExistente) {
          return true
        } else {
          return false
        }
      }
    })

    const cancelarTurno = async (idTurno) => {
      setearEnFalse();
      var usuario = getCookie();
      usuario = JSON.parse(usuario)
      usuario = usuarios.value.find((e) => e.id === usuario[0].id)
      console.log(usuario);
      const turnoExistente = turnosPersonas.value.find((e) => {
        return e.idTurno == idTurno && e.idPersona == usuario.id
      })
      if (turnoExistente) {
        if(turnosStore.confirm("cancelar", "cancelado", "Turno")){
          usuario.ticketsRestantes++
          const response2 = await elementStore.updateElement(`https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios`, usuario)
          //console.log(response2);
          const response = await turnosPersonasStore.deleteElement('https://64662c65228bd07b355ddc69.mockapi.io/turnoPersona' , turnoExistente.id)
          //console.log(response);
          elementStore.fetchElementById("https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios", usuario.id);
        }
      }
    }
    const tablaTurnos = async () => {
      try {
        var turnoYaPasado = []
        var turnosExtendido =  turnos.value
        console.log(turnos.value);
        await turnosExtendido.forEach(element => {
          const sede = sedes.value.find((e) => e.id == element.idSede)
          //console.log(sede);
          element.sede = sede
          if (!element.fecha.includes('/')) {
            element.fecha = new Date(element.fecha).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              year: 'numeric',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            });
          }
          console.log("pase");
          const actividad = actividades.value.find((e) => e.id == element.idActividad)
          //console.log(element.idActividad);
          element.actividad = actividad

          const profesor = profesores.value.find((e) => e.id == element.idProfesor)
          element.profesor = profesor
          //console.log(element.idProfesor);
          const fechaActual = new Date()
          const fechaComponente = new Date(element.fecha.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
          if(fechaComponente < fechaActual ) {
            turnoYaPasado.push(element)
          } else{
            turnosPosteriores.value.push(element)
          }
        });
        var usuario = getCookie();
        usuario = JSON.parse(usuario)
        console.log(usuario[0]);
        const idPersona = usuario[0].id
        turnoYaPasado.forEach(element => {
          var turnoyPersona = turnosPersonas.value.find((e) => { return e.idTurno == element.id && e.idPersona == idPersona})
          if(turnoyPersona){
            turnosPasados.value.push(element)
          }
        })
        //console.log(turnosExtendido);
        turnosMostrados.value = turnosPosteriores.value
        turnosMostrados.value.sort((a, b) => {
      
          const fechaA = new Date(a.fecha.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
          const fechaB = new Date(b.fecha.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
          
          return fechaA - fechaB;
        });
        //console.log(this.turnos);
        console.log(turnos.value);
        console.log(turnosExtendido);
        } catch(error){
          console.log(error);
        }
    }

      const mostrarTurnos = async (value) => {
        if(value) {
          turnosMostrados.value = turnosPosteriores.value
          turnosMostrados.value.sort((a, b) => {
            const fechaA = new Date(a.fecha.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
            const fechaB = new Date(b.fecha.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
            
            return fechaA - fechaB;
          })
          permiteSacarTurno.value = true
        } else {
          turnosMostrados.value = turnosPasados.value
          turnosMostrados.value.sort((a, b) => {
            const fechaA = new Date(a.fecha.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
            const fechaB = new Date(b.fecha.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
            
            return fechaB - fechaA;
          })
          permiteSacarTurno.value = false
        }
      }
      
    return {
      turnosMostrados,
      mostrarTurnos,
      permiteSacarTurno,
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
   