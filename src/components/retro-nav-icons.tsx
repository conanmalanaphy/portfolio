'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

/**
 * RetroNavIcons Component
 * 
 * Navigation icons using custom images positioned in the center top
 * with labels underneath. Only shows when mouse moves with fade timeout.
 */
const RetroNavIcons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setIsVisible(true);
      
      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Set new timeout to hide after 3 seconds
      const newTimeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      
      setTimeoutId(newTimeoutId);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -20
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute top-8 left-0 right-0 z-30 flex justify-center space-x-12"
    >
      {/* Blog Icon */}
      <motion.div
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="text-center"
      >
        <Link href="/blog" className="block">
          <div className="relative group">
            <Image
              src="/bookmark_14729903.png"
              alt="Blog"
              width={48}
              height={48}
              className="mx-auto mb-2"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              Blog
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Gallery Icon */}
      <motion.div
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="text-center"
      >
        <Link href="/gallery" className="block">
          <div className="relative group">
            <Image
              src="/image_14729908.png"
              alt="Gallery"
              width={48}
              height={48}
              className="mx-auto mb-2"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              Gallery
            </div>
          </div>
        </Link>
      </motion.div>

      {/* About Icon */}
      <motion.div
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="text-center"
      >
        <Link href="/about" className="block">
          <div className="relative group">
            <Image
              src="/website_12751769.png"
              alt="About"
              width={48}
              height={48}
              className="mx-auto mb-2"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              About
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default RetroNavIcons;
