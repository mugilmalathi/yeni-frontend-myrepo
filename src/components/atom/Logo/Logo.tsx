import React from 'react';
import './Logo.css';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`logo ${className || ''}`}>
      <span className="logo__text">YENI</span>
      <span className="logo__accent">AI</span>
    </div>
  );
};