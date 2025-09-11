'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import TypingAnimation from './typing-animation';
import NavCard from './nav-card';
import { Code, Palette, Camera } from 'lucide-react';

/**
 * HeroCard Component
 * 
 * Full-screen hero card with animated name, title, description, social links,
 * contact information, CTA button, and navigation cards.
 */
const HeroCard = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-full blur-xl"
          animate={{ 
            y: [0, 15, 0],
            x: [0, -10, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
          animate={{ 
            y: [0, -25, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto w-full px-4">
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
            <span className="gradient-text">
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
              <TypingAnimation 
                texts={["Front-end Developer", "Pixel Pusher"]}
                typingSpeed={100}
                deletingSpeed={50}
                pauseTime={2000}
              />
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
    </div>
  );
};

export default HeroCard;
