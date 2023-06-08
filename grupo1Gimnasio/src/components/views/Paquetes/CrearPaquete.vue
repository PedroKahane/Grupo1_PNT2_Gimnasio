<template>
  <div class="container mt-4">
    <div class="text-center">
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3" v-if="paquete">
        <div class="card bg-light text-dark mb-5">
          <div v-if="paquete" class="card-body">
          <h4>Crear Paquete</h4>
              <div>
                <p>
                  <strong>Nombre: </strong><input type="text" class="form-control" v-model="paquete.nombre" placeholder="Nuevo paquete"/>
                </p>
                <p>
                  <strong>Cantidad de tickets: </strong><input type="text" class="form-control" v-model="paquete.nombre" placeholder="30"/>
                </p>
                <p>
                  <strong>Precio: </strong><input type="text" class="form-control" v-model="paquete.nombre" placeholder="2500"/>
                </p>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-success" @click="createPaquete">Crear Paquete</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
    <button class="btn btn-warning" ><router-link to="/paquetes" class="nav-item nav-link" href="#">Volver a Paquetes</router-link></button>
    </div>
  </div>
  <br>
</template>
   
<script>
import { useElementStore } from '../../../stores/Store';
import { useRouter } from 'vue-router'
import { computed } from "vue";


export default {
  setup() {
    const elementStore = useElementStore("paquetes")()
    elementStore.setCurrentElement({ nombre: "", precio: "", cantTickets: "" })
    const paquete = computed(() => elementStore.currentElement);
    const router = useRouter()
    const url = "https://646937ca03bb12ac208876f1.mockapi.io/paquetes";

    const createPaquete = async () => {
      if(elementStore.confirm("crear", "registrado", "Paquete")){
        await elementStore.createElement(url, paquete.value);
        router.push('/paquetes');
      }
    }

    return {
      createPaquete,
      paquete
    }
  },
}
</script>