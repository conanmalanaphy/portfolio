'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import NavCard from './nav-card';
import { Code, Palette, Camera } from 'lucide-react';

/**
 * HeroSection Component
 * 
 * Main hero section with animated name, title, description, social links,
 * contact information, CTA button, and navigation cards.
 */
const HeroSection = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 relative z-10">
      <div className="max-w-6xl mx-auto w-full mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold mb-8 tracking-tight"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 via-pink-600 to-blue-800 bg-clip-text text-transparent bg-[length:200%_auto] animate-pulse">
              Conan Malanaphy
            </span>
          </motion.h1>
          
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl mb-8"
          >
            <span className="text-slate-700 dark:text-slate-200 font-medium">
            
            </span>
          </motion.div>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            I am a Front-end Developer with 8+ years experience developing award-winning software. 
            My main focus is building applications in React and Next.js. I have a passion for learning 
            new technologies and using them to build better, more responsive websites with a focus on user accessibility.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex items-center justify-center space-x-6 mb-16"
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

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 mb-12 text-slate-600 dark:text-slate-300"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">📍</span>
              <span>London, UK</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">📱</span>
              <span>07943526240</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10 flex items-center">
                <span>Let&apos;s work together</span>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-6 h-6 ml-3" />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <NavCard
            href="/about"
            title="About Me"
            description="Learn about my journey, passion, and what drives me as a developer"
            delay={0}
            icon={Code}
            color="from-blue-500 to-cyan-500"
            accentColor="from-cyan-400 to-blue-400"
          />
          <NavCard
            href="/blog"
            title="Blog"
            description="Thoughts on technology, development, and the ever-evolving digital landscape"
            delay={0.1}
            icon={Palette}
            color="from-purple-500 to-pink-500"
            accentColor="from-pink-400 to-purple-400"
          />
          <NavCard
            href="/gallery"
            title="Gallery"
            description="A visual showcase of my projects, designs, and creative explorations"
            delay={0.2}
            icon={Camera}
            color="from-green-500 to-emerald-500"
            accentColor="from-emerald-400 to-green-400"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
