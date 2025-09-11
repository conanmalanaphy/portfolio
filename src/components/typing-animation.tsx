'use client';

import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

const TypingAnimation = ({ 
  texts, 
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000
}: TypingAnimationProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse ml-1">|</span>
    </span>
  );
};

export default TypingAnimation;
