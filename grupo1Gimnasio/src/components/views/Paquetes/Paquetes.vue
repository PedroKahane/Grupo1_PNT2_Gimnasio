<template>
  <div class="container mt-3">
    <h4 class="text-center">Paquetes</h4>
    <div class="d-flex flex-column align-items-center">
      <h5 class="text-center" v-if="user">Tickets restantes: <strong>{{ user.ticketsRestantes }}</strong></h5>
    </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Nombre:</th>
          <th>Precio:</th>
          <th>Cantidad Tickets:</th>
          <th>Elegí tu paquete:</th>
          <th v-if="isAuthenticated() && isAdmin()">Detalles:</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="paquetes in elementStore.getElements" :key="paquetes.id">
          <td>{{ paquetes.nombre }}</td>
          <td>${{ paquetes.precio }}</td>
          <td>{{ paquetes.cantTickets }}</td>
          <td class="text-center"><button class="btn btn-primary"
              v-on:click="actualizarTickets(paquetes.cantTickets)">Comprar paquete</button>
          </td>
          <td v-if="isAuthenticated() && isAdmin()"><router-link :to="`/paquetes/${paquetes.id}`"><strong>Ver detalles</strong></router-link></td>
        </tr>
      </tbody>
      <br>
      <button v-if="isAdmin()" class="btn btn-danger"><router-link to="/crearPaquete" class="nav-item nav-link" href="#">Crear
          Paquete</router-link></button>
    </table>
    </div>
    <br>
   </template>
<script>
import { useElementStore } from "../../../stores/Store";
import { useGeneralStore } from "../../../stores/General";
import { onMounted } from "vue";
import Cookies from "js-cookie";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { isAdmin, isAuthenticated } from "../../../utils/Auth";

export default {
  setup() {
    const elementStore = useElementStore("paquetes")();
    const generalStore = useGeneralStore();
    const busqueda = "";
    const router = useRouter();

    var user = null;

    var usuario = Cookies.get('usuario');
    if (usuario) {
      usuario = JSON.parse(usuario)
      usuario = usuario[0]
      elementStore.fetchElementById("https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios", usuario.id);
      user = computed(() => elementStore.currentElement);
      //user = usuario.value;
      //console.log(user);
    }

    onMounted(() => {
      elementStore.currentElement = null
      elementStore.fetchElements("https://646937ca03bb12ac208876f1.mockapi.io/paquetes")
    })

    function buscar() {
      elementStore.filtrarXString(this.busqueda);
    }

    function reiniciar() {
      location.reload();
    }

    function actualizarTickets(tickets) {
      if (typeof Cookies !== 'undefined' && Cookies.get('usuario') === undefined) {
        alert("Necesitas iniciar sesión para comprar paquetes");
        router.push("/login");
      } else {
        var confirmar = window.confirm('¿Estás seguro de que deseas realizar esta acción?');
        if (confirmar) {
          //CONFIRM-CONFIRM-CONFIRM-CONFIRM-CONFIRM-CONFIRM
          alert("Se actualizaron los tickets en tu cuenta");
          generalStore.agregarTickets(tickets);
          router.push("/");
        } else {
          alert('Compra cancelada');
        }
      }
    }

    return {
      elementStore,
      buscar,
      busqueda,
      reiniciar,
      actualizarTickets,
      user,
      usuario,
      isAdmin,
      isAuthenticated
    }
  },
}
</script>
   