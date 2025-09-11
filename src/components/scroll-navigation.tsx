'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ScrollNavigationProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * ScrollNavigation Component
 * 
 * Provides visual indicators and navigation for the card-based scrolling layout.
 * Shows current position and allows clicking to navigate between cards.
 */
const ScrollNavigation = ({ containerRef }: ScrollNavigationProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showHint, setShowHint] = useState(true);
  
  const cards = [
    { id: 'hero', label: 'Hero' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  // Hide scroll hint after first scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowHint(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [containerRef]);

  // Track current card based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollTop = container.scrollTop;
      const cardHeight = window.innerHeight;
      const newCurrentCard = Math.round(scrollTop / cardHeight);
      
      setCurrentCard(Math.min(newCurrentCard, cards.length - 1));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [cards.length, containerRef]);

  // Navigate to specific card
  const navigateToCard = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const cardHeight = window.innerHeight;
    container.scrollTo({
      top: index * cardHeight,
      behavior: 'smooth'
    });
  };

  // Scroll to next/previous card
  const scrollToNext = () => {
    if (currentCard < cards.length - 1) {
      navigateToCard(currentCard + 1);
    }
  };

  const scrollToPrevious = () => {
    if (currentCard > 0) {
      navigateToCard(currentCard - 1);
    }
  };

  return (
    <>
      {/* Scroll Indicators */}
      <div className="scroll-indicators">
        {cards.map((card, index) => (
          <motion.button
            key={card.id}
            className={`scroll-indicator ${currentCard === index ? 'active' : ''}`}
            onClick={() => navigateToCard(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title={`Go to ${card.label}`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <AnimatePresence>
        {showHint && currentCard === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="scroll-hint"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center text-slate-500 dark:text-slate-400"
            >
              <span className="text-sm font-medium mb-2">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <AnimatePresence>
        {currentCard > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={scrollToPrevious}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.95 }}
            title="Previous card"
          >
            <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentCard < cards.length - 1 && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={scrollToNext}
            className="fixed right-16 top-1/2 transform -translate-y-1/2 z-50 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.95 }}
            title="Next card"
          >
            <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: (currentCard + 1) / cards.length }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>
    </>
  );
};

export default ScrollNavigation;
