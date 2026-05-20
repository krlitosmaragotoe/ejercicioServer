import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../Logo';

export const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isHoveringLogout, setIsHoveringLogout] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkStyle = ({ isActive }) => ({
    padding: '1rem 1.5rem',
    textDecoration: 'none',
    color: isActive ? '#4A90E2' : '#7F8FA3',
    fontWeight: isActive ? '600' : '500',
    borderBottom: isActive ? '3px solid #4A90E2' : 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
  });

  const themes = {
    header: {
      padding: '1.25rem 2rem',
      background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
      color: '#FFFFFF',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      animation: 'slideDown 0.5s ease-out',
    },
    headerTitle: {
      margin: 0,
      fontSize: '1.5rem',
      fontWeight: '700',
      letterSpacing: '0.5px',
    },
    logoutButton: {
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(135deg, #C62828 0%, #B71C1C 100%)',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '700',
      fontSize: '0.9rem',
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(198, 40, 40, 0.25)',
    },
    logoutButtonHover: {
      backgroundColor: '#A71414',
      boxShadow: '0 4px 14px rgba(198, 40, 40, 0.4)',
      transform: 'translateY(-2px)',
    },
    nav: {
      backgroundColor: '#FFFFFF',
      padding: '0 2rem',
      display: 'flex',
      gap: '0.5rem',
      borderBottom: '1px solid #E8EEFA',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
    },
    main: {
      flex: 1,
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      animation: 'fadeIn 0.5s ease-out',
    },
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FBFF 100%)',
    },
  };

  return (
    <div style={themes.container}>
      <style>{`
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
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

      <header style={themes.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Logo size={35} />
          <h2 style={themes.headerTitle}>Panel de Admin</h2>
        </div>
        <button
          onClick={handleLogout}
          style={{
            ...themes.logoutButton,
            ...(isHoveringLogout ? themes.logoutButtonHover : {}),
          }}
          onMouseEnter={() => setIsHoveringLogout(true)}
          onMouseLeave={() => setIsHoveringLogout(false)}
        >
          🚪 Cerrar Sesión
        </button>
      </header>

      <nav style={themes.nav}>
        <NavLink to="/admin/turnos" style={navLinkStyle}>
          📋 Gestión de Turnos
        </NavLink>
        <NavLink to="/admin/reservas" style={navLinkStyle}>
          📅 Gestión de Reservas
        </NavLink>
      </nav>

      <main style={themes.main}>
        <Outlet />
      </main>
    </div>
  );
};