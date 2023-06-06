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
                                   <div class="form-group row mb-3">
                                        <p>
                                             <strong>Contraseña: </strong>
                                        </p>
                                        <div class="col">
                                             <input :type="mostrar" class="form-control" v-model="user.password"
                                                  placeholder="tuContraseña" required />
                                        </div>
                                        <div class="col-auto">
                                             <button class="btn btn-outline-dark" type="button" id="togglePassword"
                                                  @mousedown="mostrarContraseña" @mouseup="mostrarContraseña">Ver
                                                  contraseña</button>
                                        </div>
                                   </div>
                                   <p>
                                        <strong>Altura: </strong><input type="number" class="form-control"
                                             v-model="user.altura" min="0" />
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
                                        <strong>Administrador: </strong>
                                        <input type="checkbox" v-model="user.administrador" />
                                   </p>
                                   <p>
                                        <strong>Dni: </strong><input type="number" class="form-control" v-model="user.dni"
                                             min="0" />
                                   </p>
                                   <p>
                                        <strong>Tickets restantes: </strong><input type="number" class="form-control"
                                             v-model="user.ticketsRestantes" />
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
                    <div class="d-flex justify-content-center">
                         <button class="btn btn-warning"><router-link to="/" class="nav-item nav-link"
                                   href="#">Volver</router-link></button>
                    </div>
               </div>
          </div>
     </div>
     <br>
     <br>
</template>

<script>
import { useElementStore } from "../../../stores/Store";
import { getCookieJSON } from "../../../stores/Cookies";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

export default {
     setup() {
          const usuarioLoguado = getCookieJSON();
          const userStore = useElementStore("usuarios")()
          const router = useRouter();
          const route = useRoute();
          const userId = route.params.id.toString();
          const url = "https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios";

          userStore.fetchElementById(url, userId);
          const user = computed(() => userStore.currentElement);

          const updateUsuario = async () => {
               if (userStore.confirm("modificar", "modificado", "Usuario")) {
                    await userStore.updateElement(url, userStore.currentElement);
                    router.push("/usuarios");
               }
          };

          const deleteUsuario = async () => {
               if (userStore.confirm("eliminar", "eliminado", "Usuario")) {
                    await userStore.deleteElement(url, userId);
                    router.push("/usuarios");
               }
          };

          return {
               user,
               deleteUsuario,
               updateUsuario,
               usuarioLoguado,
          };
     },
     data() {
          return {
               mostrar: "password",
               mostrarBool: true,
          };
     },
     methods: {
          mostrarContraseña() {
               if (this.mostrarBool) {
                    this.mostrar = "text"
               } else this.mostrar = "password"
               this.mostrarBool = !this.mostrarBool
          }
     }
};
</script>