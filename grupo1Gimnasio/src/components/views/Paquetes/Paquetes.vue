<template>
  <div class="container mt-3">
    <h4 class="text-center">Paquetes</h4>
    <div class="d-flex justify-content-end input-group mb-3">
      <form class="d-flex" v-on:submit.prevent="buscar">
        <input type="text" class="form-control bg-light border-1 mr-2" placeholder="Buscar..." v-model="busqueda">
        <button class="btn btn-success">Buscar</button>
        <button class="btn btn-danger" v-on:click="reiniciar">Reiniciar</button>
      </form>
    </div>
    <div class="d-flex flex-column align-items-center">
      <h4 class="text-center" v-if="usuario">Tickets restantes: {{ user.ticketsRestantes }}</h4>
    </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Nombre:</th>
          <th>Precio:</th>
          <th>Cantidad Tickets:</th>
          <th></th>
          <th></th>
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
          <td><router-link :to="`/paquetes/${paquetes.id}`"><strong>Ver detalles</strong></router-link></td>
        </tr>
      </tbody>
      <br>
      <button class="btn btn-danger"><router-link to="/crearPaquete" class="nav-item nav-link" href="#">Crear
          Paquete</router-link></button>
    </table>
  </div>
</template>
   
<script>
import { useElementStore } from "../../../stores/Common";
import { useGeneralStore } from "../../../stores/General";
import { onMounted } from "vue";
import Cookies from "js-cookie";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const elementStore = useElementStore();
    const generalStore = useGeneralStore();
    const busqueda = "";
    const router = useRouter();

    var usuario = Cookies.get('usuario');
    if (usuario) {
      usuario = JSON.parse(usuario)
      usuario = usuario[0]
      elementStore.fetchElementById("https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios", usuario.id);
      var user = computed(() => elementStore.currentElement);
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
      usuario
    }
  },
}
</script>
   