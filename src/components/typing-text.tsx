'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * Custom hook to handle hydration
 */
const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    setHydrated(true);
  }, []);
  
  return hydrated;
};

/**
 * TypingText Component
 * 
 * Displays text with a typing animation effect and blinking cursor.
 * Handles hydration properly to avoid SSR/client mismatch.
 */
interface TypingTextProps {
  text: string;
  className?: string;
}

const TypingText = ({ text, className = "" }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const isHydrated = useHydrated();

  useEffect(() => {
    if (!isHydrated) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isHydrated]);

  // Show full text on server, animated text on client after hydration
  if (!isHydrated) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

export default TypingText;
