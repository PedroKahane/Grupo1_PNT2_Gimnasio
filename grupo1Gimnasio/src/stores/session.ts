// import { defineStore } from "pinia"; 
// import Cookies from "js-cookie";

// export const sessionStore = defineStore('session',
//     {
//         state: () => ({
//             usuario : null,
//             userName: Cookies.get("usuario") || "",
//         }),
//         getters: {
//           getUserName: () => {
//             return Cookies.get("usuario") ;
//           },
//         },
//         actions:
//         {
//             login(usuaroLogueado){
//                 this.usuario = usuaroLogueado;
//                 document.cookie = "usuario=" + JSON.stringify(usuaroLogueado);
//                 //window.sessionStorage.setItem("nombre", "Juan");
//             },
//             logout(){
//                 this.usuario = null;
//             }
//         }
//     }
// )