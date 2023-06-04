import { defineStore } from 'pinia';
import Cookies from "js-cookie";
import { useElementStore } from "../stores/Common";

export const useGeneralStore = defineStore('general', {
  state: () => ({
    element: {},
  }),
  actions: {
    agregarTickets(tickets: number | undefined) {
      const elementStore = useElementStore();
      const url = "https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios";
      var usuario = Cookies.get('usuario');
      var num;
    
      if (usuario) {
        usuario = JSON.parse(usuario);
      }
    
      //console.log(usuario[0]);
      num = usuario[0].ticketsRestantes;
      num = parseInt(num, 10);
    
      if (tickets !== undefined) {
        tickets = parseInt(tickets.toString(), 10);
        num = num + tickets;
      }
    
      usuario[0].ticketsRestantes = num.toString();
      //console.log(usuario[0].ticketsRestantes);
      //console.log(usuario[0])

      elementStore.updateElement(url, usuario[0])
    },
    
  },
});
