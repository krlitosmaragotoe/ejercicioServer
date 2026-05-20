import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const result = await login(email, password);
    setIsLoading(false);
    
    if (result.success) {
      navigate('/admin/turnos');
    } else {
      setError(result.message);
    }
  };

  const styles = {
    container: {
      minHeight: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FBFF 100%)',
    },
    formWrapper: {
      width: '100%',
      maxWidth: '420px',
      padding: '2.5rem',
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.75rem',
      animation: 'slideUp 0.6s ease-out',
    },
    header: {
      textAlign: 'center',
      marginBottom: '1rem',
    },
    titulo: {
      margin: 0,
      fontSize: '1.8rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #1A1A2E 0%, #4A90E2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    subtitulo: {
      margin: '0.5rem 0 0 0',
      fontSize: '0.9rem',
      color: '#7F8FA3',
    },
    alertError: {
      padding: '1rem',
      backgroundColor: '#FFEBEB',
      color: '#D32F2F',
      border: '1px solid #FFCDCD',
      borderRadius: '8px',
      fontSize: '0.9rem',
      animation: 'slideDown 0.3s ease-out',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    label: {
      fontSize: '0.95rem',
      color: '#4A5578',
      fontWeight: '600',
    },
    input: {
      padding: '1rem',
      border: '2px solid #E8EEFA',
      borderRadius: '10px',
      outline: 'none',
      fontSize: '1rem',
      fontFamily: 'inherit',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#F8FBFF',
      color: '#1A1A2E',
    },
    inputFocus: {
      borderColor: '#4A90E2',
      boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.1)',
      backgroundColor: '#F0F4FF',
    },
    button: {
      padding: '1rem',
      background: 'linear-gradient(135deg, #2E7FD8 0%, #1A5BB8 100%)',
      color: '#FFFFFF',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '0.5rem',
      borderRadius: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 14px rgba(46, 127, 216, 0.35)',
    },
    buttonHover: {
      boxShadow: '0 6px 20px rgba(46, 127, 216, 0.45)',
      transform: 'translateY(-3px)',
    },
    buttonDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed',
      transform: 'translateY(0)',
    },
  };

  const handleInputFocus = (e) => {
    Object.assign(e.currentTarget.style, styles.inputFocus);
  };

  const handleInputBlur = (e) => {
    Object.assign(e.currentTarget.style, {
      borderColor: '#E8EEFA',
      boxShadow: 'none',
      backgroundColor: '#F8FBFF',
    });
  };

  const handleButtonHover = (e, isEnter) => {
    if (!isLoading) {
      if (isEnter) {
        Object.assign(e.currentTarget.style, styles.buttonHover);
      } else {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 144, 226, 0.2)';
        e.currentTarget.style.transform = 'translateY(0)';
      }
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
      `}</style>

      <form onSubmit={handleSubmit} style={styles.formWrapper}>
        <div style={styles.header}>
          <h2 style={styles.titulo}>🔒 Acceso Administrativo</h2>
          <p style={styles.subtitulo}>Ingresa tus credenciales para continuar</p>
        </div>

        {error && <div style={styles.alertError}>❌ {error}</div>}

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>📧 Correo Electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>🔑 Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            required
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            ...styles.button,
            ...(isLoading ? styles.buttonDisabled : {}),
          }}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
        >
          {isLoading ? '⏳ Cargando...' : '✓ Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}