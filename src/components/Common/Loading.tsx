import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const sizes = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
};

const Loading: React.FC<LoadingProps> = ({ size = 'md', text }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={`${sizes[size]} border-4 border-primary-200 border-t-primary-500 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && (
        <p className="text-sm text-slate-600 dark:text-slate-400">{text}</p>
      )}
    </div>
  );
};

export const FullPageLoading: React.FC<{ text?: string }> = ({ text = '로딩 중...' }) => {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 mx-auto mb-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-400"
        >
          {text}
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;
