import { getCookie,setCookie,getCookieJSON } from "../stores/Cookies";

export function isAuthenticated() {    
    return !!getCookie();
}

export function isAdmin() {
    let usuario:any = getCookieJSON()
    if(usuario){
        usuario = usuario[0].administrador
    }
    return usuario || false
}

export function sameUser(id){
    const usuario:any =getCookieJSON()
    let resultado = false;
    if(usuario){
        resultado = usuario[0].id == id
    }
    //console.log(id, resultado, usuario)
    return resultado
}

export function compareString(str1: string, str2: string){
    return str1.toLowerCase() === str2.toLowerCase();
}

