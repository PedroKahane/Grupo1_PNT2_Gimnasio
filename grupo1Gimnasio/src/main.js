import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from "vue-router";

//import Index from "./components/Index.vue";
//import Personajes from "./components/Personajes.vue"; 
////import Personaje from "./components/Personaje.vue";
//import Dos from "./components/Dos.vue";
///import Usuarios from "./components/Usuarios.vue";

//const routes = [
  //{ path: "/", component: Index },
 // { path: "/personajes", component: Personajes },
 // { path: "/personaje/:id", component: Personaje },
 // { path: "/dos/:uno/:dos", component: Dos },
 // { path: "/Usuarios", component: Usuarios},
//];



const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
const pinia = createPinia();
  
  createApp(App).use(pinia).use(router).mount("#app");
  
