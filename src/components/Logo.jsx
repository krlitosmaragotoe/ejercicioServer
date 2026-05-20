import React from 'react';

export const Logo = ({ size = 40 }) => {
  const id = `logo-gradient-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: 'drop-shadow(0 2px 8px rgba(46, 127, 216, 0.2))',
        display: 'block',
      }}
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E7FD8" />
          <stop offset="100%" stopColor="#1A5BB8" />
        </linearGradient>
      </defs>

      {/* Fondo redondeado */}
      <rect x="10" y="10" width="80" height="80" rx="12" fill={`url(#${id})`} />

      {/* Línea superior (calendario) */}
      <line x1="25" y1="30" x2="75" y2="30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

      {/* Líneas de calendario */}
      <line x1="25" y1="45" x2="75" y2="45" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2" />
      <line x1="25" y1="60" x2="75" y2="60" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2" />
      <line x1="25" y1="75" x2="75" y2="75" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2" />

      {/* Agujeros de calendario */}
      <circle cx="30" cy="20" r="3" fill="#FFFFFF" />
      <circle cx="70" cy="20" r="3" fill="#FFFFFF" />

      {/* Círculo central (reloj) */}
      <circle cx="50" cy="55" r="15" fill="rgba(255, 255, 255, 0.2)" stroke="#FFFFFF" strokeWidth="2" />

      {/* Centro del reloj */}
      <circle cx="50" cy="55" r="3" fill="#FFFFFF" />

      {/* Manilla de horas */}
      <line x1="50" y1="55" x2="50" y2="42" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

      {/* Manilla de minutos */}
      <line x1="50" y1="55" x2="60" y2="45" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

      {/* Marca de checkmark */}
      <path d="M 32 65 L 35 68 L 40 63" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default Logo;
