'use client';

import { motion } from 'framer-motion';

/**
 * ParkBackground Component
 * * Creates a beautiful park setting with trees, grass, and nature elements
 * to complement the cycling animation, enhanced with a more pixelated aesthetic.
 */
const ParkBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-blue-100 to-green-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600" />
      
      {/* Ground/grass */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-600 via-green-500 to-green-400 dark:from-green-800 dark:via-green-700 dark:to-green-600" />
      
      {/* Trees - Improved pixelated style */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`tree-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            bottom: '32px',
          }}
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          {/* Tree trunk - pixelated */}
          <div className="w-4 h-16 bg-amber-800 dark:bg-amber-900 mx-auto" style={{ imageRendering: 'pixelated' }} />
          {/* Tree foliage - stacked, blocky shapes for a more pixelated look */}
          {/* Corrected positioning: foliage should be ABOVE the trunk */}
          <div className="w-12 h-4 bg-green-600 dark:bg-green-700 mx-auto -mt-4" style={{ imageRendering: 'pixelated' }} />
          <div className="w-10 h-4 bg-green-500 dark:bg-green-600 mx-auto -mt-1" style={{ imageRendering: 'pixelated' }} />
          <div className="w-8 h-4 bg-green-600 dark:bg-green-700 mx-auto -mt-1" style={{ imageRendering: 'pixelated' }} />
        </motion.div>
      ))}
      
      {/* Distant trees (smaller) - pixelated */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`distant-tree-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 15}%`,
            bottom: '40px',
          }}
          animate={{
            y: [0, -1, 0],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          {/* Small tree trunk - pixelated */}
          <div className="w-3 h-10 bg-amber-700 dark:bg-amber-800 mx-auto" style={{ imageRendering: 'pixelated' }} />
          {/* Small tree foliage - pixelated triangle (simple for distant) */}
          <div className="w-8 h-8 bg-green-700 dark:bg-green-800 mx-auto -mt-5" style={{ 
            imageRendering: 'pixelated',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }} />
        </motion.div>
      ))}
      
      {/* Clouds */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute w-16 h-8 bg-white/60 dark:bg-slate-300/40 rounded-full"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 25}%`,
          }}
          animate={{
            x: [0, 50, 0],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        >
          <div className="w-12 h-6 bg-white/60 dark:bg-slate-300/40 rounded-full -ml-2 -mt-1" />
          <div className="w-10 h-6 bg-white/60 dark:bg-slate-300/40 rounded-full ml-2 -mt-1" />
        </motion.div>
      ))}
      
      {/* Park path */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 dark:from-amber-800 dark:via-amber-700 dark:to-amber-800" />
      
      {/* Grass details */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`grass-${i}`}
          className="absolute w-1 h-4 bg-green-500 dark:bg-green-600"
          style={{
            left: `${5 + i * 5}%`,
            bottom: '32px',
          }}
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default ParkBackground;