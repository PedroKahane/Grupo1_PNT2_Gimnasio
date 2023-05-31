import { defineStore } from 'pinia';
import axios from 'axios';

export const useTurnoStore = defineStore('turno', {
  state: () => ({
    profesores: [],
    sedes: [],
    actividades: []
  }),
  getters: {
    getSedes() {
      return this.sedes;
    },
    getProfesores() {
      return this.profesores;
    },
    getActividades() {
        return this.actividades;
    }
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
    async fetchActividades(){
        try {
            const response = await axios.get(
              'https://6460fabb491f9402f49bfa55.mockapi.io/Actividades'
            );
            this.actividades = response.data;
          } catch (error) {
            console.error('Error fetching actividades:', error);
          }
    }
  },
});
