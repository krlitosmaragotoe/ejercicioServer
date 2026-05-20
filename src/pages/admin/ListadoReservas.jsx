import React, { useState, useMemo } from 'react';
import { useReservas } from '../../hooks/useReservas';

export default function ListadoReservas() {
  const { reservas, cancelarReserva } = useReservas();
  const [filtro, setFiltro] = useState('');

  // Filtrar reservas por nombre del cliente
  const reservasFiltradas = useMemo(() => {
    if (!reservas) return [];
    return reservas.filter(reserva =>
      reserva.nombreCliente.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [reservas, filtro]);

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
    searchContainer: {
      position: 'relative',
      marginBottom: '2rem',
      animation: 'slideDown 0.5s ease-out',
    },
    searchWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    searchInput: {
      width: '100%',
      padding: '0.875rem 1rem 0.875rem 2.75rem',
      fontSize: '1rem',
      border: '2px solid #E8EEFA',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#FFFFFF',
      color: '#1A1A2E',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      fontFamily: 'inherit',
    },
    searchInputFocus: {
      borderColor: '#4A90E2',
      boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.1), 0 4px 12px rgba(74, 144, 226, 0.15)',
      backgroundColor: '#F0F4FF',
    },
    searchIcon: {
      position: 'absolute',
      left: '0.875rem',
      fontSize: '1.2rem',
      color: '#A8B4D3',
      pointerEvents: 'none',
    },
    clearBtn: {
      position: 'absolute',
      right: '0.875rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.2rem',
      color: '#A8B4D3',
      padding: '0.25rem',
      transition: 'color 0.2s ease',
      opacity: filtro ? 1 : 0,
      pointerEvents: filtro ? 'auto' : 'none',
    },
    tableWrapper: {
      overflowX: 'auto',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#FFFFFF',
      fontFamily: 'inherit',
    },
    thead: {
      backgroundColor: 'linear-gradient(135deg, #F5F8FE 0%, #F0F4FF 100%)',
      borderBottom: '2px solid #E8EEFA',
    },
    th: {
      padding: '1.25rem',
      color: '#4A5578',
      fontWeight: '600',
      textAlign: 'left',
      fontSize: '0.95rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    tbody: {
      animation: 'fadeIn 0.5s ease-out',
    },
    tr: {
      borderBottom: '1px solid #F0F3FA',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      animation: 'slideUp 0.4s ease-out',
    },
    trHover: {
      backgroundColor: '#F8FBFF',
      boxShadow: 'inset 0 0 8px rgba(74, 144, 226, 0.05)',
    },
    td: {
      padding: '1.25rem',
      color: '#1A1A2E',
      fontSize: '0.95rem',
      fontWeight: '500',
    },
    tdSmall: {
      color: '#7F8FA3',
      fontWeight: '400',
    },
    estadoBadge: {
      display: 'inline-block',
      padding: '0.5rem 0.875rem',
      borderRadius: '8px',
      fontSize: '0.8rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
      transition: 'all 0.3s ease',
    },
    estadoConfirmada: {
      backgroundColor: '#E3F2FD',
      color: '#1565C0',
      boxShadow: '0 2px 8px rgba(21, 101, 192, 0.15)',
    },
    estadoCancelada: {
      backgroundColor: '#FFEBEB',
      color: '#D32F2F',
      boxShadow: '0 2px 8px rgba(211, 47, 47, 0.15)',
    },
    botinCancelar: {
      padding: '0.6rem 1.2rem',
      backgroundColor: '#FFFFFF',
      color: '#D32F2F',
      border: '2px solid #D32F2F',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: '600',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
    },
    ботinCancelarHover: {
      backgroundColor: '#D32F2F',
      color: '#FFFFFF',
      boxShadow: '0 4px 12px rgba(211, 47, 47, 0.25)',
      transform: 'translateY(-2px)',
    },
    emptyState: {
      padding: '3rem 2rem',
      textAlign: 'center',
      color: '#7F8FA3',
      fontSize: '1rem',
    },
    emptyIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      opacity: 0.5,
    },
    resultCount: {
      fontSize: '0.9rem',
      color: '#7F8FA3',
      marginTop: '0.5rem',
      fontWeight: '400',
    },
  };

  const getRowState = (e) => {
    if (e.type === 'mouseenter') {
      Object.assign(e.currentTarget.style, styles.trHover);
    } else {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.boxShadow = 'none';
    }
  };

  const handleCancelButtonHover = (e) => {
    if (e.type === 'mouseenter') {
      Object.assign(e.currentTarget.style, styles.ботinCancelarHover);
    } else {
      Object.assign(e.currentTarget.style, {
        backgroundColor: '#FFFFFF',
        color: '#D32F2F',
        boxShadow: 'none',
        transform: 'translateY(0)',
      });
    }
  };

  const handleSearchFocus = (e) => {
    Object.assign(e.currentTarget.style, styles.searchInputFocus);
  };

  const handleSearchBlur = (e) => {
    Object.assign(e.currentTarget.style, {
      borderColor: '#E8EEFA',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      backgroundColor: '#FFFFFF',
    });
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
        <h2 style={styles.titulo}>Control de Reservas</h2>
        <p style={styles.subtitulo}>Gestiona todas tus reservas de turnos de forma sencilla</p>
      </div>

      <div style={styles.searchContainer}>
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Busca por nombre del cliente..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            style={styles.searchInput}
          />
          {filtro && (
            <button
              style={styles.clearBtn}
              onClick={() => setFiltro('')}
              title="Limpiar búsqueda"
              onMouseEnter={(e) => (e.currentTarget.style.color = '#4A90E2')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A8B4D3')}
            >
              ✕
            </button>
          )}
        </div>
        {filtro && (
          <p style={styles.resultCount}>
            Se encontraron {reservasFiltradas.length} reserva(s)
          </p>
        )}
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Cliente</th>
              <th style={styles.th}>Carnet</th>
              <th style={styles.th}>Fecha/Hora del Turno</th>
              <th style={styles.th}>Estado</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody style={styles.tbody}>
            {!reservasFiltradas || reservasFiltradas.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.emptyState}>
                  <div style={styles.emptyIcon}>📋</div>
                  {filtro
                    ? `No se encontraron reservas para "${filtro}"`
                    : 'No hay reservas registradas'}
                </td>
              </tr>
            ) : (
              reservasFiltradas.map((reserva) => (
                <tr
                  key={reserva.id}
                  style={styles.tr}
                  onMouseEnter={getRowState}
                  onMouseLeave={getRowState}
                >
                  <td style={styles.td}>{reserva.nombreCliente}</td>
                  <td style={{ ...styles.td, ...styles.tdSmall }}>{reserva.carnetIdentidad}</td>
                  <td style={{ ...styles.td, ...styles.tdSmall }}>
                    {reserva.turno
                      ? `${reserva.turno.fecha} (${reserva.turno.horaInicio} - ${reserva.turno.horaFin})`
                      : 'Turno eliminado'}
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.estadoBadge,
                        ...(reserva.estado === 'confirmada' ? styles.estadoConfirmada : styles.estadoCancelada),
                      }}
                    >
                      {reserva.estado.toUpperCase()}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {reserva.estado !== 'cancelada' && (
                      <button
                        onClick={() => cancelarReserva(reserva.id)}
                        style={styles.botinCancelar}
                        onMouseEnter={handleCancelButtonHover}
                        onMouseLeave={handleCancelButtonHover}
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}