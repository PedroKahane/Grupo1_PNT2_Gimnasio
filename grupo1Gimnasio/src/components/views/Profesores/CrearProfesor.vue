<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6 offset-md-3" v-if="profesor">
        <div class="card bg-light text-dark mb-5">
          <div v-if="profesor" class="card-body">
            <h4>Crear Profesor</h4>
            <div>
              <p>
                <strong>Nombre: </strong><input type="text" class="form-control" v-model="profesor.nombre"
                  placeholder="Pepe" />
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorNombre">
                <strong>El nombre no puede estar vacío</strong>
              </h6>
              <p>
                <strong>Apellido: </strong><input type="text" class="form-control" v-model="profesor.apellido"
                  placeholder="Barrios" />
              </p>
              <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorApellido">
                <strong>El apellido no puede estar vacío</strong>
              </h6>
              <div class="d-flex justify-content-center">
                <button class="btn btn-success" @click="createProfesor">Crear Profesor</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-warning"><router-link to="/profesores" class="nav-item nav-link" href="#">Volver a
          Profesores</router-link></button>
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
    const elementStore = useElementStore("profesores")()
    elementStore.setCurrentElement({ nombre: "", apellido: "" })
    const profesor = computed(() => elementStore.currentElement);
    const router = useRouter()
    const url = "https://64662c65228bd07b355ddc69.mockapi.io/profesores";

    const createProfesor = async () => {
      if (validar() && elementStore.confirm("crear", "registrado", "Profesor")) {
        await elementStore.createElement(url, profesor.value)
        router.push('/profesores')
      }
    }

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

    return {
      createProfesor,
      profesor,
      errorApellido,
      errorNombre
    }
  },
}
</script>