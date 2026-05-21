import React from 'react';

interface CinematicVignetteProps {
  intensity?: number;
  className?: string;
}

export const CinematicVignette: React.FC<CinematicVignetteProps> = ({
  intensity = 0.5,
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-[5] ${className}`}
      style={{
        background: `radial-gradient(ellipse at 50% 50%, transparent 0%, transparent 50%, rgba(0,0,0,${intensity}) 100%)`,
      }}
    />
  );
};

export default CinematicVignette;
