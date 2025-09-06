import Image from 'next/image';

const Avatar = ({ 
  src, 
  alt = '', 
  size = 'medium', 
  fallback,
  className = '',
  online = false,
  ...props 
}) => {
  const sizes = {
    small: 'h-8 w-8',
    medium: 'h-10 w-10',
    large: 'h-12 w-12',
    xl: 'h-16 w-16'
  };
  
  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
    xl: 'text-lg'
  };
  
  const baseClasses = `relative inline-flex items-center justify-center rounded-full bg-muted-dark text-foreground ${sizes[size]} ${className}`;
  
  return (
    <div className={baseClasses} {...props}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="rounded-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <span className={`font-medium ${textSizes[size]}`}>
          {fallback || alt.charAt(0).toUpperCase()}
        </span>
      )}
      
      {online && (
        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-background"></span>
      )}
    </div>
  );
};

export default Avatar;