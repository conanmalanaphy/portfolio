'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';

/**
 * ThemeToggle Component
 * 
 * A beautiful animated toggle switch for switching between light and dark modes.
 * Features smooth animations and visual feedback.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  // Don't render until we have a proper theme context
  if (!toggleTheme || typeof toggleTheme !== 'function') {
    return null;
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded-full shadow-inner border border-slate-300 dark:border-slate-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Toggle Background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 dark:opacity-100 transition-opacity duration-300"
        initial={false}
        animate={{
          opacity: theme === 'dark' ? 1 : 0,
        }}
      />
      
      {/* Toggle Circle */}
      <motion.div
        className="relative w-6 h-6 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center"
        initial={false}
        animate={{
          x: theme === 'dark' ? 32 : 4,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {/* Sun Icon */}
        <motion.div
          initial={false}
          animate={{
            opacity: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : 180,
            scale: theme === 'light' ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Sun className="w-3 h-3 text-yellow-500" />
        </motion.div>
        
        {/* Moon Icon */}
        <motion.div
          initial={false}
          animate={{
            opacity: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : -180,
            scale: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Moon className="w-3 h-3 text-slate-300" />
        </motion.div>
      </motion.div>
      
      {/* Glow effect for dark mode */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-sm"
        initial={false}
        animate={{
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
