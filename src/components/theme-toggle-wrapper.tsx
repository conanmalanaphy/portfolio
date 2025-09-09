'use client';

import { motion } from 'framer-motion';
import ThemeToggle from './theme-toggle';

/**
 * ThemeToggleWrapper Component
 * 
 * Wrapper component that ensures ThemeToggle is rendered within the ThemeProvider context.
 * This prevents hydration issues and context errors.
 */
export default function ThemeToggleWrapper() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed top-6 right-6 z-50"
    >
      <ThemeToggle />
    </motion.div>
  );
}
