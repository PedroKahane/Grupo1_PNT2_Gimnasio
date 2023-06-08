<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6 offset-md-3" v-if="sede">
        <div class="card bg-light text-dark mb-5">
          <div v-if="sede" class="card-body">
            <h4>Crear Sede</h4>
            <div>
              <p>
                <strong>Nombre: </strong><input type="text" class="form-control" v-model="sede.nombre"
                  placeholder="Sede Almagro" />
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorNombre">
                <strong>El nombre no puede estar vacío</strong>
              </h6>
              <p>
                <strong>Ubicacion: </strong><input type="text" class="form-control" v-model="sede.ubicacion"
                  placeholder="Avenida Belgrano 12345" />
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorUbicacion">
                <strong>La ubicación no puede estar vacía</strong>
              </h6>
              <div class="d-flex justify-content-center">
                <button class="btn btn-success" @click="createSede">Crear Sede</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-warning"><router-link to="/sedes" class="nav-item nav-link" href="#">Volver a
          Sedes</router-link></button>
    </div>
  </div>
  <br>
</template>
<script>
import { useElementStore } from '../../../stores/Store';
import { useRouter } from 'vue-router'
import { computed, ref } from "vue";

export default {
  setup() {
    const elementStore = useElementStore("sedes")()
    elementStore.setCurrentElement({ nombre: "", ubicacion: "" })
    const sede = computed(() => elementStore.currentElement);
    const router = useRouter()
    const url = "https://645ae28c95624ceb210d09ed.mockapi.io/Sede";

    const createSede = async () => {
      if (validar() && elementStore.confirm("crear", "registrada", "Sede")) {
        await elementStore.createElement(url, sede.value);
        router.push('/sedes');
      }
    }

    const errorNombre = ref(false);
    const errorUbicacion = ref(false);

    function validar() {
      setearEnFalse();
      let resultado = true;
      const sede = elementStore.currentElement;
      if (sede.nombre.trim() === '') { errorNombre.value = true; resultado = false; }
      if (sede.ubicacion.trim() === '') { errorUbicacion.value = true; resultado = false; }

      if (!resultado) { alert("Error detectado en el ingreso de campos") }
      return resultado;
    };

    function setearEnFalse() {
      errorNombre.value = false;
      errorUbicacion.value = false;
    }

    return {
      createSede,
      sede,
      errorNombre,
      errorUbicacion
    }
  },
}
</script>