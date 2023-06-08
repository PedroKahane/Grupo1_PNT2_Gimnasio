<template>
  <div class="container mt-4">
    <div class="text-center">
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3" v-if="sede">
        <div class="card bg-light text-dark mb-5">
          <div v-if="sede" class="card-body">
          <h4>Crear Sede</h4>
              <div>
                <p>
                  <strong>Nombre: </strong><input type="text" class="form-control" v-model="sede.nombre" placeholder="Sede Almagro"/>
                </p>

                <p>
                  <strong>Ubicacion: </strong><input type="text" class="form-control" v-model="sede.ubicacion" placeholder="Avenida Belgrano 12345"/>
                </p>

                <div class="d-flex justify-content-center">
                  <button class="btn btn-success" @click="createSede">Crear Sede</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
    <button class="btn btn-warning" ><router-link to="/sedes" class="nav-item nav-link" href="#">Volver a Sedes</router-link></button>
    </div>
  </div>
  <br>
</template>
  
<script>
import { useElementStore } from '../../../stores/Store';
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed } from "vue";

export default {
  setup() {
    const elementStore = useElementStore("sedes")()
    elementStore.setCurrentElement({ nombre: "", ubicacion: "" })
    const sede = computed(() => elementStore.currentElement);
    const router = useRouter()
    const url = "https://645ae28c95624ceb210d09ed.mockapi.io/Sede";

    const createSede = async () => {
      if (elementStore.confirm("crear", "registrada", "Sede")) {
        await elementStore.createElement(url, sede.value);
        router.push('/sedes');
      }
    }

    return {
      createSede,
      sede
    }
  },
}
</script>