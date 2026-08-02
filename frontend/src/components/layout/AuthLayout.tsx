import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  bgImage?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, bgImage = '/auth-bg.png' }) => {
  return (
    <div className="min-h-screen w-full flex bg-white text-slate-900 font-sans selection:bg-slate-200 selection:text-slate-900">
      <div className="w-full flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Section: Minimalist Visual (Desktop lg:flex) */}
        <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 bg-slate-50 border-r border-slate-200">
          {/* Subtle background image with minimal dark overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
            style={{ 
              backgroundImage: `url('${bgImage}')` 
            }}
          />
          <div className="absolute inset-0 bg-slate-900/60" />

          {/* Top Branding Header */}
          <div className="relative z-10">
            <Link to="/" className="flex items-center space-x-3 group w-fit">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-sm">
                <span className="font-heading font-black text-lg text-slate-900">T</span>
              </div>
              <span className="font-heading font-semibold text-lg tracking-tight text-white group-hover:text-slate-200 transition-colors">
                AL-Amin Export Ltd.
              </span>
            </Link>
          </div>

          {/* Bottom Tagline */}
          <div className="relative z-10 max-w-md">
            <blockquote className="space-y-4">
              <p className="text-lg font-medium text-white/90 leading-relaxed">
                "Streamlining enterprise garment manufacturing with intelligent workflows and real-time inventory precision."
              </p>
              <footer className="text-sm text-white/70 font-medium">
                TextTile ERP Platform
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Right Section: Clean Form Area */}
        <div className="w-full lg:w-[55%] flex flex-col justify-between p-6 sm:p-10 lg:p-16 bg-white relative z-10 overflow-y-auto">
          {/* Top navigation header for Right Panel */}
          <div className="flex items-center justify-between w-full mb-12 lg:mb-0">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Return to website</span>
            </Link>

            {/* Mobile / Tablet Logo display */}
            <Link to="/" className="flex lg:hidden items-center space-x-2">
              <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center shadow-sm">
                <span className="font-heading font-black text-lg text-white">T</span>
              </div>
            </Link>
          </div>

          {/* Main Form Container */}
          <div className="w-full max-w-[400px] mx-auto my-auto py-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Form Title & Subtitle Header */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight font-heading mb-2">
                  {title}
                </h2>
                <p className="text-sm text-slate-500">
                  {subtitle}
                </p>
              </div>

              {/* Children (Form Content) */}
              {children}
            </motion.div>
          </div>

          {/* Footer information on Right Panel */}
          <div className="mt-12 text-left sm:text-center text-xs text-slate-400">
            <p>Protected by TextTile Enterprise Identity</p>
          </div>
        </div>

      </div>
    </div>
  );
};
