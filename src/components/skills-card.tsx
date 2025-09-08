'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

/**
 * SkillsCard Component
 * 
 * Full-screen skills card displaying technical skills with animated progress bars and proficiency levels.
 * Based on the actual competencies from the CV.
 */
const SkillsCard = () => {
  const skills = [
    { name: 'JavaScript', level: 90, color: 'from-yellow-500 to-orange-500', icon: '⚡' },
    { name: 'React', level: 90, color: 'from-blue-500 to-cyan-500', icon: '⚛️' },
    { name: 'Next.js', level: 90, color: 'from-slate-600 to-slate-800', icon: '▲' },
    { name: 'TypeScript', level: 90, color: 'from-blue-600 to-indigo-600', icon: '🔷' },
    { name: 'HTML', level: 90, color: 'from-orange-500 to-red-500', icon: '🌐' },
    { name: 'CSS', level: 90, color: 'from-blue-400 to-purple-500', icon: '🎨' },
    { name: 'Jest', level: 75, color: 'from-green-500 to-emerald-500', icon: '🧪' },
    { name: 'Cypress', level: 75, color: 'from-green-600 to-teal-600', icon: '🔍' },
    { name: 'Node.js', level: 75, color: 'from-green-500 to-emerald-500', icon: '🟢' },
    { name: 'Git', level: 90, color: 'from-orange-600 to-red-600', icon: '📝' },
    { name: 'C#', level: 60, color: 'from-purple-600 to-indigo-600', icon: '🔷' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-32 right-16 w-24 h-24 bg-gradient-to-br from-yellow-400/15 to-orange-400/15 rounded-full blur-2xl"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-16 w-20 h-20 bg-gradient-to-br from-green-400/15 to-blue-400/15 rounded-full blur-2xl"
          animate={{ 
            y: [0, 25, 0],
            x: [0, -15, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-8 w-16 h-16 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-2xl"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 25, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto w-full px-4">
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
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-8 h-8 text-yellow-500 mr-3" />
            </motion.div>
            <h2 className="text-4xl font-bold gradient-text">
              Technical Skills
            </h2>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -180, -360]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Zap className="w-8 h-8 text-yellow-500 ml-3" />
            </motion.div>
          </motion.div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
            A collection of technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
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
              <div className="relative p-4 md:p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Decorative elements */}
                <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${skill.color} rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 md:mb-6">
                    <motion.div
                      className="text-2xl md:text-4xl"
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
                      <div className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white">
                        {skill.level}%
                      </div>
                      <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                        Proficiency
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
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
      </div>
    </div>
  );
};

export default SkillsCard;
