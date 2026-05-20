import React, { useState, useMemo } from 'react';
import { useTurnos } from '../../hooks/useTurnos';
import { useReservas } from '../../hooks/useReservas';

export default function TurnosPublicos() {
  const { turnos, getCupoDisponible } = useTurnos();
  const { crearReserva } = useReservas();
  
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [filtro, setFiltro] = useState('');

  // Filtrar solo los turnos activos
  const turnosActivos = useMemo(() => {
    return turnos?.filter(t => t.estado === 'activo') || [];
  }, [turnos]);

  // Filtrar turnos activos por fecha (búsqueda)
  const turnosFiltrados = useMemo(() => {
    return turnosActivos.filter(t =>
      t.fecha.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [turnosActivos, filtro]);

  const handleReservar = async (e) => {
    e.preventDefault();
    try {
      await crearReserva({
        turnoId: turnoSeleccionado.id,
        nombreCliente: nombre,
        carnetIdentidad: carnet
      });
      setMensaje({ tipo: 'éxito', texto: '✅ ¡Reserva confirmada exitosamente!' });
      setTurnoSeleccionado(null);
      setNombre('');
      setCarnet('');
      
      setTimeout(() => setMensaje({ tipo: '', texto: '' }), 3000);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: `❌ ${error.message}` });
    }
  };

  const styles = {
    container: {
      padding: '2rem',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FBFF 100%)',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      animation: 'fadeIn 0.6s ease-out',
    },
    header: {
      marginBottom: '2.5rem',
    },
    titulo: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#1A1A2E',
      marginBottom: '0.5rem',
      background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    subtitulo: {
      fontSize: '0.95rem',
      color: '#7F8FA3',
      fontWeight: '400',
    },
    alertSuccess: {
      padding: '1rem',
      marginBottom: '2rem',
      backgroundColor: '#E8F5E9',
      color: '#2E7D32',
      border: '1px solid #C8E6C9',
      borderRadius: '8px',
      animation: 'slideDown 0.3s ease-out',
    },
    alertError: {
      padding: '1rem',
      marginBottom: '2rem',
      backgroundColor: '#FFEBEB',
      color: '#D32F2F',
      border: '1px solid #FFCDCD',
      borderRadius: '8px',
      animation: 'slideDown 0.3s ease-out',
    },
    searchContainer: {
      marginBottom: '2rem',
      position: 'relative',
    },
    searchInput: {
      width: '100%',
      maxWidth: '400px',
      padding: '0.875rem 1rem 0.875rem 2.75rem',
      fontSize: '1rem',
      border: '2px solid #E8EEFA',
      borderRadius: '12px',
      outline: 'none',
      backgroundColor: '#FFFFFF',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
    },
    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#A8B4D3',
      pointerEvents: 'none',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.75rem',
    },
    card: {
      padding: '1.75rem',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
      border: '2px solid #E8EEFA',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      animation: 'slideUp 0.4s ease-out',
    },
    cardAgotado: {
      opacity: 0.6,
      cursor: 'not-allowed',
      border: '2px solid #EEEEEE',
    },
    cardHover: {
      boxShadow: '0 8px 24px rgba(74, 144, 226, 0.15)',
      border: '2px solid #4A90E2',
      transform: 'translateY(-4px)',
    },
    cardFecha: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#1A1A2E',
      marginBottom: '0.75rem',
    },
    cardHorario: {
      color: '#7F8FA3',
      marginBottom: '1rem',
      fontSize: '0.95rem',
    },
    badge: {
      display: 'inline-block',
      padding: '0.5rem 0.875rem',
      borderRadius: '8px',
      fontSize: '0.85rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    badgeAgotado: {
      backgroundColor: '#EEEEEE',
      color: '#757575',
    },
    badgeDisponible: {
      backgroundColor: '#E3F2FD',
      color: '#1565C0',
    },
    emptyState: {
      padding: '3rem 2rem',
      textAlign: 'center',
      color: '#7F8FA3',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-out',
    },
    modalContent: {
      backgroundColor: '#FFFFFF',
      padding: '2rem',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '420px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      border: 'none',
      animation: 'slideUp 0.4s ease-out',
    },
    modalTitle: {
      marginTop: 0,
      marginBottom: '1rem',
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1A1A2E',
    },
    modalInfo: {
      color: '#7F8FA3',
      marginBottom: '1.5rem',
      fontSize: '0.95rem',
      padding: '1rem',
      backgroundColor: '#F8FBFF',
      borderRadius: '8px',
      borderLeft: '4px solid #4A90E2',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginBottom: '1rem',
    },
    input: {
      padding: '1rem',
      border: '2px solid #E8EEFA',
      borderRadius: '8px',
      outline: 'none',
      fontSize: '1rem',
      fontFamily: 'inherit',
      transition: 'all 0.3s ease',
      backgroundColor: '#FFFFFF',
    },
    inputFocus: {
      borderColor: '#4A90E2',
      boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.1)',
      backgroundColor: '#F0F4FF',
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1.5rem',
    },
    buttonCancel: {
      flex: 1,
      padding: '0.875rem',
      backgroundColor: '#F0F3FA',
      color: '#2E7FD8',
      border: '2px solid #2E7FD8',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '700',
      textTransform: 'uppercase',
      transition: 'all 0.3s ease',
    },
    buttonCancelHover: {
      backgroundColor: '#2E7FD8',
      color: '#FFFFFF',
      boxShadow: '0 4px 12px rgba(46, 127, 216, 0.25)',
    },
    buttonConfirm: {
      flex: 1,
      padding: '0.875rem',
      background: 'linear-gradient(135deg, #2E7FD8 0%, #1A5BB8 100%)',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '700',
      textTransform: 'uppercase',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(46, 127, 216, 0.35)',
    },
    buttonConfirmHover: {
      boxShadow: '0 6px 18px rgba(46, 127, 216, 0.45)',
      transform: 'translateY(-3px)',
    },
  };

  const handleCardHover = (e, isEnter) => {
    if (isEnter) {
      Object.assign(e.currentTarget.style, styles.cardHover);
    } else {
      Object.assign(e.currentTarget.style, {
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
        border: '2px solid #E8EEFA',
        transform: 'translateY(0)',
      });
    }
  };

  const handleInputFocus = (e) => {
    Object.assign(e.currentTarget.style, styles.inputFocus);
  };

  const handleInputBlur = (e) => {
    Object.assign(e.currentTarget.style, {
      borderColor: '#E8EEFA',
      boxShadow: 'none',
      backgroundColor: '#FFFFFF',
    });
  };

  const handleButtonCancelHover = (e, isEnter) => {
    if (isEnter) {
      Object.assign(e.currentTarget.style, styles.buttonCancelHover);
    } else {
      Object.assign(e.currentTarget.style, {
        backgroundColor: '#F5F5F5',
        borderColor: '#E8EEFA',
      });
    }
  };

  const handleButtonConfirmHover = (e, isEnter) => {
    if (isEnter) {
      Object.assign(e.currentTarget.style, styles.buttonConfirmHover);
    } else {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 144, 226, 0.2)';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div style={styles.header}>
        <h2 style={styles.titulo}>📅 Turnos Disponibles</h2>
        <p style={styles.subtitulo}>Reserva tu turno de forma rápida y sencilla</p>
      </div>

      {mensaje.texto && (
        <div style={mensaje.tipo === 'éxito' ? styles.alertSuccess : styles.alertError}>
          {mensaje.texto}
        </div>
      )}

      {turnosActivos.length > 0 && (
        <div style={styles.searchContainer}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Busca por fecha (ej: 2024-04)..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            style={styles.searchInput}
            onFocus={(e) => {
              Object.assign(e.currentTarget.style, {
                borderColor: '#4A90E2',
                boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.1)',
              });
            }}
            onBlur={(e) => {
              Object.assign(e.currentTarget.style, {
                borderColor: '#E8EEFA',
                boxShadow: 'none',
              });
            }}
          />
        </div>
      )}

      {turnosFiltrados.length === 0 ? (
        <div style={styles.emptyState}>
          {turnosActivos.length === 0 ? '❌ No hay turnos disponibles en este momento.' : `❌ No se encontraron turnos para "${filtro}"` }
        </div>
      ) : (
        <div style={styles.grid}>
          {turnosFiltrados.map((turno) => {
            const cupo = getCupoDisponible(turno.id, turno.capacidadMaxima);
            const agotado = cupo <= 0;

            return (
              <div
                key={turno.id}
                onClick={() => !agotado && setTurnoSeleccionado(turno)}
                style={{
                  ...styles.card,
                  ...(agotado ? styles.cardAgotado : {}),
                }}
                onMouseEnter={(e) => !agotado && handleCardHover(e, true)}
                onMouseLeave={(e) => !agotado && handleCardHover(e, false)}
              >
                <div style={styles.cardFecha}>📅 {turno.fecha}</div>
                <div style={styles.cardHorario}>⏰ {turno.horaInicio} - {turno.horaFin}</div>
                <span
                  style={{
                    ...styles.badge,
                    ...(agotado ? styles.badgeAgotado : styles.badgeDisponible),
                  }}
                >
                  {agotado ? '❌ Agotado' : `✅ ${cupo} Cupos`}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {turnoSeleccionado && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>🎯 Confirmar Reserva</h3>
            <div style={styles.modalInfo}>
              <strong>Turno Seleccionado:</strong>
              <div>{turnoSeleccionado.fecha} ({turnoSeleccionado.horaInicio} - {turnoSeleccionado.horaFin})</div>
            </div>

            <form onSubmit={handleReservar}>
              <div style={styles.formGroup}>
                <label style={{ cursor: 'pointer', fontWeight: '600', color: '#4A5578' }}>👤 Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={{ cursor: 'pointer', fontWeight: '600', color: '#4A5578' }}>🆔 Carnet de Identidad</label>
                <input
                  type="text"
                  placeholder="Tu carnet"
                  required
                  value={carnet}
                  onChange={(e) => setCarnet(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  style={styles.input}
                />
              </div>

              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={() => setTurnoSeleccionado(null)}
                  style={styles.buttonCancel}
                  onMouseEnter={(e) => handleButtonCancelHover(e, true)}
                  onMouseLeave={(e) => handleButtonCancelHover(e, false)}
                >
                  ✕ Cancelar
                </button>
                <button
                  type="submit"
                  style={styles.buttonConfirm}
                  onMouseEnter={(e) => handleButtonConfirmHover(e, true)}
                  onMouseLeave={(e) => handleButtonConfirmHover(e, false)}
                >
                  ✓ Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}