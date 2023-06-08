<template>
  <div class="container mt-4">
    <div class="text-center">

    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3" v-if="paquete">
        <div class="card bg-light text-dark mb-5">
          <div v-if="paquete" class="card-body">
            <h4>Detalles del Paquete: <strong>{{ paquete.nombre }}</strong></h4>
            <div>
              <p>
                <strong>Nombre: </strong><input type="text" class="form-control" v-model="paquete.nombre" />
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorNombre">
                <strong>El nombre no puede estar vacío</strong>
              </h6>
              <p>
                <strong>Precio: </strong><input type="text" class="form-control" v-model="paquete.precio" />
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorTickets">
                <strong>La cantidad de tickets deben ser mayor a 0</strong>
              </h6>
              <p>
                <strong>Cantidad de tickets: </strong><input type="text" class="form-control"
                  v-model="paquete.cantTickets" />
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorPrecio">
                <strong>El precio debe ser mayor a 0</strong>
              </h6>
              <div class="d-flex justify-content-center">
                <button class="btn btn-success" @click="updatePaquete">Actualizar paquete</button>
                <button class="btn btn-danger" @click="deletePaquete">Borrar paquete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-warning"><router-link to="/paquetes" class="nav-item nav-link" href="#">Volver a
          Paquetes</router-link></button>
    </div>
  </div>
  <br>
</template>

<script>
import { useElementStore } from "../../../stores/Store";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";

export default {
  setup() {
    const elementStore = useElementStore("paquetes")();
    const router = useRouter();
    const route = useRoute();
    const paqueteId = route.params.id.toString();
    const url = "https://646937ca03bb12ac208876f1.mockapi.io/paquetes";

    elementStore.fetchElementById(url, paqueteId);

    const paquete = computed(() => elementStore.currentElement);

    const updatePaquete = async () => {
      if (validar() && elementStore.confirm("modificar", "modificado", "Paquete")) {
        await elementStore.updateElement(url, elementStore.currentElement);
        router.push("/paquetes");
      }
    };

    const errorNombre = ref(false);
    const errorTickets = ref(false);
    const errorPrecio = ref(false);

    function validar() {
      setearEnFalse();
      let resultado = true;
      const paquete = elementStore.currentElement;
      if (paquete.nombre.trim() === '') { errorNombre.value = true; resultado = false; }
      if (!(Number(paquete.cantTickets) >= 1)) { errorTickets.value = true; resultado = false; }
      if (!(Number(paquete.precio) >= 1)) { errorPrecio.value = true; resultado = false; }

      if (!resultado) { alert("Error detectado en el ingreso de campos") }
      return resultado;
    };

    function setearEnFalse() {
      errorNombre.value = false;
      errorTickets.value = false;
      errorPrecio.value = false;
    }

    const deletePaquete = async () => {
      if (elementStore.confirm("modificar", "modificado", "Paquete")) {
        await elementStore.deleteElement(url, paqueteId);
        router.push("/paquetes");
      }
    };

    return {
      paquete,
      updatePaquete,
      deletePaquete,
      errorNombre,
      errorPrecio,
      errorTickets
    };
  },
};
</script>
