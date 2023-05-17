//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from "vue-router";

import App from './App.vue'
import Home from "./components/views/Home.vue";
import Actividades from "./components/views/Actividades.vue";
import Planes from "./components/views/Planes.vue";
import Sedes from "./components/views/Sedes.vue";
import DetalleSede from "./components/views/DetalleSede.vue";
import CrearSede from "./components/views/CrearSede.vue";
import Usuarios from "./components/views/Usuarios.vue"
import DetalleUsuario from "./components/views/DetalleUsuario.vue"
import CrearUsuario from "./components/views/CrearUsuario.vue";

// Activad y actividades // Pedro
// Profesor y Profesores // Gino
// Paquete y Paquetes // Tomi
// Usuario y Usuarios // Juanpi

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
const pinia = createPinia();
  
createApp(App).use(pinia).use(router).mount("#app");
  
