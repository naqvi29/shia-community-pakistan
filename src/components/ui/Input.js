import { forwardRef } from 'react';

const Input = forwardRef(({ 
  className = '', 
  type = 'text',
  error = false,
  ...props 
}, ref) => {
  const baseClasses = 'flex h-10 w-full rounded-md border bg-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  const errorClasses = error 
    ? 'border-accent focus-visible:ring-accent' 
    : 'border-border focus-visible:ring-ring';
  
  const classes = `${baseClasses} ${errorClasses} ${className}`;
  
  return (
    <input
      type={type}
      className={classes}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;