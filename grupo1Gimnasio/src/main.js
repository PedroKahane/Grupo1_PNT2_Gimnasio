import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/views/Home.vue";
import Actividades from "./components/views/Actividades.vue";
import Planes from "./components/views/Planes.vue";



const routes = [
  { path: "/", component: Home },
  { path: "/actividades", component: Actividades },
  { path: "/planes", component: Planes },
];



const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
const pinia = createPinia();
  
createApp(App).use(pinia).use(router).mount("#app");
  
