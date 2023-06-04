<template>
  <div>
    <h2>Crear Turno</h2>
    <div>
      <strong>ID Sede </strong>
      <input class="m-2" type="text" v-model="turno.idSede">
      <br />
      <strong>ID Actividad </strong>
      <input class="m-2" type="text" v-model="turno.idActividad">
      <br />
      <strong>ID Profesor </strong>
      <input class="m-2" type="text" v-model="turno.profesor">
      <br />
      <strong>fecha </strong>
      <input class="m-2" type="datetime-local" v-model="turno.fecha">
      <br />
      <strong>cantPersonasLim </strong>
      <input class="m-2" type="text" v-model="turno.cantPersonasLim">
      <br />
      <button class="m-3" @click="createTurno">Crear Turno</button>
    </div>
  </div>
</template>

<script>
import { useElementStore } from '../../../stores/Common';
import { useRouter } from 'vue-router'
import { computed } from "vue";


export default {
  setup() {
    const elementStore = useElementStore()
    elementStore.setCurrentElement({idSede:"",
    idActividad:"",
    idProfesor:"",
    fecha:"",
    precio:"",
    cantPersonasLim:""})
    const turno = computed(() => elementStore.currentElement);
    const router = useRouter()
    const url = "https://6460fabb491f9402f49bfa55.mockapi.io/Turno";

    const createTurno = async () => {
      await elementStore.createElement(url, turno.value)
      router.push('/turnos')
    }

    return {
      createTurno,
      turno
    }
  },
}
</script>