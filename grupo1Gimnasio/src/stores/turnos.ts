import { defineStore } from 'pinia';
import axios from 'axios';

export const useTurnoStore = defineStore('turno', {
  state: () => ({
    profesores: [],
    sedes: [],
    actividades: [],
    usuarios: [],
    paquetes: [],
    turnosActual: null,
    turnosPersonas: [],
    contador: 0,
    error1: false,
    error2:false,
    error3: false
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
    },
    getContador() {
      return this.contador;
    },
    getError1() {
      return this.error1;
    },
    getError2() {
      return this.error2;
    },
    getError3() {
      return this.error3;
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
        this.error1 = false;
        this.error2 = false;
        this.error3 = false;
        const response = await axios.get(
          'https://64662c65228bd07b355ddc69.mockapi.io/profesores'
        );
        this.profesores = response.data;
      } catch (error) {
        console.error('Error fetching paquetes:', error);
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
    },
    async fetchTurnoById(id) {
      try {
        this.bandera = null
        const response = await axios.get(`https://6460fabb491f9402f49bfa55.mockapi.io/Turno/${id}`)
        this.turnosActual = response.data
      } catch (error) {
        console.error(`Error fetching turno with id ${id}:`, error)
      }
    },
    async fetchTurnosPersonas(){
      try {
          const response = await axios.get(
            'https://64662c65228bd07b355ddc69.mockapi.io/turnoPersona'
          );
          this.turnosPersonas = response.data;
          //console.log(this.turnosPersonas);
          
        } catch (error) {
          console.error('Error fetching turnosPersonas:', error);
        }
    },
    async fetchUsuarios(){
      try {
          const response = await axios.get(
            'https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios'
          );
          this.usuarios = response.data;
          //console.log(this.usuarios);
          
        } catch (error) {
          console.error('Error fetching usuarios:', error);
        }
    },
    async fetchPaquetes(){
      try {
          const response = await axios.get(
            'https://646937ca03bb12ac208876f1.mockapi.io/paquetes'
          );
          this.paquetes = response.data;
          console.log(this.usuarios);
          
        } catch (error) {
          console.error('Error fetching paquetes:', error);
        }
    },
    async sacarTurno(idTurno, idPersona) {
      try {
        const turnoNuevo = {
           idTurno,
           idPersona
        }
        const turnosMaximos = this.turnosActual.cantPersonasLim
        //console.log(this.contador);
        const usuario = this.usuarios.find((e) => e.id === idPersona)
        const paquete = this.paquetes.find((e) => e.id == usuario.idPaquete)
        console.log(usuario.idPaquete);
        
          try {
            if (usuario.ticketUsados >= paquete.cantTickets) {
        
              this.error2 = true
            }
          } catch (error) {
            console.error(`Error updating Element with id ${idPersona}:`, error)
          }
          try {
            if(this.contador < turnosMaximos){
              const turnoExistente = this.turnosPersonas.find((e) => {
                return e.idTurno == idTurno && e.idPersona == idPersona
              })
              if(turnoExistente == null) {
                const response = await axios.post(`https://64662c65228bd07b355ddc69.mockapi.io/turnoPersona`, turnoNuevo)
                console.log(usuario.ticketUsados);
              
                usuario.ticketUsados++
                console.log(usuario.ticketUsados);
                const response2 = await axios.put(`https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios/${idPersona}`, usuario)
                console.log(response2);
                console.log(response)
                
              } else {
                this.error3 = true
                console.log(turnoExistente);
              }
             
            } else{
              this.error1 = true
            }
          } catch (error) {
            console.error(`Error updating turno`, error)
          }
        } catch(error) {
          console.log(error);
          
        }
    },
    async contarTurno(id) {
        this.turnosPersonas.forEach(element => {
          if(element.idTurno == id){
            this.contador++
          }
        });
    },
  },
  
});
