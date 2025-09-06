import { forwardRef } from 'react';

const Textarea = forwardRef(({ 
  className = '', 
  error = false,
  rows = 3,
  ...props 
}, ref) => {
  const baseClasses = 'flex min-h-[80px] w-full rounded-md border bg-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none';
  const errorClasses = error 
    ? 'border-accent focus-visible:ring-accent' 
    : 'border-border focus-visible:ring-ring';
  
  const classes = `${baseClasses} ${errorClasses} ${className}`;
  
  return (
    <textarea
      className={classes}
      ref={ref}
      rows={rows}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;