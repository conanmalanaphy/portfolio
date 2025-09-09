'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, Mail, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { BackgroundPattern } from '../../components';

/**
 * AboutPage Component
 * 
 * Detailed about page with comprehensive information about Conan's experience,
 * skills, and background. Moved from homepage to keep it clean and focused.
 */
export default function AboutPage() {
  const skills = [
    { name: 'JavaScript', level: 90, color: 'from-yellow-500 to-orange-500' },
    { name: 'React', level: 90, color: 'from-blue-500 to-cyan-500' },
    { name: 'Next.js', level: 90, color: 'from-slate-600 to-slate-800' },
    { name: 'TypeScript', level: 90, color: 'from-blue-600 to-indigo-600' },
    { name: 'HTML', level: 90, color: 'from-orange-500 to-red-500' },
    { name: 'CSS', level: 90, color: 'from-blue-400 to-purple-500' },
    { name: 'Jest', level: 75, color: 'from-green-500 to-emerald-500' },
    { name: 'Cypress', level: 75, color: 'from-green-600 to-teal-600' },
    { name: 'Node.js', level: 75, color: 'from-green-500 to-emerald-500' },
    { name: 'Git', level: 90, color: 'from-orange-600 to-red-600' },
    { name: 'C#', level: 60, color: 'from-purple-600 to-indigo-600' },
  ];

  const experience = [
    {
      company: 'Talent Funnel',
      position: 'Senior Front-end Developer',
      duration: '2022 - Present',
      description: 'Leading front-end development for award-winning recruitment platform. Built scalable React applications with TypeScript, implementing modern development practices and mentoring junior developers.',
      technologies: ['React', 'TypeScript', 'Next.js', 'Jest', 'Cypress']
    },
    {
      company: 'Previous Experience',
      position: 'Front-end Developer',
      duration: '2016 - 2022',
      description: 'Developed responsive web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality user experiences.',
      technologies: ['JavaScript', 'React', 'HTML', 'CSS', 'Node.js']
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative">
      <BackgroundPattern />
      
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-8 z-10"
      >
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            I am a Front-end Developer with 8+ years experience developing award-winning software. 
            My main focus is building applications in React and Next.js. When I&apos;m not coding, 
            I&apos;m exploring London on my bike, finding inspiration in the city&apos;s rhythm and flow.
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="flex items-center space-x-3 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>London, UK</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <Phone className="w-5 h-5 text-green-600" />
            <span>07943526240</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <Mail className="w-5 h-5 text-purple-600" />
            <span>conanmalanaphy@gmail.com</span>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50"
              >
                <div className="text-center">
                  <h3 className="font-semibold mb-2">{skill.name}</h3>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <motion.div
                      className={`bg-gradient-to-r ${skill.color} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    />
                  </div>
                  <span className="text-sm text-slate-500 mt-1">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{job.position}</h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400">{job.company}</p>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400">{job.duration}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Beyond Code</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50"
            >
              <h3 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">🚴‍♂️ Cycling</h3>
              <p className="text-slate-600 dark:text-slate-300">
                I love exploring London&apos;s streets on my bike. Cycling gives me a fresh perspective on the city 
                and helps me think through complex problems. There&apos;s something about the rhythm of pedaling 
                that clears my mind and sparks new ideas.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50"
            >
              <h3 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">💡 Continuous Learning</h3>
              <p className="text-slate-600 dark:text-slate-300">
                I&apos;m passionate about staying current with web technologies and best practices. 
                Whether it&apos;s mastering a new framework or exploring innovative design patterns, 
                I believe in the power of continuous learning to build better solutions.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Let&apos;s Connect</h2>
          <div className="flex items-center justify-center space-x-6">
            <motion.a
              href="https://github.com/conanmalanaphy/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
            >
              <Github className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/conan-malanaphy-946260a7/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
            >
              <Linkedin className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            </motion.a>
            <motion.a
              href="mailto:conanmalanaphy@gmail.com"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
            >
              <Mail className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
