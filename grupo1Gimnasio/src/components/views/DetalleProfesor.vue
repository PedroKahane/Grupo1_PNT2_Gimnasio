<template>
     <div>
          <h2>Detalle de profesor</h2>
          <div v-if="profesor">
               <p>
                    <strong>Nombre: </strong><input type="text" v-model="profesor.nombre" />
               </p>
               <p>
                    <strong>Apellido: </strong><input type="text" v-model="profesor.apellido" />
               </p>
            
               <button @click="deleteProfesor">Borrar profesor</button>
               <button @click="updateProfesor">Actualizar profesor</button>
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
          const profesorId = route.params.id.toString();
          const url = "https://6460fabb491f9402f49bfa55.mockapi.io/Actividades";

          elementStore.fetchElementById(url, profesorId);

          const profesor = computed(() => elementStore.currentElement);

          const updateProfesor = async () => {
               await elementStore.updateElement(url, elementStore.currentElement);
               router.push("/profesores");
          };

          const deleteProfesor = async () => {
               await elementStore.deleteElement(url, profesorId);
               router.push("/profesores");
          };

          return {
               profesor,
               deleteProfesor,
               updateProfesor
          };
     },
};
</script>
