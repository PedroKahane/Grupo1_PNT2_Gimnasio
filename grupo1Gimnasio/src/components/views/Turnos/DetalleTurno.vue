<template>
 <div class="container mt-4">
    <div class="text-center">
     
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3" v-if="turno">
        <div class="card bg-light text-dark mb-5">
          <div v-if="turno" class="card-body">
          <h4>Detalles del Turno: <strong>{{ turno.id }}</strong></h4>
              <div>
                <p>
                  <strong>Nombre Sede: </strong>
                  <select v-model="turno.idSede">
                              <option value="0" disabled selected>Selecciona la sede</option>
                              <option v-for="sede in sedes" :value="sede.idSede">
                                   {{ sede.nombre }}
                              </option>
                    </select>
                </p>

                <p>
                  <strong>Nombre Actividad: </strong>
                  <select v-model="turno.idActividad">
                              <option value="0" disabled selected>Selecciona la actividad</option>
                              <option v-for="actividad in actividades" :value="actividad.idActividad">
                                   {{ actividad.nombre }}
                              </option>
                  </select>
                </p>

                <p>
                  <strong>Nombre Profesor: </strong>
                  <select v-model="turno.profesorId">
                              <option value="0" disabled selected>Selecciona el profesor</option>
                              <option v-for="profesor in profesores" :value="profesor.profesorId">
                                   {{ profesor.nombre }}
                              </option>
                  </select>
                </p>

                <p>
                    <strong>fecha </strong>
                    <input class="m-2" type="text" v-model="turno.fecha">
                </p>

               <p>
                    <strong>cantPersonasLim </strong>
                    <input class="m-2" type="text" v-model="turno.cantPersonasLim">
                </p>
                
                <p>
                    <strong>Precio </strong>
                    <input class="m-2" type="text" v-model="turno.precio">
               </p>

                <div class="d-flex justify-content-center">
                  <button class="btn btn-danger" @click="deleteTurno">Borrar turno</button>
                  
                  <button class="btn btn-success" @click="updateTurno">Actualizar turno</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
    <button class="btn btn-warning" ><router-link to="/turnos" class="nav-item nav-link" href="#">Volver a Turnos</router-link></button>
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
