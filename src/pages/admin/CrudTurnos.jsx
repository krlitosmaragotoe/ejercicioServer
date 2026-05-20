import React, { useState } from 'react';
import { useTurnos } from '../../hooks/useTurnos';

export default function CrudTurnos() {
  const { turnos, crearTurno, eliminarTurno } = useTurnos();
  const [formData, setFormData] = useState({
    fecha: '',
    horaInicio: '',
    horaFin: '',
    capacidadMaxima: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await crearTurno({
        ...formData,
        capacidadMaxima: parseInt(formData.capacidadMaxima, 10)
      });
      setSuccess('¡Turno creado exitosamente!');
      setFormData({ fecha: '', horaInicio: '', horaFin: '', capacidadMaxima: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
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
    formCard: {
      backgroundColor: '#FFFFFF',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
      marginBottom: '3rem',
      border: 'none',
      animation: 'slideDown 0.5s ease-out',
    },
    formTitle: {
      marginTop: 0,
      marginBottom: '1.5rem',
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#1A1A2E',
    },
    alertError: {
      padding: '1rem',
      marginBottom: '1.5rem',
      backgroundColor: '#FFEBEB',
      color: '#D32F2F',
      border: '1px solid #FFCDCD',
      borderRadius: '8px',
      fontSize: '0.9rem',
      animation: 'slideDown 0.3s ease-out',
    },
    alertSuccess: {
      padding: '1rem',
      marginBottom: '1.5rem',
      backgroundColor: '#E8F5E9',
      color: '#2E7D32',
      border: '1px solid #C8E6C9',
      borderRadius: '8px',
      fontSize: '0.9rem',
      animation: 'slideDown 0.3s ease-out',
    },
    form: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      alignItems: 'end',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    label: {
      fontSize: '0.9rem',
      color: '#4A5578',
      fontWeight: '500',
    },
    input: {
      padding: '0.875rem',
      border: '2px solid #E8EEFA',
      borderRadius: '8px',
      outline: 'none',
      fontSize: '1rem',
      fontFamily: 'inherit',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#FFFFFF',
      color: '#1A1A2E',
    },
    inputFocus: {
      borderColor: '#4A90E2',
      boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.1)',
      backgroundColor: '#F0F4FF',
    },
    buttonSubmit: {
      padding: '0.875rem 1.5rem',
      background: 'linear-gradient(135deg, #2E7FD8 0%, #1A5BB8 100%)',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '700',
      cursor: 'pointer',
      fontSize: '0.95rem',
      height: '42px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 12px rgba(46, 127, 216, 0.35)',
    },
    buttonSubmitHover: {
      boxShadow: '0 6px 20px rgba(46, 127, 216, 0.45)',
      transform: 'translateY(-3px)',
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
    tr: {
      borderBottom: '1px solid #F0F3FA',
      transition: 'all 0.3s ease',
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
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    estadoActivo: {
      backgroundColor: '#E8F5E9',
      color: '#2E7D32',
    },
    estadoInactivo: {
      backgroundColor: '#EEEEEE',
      color: '#757575',
    },
    buttonDelete: {
      padding: '0.6rem 1.2rem',
      backgroundColor: '#C62828',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(198, 40, 40, 0.25)',
    },
    buttonDeleteHover: {
      backgroundColor: '#B71C1C',
      boxShadow: '0 6px 16px rgba(198, 40, 40, 0.4)',
      transform: 'translateY(-3px)',
    },
    emptyState: {
      padding: '3rem 2rem',
      textAlign: 'center',
      color: '#7F8FA3',
      fontSize: '1rem',
    },
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

  const handleButtonHover = (e, isEnter) => {
    if (isEnter) {
      Object.assign(e.currentTarget.style, styles.buttonSubmitHover);
    } else {
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(74, 144, 226, 0.2)';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  };

  const handleRowHover = (e, isEnter) => {
    if (isEnter) {
      Object.assign(e.currentTarget.style, styles.trHover);
    } else {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.boxShadow = 'none';
    }
  };

  const handleDeleteHover = (e, isEnter) => {
    if (isEnter) {
      Object.assign(e.currentTarget.style, styles.buttonDeleteHover);
    } else {
      Object.assign(e.currentTarget.style, {
        backgroundColor: '#FFFFFF',
        color: '#D32F2F',
        boxShadow: 'none',
        transform: 'translateY(0)',
      });
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
        <h2 style={styles.titulo}>Gestión de Turnos</h2>
        <p style={styles.subtitulo}>Crea, administra y controla todos tus turnos</p>
      </div>

      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>➕ Crear Nuevo Turno</h3>

        {error && <div style={styles.alertError}>{error}</div>}
        {success && <div style={styles.alertSuccess}>{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>📅 Fecha</label>
            <input
              type="date"
              name="fecha"
              required
              value={formData.fecha}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>⏰ Hora de Inicio</label>
            <input
              type="time"
              name="horaInicio"
              required
              value={formData.horaInicio}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>⏰ Hora de Fin</label>
            <input
              type="time"
              name="horaFin"
              required
              value={formData.horaFin}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>👥 Capacidad</label>
            <input
              type="number"
              min="1"
              name="capacidadMaxima"
              required
              value={formData.capacidadMaxima}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={styles.buttonSubmit}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            Crear Turno
          </button>
        </form>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>📅 Fecha</th>
              <th style={styles.th}>⏰ Horario</th>
              <th style={styles.th}>👥 Capacidad</th>
              <th style={styles.th}>📊 Estado</th>
              <th style={styles.th}>⚙️ Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!turnos || turnos.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.emptyState}>
                  📋 No hay turnos registrados. ¡Crea uno para empezar!
                </td>
              </tr>
            ) : (
              turnos.map((turno) => (
                <tr
                  key={turno.id}
                  style={styles.tr}
                  onMouseEnter={(e) => handleRowHover(e, true)}
                  onMouseLeave={(e) => handleRowHover(e, false)}
                >
                  <td style={styles.td}>{turno.fecha}</td>
                  <td style={{ ...styles.td, ...styles.tdSmall }}>
                    {turno.horaInicio} - {turno.horaFin}
                  </td>
                  <td style={{ ...styles.td, ...styles.tdSmall }}>
                    {turno.capacidadMaxima} cupos
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.estadoBadge,
                        ...(turno.estado === 'activo' ? styles.estadoActivo : styles.estadoInactivo),
                      }}
                    >
                      {turno.estado.toUpperCase()}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => eliminarTurno(turno.id)}
                      style={styles.buttonDelete}
                      onMouseEnter={(e) => handleDeleteHover(e, true)}
                      onMouseLeave={(e) => handleDeleteHover(e, false)}
                    >
                      🗑️ Eliminar
                    </button>
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