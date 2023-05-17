//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/views/Home.vue";
import Actividades from "./components/views/Actividades.vue";
import Planes from "./components/views/Planes.vue";
import Sedes from "./components/views/Sedes.vue";
import DetalleSede from "./components/views/DetalleSede.vue";
import CrearSede from "./components/views/CrearSede.vue";

// Activad y actividades // Pedro

// Profesor y Profesores // Gino

// Paquete y Paquetes // Tomi

// Usuario y Usuarios // Juanpi






const routes = [
  { path: "/", component: Home },
  { path: "/actividades", component: Actividades },
  { path: "/planes", component: Planes },
  { path: '/sedes', component: Sedes },
  { path: '/sedes/:id', component: DetalleSede },
  { path: '/crearSede', component: CrearSede }
];



const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
const pinia = createPinia();
  
createApp(App).use(pinia).use(router).mount("#app");
  
