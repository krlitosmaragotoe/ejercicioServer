import Dexie from 'dexie';

// 1. Inicializamos la base de datos
export const db = new Dexie('SistemaTurnosDB');

// 2. Definimos el esquema de almacenamiento (las "tablas")
// El '++id' indica que será una clave primaria autoincremental.
// Los demás campos definidos aquí son los que usaremos como índices para hacer búsquedas.
db.version(1).stores({
  turnos: '++id, fecha, horaInicio, horaFin, capacidadMaxima, estado', // [cite: 68]
  reservas: '++id, turnoId, nombreCliente, carnetIdentidad, fechaReserva, estado', // [cite: 69]
  usuarios: '++id, email, password' // 
});

// 3. Poblamos los datos iniciales
// El evento 'populate' se dispara solo la primera vez que se crea la base de datos en el navegador del cliente.
db.on('populate', async () => {
  await db.usuarios.add({
    email: 'admin@turnos.com',
    password: 'admin123' // Nota: En un entorno real esto iría encriptado.
  });
  
  await db.turnos.add({
    fecha: '2026-04-15',
    horaInicio: '08:00',
    horaFin: '09:00',
    capacidadMaxima: 5,
    estado: 'activo'
  });
});