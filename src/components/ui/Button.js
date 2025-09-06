import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  className = '', 
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white shadow-sm focus:ring-primary',
    secondary: 'bg-card hover:bg-card-hover text-foreground border border-border shadow-sm focus:ring-primary',
    accent: 'bg-accent hover:bg-accent-light text-white shadow-sm focus:ring-accent',
    gold: 'bg-gold hover:bg-gold-dark text-white shadow-sm focus:ring-gold',
    ghost: 'hover:bg-muted text-foreground focus:ring-primary',
    link: 'text-primary hover:text-primary-dark underline-offset-4 hover:underline focus:ring-primary'
  };
  
  const sizes = {
    small: 'h-8 px-3 text-sm',
    medium: 'h-10 px-4 text-sm',
    large: 'h-12 px-6 text-base',
    icon: 'h-10 w-10'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button 
      ref={ref}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;