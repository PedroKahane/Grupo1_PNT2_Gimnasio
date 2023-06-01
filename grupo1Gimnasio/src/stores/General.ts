import { defineStore } from 'pinia';
import axios from 'axios';

export const useGeneralStore = defineStore('general', {
  state: () => ({
    element: {},
  }),
  actions: {
    // SI QUIEREN SE PUEDE USAR ESTE STORE PARA FUNCIONES SIMILARES O COMO UN STORE DE POCAS COSAS EN COMUN
    // TOTAL YO SOLO LO USO PARA UNA COSA
    async fetchElementById(url, id) {
      try {
        const response = await axios.get(`${url}/${id}`)
        this.element = response.data.nombre;
      } catch (error) {
        console.error('Error fetching sedes:', error);
      }
    },
  },
});
