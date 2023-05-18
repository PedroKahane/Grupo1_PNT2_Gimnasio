//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from "vue-router";

import App from './App.vue'
import Home from "./components/views/Home.vue";
import Planes from "./components/views/Planes.vue";
//Actividades
import Actividades from "./components/views/Actividades/Actividades.vue";
import DetalleAvtividad from "./components/views/Actividades/DetalleActividad.vue"
import CrearActividad from "./components/views/Actividades/CrearActividad.vue";
// Sedes
import Sedes from "./components/views/Sedes/Sedes.vue";
import DetalleSede from "./components/views/Sedes/DetalleSede.vue";
import CrearSede from "./components/views/Sedes/CrearSede.vue";
//Usuarios
import Usuarios from "./components/views/Usuarios/Usuarios.vue"
import DetalleUsuario from "./components/views/Usuarios/DetalleUsuario.vue"
import CrearUsuario from "./components/views/Usuarios/CrearUsuario.vue";
// Profesores
import Profesor from "./components/views/Profesores/Profesores.vue"
import DetalleProfesor from "./components/views/Profesores/DetalleProfesor.vue"
import CrearProfesor from "./components/views/Profesores/CrearProfesor.vue";




// Activad y actividades // Pedro
// Profesor y Profesores // Gino // LISTO
// Paquete y Paquetes // Tomi
// Usuario y Usuarios // Juanpi  // LISTO

/* Comentarios Juampi:
- en el edit usuario me faltaria un boton para mostrar la contraseña y sorprendentemente pude hacer el resto pero no un BOTONCITOO
- testeando el update y delete vi que apenas tocas el boton se ejecuta la accion y estaria bueno poner algun alert de confirmacion o algo 
para que sea un proceso mas "seguro" OBVIO que esto lo dejamos mas para el final pero se me ocurrio que le daria un toque mas al proyecto
 */

const routes = [
  { path: "/", component: Home },
  { path: "/actividades", component: Actividades },
  { path: "/planes", component: Planes },
  { path: '/sedes', component: Sedes },
  { path: '/sedes/:id', component: DetalleSede },
  { path: '/crearSede', component: CrearSede },
  { path: '/usuarios', component: Usuarios},
  { path: '/usuarios/:id', component: DetalleUsuario },
  { path: '/crearUsuario', component: CrearUsuario }, 
  { path: '/profesores', component: Profesor},
  { path: '/profesores/:id', component: DetalleProfesor },
  { path: '/crearProfesor', component: CrearProfesor },
  { path: '/actividades/:id', component: DetalleAvtividad },
  { path: '/CrearActividad', component: CrearActividad }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
const pinia = createPinia();
  
createApp(App).use(pinia).use(router).mount("#app");
  
