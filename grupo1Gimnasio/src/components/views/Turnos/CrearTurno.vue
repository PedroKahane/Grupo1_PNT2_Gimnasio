<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6 offset-md-3" v-if="turno">
        <div class="card bg-light text-dark mb-5">
          <div v-if="turno" class="card-body">
            <h4>Crear Turno</h4>
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
                <strong>Fecha: </strong><input type="datetime-local" class="form-control" v-model="turno.fecha" />
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorFecha">
                <strong>Ingrese una fecha válida</strong>
              </h6>
              <p>
                <strong>Cantidad de personas: </strong><input type="number" class="form-control"
                  v-model="turno.cantPersonasLim" />
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorPersonas">
                <strong>El número de personas debe ser mayor a 0</strong>
              </h6>
              <div class="d-flex justify-content-center">
                <button class="btn btn-success" @click="createTurno">Crear Turno</button>
              </div>
              <br>
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
import { useElementStore } from '../../../stores/Store';
import { useTurnoStore } from '../../../stores/turnos';
import { useRouter } from 'vue-router'
import { onMounted, computed, ref } from "vue";

export default {
  setup() {
    const turnoStore = useTurnoStore();
    const elementStore = useElementStore("turnos")()
    elementStore.setCurrentElement({
      idSede: "",
      idActividad: "",
      idProfesor: "",
      fecha: "",
      precio: "",
      cantPersonasLim: ""
    })

    const turno = computed(() => elementStore.currentElement);
    const router = useRouter()
    const url = "https://6460fabb491f9402f49bfa55.mockapi.io/Turno";

    onMounted(() => {
      turnoStore.fetchProfesores();
      turnoStore.fetchSedes();
      turnoStore.fetchActividades();
    });

    const sedes = computed(() => turnoStore.getSedes);
    const actividades = computed(() => turnoStore.getActividades)
    const profesores = computed(() => turnoStore.getProfesores)

    const createTurno = async () => {
      if (validar() && elementStore.confirm("crear", "registrado", "Turno")) {
        await elementStore.createElement(url, turno.value)
        router.push('/turnos')
      }
    }

    const errorSede = ref(false);
    const errorActividad = ref(false);
    const errorProfesor = ref(false);
    const errorFecha = ref(false);
    const errorPersonas = ref(false);

    function validar() {
      setearEnFalse();
      let resultado = true;
      const turno = elementStore.currentElement;
      if (turno.idSede.trim() === '') { errorSede.value = true; resultado = false; }
      if (turno.idActividad.trim() === '') { errorActividad.value = true; resultado = false; }
      if (turno.idProfesor.trim() === '') { errorProfesor.value = true; resultado = false; }
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

    return {
      createTurno,
      turno,
      sedes,
      profesores,
      actividades,
      errorActividad,
      errorFecha,
      errorPersonas,
      errorProfesor,
      errorSede
    }
  },
}
</script>