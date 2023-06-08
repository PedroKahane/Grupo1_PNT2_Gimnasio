<template>
  <div class="container mt-4">
    <div class="text-center">
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3" v-if="actividad">
        <div class="card bg-light text-dark mb-5">
          <div v-if="actividad" class="card-body">
          <h4>Crear Actividad</h4>
              <div>
                <p>
                  <strong>Nombre: </strong><input type="text" class="form-control" v-model="actividad.nombre" placeholder="Musculación"/>
                </p>

                <p>
                  <strong>Duracion(en minutos): </strong><input type="text" class="form-control" v-model="actividad.duracion" placeholder="120"/>
                </p>

                <div class="d-flex justify-content-center">
                  <button class="btn btn-success" @click="createActividad">Crear Actividad</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
    <button class="btn btn-warning" ><router-link to="/actividades" class="nav-item nav-link" href="#">Volver a Actividades</router-link></button>
    </div>
  </div>
  <br>
</template>

<script>
import { useElementStore } from '../../../stores/Store';
import { useActividadStore } from '../../../stores/actividades';
import { useRouter } from 'vue-router';
import { onMounted, computed } from 'vue';

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
      if(elementStore.confirm("crear", "registrada", "Actividad")){
        await elementStore.createElement(url, actividad.value);
        router.push('/actividades');
      }
    };

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
    };
  },
};
</script>
