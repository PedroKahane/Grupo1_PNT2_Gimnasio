<template>
    <div>
         <h2>Detalle de Turno</h2>
         <div v-if="turno">
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
               <input class="m-2" type="text" v-model="turno.fecha">
               <br />
               <strong>cantPersonasLim </strong>
               <input class="m-2" type="text" v-model="turno.cantPersonasLim">
               <br />
               <strong>Precio </strong>
               <input class="m-2" type="text" v-model="turno.precio">
               <br />
               <button @click="deleteTurno">Borrar Turno</button>
              <button @click="updateTurno">Actualizar Turno</button>
          </div>
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
         const turnoId = route.params.id.toString();
         const url = "https://6460fabb491f9402f49bfa55.mockapi.io/Turno";

         elementStore.fetchElementById(url, turnoId);

         const turno = computed(() => elementStore.currentElement);

         const updateTurno = async () => {
              await elementStore.updateElement(url, elementStore.currentElement);
              router.push("/turnos");
         };

         const deleteTurno = async () => {
              await elementStore.deleteElement(url, turnoId);
              router.push("/turnos");
         };

         return {
          turno,
          updateTurno,
          deleteTurno
         };
    },
};
</script>
