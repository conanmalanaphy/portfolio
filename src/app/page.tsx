'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { 
  BackgroundPattern, 
  HeroSection, 
  SkillsSection, 
  ExperienceSection 
} from '../components';

/**
 * HomePage Component
 * 
 * Main homepage that combines all sections into a cohesive portfolio experience.
 * Now much cleaner and more maintainable with separated components.
 */
export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Conan Malanaphy",
    "jobTitle": "Senior Front-end Developer",
    "description": "Senior Front-end Developer with 8+ years experience building award-winning software. Expert in React, Next.js, TypeScript, and modern web development.",
    "url": "https://conanmalanaphy.dev",
    "image": "https://conanmalanaphy.dev/icon.png",
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
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden">
        <BackgroundPattern />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-16 border-t border-slate-200 dark:border-slate-700"
      >
        <motion.div
          className="flex items-center justify-center mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-slate-600 dark:text-slate-300">
            Made with passion and precision
          </span>
        </motion.div>
        <p className="text-slate-500 dark:text-slate-400">
          &copy; 2024 Conan Malanaphy. All rights reserved.
        </p>
      </motion.footer>
      </main>
    </>
  );
}