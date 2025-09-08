/**
 * BackgroundPattern Component
 * 
 * Provides an animated background with gradient orbs and grid pattern
 * for the homepage hero section.
 */

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

export default BackgroundPattern;
