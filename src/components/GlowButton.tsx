import { useRef } from 'react';
import { gsap } from 'gsap';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

function GlowButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
}: GlowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gsap.to(buttonRef.current, {
      '--mouse-x': `${x}px`,
      '--mouse-y': `${y}px`,
      duration: 0.3,
    });
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-[#00f0ff] to-[#00c8d5]
      text-[#05050a] font-semibold
      hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]
      transition-shadow duration-300
    `,
    secondary: `
      bg-gradient-to-r from-[#7000ff] to-[#9d4edd]
      text-white font-semibold
      hover:shadow-[0_0_30px_rgba(112,0,255,0.5)]
      transition-shadow duration-300
    `,
    outline: `
      bg-transparent
      border border-[#00f0ff]/50
      text-[#00f0ff]
      hover:bg-[#00f0ff]/10
      hover:border-[#00f0ff]
      hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]
      transition-all duration-300
    `,
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={buttonRef as any}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`
        relative overflow-hidden rounded-lg
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
        group
      `}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      {/* Glow Effect */}
      <span
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-300 pointer-events-none
        `}
        style={{
          background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.3) 0%, transparent 50%)`,
        }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {icon && <span className="group-hover:translate-x-1 transition-transform">{icon}</span>}
      </span>
    </Component>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  onClick,
  href,
  className = '',
  strength = 0.3,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(buttonRef.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const Component = href ? 'a' : 'button';

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={className}
      >
        {children}
      </Component>
    </div>
  );
}

export default GlowButton;
