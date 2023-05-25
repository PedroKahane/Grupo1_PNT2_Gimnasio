import { defineStore } from 'pinia';
import axios from 'axios';

export const useActividadStore = defineStore('actividad', {
  state: () => ({
    profesores: [],
    sedes: [],
  }),
  getters: {
    getSedes() {
      return this.sedes;
    },
    getProfesores() {
      return this.profesores;
    },
  },
  actions: {
    async fetchSedes() {
      try {
        const response = await axios.get(
          'https://645ae28c95624ceb210d09ed.mockapi.io/Sede'
        );
        this.sedes = response.data;
      } catch (error) {
        console.error('Error fetching sedes:', error);
      }
    },
    async fetchProfesores() {
      try {
        const response = await axios.get(
          'https://64662c65228bd07b355ddc69.mockapi.io/profesores'
        );
        this.profesores = response.data;
      } catch (error) {
        console.error('Error fetching profesores:', error);
      }
    },
  },
});
