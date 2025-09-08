'use client';

import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

/**
 * ExperienceCard Component
 * 
 * Full-screen experience card displaying work experience with animated cards showing career progression,
 * key achievements, and responsibilities from each role.
 */
const ExperienceCard = () => {
  const experiences = [
    {
      company: 'Talent Funnel',
      position: 'Senior Front-end Developer',
      period: 'Feb 2023 to present',
      highlights: [
        'Took ownership of the front-end stack, building a dynamic client career site with Strapi + Next.js',
        'Collaborated with the CTO on design decisions for a state-of-the-art recruitment solution',
        'Conducted proof of concepts for new technologies',
        'Developed and maintained a design kit and style-guide',
        'Implemented E2E testing with Cypress'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      company: 'Foxtons',
      position: 'Front-end Developer',
      period: 'Sept 2021 to Feb 2023',
      highlights: [
        'Create highly performant pages for the main website which pass high SEO standards',
        'Develop Internal Next.js websites',
        'Develop standalone React applications for use in other areas of the company',
        'Maintain existing website written in VanillaJS and CSS',
        'Participate in reviewing the migration of legacy product to a Next.js Product'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      company: 'Confluence Technologies',
      position: 'Web Developer',
      period: 'Nov 2016 to Aug 2021',
      highlights: [
        'Modernised the tech stack moving from Backbone.js to React',
        'Independently created the platform\'s E2E testing framework',
        'Developed clean user-friendly interfaces for data visualisation using React/Backbone.js',
        'Led workshops on the latest technologies',
        'Mentored new developers'
      ],
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="snap-item flex flex-col items-center justify-center px-4 relative z-10">
      <div className="max-w-6xl mx-auto w-full">
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
            <Code className="w-8 h-8 text-blue-500 mr-3" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Work Experience
            </h2>
            <Code className="w-8 h-8 text-blue-500 ml-3" />
          </motion.div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
            8+ years of experience building award-winning software and leading technical initiatives
          </p>
        </motion.div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative p-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Decorative elements */}
                <div className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${exp.color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {exp.position}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-xl font-semibold text-slate-700 dark:text-slate-200">
                          {exp.company}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {exp.period}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {exp.highlights.map((highlight, highlightIndex) => (
                      <motion.li
                        key={highlightIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: highlightIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-3 text-slate-600 dark:text-slate-300"
                      >
                        <motion.div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${exp.color} mt-2 flex-shrink-0`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: highlightIndex * 0.2 }}
                        />
                        <span className="leading-relaxed">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
