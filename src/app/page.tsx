'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import ParkBackground from '../components/park-background';
import CyclingAnimation from '../components/cycling-animation';
import ThemeToggleWrapper from '../components/theme-toggle-wrapper';
import TypingAnimation from '../components/typing-animation';

/**
 * HomePage Component
 * 
 * Clean, single-page homepage with one subtle but impressive animation.
 * Demonstrates animation skills without being flashy or excessive.
 */
export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Conan Malanaphy",
    "alternateName": ["Malanaphy", "Conan", "Malanaphy Conan"],
    "givenName": "Conan",
    "familyName": "Malanaphy",
    "jobTitle": "Senior Front-end Developer",
    "description": "Conan Malanaphy (Malanaphy) is a Senior Front-end Developer with 8+ years experience building award-winning software. Expert in React, Next.js, TypeScript, and modern web development. Based in London, UK.",
    "url": "https://malanaphy.co.uk",
    "image": "https://malanaphy.co.uk/icon.png",
    "sameAs": [
      "https://github.com/conanmalanaphy/",
      "https://www.linkedin.com/in/conan-malanaphy-946260a7/"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB"
    },
    "email": "conanmalanaphy@gmail.com",
    "telephone": "07943526240",
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Front-end Development",
      "Web Development",
      "User Experience",
      "Web Accessibility",
      "React Developer",
      "Next.js Developer",
      "JavaScript Developer",
      "Web Developer London",
      "Frontend Engineer",
      "UI Developer",
      "Software Engineer"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Talent Funnel"
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "Loughborough University"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Senior Front-end Developer",
      "occupationLocation": {
        "@type": "City",
        "name": "London"
      },
      "skills": ["React", "Next.js", "TypeScript", "JavaScript", "Front-end Development"]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen text-slate-900 dark:text-white relative overflow-hidden">
        <ParkBackground />
        
        {/* Theme Toggle */}
        <ThemeToggleWrapper />
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Name with subtle morphing animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-8 tracking-tight"
            >
              <motion.span
                className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 bg-clip-text text-transparent pixelated-text"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                  imageRendering: 'pixelated',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                  fontFamily: 'monospace'
                }}
              >
                CONAN MALANAPHY
              </motion.span>
            </motion.h1>
            
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl mb-8 text-slate-800 dark:text-slate-100 font-medium"
            >
              <TypingAnimation 
                texts={["Front-end Developer", "Pixel Pusher"]}
                typingSpeed={100}
                deletingSpeed={50}
                pauseTime={2000}
              />
            </motion.div>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-slate-700 dark:text-slate-200 max-w-2xl mx-auto leading-relaxed mb-12"
            >
              Front-end developer specializing in React and modern web technologies. 
              Building user experiences that matter, one component at a time.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center space-x-6 mb-12"
            >
              <motion.a
                href="https://github.com/conanmalanaphy/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                <Github className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/conan-malanaphy-946260a7/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                <Linkedin className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </motion.a>
              <motion.a
                href="mailto:conanmalanaphy@gmail.com"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                <Mail className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </motion.a>
            </motion.div>

          
          </div>
        </div>


        {/* Interactive Cycling Animation */}
        <CyclingAnimation />
      </main>
    </>
  );
}