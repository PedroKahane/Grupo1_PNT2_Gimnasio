<template>
  <div>
    <h2>Detalle de actividad</h2>
    <div v-if="actividad">
      <p>
        <strong>Nombre: </strong
        ><input type="text" v-model="actividad.nombre" />
      </p>
      <p>
        <strong>Duracion(en minutos): </strong
        ><input type="text" v-model="actividad.duracion" />
      </p>
      <p>
        <strong>Sede: </strong>
        <select v-model="actividad.idSede">
          <option value="0" disabled selected>Selecciona la sede</option>
          <option v-for="sede in sedes" :value="sede.idSede">
            {{ sede.nombre }}
          </option>
        </select>
      </p>
      <p>
        <strong>Profesor: </strong>
        <select v-model="actividad.idProfesor">
          <option value="0" disabled selected>Selecciona el profesor</option>
          <option v-for="profesor in profesores" :value="profesor.id">
            {{ profesor.nombre }}
          </option>
        </select>
      </p>

      <button @click="deleteActividad">Borrar actividad</button>
      <button @click="updateActividad">Actualizar actividad</button>
    </div>
  </div>
</template>

<script>
import { useElementStore } from '../../../stores/Common';
import { useActividadStore } from '../../../stores/actividades';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';

export default {
  setup() {
    const elementStore = useElementStore();
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
      await elementStore.updateElement(url, elementStore.currentElement);
      router.push('/actividades');
    };

    const deleteActividad = async () => {
      await elementStore.deleteElement(url, actividadId);
      router.push('/actividades');
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
