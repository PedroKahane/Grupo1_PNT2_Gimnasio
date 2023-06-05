<template>
  <div>
    <h2>Crear Profesor</h2>
    <div>
      <strong>Nombre </strong>
      <input class="m-2" type="text" v-model="profesor.nombre">
      <br />
      <strong>Apellido </strong>
      <input class="m-2" type="text" v-model="profesor.apellido">
   
      <button class="m-3" @click="createProfesor">Crear Profesor</button>
    </div>
  </div>
</template>
   
<script>
import { useElementStore } from '../../../stores/Store';
import { useRouter } from 'vue-router'
import { computed } from "vue";


export default {
  setup() {
    const elementStore = useElementStore("profesores")()
    elementStore.setCurrentElement({ nombre: "", apellido: ""})
    const profesor = computed(() => elementStore.currentElement);
    const router = useRouter()
    const url = "https://64662c65228bd07b355ddc69.mockapi.io/profesores";

    const createProfesor = async () => {
      await elementStore.createElement(url, profesor.value)
      router.push('/profesores')
    }

    return {
      createProfesor,
      profesor
    }
  },
}
</script>