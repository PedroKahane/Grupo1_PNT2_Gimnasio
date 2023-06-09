<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6 offset-md-3" v-if="turno">
        <div class="card bg-light text-dark mb-5">
          <div v-if="turno" class="card-body">
            <h4>Detalles del Turno: <strong>{{ turno.id }}</strong></h4>
            <div>
              <p>
                <strong>Sede: </strong>
                <select v-model="turno.idSede">
                  <option value="0" disabled selected>Selecciona la sede</option>
                  <option v-for="sede in sedes" :value="sede.id">
                    {{ sede.nombre }}
                  </option>
                </select>
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorSede">
                <strong>Ingrese una sede</strong>
              </h6>
              <p>
                <strong>Actividad: </strong>
                <select v-model="turno.idActividad">
                  <option value="0" disabled selected>Selecciona la actividad</option>
                  <option v-for="actividad in actividades" :value="actividad.id">
                    {{ actividad.nombre }}
                  </option>
                </select>
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorActividad">
                <strong>Ingrese una actividad</strong>
              </h6>
              <p>
                <strong>Profesor: </strong>
                <select v-model="turno.idProfesor">
                  <option value="0" disabled selected>Selecciona el profesor</option>
                  <option v-for="profesor in profesores" :value="profesor.id">
                    {{ profesor.nombre }}
                  </option>
                </select>
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorProfesor">
                <strong>Ingrese un profesor</strong>
              </h6>
              <p>
                <strong>Fecha: </strong>
                <input type="datetime-local" v-model="turno.fecha">
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorFecha">
                <strong>Ingrese una fecha válida</strong>
              </h6>
              <p>
                <strong>Límite de Personas: </strong>
                <input type="number" v-model="turno.cantPersonasLim">
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorPersonas">
                <strong>El número de personas debe ser mayor a 0</strong>
              </h6>
              <div class="d-flex justify-content-center">
                <button class="btn btn-success" @click="updateTurno">Actualizar turno</button>
                <button class="btn btn-danger" @click="deleteTurno">Borrar turno</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-warning"><router-link to="/turnos" class="nav-item nav-link" href="#">Volver a
          Turnos</router-link></button>
    </div>
  </div>
  <br>
</template>
<script>
import { useElementStore } from "../../../stores/Store";
//import { useTurnoStore } from '../../../stores/turnos';
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted, computed, ref } from "vue";
import Cookies from "js-cookie";

export default {
  setup() {
    const usuario = JSON.parse(Cookies.get('usuario'));
    const elementStore = useElementStore("usuarios")()
    const turnoStore = useElementStore("turnos")()
    const profesoresStore = useElementStore("profesores")()
    const sedesStore = useElementStore("sedes")()
    const actividadesStore = useElementStore("actividades")()
    const turnosPersonasStore = useElementStore("turnosPersonas")()
    const router = useRouter();
    const route = useRoute();
    const turnoId = route.params.id.toString();
    const url = "https://6460fabb491f9402f49bfa55.mockapi.io/Turno";

    turnoStore.fetchElementById(url, turnoId);
    onMounted(async () => {
      await profesoresStore.fetchElements("https://64662c65228bd07b355ddc69.mockapi.io/profesores");
      await sedesStore.fetchElements("https://645ae28c95624ceb210d09ed.mockapi.io/Sede");
      await elementStore.fetchElements('https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios');
      await turnosPersonasStore.fetchElements("https://64662c65228bd07b355ddc69.mockapi.io/turnoPersona");
      await actividadesStore.fetchElements("https://6460fabb491f9402f49bfa55.mockapi.io/Actividades");
    });

    const usuarios = computed(() => elementStore.getElements)
    const turno = computed(() => turnoStore.currentElement);
    const turnosPersonas = computed(() => turnosPersonasStore.getElements)
    const sedes = computed(() => sedesStore.getElements);
    const actividades = computed(() => actividadesStore.getElements)
    const profesores = computed(() => profesoresStore.getElements)

    const updateTurno = async () => {
      if (validar() && turnoStore.confirm("modificar", "modificado", "Turno")) {
        //console.log(elementStore.currentElement)
        await turnoStore.updateElement(url, turnoStore.currentElement);
        router.push("/turnos");
      }
    };

    const errorSede = ref(false);
    const errorActividad = ref(false);
    const errorProfesor = ref(false);
    const errorFecha = ref(false);
    const errorPersonas = ref(false);

    function validar() {
      setearEnFalse();
      let resultado = true;

      const turno = turnoStore.currentElement;

      if (Number(turno.idSede === 0)) { errorSede.value = true; resultado = false; }
      if (Number(turno.idActividad === 0)) { errorActividad.value = true; resultado = false; }
      if (Number(turno.idProfesor === 0)) { errorProfesor.value = true; resultado = false; }
      if (turno.fecha.trim() === '') { errorFecha.value = true; resultado = false; }
      if (!(Number(turno.cantPersonasLim) >= 1)) { errorPersonas.value = true; resultado = false; }

      if (!resultado) { alert("Error detectado en el ingreso de campos") }
      return resultado;
    };

    function setearEnFalse() {
      errorSede.value = false;
      errorActividad.value = false;
      errorProfesor.value = false;
      errorFecha.value = false;
      errorPersonas.value = false;
    }

    const deleteTurno = async () => {
      try {
        var usuarioTicket
        if (turnoStore.confirm("eliminar", "eliminado", "Turno")) {
          turnosPersonas.value.forEach(element => {
            if(element.idTurno == turnoId){
              usuarioTicket = usuarios.value.find((e) => e.id === element.idPersona)
              usuarioTicket.ticketsRestantes++
              const response = elementStore.updateElement(`https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios`, usuarioTicket)
              console.log(response);
            }
          })
        await turnoStore.deleteElement(url, turnoId);
        router.push("/turnos");
      }
      } catch (error) {
        console.log(error);
      }
    
    };
    
    return {
      turno,
      updateTurno,
      deleteTurno,
      sedes,
      profesores,
      actividades,
      errorActividad,
      errorFecha,
      errorPersonas,
      errorProfesor,
      errorSede
    };
  },
};
</script>
