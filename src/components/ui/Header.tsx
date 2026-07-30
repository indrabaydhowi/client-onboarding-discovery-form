"use client";

import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { ArrowLeft } from 'lucide-react';
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
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => {
            if (isWizardStarted) {
              handleReturnHome();
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-xl leading-none">
              <span className="text-stone-800 font-display">Tukang</span><span className="text-amber-600 font-display">Web</span>
            </span>
            <span className="text-xs text-stone-600 font-medium tracking-wide mt-1 hidden sm:block">Website yang Beneran Kerja</span>
          </div>
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
