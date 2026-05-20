import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/database';

export const useStorage = () => {
  // --- Consultas Reactivas ---
  const turnos = useLiveQuery(() => db.turnos.toArray(), []);
  const reservas = useLiveQuery(() => db.reservas.toArray(), []);

  // --- Operaciones de Turnos ---
  const getTurnos = async () => await db.turnos.toArray();
  const addTurno = async (turno) => await db.turnos.add(turno);
  const updateTurno = async (id, cambios) => await db.turnos.update(id, cambios);
  const deleteTurno = async (id) => {
    // Si eliminas un turno, podrías querer cancelar sus reservas asociadas
    await db.turnos.delete(id);
  };

  // --- Operaciones de Reservas ---
  const getReservas = async () => await db.reservas.toArray();
  const addReserva = async (reserva) => await db.reservas.add(reserva);
  const cancelReserva = async (id) => await db.reservas.update(id, { estado: 'cancelada' });

  // --- Operaciones de Usuarios ---
  const getUsuarioByEmail = async (email) => await db.usuarios.where('email').equals(email).first();

  return {
    turnos,
    reservas,
    getTurnos,
    addTurno,
    updateTurno,
    deleteTurno,
    getReservas,
    addReserva,
    cancelReserva,
    getUsuarioByEmail
  };
};