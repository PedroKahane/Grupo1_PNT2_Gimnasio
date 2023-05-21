<template>
    <div>
         <h2>Detalle de paquete</h2>
         <div v-if="paquete">
              <p>
                   <strong>Nombre: </strong><input type="text" v-model="paquete.nombre" />
              </p>
              <p>
                   <strong>Precio </strong><input type="text" v-model="paquete.precio" />
              </p>
              <p>
                   <strong>Cantidad de tickets </strong><input type="text" v-model="paquete.cantTickets" />
              </p>
              <button @click="deletePaquete">Borrar Paquete</button>
              <button @click="updatePaquete">Actualizar Paquete</button>
         </div>
    </div>
</template>

<script>
import { useElementStore } from "../../../stores/Common";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
    setup() {
         const elementStore = useElementStore();
         const router = useRouter();
         const route = useRoute();
         const paqueteId = route.params.id.toString();
         const url = "https://646937ca03bb12ac208876f1.mockapi.io/paquetes";

         elementStore.fetchElementById(url, paqueteId);

         const paquete = computed(() => elementStore.currentElement);

         const updatePaquete = async () => {
              await elementStore.updateElement(url, elementStore.currentElement);
              router.push("/paquetes");
         };

         const deletePaquete = async () => {
              await elementStore.deleteElement(url, paqueteId);
              router.push("/paquetes");
         };

         return {
          paquete,
          updatePaquete,
          deletePaquete
         };
    },
};
</script>
