<template>
  <div class="container mt-4">
  <div class="text-center">
  </div>
  <div class="row">
    <div class="col-md-6 offset-md-3" v-if="sede">
    <div class="card bg-light text-dark mb-5">
      <div v-if="sede" class="card-body">
       <h4>Detalles de la sede: <strong>{{ sede.nombre }}</strong></h4>
       <div>
                <p>
                  <strong>Nombre: </strong><input type="text" class="form-control" v-model="sede.nombre" />
                </p>

                <p>
                  <strong>Ubicacion: </strong><input type="text" class="form-control" v-model="sede.ubicacion" />
                </p>

                <div class="d-flex justify-content-center">
                  <button class="btn btn-danger" @click="deleteSede">Borrar sede</button>
                  
                  <button class="btn btn-success" @click="updateSede">Actualizar sede</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <div class="d-flex justify-content-center">
  <button class="btn btn-warning" ><router-link to="/Sedes" class="nav-item nav-link" href="#">Volver a sedes</router-link></button>
  </div>
 </div>
  </template>
  
  <script>
  import { useElementStore } from "../../../stores/Store";
  import { useRouter } from 'vue-router'
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'
  
  
  export default {
    setup() {
      const elementStore = useElementStore("sedes")();
      const router = useRouter()
      const route = useRoute()
      const sedeId = route.params.id.toString()
      
      const url = "https://645ae28c95624ceb210d09ed.mockapi.io/Sede";

      elementStore.fetchElementById(url, sedeId);

      const sede = computed(() => elementStore.currentElement);


      const updateSede = async () => {
        await elementStore.updateElement(url, elementStore.currentElement);
        router.push('/sedes')
      }

    const deleteSede = async () => {
        await elementStore.deleteElement(url, sedeId);
        router.push('/sedes')
      }

      
  
      return {
        sede,
        deleteSede,
        updateSede
      }
    },
  }
  </script>