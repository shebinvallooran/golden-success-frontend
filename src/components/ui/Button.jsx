import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-white hover:text-primary shadow-lg',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white',
    gradient: 'text-white shadow-lg relative overflow-hidden group',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;
  
  if (variant === 'gradient') {
    return (
      <button
        className={`${baseClasses} ${sizeClasses} ${className} text-white transition-all duration-300`}
        style={{
          background: 'linear-gradient(135deg, #04C39A 0%, #00B4D8 100%)'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'white';
          e.target.style.color = '#04C39A';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'linear-gradient(135deg, #04C39A 0%, #00B4D8 100%)';
          e.target.style.color = 'white';
        }}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
