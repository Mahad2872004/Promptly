import React from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export default function MagneticButton({ 
  children, 
  className = '', 
  strength = 0.3,
  onClick 
}: MagneticButtonProps) {
  const { ref, position } = useMagnetic<HTMLButtonElement>(strength);

  return (
    <button
      ref={ref}
      className={className}
      onClick={onClick}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {children}
    </button>
  );
}
