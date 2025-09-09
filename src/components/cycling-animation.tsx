'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

/**
 * CyclingAnimation Component
 * 
 * Interactive cycling animation with proximity-based speed control.
 * The closer the mouse is to the bike, the faster it cycles.
 */
const CyclingAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bikeX, setBikeX] = useState(-200);
  const [isAnimating, setIsAnimating] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isAnimating) return;

    let animationId: number;
    let lastTime = 0;

    const animateBike = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      setBikeX(prevX => {
        // Use ref for mouse position to avoid dependency issues
        const mousePos = mouseRef.current;
        
        // Calculate distance from mouse to bike (approximate position)
        const bikeScreenX = prevX;
        const bikeScreenY = window.innerHeight - 100; // Approximate bike Y position
        const distance = Math.sqrt(
          Math.pow(mousePos.x - bikeScreenX, 2) + 
          Math.pow(mousePos.y - bikeScreenY, 2)
        );

        // Speed multiplier based on proximity - closer = faster
        const maxDistance = 120;
        const speedMultiplier = distance < maxDistance ? 
          Math.max(0.2, (maxDistance - distance) / maxDistance * 0.8 + 0.2) : 0.2;
        
        // Base speed in pixels per second, then apply multiplier
        const baseSpeed = 100; // pixels per second
        const speed = (baseSpeed * (1 + speedMultiplier * 2)) * (deltaTime / 1000);
        
        const newX = prevX + speed;
        
        if (newX > window.innerWidth + 200) {
          return -200; // Reset to start
        }
        
        return newX;
      });

      animationId = requestAnimationFrame(animateBike);
    };

    animationId = requestAnimationFrame(animateBike);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isAnimating]); // Removed mousePosition dependency

  useEffect(() => {
    // Start animation after delay
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate distance for display
  const bikeScreenY = typeof window !== 'undefined' ? window.innerHeight - 100 : 0;
  const distance = Math.sqrt(
    Math.pow(mousePosition.x - bikeX, 2) + 
    Math.pow(mousePosition.y - bikeScreenY, 2)
  );

  return (
    <motion.div
      className="absolute bottom-8 z-20"
      style={{ 
        x: bikeX,
        opacity: isAnimating ? 1 : 0
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isAnimating ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <div className="relative pixelated-bike">
        {/* Custom Bike Animation GIF */}
        <img
          src="/bike-animation.gif"
          alt="Cycling animation"
          width="120"
          height="80"
          className="drop-shadow-lg"
          style={{
            imageRendering: 'pixelated',
            filter: 'contrast(1.2) saturate(1.1)'
          }}
        />
        
        {/* Speed indicator - Pixelated style */}
        <motion.div
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap pixelated-text"
          style={{
            filter: 'contrast(1.2)'
          }}
          animate={{
            opacity: distance < 120 ? 1 : 0,
            scale: distance < 60 ? 1.2 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {distance < 40 ? "🚴‍♂️ SPEEDING UP!" : 
           distance < 80 ? "GETTING FASTER..." : 
           distance < 120 ? "APPROACHING..." : ""}
        </motion.div>
        
        {/* Proximity ring effect - pixelated */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-400/40 pointer-events-none"
          style={{
            imageRendering: 'pixelated',
            filter: 'contrast(1.3) saturate(1.2)',
            boxShadow: '0 0 8px rgba(59, 130, 246, 0.4)'
          }}
          animate={{
            scale: distance < 120 ? 1 + (120 - distance) / 120 : 1,
            opacity: distance < 120 ? (120 - distance) / 120 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

export default CyclingAnimation;