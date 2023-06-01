import { defineStore } from "pinia"; 
import Cookies from "js-cookie";

export const sessionStore = defineStore('session',
    {
        state: () => ({
            usuario : null,
            userName: Cookies.get("user_name") || "",
        }),
        getters: {
          getUserName: () => {
            return Cookies.get("user_name") ;
          },
        },
        actions:
        {
            login(usuaroLogueado){
                this.usuario = usuaroLogueado;
                document.cookie = "usuario=" + JSON.stringify(usuaroLogueado);
                //window.sessionStorage.setItem("nombre", "Juan");
            },
            logout(){
                this.usuario = null;
            }
        }
    }
)