import { defineStore } from 'pinia';
import axios from 'axios';

export const useTurnoStore = defineStore('turno', {
  state: () => ({
    turnos: [],
    profesores: [],
    sedes: [],
    actividades: [],
    usuarios: [],
    paquetes: [],
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
    getTurnos() {
      return this.turnos;
    },
    getTurnosPersonas() {
      return this.turnosPersonas;
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
    async fetchTurnos() {
      try {
        //console.log(this.sedes);
       
    
        //console.log(this.actividades);
        //console.log(this.profesores);
        const response = await axios.get('https://6460fabb491f9402f49bfa55.mockapi.io/Turno');
        const turnosExtendido = response.data;
        turnosExtendido.forEach(element => {
         //console.log(element.idSede);

          const sede = this.sedes.find((e) => e.idSede == element.idSede)
          //console.log(sede);
          element.sede = sede
          element.fecha = new Date(element.fecha).toLocaleDateString('es-ES',   {day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          year: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: false});
          
          const actividad = this.actividades.find((e) => e.id == element.idActividad)
          //console.log(element.idActividad);
          element.actividad = actividad
          
          const profesor = this.profesores.find((e) => e.id == element.idProfesor)
          element.profesor = profesor
          //console.log(element.idProfesor);
        });
        console.log(turnosExtendido);
        this.turnos = turnosExtendido
        console.log(this.turnos);
        
      } catch (error) {
        console.error('Error fetching sedes:', error);
      }
    },
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
          console.log(this.turnosPersonas);
          
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
        this.error1 = false;
        this.error2 =false;
        this.error3 = false;
        const turnoNuevo = {
           idTurno,
           idPersona
        }
        const turno = this.turnos.find((e) => e.id === idTurno)
        const turnosMaximos = turno.cantPersonasLim
        this.contarTurno(idTurno);
        console.log(this.contador);
        const usuario = this.usuarios.find((e) => e.id === idPersona)
        
          try {
            if (usuario.ticketsRestantes == 0) {
              console.log("no quedan tickets");
              
              this.error2 = true
            } else {
              try {
                if(this.contador < turnosMaximos){
                  const turnoExistente = this.turnosPersonas.find((e) => {return e.idTurno == idTurno && e.idPersona == idPersona})
                  if(turnoExistente == null) {
                    const response = await axios.post(`https://64662c65228bd07b355ddc69.mockapi.io/turnoPersona`, turnoNuevo)
                  
                    usuario.ticketsRestantes--
                    console.log(usuario.ticketsRestantes);
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

            }
          } catch(error) {
            console.log(error);
            
          }
      } catch (error) {
        console.error(`Error updating Element with id ${idPersona}:`, error)
      }
    },
    async contarTurno(id) {
        this.turnosPersonas.forEach(element => {
          if(element.idTurno == id){
            this.contador++
          }
        });
    },
    async cancelarTurno(idTurno, idPersona) { 
      const turnoExistente = this.turnosPersonas.find((e) => {
        return e.idTurno == idTurno && e.idPersona == idPersona
      })
      if(turnoExistente){
        const usuario = this.usuarios.find((e) => e.id === idPersona)
        usuario.ticketsRestantes++
        const response2 = await axios.put(`https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios/${idPersona}`, usuario)
        console.log(response2);
        const response = await axios.delete(`https://64662c65228bd07b355ddc69.mockapi.io/turnoPersona/${turnoExistente.id}`)
        console.log(response);
      }
    
      
    }
  },
  
  
});
