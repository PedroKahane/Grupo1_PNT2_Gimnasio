<template>
  <div class="container mt-3">
    <h4 class="text-center">Profesores</h4>
    <div class="d-flex justify-content-end input-group mb-3">
      <form class="d-flex" v-on:submit.prevent="buscar">
        <div class="d-flex justify-content-center mt-2">
          <label class="input-group"><strong>Filtrar: </strong></label>
        </div>
        <select id="filtro" class="form-select">
          <option value="nombre">Nombre</option>
          <option value="apellido">Apellido</option>
        </select>
        <input type="text" class="form-control bg-light border-1 mr-2" placeholder="Buscar..." v-model="busqueda">
        <button class="btn btn-success">Buscar</button>
        <button class="btn btn-danger" v-on:click="reiniciar">Reiniciar</button>
      </form>
    </div>
     <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Nombre:</th>
          <th>Apellido:</th>
          <th>Detalles:</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="profesor in elementStore.getElements" :key="profesor.id">
          <td>{{ profesor.nombre }}</td>
          <td>{{ profesor.apellido }}</td>
        <td><router-link :to="`/profesores/${profesor.id}`"><strong>Ver detalles</strong></router-link></td>
        </tr>
      </tbody>
      <br>
      <button class="btn btn-danger"><router-link to="/crearProfesor" class="nav-item nav-link" href="#">Crear Profesor</router-link></button>
      </table>
      </div>
      <br>
</template>

<script>
import { useElementStore } from "../../../stores/Store";
import { onMounted } from "vue";

export default {
  setup() {
    const elementStore = useElementStore("profesores")()
    const busqueda = "";

    onMounted(() => {
        elementStore.currentElement = null
        elementStore.fetchElements("https://64662c65228bd07b355ddc69.mockapi.io/profesores")        
    })

    function buscar(){
      elementStore.filtrarXString(this.busqueda);
      }

       function reiniciar(){
      location.reload();
      }

      function buscar() {
      elementStore.filtrarXString(this.busqueda, document.getElementById("filtro").value);
    }

    /*
const tablaTurnos = async () => {
      try {
        var turnoYaPasado = []
        var turnosExtendido =  turnos.value
        console.log(turnos.value);
        await turnosExtendido.forEach(element => {
          const sede = sedes.value.find((e) => e.id == element.idSede)
          //console.log(sede);
          element.sede = sede
          if (!element.fecha.includes('/')) {
            element.fecha = new Date(element.fecha).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              year: 'numeric',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            });
          }
          console.log("pase");
          const actividad = actividades.value.find((e) => e.id == element.idActividad)
          //console.log(element.idActividad);
          element.actividad = actividad

          const profesor = profesores.value.find((e) => e.id == element.idProfesor)
          element.profesor = profesor
          //console.log(element.idProfesor);
          const fechaActual = new Date()
          const fechaComponente = new Date(element.fecha.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
          if(fechaComponente < fechaActual ) {
            turnoYaPasado.push(element)
          } else{
            turnosPosteriores.value.push(element)
          }
        });
        var usuario = getCookie();
        usuario = JSON.parse(usuario)
        console.log(usuario[0]);
        const idPersona = usuario[0].id
        turnoYaPasado.forEach(element => {
          var turnoyPersona = turnosPersonas.value.find((e) => { return e.idTurno == element.id && e.idPersona == idPersona})
          if(turnoyPersona){
            turnosPasados.value.push(element)
          }
        })
        //console.log(turnosExtendido);
        turnosMostrados.value = turnosPosteriores.value
        turnosMostrados.value.sort((a, b) => {
      
          const fechaA = new Date(a.fecha.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
          const fechaB = new Date(b.fecha.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
          
          return fechaA - fechaB;
        });
        //console.log(this.turnos);
        console.log(turnos.value);
        console.log(turnosExtendido);
        } catch(error){
          console.log(error);
        }
    }
    */

    return {
      elementStore,
      buscar,
      busqueda,
      reiniciar,
      buscar
    }
  },
}
</script>
