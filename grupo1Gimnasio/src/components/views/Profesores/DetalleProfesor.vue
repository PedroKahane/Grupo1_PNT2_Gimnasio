<template>
     <div class="container mt-4">
     <div class="text-center">
     </div>

     <div class="row">
          <div class="col-md-6 offset-md-3" v-if="profesor">
               <div class="card bg-light text-dark mb-5">
                    <div v-if="profesor" class="card-body">
                    <h4>Detalles del profesor: <strong>{{ profesor.nombre }}</strong></h4>
                    <div>
                    <p>
                         <strong>Nombre: </strong><input type="text" class="form-control" v-model="profesor.nombre" />
                    </p>
                    <p>
                         <strong>Apellido: </strong><input type="text" class="form-control" v-model="profesor.apellido" />
                    </p>

                    <div class="d-flex justify-content-center">
                         <button class="btn btn-success" @click="updateProfesor">Actualizar profesor</button>
                         <button class="btn btn-danger" @click="deleteProfesor">Borrar profesor</button>
                    </div>
               </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
    <button class="btn btn-warning" ><router-link to="/profesores" class="nav-item nav-link" href="#">Volver a profesores</router-link></button>
    </div>
  </div>


</template>

<script>
import { useElementStore } from "../../../stores/Store";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
     setup() {
          const elementStore = useElementStore("profesores")();
          const router = useRouter();
          const route = useRoute();
          const profesorId = route.params.id.toString();
          const url = "https://64662c65228bd07b355ddc69.mockapi.io/profesores";

          elementStore.fetchElementById(url, profesorId);

          const profesor = computed(() => elementStore.currentElement);

          const updateProfesor = async () => {
               if(elementStore.confirm("modificar", "modificado", "Profesor")){
                   await elementStore.updateElement(url, elementStore.currentElement);
                    router.push("/profesores"); 
               }
          };

          const deleteProfesor = async () => {
               if(elementStore.confirm("eliminar", "eliminado", "Profesor")){
                    await elementStore.deleteElement(url, profesorId);
                    router.push("/profesores");
               }
          };

          return {
               profesor,
               deleteProfesor,
               updateProfesor
          };
     },
};
</script>
