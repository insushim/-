import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
  secondary:
    'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-dark-surface dark:text-dark-text dark:hover:bg-dark-surfaceHover focus:ring-slate-500',
  success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-dark-surface focus:ring-slate-500',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
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
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:scale-[1.02] active:scale-[0.98]
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};

export default Button;
