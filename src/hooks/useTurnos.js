import { useStorage } from './useStorage';

export const useTurnos = () => {
  const { turnos, reservas, addTurno, updateTurno, deleteTurno } = useStorage();

  // Función para validar solapamientos
  const haySolapamiento = (fecha, horaInicio, horaFin, idExcluir = null) => {
    if (!turnos) return false;
    
    return turnos.some(turno => {
      // Si estamos editando, ignoramos el turno actual
      if (idExcluir && turno.id === idExcluir) return false;
      
      // Verificamos si es el mismo día
      if (turno.fecha === fecha) {
        // Lógica simple de solapamiento de horarios (cadenas HH:MM)
        const inicioA = horaInicio;
        const finA = horaFin;
        const inicioB = turno.horaInicio;
        const finB = turno.horaFin;

        return (inicioA < finB && finA > inicioB);
      }
      return false;
    });
  };

  const crearTurno = async (nuevoTurno) => {
    if (haySolapamiento(nuevoTurno.fecha, nuevoTurno.horaInicio, nuevoTurno.horaFin)) {
      throw new Error('El horario se solapa con un turno existente.');
    }
    // Aseguramos el estado inicial
    nuevoTurno.estado = 'activo';
    await addTurno(nuevoTurno);
  };

  const editarTurno = async (id, cambios) => {
    if (cambios.fecha || cambios.horaInicio || cambios.horaFin) {
      if (haySolapamiento(cambios.fecha, cambios.horaInicio, cambios.horaFin, id)) {
        throw new Error('El nuevo horario se solapa con un turno existente.');
      }
    }
    await updateTurno(id, cambios);
  };

  // Calcula cupos dinámicamente restando reservas activas
  const getCupoDisponible = (turnoId, capacidadMaxima) => {
    if (!reservas) return capacidadMaxima;
    const reservasActivas = reservas.filter(r => r.turnoId === turnoId && r.estado !== 'cancelada');
    return capacidadMaxima - reservasActivas.length;
  };

  return {
    turnos,
    crearTurno,
    editarTurno,
    eliminarTurno: deleteTurno,
    getCupoDisponible
  };
};