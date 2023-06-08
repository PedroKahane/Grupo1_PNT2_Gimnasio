<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6 offset-md-3" v-if="actividad">
        <div class="card bg-light text-dark mb-5">
          <div v-if="actividad" class="card-body">
            <h4>Crear Actividad</h4>
            <div>
              <p>
                <strong>Nombre: </strong><input type="text" class="form-control" v-model="actividad.nombre"
                  placeholder="Musculación" />
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorNombre">
                <strong>El nombre no puede estar vacío</strong>
              </h6>
              <p>
                <strong>Duracion(en minutos): </strong><input type="number" class="form-control"
                  v-model="actividad.duracion" placeholder="120" />
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorDuracion">
                <strong>La duracion de la actividad deben ser mayor a 0</strong>
              </h6>
              <div class="d-flex justify-content-center">
                <button class="btn btn-success" @click="createActividad">Crear Actividad</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-warning"><router-link to="/actividades" class="nav-item nav-link" href="#">Volver a
          Actividades</router-link></button>
    </div>
  </div>
  <br>
</template>
<script>
import { useElementStore } from '../../../stores/Store';
import { useActividadStore } from '../../../stores/actividades';
import { useRouter } from 'vue-router';
import { onMounted, computed, ref } from 'vue';

export default {
  setup() {
    const elementStore = useElementStore("actividades")();
    const actividadStore = useActividadStore();
    elementStore.setCurrentElement({
      nombre: '',
      duracion: '',
      idSede: '',
      idProfesor: '',
    });
    const actividad = computed(() => elementStore.currentElement);
    const router = useRouter();
    const url = 'https://6460fabb491f9402f49bfa55.mockapi.io/Actividades';

    const createActividad = async () => {
      if (validar() && elementStore.confirm("crear", "registrada", "Actividad")) {
        await elementStore.createElement(url, actividad.value);
        router.push('/actividades');
      }
    };

    const errorNombre = ref(false);
    const errorDuracion = ref(false);

    function validar() {
      setearEnFalse();
      let resultado = true;
      const actividad = elementStore.currentElement;
      if (actividad.nombre.trim() === '') { errorNombre.value = true; resultado = false; }
      if (!(Number(actividad.duracion) >= 1)) { errorDuracion.value = true; resultado = false; }

      if (!resultado) { alert("Error detectado en el ingreso de campos") }
      return resultado;
    };

    function setearEnFalse() {
      errorNombre.value = false;
      errorDuracion.value = false;
    }

    onMounted(() => {
      actividadStore.fetchSedes();
      actividadStore.fetchProfesores();
    });

    const sedes = computed(() => actividadStore.getSedes);
    const profesores = computed(() => actividadStore.getProfesores);

    return {
      createActividad,
      actividad,
      sedes,
      profesores,
      errorDuracion,
      errorNombre
    };
  },
};
</script>
