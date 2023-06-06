# Grupo 1 PNT2 Gimnasio
## Tareas:
GINO
- Diseño (se puede ver al final tmb)
- SELECT ID Sede, ID Profesor, ID Actividad

JUAMPI
- SELECT en usuarios en NOMBREPAQUETE
- Consultar por filtro(x vencimiento, x fecha, x tipo de membresía, etc) // x turno
- Consultar duración de su membresía 

PEDRO:
- Anotar usuario en turno persona

TOMI:
- Permisos admin / Usuario

PENDIENTES:
- Limite de personas x grupo
- poder ver actividades x sede | Pantalla sedes

## Links Mockapis:
// lo hice con la intención de ordenar los links 
// y ante la duda saber a quien consultar
// pueden poner los links en sus nombres para saber de quien es quien cada mockapi
// no me acuerdo quien hace cada uno

*****JUAMPI*****
- Usuarios:
https://645ae28c95624ceb210d09ed.mockapi.io/Usuarios
- Sedes:
https://645ae28c95624ceb210d09ed.mockapi.io/Sede
 
*****PEDRO*****

*****TOMI*****

*****GINO*****
- Profesores:
https://64662c65228bd07b355ddc69.mockapi.io/profesores

- TurnoPersona:
https://64662c65228bd07b355ddc69.mockapi.io/turnoPersona

----------------------------------------------------------------------------
----------------------------------------------------------------------------
- Turnos:
https://6460fabb491f9402f49bfa55.mockapi.io/Turno

- Paquetes: 
https://646937ca03bb12ac208876f1.mockapi.io/paquetes

- Actividades:
https://6460fabb491f9402f49bfa55.mockapi.io/Actividades

----------------------------------------------------------------------------

## Ideas: 
#### Lado administrador:
  - Dar de alta a usuarios / miembros [DONE]
  - Dar de baja [DONE]
  - Consultar usuarios [DONE]
  - Consultar por filtro(x vencimiento, x fecha, x tipo de membresía, etc)
  - Poder modificar precios [DONE]
  - Poder planificar actividades [DONE]
  - Poder modificar los usuarios [DONE]
  - Poder modificar los paquetes [DONE]
  - CRUD turnos [DONE]
  - Login [DONE]

#### Lado usuario:
  - Poder inscribirse [DONE]
  - Darse de baja [DONE]
  - Consultar actividades / planes [DONE]
  - Anotarse en las actividades [DONE]
  - Recordatorios
  - Consultar duración de su membresía 

## Tablas / Objetos

Usuarios: [DONE]
  - nombre
  - apellido
  - mail
  - contraseña
  - foto(sí se puede)
  - dni(id)
  - altura
  - peso
  - edad
  - contacto
  - administrador: boolean

Sede: [DONE]
  - idSede
  - nombre
  - ubicación

Turno: [DONE]
  - idSede
  - idActividad
  - idProfesor
  - fecha
  - precio
  - cantPersonasLim

TurnoPersona:[DONE]
  - idPersona
  - idTurno

Profesor:[DONE]
  - idProfesor
  - nombre

Actividades:[DONE]
  - idActividad
  - nombre
  - duración
  - tipo(opcional)


## Vistas
#### Generales
Home:
con alguna publicidad para llamar la atención y con opción de ir al login | registrarse 
botón para acceder como administrador, si ya estás logueado muestra botón logout, y otro botón para ver tu perfil

barra nav:
actividades, turnos, planes, sedes, contactos, login logout

Perfil:
  - muestra tus datos
  - vencimiento de la membresía
  - opción de renovar
  - opción de baja
  - opción de renovación automática
  - modificar algún dato personal / plan

Login:
usuario nombre/email/dni, contraseña
botón mostrar contraseña

Registro:
pide nombre, apellido, email, dni, fecha de nacimiento, edad, crear una contraseña, contacto, foto, altura, peso

#### Usuario:

Planes:
donde podes elegir los planes, podes ver los precios, opciones, sedes 
luego de elegir te manda a la contratación

Contratación:
pide método de pago, muestro el precio, muestra el plan seleccionado (para saber que plan elegiste)
para confirmar pide al final la contraseña

Actividades:
anotarse en actividades
consultar tus actividades
ver las actividades próximas (ordenadas por fecha)

#### Administrador

Puede dar de alta o baja usuarios en el momento, register
Baja usuario:
busca el usuario por algún filtro y para darle de baja pide confirmación (contraseña admin)

Vista de los clientes:
poder ver toda la data de los usuarios y poder filtrarlos (x nombre, apellido, mail, dni, actividad, peso, altura, edades, plan, vencidos, sede, antigüedad) 
desde ahí puede tocar y acceder a los datos de aquel usuario y modificarlos, darle de baja, etc (otra vista)

Vista de todos los planes:
donde puede planificar actividades(nombre, fecha/s, precio, sede/s, límite de clientes(opcional)), de cada actividad poder consultar los inscriptos






