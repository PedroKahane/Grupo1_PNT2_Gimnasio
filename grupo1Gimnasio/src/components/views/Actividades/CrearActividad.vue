<template>
  <div>
    <h2>Crear Actividad</h2>
    <div>
      <strong>Nombre </strong>
      <input class="m-2" type="text" v-model="actividad.nombre" />
      <br />
      <strong>Duracion </strong>
      <input class="m-2" type="text" v-model="actividad.duracion" />
      <br />
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

      <button class="m-3" @click="createActividad">Crear Actividad</button>
    </div>
  </div>
</template>

<script>
import { useElementStore } from '../../../stores/Common';
import { useActividadStore } from '../../../stores/actividades';
import { useRouter } from 'vue-router';
import { onMounted, computed } from 'vue';

export default {
  setup() {
    const elementStore = useElementStore();
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
      await elementStore.createElement(url, actividad.value);
      router.push('/actividades');
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
