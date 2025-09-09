'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import ParkBackground from '../components/park-background';
import CyclingAnimation from '../components/cycling-animation';
import ThemeToggleWrapper from '../components/theme-toggle-wrapper';

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
    "jobTitle": "Senior Front-end Developer",
    "description": "Senior Front-end Developer with 8+ years experience building award-winning software. Expert in React, Next.js, TypeScript, and modern web development.",
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
      "Web Accessibility"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Talent Funnel"
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "Loughborough University"
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
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                Conan Malanaphy
              </motion.span>
            </motion.h1>
            
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl mb-8 text-slate-800 dark:text-slate-100 font-medium"
            >
              Front-end Developer
            </motion.div>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-slate-700 dark:text-slate-200 max-w-2xl mx-auto leading-relaxed mb-12"
            >
              I build exceptional digital experiences with modern web technologies. 
              When I&apos;m not coding, you&apos;ll find me cycling through London&apos;s streets, 
              always pedaling towards the next challenge.
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

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.a
                href="/about"
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <span>Learn More</span>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.div>
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