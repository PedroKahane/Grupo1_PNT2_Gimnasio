import { defineStore } from 'pinia'
import axios from 'axios'
//import { promises } from 'dns'

export const useSedeStore = defineStore('sede', {
  state: () => ({
    sedes: [],
    currentSede: null,
    currentNombre: null,
    currentUbicacion: null
  }),

  getters: {
    getSedes() {
      return this.sedes
    },

    getSedeById() {
      return (id) => this.sedes.find((sede) => sede.idSede === id)
    }
  }, 

  actions: {
    async fetchSedes() {
      try {
        const response = await axios.get('https://645ae28c95624ceb210d09ed.mockapi.io/Sede')
        this.sedes = response.data
      } catch (error) {
        console.error('Error fetching sedes:', error)
      }
    },

    async fetchSedeById(id) {
      try {
        const response = await axios.get(`https://645ae28c95624ceb210d09ed.mockapi.io/Sede/${id}`)
        this.currentSede = response.data
      } catch (error) {
        console.error(`Error fetching sede with id ${id}:`, error)
      }
    },

    async createSede(newSede) {
      try {
        const response = await axios.post(`https://645ae28c95624ceb210d09ed.mockapi.io/Sede`, newSede)
        this.sedes.push(response.data)
      } catch (error) {
        console.error('Error creating sede:', error)
      }
    },

    async updateSede(updatedSede) {
      try {
        const response = await axios.put(`https://645ae28c95624ceb210d09ed.mockapi.io/Sede/${updatedSede.idSede}`, updatedSede)
        const index = this.sedes.findIndex((sede) => sede.idSede === updatedSede.idSede)
        this.sedes[index] = response.data
      } catch (error) {
        console.error(`Error updating sede with id ${updatedSede.idSede}:`, error)
      }
    },

    async deleteSede(id) {
      try {
        await axios.delete(`https://645ae28c95624ceb210d09ed.mockapi.io/Sede/${id}`)
        this.sedes = this.sedes.filter((sede) => sede.idSede !== id)
      } catch (error) {
        console.error(`Error deleting sede with id ${id}:`, error)
      }
    },
  },
})
