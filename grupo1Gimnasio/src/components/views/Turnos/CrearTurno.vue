<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6 offset-md-3" v-if="turno">
        <div class="card bg-light text-dark mb-5">
          <div v-if="turno" class="card-body">
          <h4>Crear Turno</h4>
              <div>
                <p>
                  <strong>Sede: </strong><input type="text" class="form-control" v-model="turno.id"/>
                </p>
                <p>
                  <strong>Actividad: </strong><input type="text" class="form-control" v-model="turno.idActividad" />
                </p>
                <p>
                  <strong>Profesor: </strong><input type="text" class="form-control" v-model="turno.profesor" />
                </p>
                <p>
                  <strong>Fecha: </strong><input type="text" class="form-control" v-model="turno.fecha" />
                </p>
                <p>
                  <strong>Cantidad de personas: </strong><input type="text" class="form-control" v-model="turno.cantPersonasLim" />
                </p>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-success" @click="createTurno">Crear Turno</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
    <button class="btn btn-warning" ><router-link to="/turnos" class="nav-item nav-link" href="#">Volver a Turnos</router-link></button>
    </div>
  </div>
</template>

<script>
import { useElementStore } from '../../../stores/Store';
import { useRouter } from 'vue-router'
import { computed } from "vue";


export default {
  setup() {
    const elementStore = useElementStore("turnos")()
    elementStore.setCurrentElement({idSede:"",
    idActividad:"",
    idProfesor:"",
    fecha:"",
    precio:"",
    cantPersonasLim:""})
    const turno = computed(() => elementStore.currentElement);
    const router = useRouter()
    const url = "https://6460fabb491f9402f49bfa55.mockapi.io/Turno";

    const createTurno = async () => {
      if(elementStore.confirm("crear", "registrado", "Turno")){
        await elementStore.createElement(url, turno.value)
        router.push('/turnos')
      }
    }

    return {
      createTurno,
      turno
    }
  },
}
</script>