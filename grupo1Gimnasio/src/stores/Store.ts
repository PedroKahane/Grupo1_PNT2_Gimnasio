import { defineStore } from 'pinia'
import axios from 'axios'
import { } from "../utils/Auth";
//import { promises } from 'dns'

export function  useElementStore  (nombreStore) {
  return defineStore(nombreStore, {
  state: () => ({
    elements: null,
    currentElement: null
  }),

  getters: {
    getElements() {
      return this.elements
    },

    getElementById() {
      return (id) => this.elements.find((e) => e.id === id)
    }
  }, 

  actions: {
    async fetchElements(url) {
    if(!this.elements){
      console.log("elementssss", this.elements); 
      try {
        const response = await axios.get(url)
        this.elements = response.data
      } catch (error) {
        console.error('Error fetching elements:', error)
      }
    }
    },
    setCurrentElement(value) {
      this.currentElement = value;
    },
    setElements(value) {
      this.elements = value;
    },
    async fetchElementById(url, id) {
      try {
        const response = await axios.get(`${url}/${id}`)
        this.currentElement = response.data
      } catch (error) {
        console.error(`Error fetching element with id ${id}:`, error)
      }
    },

    async createElement(url,newElement) {
      try {
        const response = await axios.post(`${url}`, newElement)
        this.elements.push(response.data)
      } catch (error) {
        console.error('Error creating element:', error)
      }
    },

    async updateElement(url,updatedElement) {
      try {
        console.log
        const response = await axios.put(`${url}/${updatedElement.id}`, updatedElement)
        const index = this.elements.findIndex((e) => e.id === updatedElement.id)
        this.elements[index] = response.data
      } catch (error) {
        console.error(`Error updating Element with id ${updatedElement.id}:`, error)
      }
    },

    async deleteElement(url,id) {
      try {
        await axios.delete(`${url}/${id}`)
        this.elements = this.elements.filter((e) => e.id !== id)
      } catch (error) {
        console.error(`Error deleting Element with id ${id}:`, error)
      }
    },

    confirm(accion:string, modificacion:string, tipo:string) {
      var confirmado = true;
      var confirmar = window.confirm(`¿Estás seguro de ${accion} este ${tipo}?`);
      if (confirmar) {
        alert(`${tipo} ${modificacion} correctamente`);
      } else {
        alert(`Acción cancelada`);
        confirmado = false;
      }
      return confirmado;
    },

    filtrarXString(busqueda){
      this.elements = this.elements.filter(item => item.nombre.includes(busqueda) || item.apellido.includes(busqueda) || item.mail.includes(busqueda)); 
    }
  },
})
}