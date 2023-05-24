<template>
     <div>
          <h2>Detalle de usuario</h2>
          <div v-if="user">
               <p>
                    <strong>Nombre: </strong><input type="text" v-model="user.nombre" />
               </p>
               <p>
                    <strong>Apellido: </strong><input type="text" v-model="user.apellido" />
               </p>
               <p>
                    <strong>Mail: </strong><input type="email" v-model="user.mail" />
               </p>
               <p>
                    <strong>Contraseña: </strong><input type="password" v-model="user.password" />
               </p>
               
               <p>
                    <strong>Altura: </strong><input type="number" v-model="user.altura" />
               </p>
               <p>
                    <strong>Peso: </strong><input type="number" v-model="user.peso" />
               </p>
               <p>
                    <strong>Edad: </strong><input type="number" v-model="user.edad" />
               </p>
               <p>
                    <strong>Contacto: </strong><input type="tel" v-model="user.contacto" />
               </p>
               <p>
                    <strong>Administrador: </strong><input type="checkbox" v-model="user.administrador" disabled  />
               </p>
               <p>
                    <strong>Dni: </strong><input type="number" v-model="user.dni" />
               </p>
               <p>
                    <strong>Nombre del paquete: </strong><input type="text" v-model="nombrePaquete" disabled  />
               </p>
               <p>
                    <strong>Vencimiento de la membresia: </strong><input type="number" v-model="user.fechaVencimiento" disabled  />
               </p>
               <p>
                    <strong>Pago: </strong><input type="checkbox" v-model="user.pago" disabled  />
               </p>
               <p>
                    <strong>Tickets Usados: </strong><input type="number" v-model="user.ticketUsados" disabled  />
               </p>
               <button @click="deleteUsuario">Borrar usuario</button>
               <button @click="updateUsuario">Actualizar usuario</button>
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
          const userId = route.params.id.toString();
          const url = "https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios";

          elementStore.fetchElementById(url, userId)

          const user = computed(() => elementStore.currentElement);

          const updateUsuario = async () => {
               await elementStore.updateElement(url, elementStore.currentElement);
               router.push("/usuarios");
          };

          const deleteUsuario = async () => {
               await elementStore.deleteElement(url, userId);
               router.push("/usuarios");
          };

          //funcion a terminar
          function reiniciarTicketsFinDeMes(){

               
          }     

          return {
               user,
               deleteUsuario,
               updateUsuario,
          };
     },
};
</script>