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
      <div className="relative">
        {/* Cycling Animation SVG */}
        <svg
          width="120"
          height="80"
          viewBox="0 0 269 134.11"
          className="drop-shadow-lg"
        >
          {/* Animated wheels */}
          <g id="animationWheels" transform="rotate(0 101.5 92.61)">
            <animateTransform
              attributeName="transform"
              begin="0s"
              dur="1s"
              type="rotate"
              from="0 101.5 92.61"
              to="360 101.5 92.61"
              repeatCount="indefinite"
            />
            <path
              className="wheel-rim"
              d="M79.21 113.77a34 34 0 1 1 46.56 12 34 34 0 0 1-46.56-12z"
              transform="translate(-7 -3.89)"
            />
          </g>
          
          <g id="parrot" transform="rotate(0 227.5 92.61)">
            <animateTransform
              attributeName="transform"
              begin="0s"
              dur="1s"
              type="rotate"
              from="0 227.5 92.61"
              to="360 227.5 92.61"
              repeatCount="indefinite"
            />
            <path
              className="wheel-rim"
              d="M268.5 96.5a34 34 0 1 1-34-34 34 34 0 0 1 34 34z"
              transform="translate(-7 -3.89)"
            />
          </g>

          {/* Wheels */}
          <g id="wheels">
            <path
              className="wheel-detail"
              d="M161.85 93c2 0 3.82.61 4.34 1.16a3.46 3.46 0 0 1 .32 2c-.06 1.76-.42 2.85-1 3.24a6.25 6.25 0 0 1-3 .65h-.14L160 99.7l.23-1.08.46-2.12-.46-2.12-.23-1.11 1.82-.28m-.2-10H161l-13 2 2.5 11.5L148 108l13.25 2h1.22c3.54 0 13.6-1.1 14-13.55.47-12.69-11.83-13.45-14.82-13.45z"
              transform="translate(-7 -3.89)"
            />
            <circle
              id="outerwheel"
              className="wheel-outer"
              cx="101.5"
              cy="92.61"
              r="40"
            />
            <path
              className="wheel-detail"
              d="M108.51 60.44a36.06 36.06 0 0 1 .76 72.11h-.78a36.06 36.06 0 0 1-.76-72.11h.78m0-3h-.84a39.06 39.06 0 0 0 .82 78.11h.84a39.06 39.06 0 0 0-.82-78.11z"
              transform="translate(-7 -3.89)"
            />
            <circle
              id="outerwheel-2"
              className="wheel-outer"
              cx="227.5"
              cy="92.61"
              r="40"
            />
            <path
              className="wheel-detail"
              d="M234.5 60.44a36.06 36.06 0 1 1-36.06 36.06 36.11 36.11 0 0 1 36.06-36.06m0-3a39.06 39.06 0 1 0 39.06 39.06 39.1 39.1 0 0 0-39.06-39.06z"
              transform="translate(-7 -3.89)"
            />
            <circle
              id="centerwheel"
              className="wheel-center"
              cx="227.5"
              cy="92.61"
              r="3"
            />
            <circle
              id="centerwheel-2"
              className="wheel-center"
              cx="101.5"
              cy="92.61"
              r="3"
            />
          </g>

          {/* Bike body */}
          <g id="body">
            <path
              className="bike-frame"
              d="M156.5 92.61l-32-69-.19-.42"
            />
            <path
              className="bike-frame"
              d="M156.5 92.61l53-57"
            />
            <path
              className="bike-frame"
              d="M117 7.11l7.31 16.08"
            />
            <path
              className="bike-frame"
              d="M124.5 22.61h84"
            />
            <path
              className="bike-frame"
              d="M124.31 23.19L101.5 92.61"
            />
            <path
              className="bike-frame"
              d="M101.5 92.61h55"
            />
            <path
              className="bike-frame"
              d="M234.5 96.5c-16-19-19-70-19-70"
              transform="translate(-7 -3.89)"
            />
            <path
              className="bike-frame"
              d="M224.5 10.61h-17l1 12"
            />
            <path
              className="bike-seat"
              d="M140 11c-2.57-4.29-8-4-8-4h-9c-3 0-9-2-9-2-2-1-1.7-1.29-2-1-.78.75-.08 3.35 0 4 .16 1.34 1 4 2 5a4.52 4.52 0 0 0 5 1c1.7-.85 5-3.15 7-3 13 1 14 0 14 0"
              transform="translate(-7 -3.89)"
            />
            <path
              className="bike-handle"
              d="M224.25 10.61a7 7 0 0 1 0 14"
            />
            <path
              className="bike-gear"
              d="M162.5 81A12.5 12.5 0 1 0 175 93.5 12.5 12.5 0 0 0 162.5 81z"
              transform="translate(-7 -3.89)"
            />
            <path
              className="bike-pedal"
              d="M149 86l4 9-3 6v-9c0-6-1-6-1-6z"
              transform="translate(-7 -3.89)"
            />
            <path
              className="bike-gear-outer"
              d="M162.5 81.5a14.86 14.86 0 0 0-4.5.69L107 92a4.53 4.53 0 0 0 0 9l51 9.81a14.86 14.86 0 0 0 4.5.69 15 15 0 0 0 0-30z"
              transform="translate(-7 -3.89)"
            />
            <path
              className="bike-gear-center"
              d="M108.5 91.5a5 5 0 1 0 5 5 5 5 0 0 0-5-5z"
              transform="translate(-7 -3.89)"
            />
            <path
              className="bike-gear-inner"
              d="M155.5 77.61a14.86 14.86 0 0 0-4.5.69l-51 9.81a4.53 4.53 0 0 0 0 9l51 9.81a14.86 14.86 0 0 0 4.5.69 15 15 0 0 0 0-30z"
            />
          </g>

          {/* Motion effects */}
          <g id="effects">
            <path
              className="motion-effect"
              d="M104.5 32.61h-63"
            />
            <path
              className="motion-effect"
              d="M104 42.11H75"
            />
            <path
              className="motion-effect"
              d="M68 127.11H22"
            />
            <path
              className="motion-effect"
              d="M61 118.11H38"
            />
            <path
              className="motion-effect"
              d="M54 108.11H25"
            />
            <path
              className="motion-effect"
              d="M104 23.11H80"
            />
            <path
              className="motion-effect"
              d="M80 51.11H66"
            />
            <path
              className="motion-effect"
              d="M49 97.11H2"
            />
            <path
              className="motion-effect"
              d="M195 127.11h-23"
            />
            <path
              className="motion-effect"
              d="M184 120.11h-33"
            />
          </g>
        </svg>
        
        {/* Speed indicator */}
        <motion.div
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap"
          animate={{
            opacity: distance < 120 ? 1 : 0,
            scale: distance < 60 ? 1.2 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {distance < 40 ? "🚴‍♂️ Speeding up!" : 
           distance < 80 ? "Getting faster..." : 
           distance < 120 ? "Approaching..." : ""}
        </motion.div>
        
        {/* Proximity ring effect - smooth */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-400/40 pointer-events-none"
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