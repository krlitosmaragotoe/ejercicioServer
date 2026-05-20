import { useStorage } from './useStorage';
import { useTurnos } from './useTurnos';

export const useReservas = () => {
  const { reservas, addReserva, cancelReserva } = useStorage();
  const { turnos, getCupoDisponible } = useTurnos();

  const crearReserva = async (nuevaReserva) => {
    // 1. Buscar el turno
    const turno = turnos?.find(t => t.id === nuevaReserva.turnoId);
    if (!turno) throw new Error('El turno no existe.');

    // 2. Verificar disponibilidad
    const cupo = getCupoDisponible(turno.id, turno.capacidadMaxima);
    if (cupo <= 0) throw new Error('No hay cupos disponibles para este turno.');

    // 3. Crear la reserva
    const reservaCompleta = {
      ...nuevaReserva,
      fechaReserva: new Date().toISOString(),
      estado: 'confirmada'
    };

    await addReserva(reservaCompleta);
  };

  // Helper para mostrar datos cruzados en el panel de admin
  const getReservasConTurno = () => {
    if (!reservas || !turnos) return [];
    
    return reservas.map(reserva => {
      const turnoAsociado = turnos.find(t => t.id === reserva.turnoId);
      return {
        ...reserva,
        turno: turnoAsociado || null
      };
    });
  };

  return {
    reservas: getReservasConTurno(), // Exportamos las reservas ya "pobladas" con los datos del turno
    crearReserva,
    cancelarReserva: cancelReserva
  };
};