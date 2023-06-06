//import './assets/main.css'

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated, isAdmin } from "./utils/Auth.ts";

// App
import App from "./App.vue";
import Home from "./components/views/Home.vue";
import Login from "./components/views/Login.vue";
// Actividades
import Actividades from "./components/views/Actividades/Actividades.vue";
import DetalleActividad from "./components/views/Actividades/DetalleActividad.vue";
import CrearActividad from "./components/views/Actividades/CrearActividad.vue";
// Sedes
import Sedes from "./components/views/Sedes/Sedes.vue";
import DetalleSede from "./components/views/Sedes/DetalleSede.vue";
import CrearSede from "./components/views/Sedes/CrearSede.vue";
// Usuarios
import Usuarios from "./components/views/Usuarios/Usuarios.vue";
import DetalleUsuario from "./components/views/Usuarios/DetalleUsuario.vue";
import CrearUsuario from "./components/views/Usuarios/CrearUsuario.vue";
// Profesores
import Profesor from "./components/views/Profesores/Profesores.vue";
import DetalleProfesor from "./components/views/Profesores/DetalleProfesor.vue";
import CrearProfesor from "./components/views/Profesores/CrearProfesor.vue";
// Paquetes
import Paquetes from "./components/views/Paquetes/Paquetes.vue";
import DetallePaquete from "./components/views/Paquetes/DetallePaquete.vue";
import CrearPaquete from "./components/views/Paquetes/CrearPaquete.vue";
// Turnos
import Turnos from "./components/views/Turnos/Turnos.vue";
import DetalleTurno from "./components/views/Turnos/DetalleTurno.vue";
import CrearTurno from "./components/views/Turnos/CrearTurno.vue";
import Unauthorized from "./components/views/Unauthorized.vue";

/*
- en el edit usuario me faltaria un boton para mostrar la contraseña para que quede "mejor"
- testeando el update y delete vi que apenas tocas el boton se ejecuta la accion y estaria bueno poner algun alert de confirmacion o algo 
para que sea un proceso mas "seguro" OBVIO que esto lo dejamos mas para el final pero se me ocurrio que le daria un toque mas al proyecto
 */

const routes = [
  {
    path: "/",
    component: Home,
  },
  { path: "/actividades", component: Actividades },
  { path: "/paquetes", component: Paquetes },
  { path: "/sedes", component: Sedes },
  { path: "/sedes/:id", component: DetalleSede },
  { path: "/crearSede", component: CrearSede },
  {
    path: "/usuarios",
    component: Usuarios,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) {
        next();
      } else {
        next({ name: "Unauthorized" });
      }
    },
  },
  {
    path: "/turnos", component: Turnos,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() ) {
        next();
      } else {
        next({ name: "Unauthorized" });
      }
    },
  },
  {
    path: "/usuarios/:id",
    component: DetalleUsuario,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() ) {
        next();
      } else {
        next({ name: "Unauthorized" });
      }
    },
  },
  {
    path: "/crearUsuario",
    component: CrearUsuario,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next();
      } else {
        next({ name: "Unauthorized" });
      }
    },
  },
  {
    path: "/profesores",
    component: Profesor,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) {
        next();
      } else {
        next({ name: "Unauthorized" });
      }
    },
  },
  {
    path: "/profesores/:id",
    component: DetalleProfesor,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) {
        next();
      } else {
        next({ name: "Unauthorized" });
      }
    },
  },
  {
    path: "/crearProfesor",
    component: CrearProfesor,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) {
        next();
      } else {
        next({ name: "Unauthorized" });
      }
    },
  },
  { path: "/actividades/:id", component: DetalleActividad },
  {
    path: "/CrearActividad",
    component: CrearActividad,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) {
        next();
      } else {
        next({ name: "Unauthorized" });
      }
    },
  },
  { path: "/paquetes/:id", component: DetallePaquete },
  {
    path: "/crearPaquete",
    component: CrearPaquete,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) {
        next();
      } else {
        next({ name: "Unauthorized" });
      }
    },
  },
  { path: "/turnos/:id", component: DetalleTurno },
  {
    path: "/crearTurno",
    component: CrearTurno,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) {
        next();
      } else {
        next({ name: "Unauthorized" });
      }
    },
  },
  { path: "/login", component: Login },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
