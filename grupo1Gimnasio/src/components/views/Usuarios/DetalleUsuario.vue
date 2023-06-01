<template>
     <div class="container mt-4">
          <div class="text-center">
               <h4>Detalles del usuario: <strong>{{ user.nombre }}</strong></h4>
          </div>
          <div class="row">
               <div class="col-md-6 offset-md-3" v-if="user">
                    <div class="card bg-light text-dark mb-5">
                         <div v-if="user" class="card-body">
                              <div>
                                   <p>
                                        <strong>Nombre: </strong><input type="text" class="form-control"
                                             v-model="user.nombre" />
                                   </p>
                                   <p>
                                        <strong>Apellido: </strong><input type="text" class="form-control"
                                             v-model="user.apellido" />
                                   </p>
                                   <p>
                                        <strong>Mail: </strong><input type="email" class="form-control"
                                             v-model="user.mail" />
                                   </p>
                                   <p>
                                        <strong>Contraseña: </strong><input type="password" class="form-control"
                                             v-model="user.password" />
                                   </p>

                                   <p>
                                        <strong>Altura: </strong><input type="number" class="form-control"
                                             v-model="user.altura" min="0" /> cm
                                   </p>
                                   <p>
                                        <strong>Peso: </strong><input type="number" class="form-control" v-model="user.peso"
                                             min="0" />
                                   </p>
                                   <p>
                                        <strong>Edad: </strong><input type="number" class="form-control" v-model="user.edad"
                                             min="0" />
                                   </p>
                                   <p>
                                        <strong>Contacto: </strong><input type="tel" class="form-control"
                                             v-model="user.contacto" />
                                   </p>
                                   <p>
                                        <strong>Administrador: </strong><input type="checkbox"
                                             v-model="user.administrador" disabled />
                                   </p>
                                   <p>
                                        <strong>Dni: </strong><input type="number" class="form-control" v-model="user.dni"
                                             min="0" />
                                   </p>
                                   <p>
                                        <strong>Paquete: </strong><input type="text" class="form-control"
                                             v-model="nombrePaquete" disabled />
                                   </p>
                                   <p>
                                        <strong>Vencimiento de la membresia: </strong><input type="text"
                                             class="form-control" v-model="user.fechaVencimiento" disabled />
                                   </p>
                                   <p>
                                        <strong>Pago: </strong><input type="checkbox"
                                             v-model="user.pago" disabled />
                                   </p>
                                   <p>
                                        <strong>Tickets Usados: </strong><input type="number" class="form-control"
                                             v-model="user.ticketUsados" disabled />
                                   </p>
                                   <div class="d-flex justify-content-center">
                                        <button class="btn btn-success" @click="updateUsuario">
                                             Actualizar usuario
                                        </button>
                                        <button class="btn btn-danger" @click="deleteUsuario">
                                             Borrar usuario
                                        </button>

                                   </div>

                              </div>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
import { useElementStore } from "../../../stores/Common";
import { useGeneralStore } from "../../../stores/General";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
     setup() {
          const elementStore = useElementStore();
          const generalStore = useGeneralStore();
          const router = useRouter();
          const route = useRoute();
          const userId = route.params.id.toString();
          const url = "https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios";

          elementStore.fetchElementById(url, userId).then(() => {
               generalStore.fetchElementById(
                    "https://6460fabb491f9402f49bfa55.mockapi.io/Actividades",
                    elementStore.currentElement.idPaquete
               );
          });
          const user = computed(() => elementStore.currentElement);
          const nombrePaquete = computed(() => generalStore.element);

          const updateUsuario = async () => {
               await elementStore.updateElement(url, elementStore.currentElement);
               router.push("/usuarios");
          };

          const deleteUsuario = async () => {
               await elementStore.deleteElement(url, userId);
               router.push("/usuarios");
          };

          return {
               user,
               deleteUsuario,
               updateUsuario,
               nombrePaquete,
          };
     },
};
</script>
