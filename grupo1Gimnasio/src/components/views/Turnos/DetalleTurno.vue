<template>
    <div>
         <h2>Detalle de Turno</h2>
         <div v-if="turno">
          <div>
               <strong>Nombre Sede </strong>
                <select v-model="turno.idSede">
                <option value="0" disabled selected>Selecciona la sede</option>
                <option v-for="sede in sedes" :value="sede.idSede">
                {{ sede.nombre }}
                </option>
                </select>
               <br />
               <strong>Nombre Actividad </strong>
               <select v-model="turno.idActividad">
               <option value="0" disabled selected>Selecciona la actividad</option>
               <option v-for="actividad in actividades" :value="actividad.idActividad">
               {{ actividad.nombre }}
               </option>
               </select>
               
               <br />
               <strong>Nombre Profesor </strong>
               <select v-model="turno.profesorId">
               <option value="0" disabled selected>Selecciona el profesor</option>
               <option v-for="profesor in profesores" :value="profesor.profesorId">
               {{ profesor.nombre }}
               </option>
               </select>
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
import { useTurnoStore } from '../../../stores/turnos';
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";

export default {
    setup() {
         const elementStore = useElementStore();
         const turnoStore = useTurnoStore();
         const router = useRouter();
         const route = useRoute();
         const turnoId = route.params.id.toString();
         const url = "https://6460fabb491f9402f49bfa55.mockapi.io/Turno";

         elementStore.fetchElementById(url, turnoId);
          onMounted(()=> {
               turnoStore.fetchProfesores();
               turnoStore.fetchSedes();
               turnoStore.fetchActividades();
          });

         const turno = computed(() => elementStore.currentElement);

          const sedes = computed (() => turnoStore.getSedes);
          const profesores = computed (() => turnoStore.getProfesores)
          const actividades = computed (()=> turnoStore.getActividades)
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
          deleteTurno,
          sedes,
          profesores,
          actividades
         };
    },
};
</script>
