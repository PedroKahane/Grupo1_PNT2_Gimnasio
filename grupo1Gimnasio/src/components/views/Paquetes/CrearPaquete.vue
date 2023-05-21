<template>
  <div>
    <h2>Crear Paquete</h2>
    <div>
      <strong>Nombre </strong>
      <input class="m-2" type="text" v-model="paquete.nombre">
      <br />
      <strong>Cantidad de tickets </strong>
      <input class="m-2" type="text" v-model="paquete.cantTickets">
      <br />
      <strong>Precio </strong>
      <input class="m-2" type="text" v-model="paquete.precio">
      <br />
      <button class="m-3" @click="createPaquete">Crear Paquete</button>
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
    elementStore.setCurrentElement({ nombre: "", precio: "", cantTickets: "" })
    const paquete = computed(() => elementStore.currentElement);
    const router = useRouter()
    const url = "https://646937ca03bb12ac208876f1.mockapi.io/paquetes";

    const createPaquete = async () => {
      await elementStore.createElement(url, paquete.value)
      router.push('/paquetes')
    }

    return {
      createPaquete,
      paquete
    }
  },
}
</script>