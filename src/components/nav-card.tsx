'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * NavCard Component
 * 
 * Animated navigation card with hover effects, gradient backgrounds,
 * and shimmer animations for the homepage navigation section.
 */
interface NavCardProps {
  href: string;
  title: string;
  description: string;
  delay?: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  accentColor: string;
}

const NavCard = ({ 
  href, 
  title, 
  description, 
  delay = 0, 
  icon: Icon, 
  color, 
  accentColor 
}: NavCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ 
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    }}
    className="group"
  >
    <Link href={href}>
      <div className="relative p-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Animated gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Decorative elements */}
        <div className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${accentColor} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
        <div className={`absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br ${color} rounded-full blur-xl opacity-10 group-hover:opacity-30 transition-opacity duration-500`} />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <motion.div 
              className={`p-4 rounded-2xl bg-gradient-to-br ${color} text-white shadow-xl group-hover:shadow-2xl transition-all duration-300`}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Icon size={28} />
            </motion.div>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight 
                size={24} 
                className={`text-slate-400 group-hover:${accentColor.replace('from-', 'text-').replace(' to-', '-')} transition-colors duration-300`}
              />
            </motion.div>
          </div>
          
          <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors leading-relaxed text-lg">
            {description}
          </p>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default NavCard;
