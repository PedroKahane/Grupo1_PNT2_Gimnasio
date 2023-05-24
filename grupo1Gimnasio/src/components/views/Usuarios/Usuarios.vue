<template>
  <div>
    <h2>Usuarios</h2>
    <ul>
      <li v-for="user in elementStore.getElements" :key="user.id">
        <router-link :to="`/usuarios/${user.id}`">{{ user.nombre }}</router-link>
      </li>
    </ul>
    <router-link to="/crearUsuario" class="nav-item nav-link" href="#">Crear Usuario</router-link>
  </div>
</template>

<script>
import { useElementStore } from "../../../stores/Common";
import { onMounted } from "vue";

export default {
  setup() {
    const elementStore = useElementStore()
    const url = "https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios";

    onMounted(() => {
      elementStore.currentElement = null
      elementStore.fetchElements(url)
    })

    // funcion para actualizar tickets a final de mes
    var fechaActual = new Date();
    var ultimoDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

    if (fechaActual.getDate() === ultimoDiaDelMes.getDate()) {
      console.log("reiniciando tickets de todos los usuarios...")

      setTimeout(() => {
        const modifiedElements = elementStore.getElements.map(element => {
          element.ticketUsados = 0;
          return element;
        });
        modifiedElements.forEach(element => {
          elementStore.updateElement(url, element);
        });
      }, 500);
      
    }

    return {
      elementStore,
    }
  },
}
</script>