<template>
    <div>
         <h2>Detalle de actividad</h2>
         <div v-if="actividad">
              <p>
                   <strong>Nombre: </strong><input type="text" v-model="actividad.nombre" />
              </p>
              <p>
                   <strong>Duracion(en minutos): </strong><input type="text" v-model="actividad.duracion" />
              </p>
           
              <button @click="deleteActividad">Borrar actividad</button>
              <button @click="updateActividad">Actualizar actividad</button>
         </div>
    </div>
</template>

<script>
import { useelementstore } from "../../stores/Common";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
    setup() {
         const elementStore = useelementstore();
         const router = useRouter();
         const route = useRoute();
         const actividadId = route.params.id.toString();
         const url = "https://6460fabb491f9402f49bfa55.mockapi.io/Actividades";

         elementStore.fetchElementById(url, actividadId);

         const actividad = computed(() => elementStore.currentElement);

         const updateActividad = async () => {
              await elementStore.updateElement(url, elementStore.currentElement);
              router.push("/actividades");
         };

         const deleteActividad = async () => {
              await elementStore.deleteElement(url, actividadId);
              router.push("/actividades");
         };

         return {
            actividad,
              updateActividad,
              deleteActividad
         };
    },
};
</script>
