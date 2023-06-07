<template>
  <div class="container mt-4">
    <div class="text-center">
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3" v-if="actividad">
        <div class="card bg-light text-dark mb-5">
          <div v-if="actividad" class="card-body">
          <h4>Detalles de la actividad: <strong>{{ actividad.nombre }}</strong></h4>
              <div>
                <p>
                  <strong>Nombre: </strong><input type="text" class="form-control" v-model="actividad.nombre" />
                </p>

                <p>
                  <strong>Duracion(en minutos): </strong><input type="text" class="form-control" v-model="actividad.duracion" />
                </p>

                <div class="d-flex justify-content-center">
                  <button class="btn btn-success" @click="updateActividad">Actualizar paquete</button>
                  <button class="btn btn-danger" @click="deleteActividad">Borrar actividad</button>
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
</template>

<script>
import { useElementStore } from '../../../stores/Store';
import { useActividadStore } from '../../../stores/actividades';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';

export default {
  setup() {
    const elementStore = useElementStore("actividades")();
    const actividadStore = useActividadStore();
    const router = useRouter();
    const route = useRoute();
    const actividadId = route.params.id.toString();
    const url = 'https://6460fabb491f9402f49bfa55.mockapi.io/Actividades';

    elementStore.fetchElementById(url, actividadId);
    onMounted(() => {
      actividadStore.fetchSedes();
      actividadStore.fetchProfesores();
    });
    const actividad = computed(() => elementStore.currentElement);

    const sedes = computed(() => actividadStore.getSedes);
    const profesores = computed(() => actividadStore.getProfesores);

    const updateActividad = async () => {
      if(elementStore.confirm("modificar", "modificada", "Actividad")){
        await elementStore.updateElement(url, elementStore.currentElement);
        router.push('/actividades');
      }
    };

    const deleteActividad = async () => {
      if(elementStore.confirm("eliminar", "eliminada", "Actividad")){
        await elementStore.deleteElement(url, actividadId);
        router.push('/actividades');
      }
    };

    return {
      actividad,
      updateActividad,
      deleteActividad,
      sedes,
      profesores,
    };
  },
};
</script>
