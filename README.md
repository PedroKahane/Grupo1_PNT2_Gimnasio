# Grupo 1 PNT2 Gimnasio

TOMAS
- CRUD turnos

JUAMPI
- Agregar idPaquete, ticketsUsados, fechaVencimiento, pago (boolean)
- volver a 0 ticketUsados
- login 

PEDRO
- Agregar profe, sede
- lado usuario
- lado admin

GINO
- Diseño
- 


## Ideas: 
#### Lado administrador:
  - Dar de alta a usuarios / miembros 
  - Dar de baja [DONE]
  - Consultar usuarios [DONE]
  - Consultar por filtro(x vencimiento, x fecha, x tipo de membresía, etc)
  - Poder modificar precios [DONE]
  - Poder planificar actividades [DONE]
  - Poder modificar los usuarios [DONE]
  - Poder modificar los paquetes [DONE]
  - CRUD turnos 
  - Login

#### Lado usuario:
  - Poder inscribirse [DONE]
  - Darse de baja [DONE]
  - Consultar actividades / planes [DONE]
  - Anotarse en las actividades [DONE]
  - Recordatorios
  - Consultar duración de su membresía



## Tablas / Objetos

Usuarios:
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

Sede:
  - idSede
  - nombre
  - ubicación

Turno:
  - idSede
  - idActividad
  - idProfesor
  - fecha
  - precio
  - cantPersonasLim

TurnoPersona:
  - idPersona
  - idTurno

Profesor:
  - idProfesor
  - nombre

Actividades:
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






