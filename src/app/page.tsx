'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Custom hook to handle hydration
const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    setHydrated(true);
  }, []);
  
  return hydrated;
};
import { 
  Code, 
  Palette, 
  Camera, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail,
  Sparkles,
  Zap,
  Heart
} from 'lucide-react';

// Enhanced background with visual elements
const BackgroundPattern = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Main gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900" />
    
    {/* Animated gradient orbs */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    
    {/* Subtle grid pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
  </div>
);

// Typing animation component
const TypingText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const isHydrated = useHydrated();

  useEffect(() => {
    if (!isHydrated) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isHydrated]);

  // Show full text on server, animated text on client after hydration
  if (!isHydrated) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

// Enhanced navigation card component
const NavCard = ({ href, title, description, delay = 0, icon: Icon, color, accentColor }: { 
  href: string; 
  title: string; 
  description: string; 
  delay?: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  accentColor: string;
}) => (
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

// Enhanced skills section component
const SkillsSection = () => {
  const skills = [
    { name: 'React', level: 90, color: 'from-blue-500 to-cyan-500', icon: '⚛️' },
    { name: 'TypeScript', level: 85, color: 'from-blue-600 to-indigo-600', icon: '🔷' },
    { name: 'Next.js', level: 80, color: 'from-slate-600 to-slate-800', icon: '▲' },
    { name: 'Node.js', level: 75, color: 'from-green-500 to-emerald-500', icon: '🟢' },
    { name: 'Python', level: 70, color: 'from-yellow-500 to-orange-500', icon: '🐍' },
    { name: 'Design', level: 85, color: 'from-purple-500 to-pink-500', icon: '🎨' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full max-w-6xl mx-auto mt-32 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <motion.div
          className="inline-flex items-center justify-center mb-6"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="w-8 h-8 text-yellow-500 mr-3" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <Zap className="w-8 h-8 text-yellow-500 ml-3" />
        </motion.div>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
          A collection of technologies and tools I work with to bring ideas to life
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -5, 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className="group relative"
          >
            <div className="relative p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Decorative elements */}
              <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${skill.color} rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    className="text-4xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    {skill.icon}
                  </motion.div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {skill.level}%
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Proficiency
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                  {skill.name}
                </h3>
                
                <div className="relative">
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className={`bg-gradient-to-r ${skill.color} h-3 rounded-full relative`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                      viewport={{ once: true }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden">
      <BackgroundPattern />
      
      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-4 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mr-3"
              >
                <Sparkles className="w-6 h-6 text-blue-500" />
              </motion.div>
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Hello, I&apos;m
              </span>
            </motion.div>

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
                <TypingText text="Full Stack Developer & Creative Technologist" />
              </span>
            </motion.div>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              I craft digital experiences that blend innovation with elegance. 
              Passionate about building solutions that make a difference and bring joy to users.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex items-center justify-center space-x-6 mb-16"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                <Github className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                <Linkedin className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </motion.a>
              <motion.a
                href="#"
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
              transition={{ duration: 0.8, delay: 1.2 }}
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
            transition={{ duration: 0.8, delay: 1.4 }}
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

      {/* Skills Section */}
      <SkillsSection />

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
  );
}