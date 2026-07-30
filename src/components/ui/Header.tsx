"use client";

import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Code2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const { isWizardStarted, setIsWizardStarted, resetForm } = useFormContext();

  const handleReturnHome = () => {
    resetForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full bg-[#FAF9F5]/80 backdrop-blur-md border-b border-stone-200/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 h-16 flex items-center justify-between">
        
        {/* Logo / Name */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => {
            if (isWizardStarted) {
              handleReturnHome();
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <div className="p-1.5 bg-amber-600 text-white rounded-lg group-hover:bg-amber-700 transition-colors">
            <Code2 className="w-4 h-4" strokeWidth={2} />
          </div>
          <span className="font-bold text-stone-900 tracking-tight">Antigravity Dev</span>
        </div>

        {/* Back to Home Button (Only show in wizard) */}
        {isWizardStarted && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            whileHover={{ x: -2 }}
            onClick={handleReturnHome}
            className="flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
            <span className="hidden sm:inline">Kembali ke Beranda</span>
            <span className="sm:hidden">Beranda</span>
          </motion.button>
        )}
      </div>
    </header>
  );
}
