import React from 'react';

interface YogaCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export default function YogaCard({ title, description, icon, onClick }: YogaCardProps) {
  return (
    <div 
      style={{ 
        background: '#F5F5F5', 
        borderRadius: '12px', 
        padding: '16px',
        marginBottom: '12px',
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '8px', 
          background: '#E0EAFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </div>
        <div style={{ marginLeft: '12px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#1D2939' 
          }}>
            {title}
          </h3>
          <p style={{ 
            fontSize: '14px', 
            color: '#667085',
            marginTop: '4px'
          }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
} 