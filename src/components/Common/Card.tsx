import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingSizes = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  onClick,
  padding = 'md',
}) => {
  const baseClasses = `
    bg-white dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border
    ${paddingSizes[padding]}
    ${hoverable ? 'cursor-pointer' : ''}
    ${className}
  `;

  if (hoverable) {
    return (
      <motion.div
        className={baseClasses}
        whileHover={{ y: -4, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
