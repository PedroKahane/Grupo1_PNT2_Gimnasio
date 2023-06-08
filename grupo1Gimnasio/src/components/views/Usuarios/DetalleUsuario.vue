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
                                   <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorNombre">
                                        <strong>El nombre no puede contener números o estar vacío</strong>
                                   </h6>
                                   <p>
                                        <strong>Apellido: </strong><input type="text" class="form-control"
                                             v-model="user.apellido" />
                                   </p>
                                   <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorApellido">
                                        <strong>El apellido no puede contener números o estar vacío</strong>
                                   </h6>
                                   <p>
                                        <strong>Mail: </strong><input type="email" class="form-control"
                                             v-model="user.mail" />
                                   </p>
                                   <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorMail">
                                        <strong>Formato de mail inválido</strong>
                                   </h6>
                                   <div class="form-group row mb-3">
                                        <p>
                                             <strong>Contraseña: </strong>
                                        </p>
                                        <div class="col">
                                             <input :type="mostrar" class="form-control" v-model="user.password"
                                                  placeholder="tuContraseña" required />
                                        </div>
                                        <div v-if="sameUser(user.id)" class="col-auto">
                                             <button class="btn btn-outline-dark" type="button" id="togglePassword"
                                                  @mousedown="mostrarContraseña" @mouseup="mostrarContraseña">Ver
                                                  contraseña</button>
                                        </div>
                                   </div>
                                   <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorContraseña">
                                        <strong>La contraseña debe contener al menos 8 caracteres, un número y una
                                             mayúscula</strong>
                                   </h6>
                                   <p>
                                        <strong>Altura: </strong><input type="number" class="form-control"
                                             v-model="user.altura" min="0" />
                                   </p>
                                   <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorAltura">
                                        <strong>La altura debe ser entre 1 y 300 cm</strong>
                                   </h6>
                                   <p>
                                        <strong>Peso: </strong><input type="number" class="form-control" v-model="user.peso"
                                             min="0" />
                                   </p>
                                   <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorPeso">
                                        <strong>El peso debe ser entre 1 y 500 kg</strong>
                                   </h6>
                                   <p>
                                        <strong>Edad: </strong><input type="number" class="form-control" v-model="user.edad"
                                             min="0" />
                                   </p>
                                   <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorEdad">
                                        <strong>La edad debe ser entre 1 y 100 años</strong>
                                   </h6>
                                   <p>
                                        <strong>Contacto: </strong><input type="tel" class="form-control"
                                             v-model="user.contacto" />
                                   </p>
                                   <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorContacto">
                                        <strong>Formato del telefono inválido</strong>
                                   </h6>
                                   <p>
                                        <strong>Administrador: </strong>
                                        <input type="checkbox" v-model="user.administrador" />
                                   </p>
                                   <p>
                                        <strong>Dni: </strong><input type="number" class="form-control" v-model="user.dni"
                                             min="0" />
                                   </p>
                                   <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorDNI">
                                        <strong>Formato del dni inválido</strong>
                                   </h6>
                                   <p>
                                        <strong>Tickets restantes: </strong><input type="number" class="form-control"
                                             v-model="user.ticketsRestantes" />
                                   </p>
                                   <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorTickets">
                                        <strong>Los tickets deben ser mayor a 0</strong>
                                   </h6>
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
</template>

<script>
import { useElementStore } from "../../../stores/Store";
import { getCookieJSON } from "../../../stores/Cookies";
import { useRouter, useRoute } from "vue-router";
import { computed, ref } from "vue";
import { sameUser } from "../../../utils/Auth";

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

          const errorNombre = ref(false);
          const errorApellido = ref(false);
          const errorMail = ref(false);
          const errorContraseña = ref(false);
          const errorAltura = ref(false);
          const errorPeso = ref(false);
          const errorEdad = ref(false);
          const errorContacto = ref(false);
          const errorDNI = ref(false);
          const errorTickets = ref(false);

          const updateUsuario = async () => {
               if (validar() && userStore.confirm("modificar", "modificado", "Usuario")) {
                    await userStore.updateElement(url, userStore.currentElement);
                    router.push("/usuarios");
               }
          };

          function validar() {
               setearEnFalse();
               let resultado = true;
               const persona = userStore.currentElement;
               if (/\d/.test(persona.nombre) || persona.nombre.trim() === '') { errorNombre.value = true; resultado = false; }
               if (/\d/.test(persona.apellido) || persona.apellido.trim() === '') { errorApellido.value = true; resultado = false; }
               if (!/@/.test(persona.mail)) { errorMail.value = true; resultado = false; }
               if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(persona.password)) { errorContraseña.value = true; resultado = false; }
               if (!(Number(persona.altura) >= 1 && Number(persona.altura) <= 300)) { errorAltura.value = true; resultado = false; }
               if (!(Number(persona.peso) >= 1 && Number(persona.peso) <= 600)) { errorPeso.value = true; resultado = false; }
               if (!(Number(persona.edad) >= 1 && Number(persona.edad) <= 100)) { errorEdad.value = true; resultado = false; }
               if (!/^\d{10}$/.test(Number(persona.contacto))) { errorContacto.value = true; resultado = false; }
               if (!/^\d{7,8}$/.test(Number(persona.dni))) { errorDNI.value = true; resultado = false; }
               if (!(Number(persona.ticketsRestantes) >= 1)) { errorTickets.value = true; resultado = false; }

               if(!resultado){alert("Error detectado en el ingreso de campos")}
               return resultado;
          };

          function setearEnFalse() {
               errorNombre.value = false;
               errorApellido.value = false;
               errorMail.value = false;
               errorContraseña.value = false;
               errorAltura.value = false;
               errorPeso.value = false;
               errorEdad.value = false;
               errorContacto.value = false;
               errorDNI.value = false;
               errorTickets.value =  false;
          }

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
               sameUser,
               errorNombre,
               errorApellido,
               errorMail,
               errorContraseña,
               errorAltura,
               errorPeso,
               errorEdad,
               errorContacto,
               errorDNI,
               errorTickets,
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