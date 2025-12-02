import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'game' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-lg shadow-primary-500/25',
  secondary:
    'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-dark-surface dark:text-dark-text dark:hover:bg-dark-surfaceHover focus:ring-slate-500',
  success: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 focus:ring-emerald-500 shadow-lg shadow-emerald-500/25',
  danger: 'bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-400 hover:to-rose-400 focus:ring-red-500 shadow-lg shadow-red-500/25',
  ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-dark-surface focus:ring-slate-500',
  game: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-xl shadow-purple-500/30 border border-purple-400/30',
  glow: 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-400 shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] border border-cyan-400/30',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}) => {
  const isSpecialVariant = variant === 'game' || variant === 'glow';

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-bold
        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:scale-[1.03] active:scale-[0.97]
        ${isSpecialVariant ? 'relative overflow-hidden' : ''}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* 3D 광택 효과 */}
      {isSpecialVariant && (
        <span className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </span>
    </button>
  );
};

export default Button;
