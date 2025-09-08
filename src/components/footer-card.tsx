'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

/**
 * FooterCard Component
 * 
 * Full-screen footer card with animated heart and copyright information.
 */
const FooterCard = () => {
  return (
    <div className="snap-item flex flex-col items-center justify-center px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <motion.div
          className="flex items-center justify-center mb-8"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-8 h-8 text-red-500 mr-3" />
          <span className="text-2xl text-slate-600 dark:text-slate-300 font-medium">
            Made with passion and precision
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <p className="text-lg text-slate-500 dark:text-slate-400">
            &copy; 2024 Conan Malanaphy. All rights reserved.
          </p>
          
          <motion.div
            className="flex items-center justify-center space-x-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="https://github.com/conanmalanaphy/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/conan-malanaphy-946260a7/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="mailto:conanmalanaphy@gmail.com"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Email
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FooterCard;
