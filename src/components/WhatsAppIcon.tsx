import React from 'react';

interface WhatsAppIconProps {
  className?: string;
  color?: 'white' | 'black';
}

const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({ className = "w-5 h-5", color = 'white' }) => {
  const filterStyle = color === 'white' ? 'brightness(0) invert(1)' : 'none';
  
  return (
    <img
      src="/whatsapp.svg"
      alt="WhatsApp"
      className={className}
      style={{ filter: filterStyle }}
    />
  );
};

export default WhatsAppIcon;
