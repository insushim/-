import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'glass' | 'gradient' | 'game';
}

const paddingSizes = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const variantStyles = {
  default: 'bg-white dark:bg-dark-surface border-slate-200 dark:border-dark-border',
  glass: 'bg-white/10 dark:bg-slate-800/50 backdrop-blur-xl border-white/20 dark:border-slate-600/30',
  gradient: 'bg-gradient-to-br from-slate-700/90 to-slate-800/90 border-slate-600/50 shadow-xl',
  game: 'bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-pink-900/20 border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.15)]',
};

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  onClick,
  padding = 'md',
  variant = 'default',
}) => {
  const baseClasses = `
    rounded-2xl border relative overflow-hidden
    ${variantStyles[variant]}
    ${paddingSizes[padding]}
    ${hoverable ? 'cursor-pointer' : ''}
    ${className}
  `;

  if (hoverable) {
    return (
      <motion.div
        className={baseClasses}
        whileHover={{
          y: -6,
          scale: 1.02,
          boxShadow: variant === 'game'
            ? '0 20px 50px -15px rgba(99,102,241,0.4), 0 0 30px rgba(147,51,234,0.2)'
            : '0 20px 50px -15px rgba(0,0,0,0.25)'
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={onClick}
      >
        {/* 3D 글로우 효과 */}
        {variant === 'game' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          </>
        )}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {variant === 'game' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Card;
