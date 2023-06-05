import { getCookie,setCookie,getCookieJSON } from "../stores/Cookies";

export function isAuthenticated() {    
    return !!getCookie();
}

export function isAdmin() {
    const usuario:any = getCookieJSON()[0]
    return usuario.administrador
}
