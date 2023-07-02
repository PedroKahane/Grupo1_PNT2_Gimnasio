<template>
     <div class="container mt-4">
          <div class="row">
               <div class="col-md-6 offset-md-3" v-if="profesor">
                    <div class="card bg-light text-dark mb-5">
                         <div v-if="profesor" class="card-body">
                              <h4>Detalles del profesor: <strong>{{ profesor.nombre }}</strong></h4>
                              <div>
                                   <p>
                                        <strong>Nombre: </strong><input type="text" class="form-control"
                                             v-model="profesor.nombre" />
                                   </p>
                                   <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorNombre">
                                        <strong>El nombre no puede estar vacío</strong>
                                   </h6>
                                   <p>
                                        <strong>Apellido: </strong><input type="text" class="form-control"
                                             v-model="profesor.apellido" />
                                   </p>
                                   <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorApellido">
                                        <strong>El apellido no puede estar vacío</strong>
                                   </h6>
                                   <div class="d-flex justify-content-center">
                                        <button class="btn btn-success" @click="updateProfesor">Actualizar profesor</button>
                                        <button class="btn btn-danger" @click="deleteProfesor">Borrar profesor</button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <h3>Turnos del Profesor:</h3>
          <br>
          <div>
               <table class="table table-striped table-bordered">
                    <thead>
                         <tr>
                              <th>Sede:</th>
                              <th>Actividad:</th>
                              <th>Fecha</th>
                              <th>Cantidad de Cupos en Total:</th>
                              <th>Cupos Ocupados:</th>
                         </tr>
                    </thead>
                    <tbody>
                         <tr v-for="turno in turnosDelProfesor" :key="turno.id">
                              <td>{{ getSedeNombre(turno.idSede) }}</td>
                              <td>{{ getActividadNombre(turno.idActividad) }}</td>
                              <td>{{ getFechaFormateada(turno.fecha) }}</td>
                              <td>{{ turno.cantPersonasLim }}</td>
                              <td>{{ getCuposOcupados(turno.id) }}</td>
                         </tr>
                    </tbody>
               </table>
          </div>
     </div>
     <br>
     <div class="d-flex justify-content-center">
          <button class="btn btn-warning"><router-link to="/profesores" class="nav-item nav-link" href="#">Volver a
                    Profesores</router-link></button>
     </div>
     <br>
</template>
<script>
import { useElementStore } from "../../../stores/Store";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { computed, ref, onMounted } from "vue";

export default {
     setup() {
          const elementStore = useElementStore("profesores")();
          const turnosStore = useElementStore("turnos")()
          const sedesStore = useElementStore("sedes")()
          const actividadesStore = useElementStore("actividades")()
          const turnosPersonasStore = useElementStore("turnosPersonas")()
          const router = useRouter();
          const route = useRoute();
          const profesorId = route.params.id.toString();
          const url = "https://64662c65228bd07b355ddc69.mockapi.io/profesores";
          const urlTurnos = "https://6460fabb491f9402f49bfa55.mockapi.io/Turno";

          elementStore.fetchElementById(url, profesorId);

          const profesor = computed(() => elementStore.currentElement);

          const updateProfesor = async () => {
               if (validar() && elementStore.confirm("modificar", "modificado", "Profesor")) {
                    await elementStore.updateElement(url, elementStore.currentElement);
                    router.push("/profesores");
               }
          };

          onMounted(async () => {
               await turnosStore.fetchElements(urlTurnos);
               await sedesStore.fetchElements("https://645ae28c95624ceb210d09ed.mockapi.io/Sede");
               await actividadesStore.fetchElements("https://6460fabb491f9402f49bfa55.mockapi.io/Actividades");
               await turnosPersonasStore.fetchElements("https://64662c65228bd07b355ddc69.mockapi.io/turnoPersona");
          })

          const turnos = computed(() => turnosStore.getElements)
          const sedes = computed(() => sedesStore.getElements)
          const actividades = computed(() => actividadesStore.getElements)
          const turnosPersonas = computed(() => turnosPersonasStore.getElements)

          const errorNombre = ref(false);
          const errorApellido = ref(false);

          function validar() {
               setearEnFalse();
               let resultado = true;
               const profesor = elementStore.currentElement;
               if (profesor.nombre.trim() === '') { errorNombre.value = true; resultado = false; }
               if (profesor.apellido.trim() === '') { errorApellido.value = true; resultado = false; }

               if (!resultado) { alert("Error detectado en el ingreso de campos") }
               return resultado;
          };

          function setearEnFalse() {
               errorNombre.value = false;
               errorApellido.value = false;
          }

          const deleteProfesor = async () => {
               if (elementStore.confirm("eliminar", "eliminado", "Profesor")) {
                    await elementStore.deleteElement(url, profesorId);
                    router.push("/profesores");
               }
          };

          const turnosDelProfesor = computed(() => {
               if (turnos.value) {
                    return turnos.value.filter(turno => turno.idProfesor === profesorId);
               } else {
                    return [];
               }
          });

          function getCuposOcupados(idTurnoActual){
               if (turnosPersonas.value) {
                    return turnosPersonas.value.filter(turno => turno.idTurno === idTurnoActual).length;
               } else {
                    return 0;
               }
          }

          //console.log(turnosDelProfesor);

          function getSedeNombre(idSede) {
               if (sedes.value) {
                    const sede = sedes.value.find(sede => Number(sede.id) === Number(idSede));
                    return sede.nombre;
               }
          }

          function getActividadNombre(idActividad) {
               if (actividades.value) {
                    const actividad = actividades.value.find(actividad => Number(actividad.id) === Number(idActividad));
                    return actividad.nombre;
               }
          }

          function getFechaFormateada(fecha) {
               let fechaFormateada = fecha;
               if (!fecha.includes('/')) {
                         fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
                         day: '2-digit',
                         month: '2-digit',
                         hour: '2-digit',
                         year: 'numeric',
                         minute: '2-digit',
                         second: '2-digit',
                         hour12: false
                    });
               }
               return fechaFormateada;
          }

          return {
               profesor,
               deleteProfesor,
               updateProfesor,
               errorApellido,
               errorNombre,
               turnosDelProfesor,
               getActividadNombre,
               getSedeNombre,
               getFechaFormateada,
               getCuposOcupados
          };
     },
};
</script>
