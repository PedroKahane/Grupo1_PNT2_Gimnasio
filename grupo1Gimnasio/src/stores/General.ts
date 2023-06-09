import { defineStore } from 'pinia';
import Cookies from "js-cookie";
import axios from 'axios'
import { useElementStore } from "../stores/Store";

export const useGeneralStore = defineStore('general', {
  state: () => ({
    element: {},
    url : "https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios"

  }),
  actions: {
    async agregarTickets(tickets) {
      const elementStore = useElementStore("usuarios")();

      var usuario = Cookies.get('usuario');
      var num = 0;
    
      if (usuario) {
        usuario = JSON.parse(usuario);
      }
      const response = await axios.get(`${this.url}/${usuario[0].id}`)
      this.element = response.data
      
      console.log(this.element);
      num = this.element.ticketsRestantes;
      console.log(num);
      
      //num = parseInt(num, 10);
    
      if (tickets !== undefined) {
        tickets = parseInt(tickets.toString(), 10);
        console.log(tickets);
        
        num = num + tickets;
        console.log(num);
        
      }
    
      usuario[0].ticketsRestantes = num;
      console.log(usuario[0].ticketsRestantes);
      console.log(usuario[0])

      elementStore.updateElement(this.url, usuario[0])
    },
  },
});
