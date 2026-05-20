import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Logo } from '../Logo';

export const PublicLayout = () => {
  const [isHoveringAdmin, setIsHoveringAdmin] = React.useState(false);

  const themes = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FBFF 100%)',
    },
    header: {
      padding: '1.5rem 2rem',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E8EEFA',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      animation: 'slideDown 0.5s ease-out',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.875rem',
    },
    logo: {
      margin: 0,
      fontSize: '1.6rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #1A1A2E 0%, #2E7FD8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '0.5px',
    },
    adminLink: {
      textDecoration: 'none',
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: '0.95rem',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
      cursor: 'pointer',
      display: 'inline-block',
      background: 'linear-gradient(135deg, #2E7FD8 0%, #1A5BB8 100%)',
      boxShadow: '0 2px 8px rgba(46, 127, 216, 0.25)',
    },
    adminLinkHover: {
      boxShadow: '0 4px 14px rgba(46, 127, 216, 0.4)',
      transform: 'translateY(-2px)',
    },
    main: {
      flex: 1,
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      animation: 'fadeIn 0.5s ease-out',
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
        <div style={themes.logoContainer}>
          <Logo size={40} />
          <h1 style={themes.logo}>Sistema de Turnos</h1>
        </div>
        <Link
          to="/login"
          style={{
            ...themes.adminLink,
            ...(isHoveringAdmin ? themes.adminLinkHover : {}),
          }}
          onMouseEnter={() => setIsHoveringAdmin(true)}
          onMouseLeave={() => setIsHoveringAdmin(false)}
        >
          🔐 Acceso Admin
        </Link>
      </header>

      <main style={themes.main}>
        <Outlet />
      </main>
    </div>
  );
};