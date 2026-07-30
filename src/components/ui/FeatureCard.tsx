"use client";

import React from 'react';
import { Search, PenTool, MessageCircle, Settings, FileDown, Users, CreditCard, Package, Truck, Webhook, HelpCircle, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, LucideIcon> = {
  Search,
  PenTool,
  MessageCircle,
  Settings,
  FileDown,
  Users,
  CreditCard,
  Package,
  Truck,
  Webhook,
};

export interface FeatureCardProps {
  title: string;
  description: string;
  iconName: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function FeatureCard({
  title,
  description,
  iconName,
  isSelected = false,
  onClick,
}: FeatureCardProps) {
  const IconComponent = iconMap[iconName] || HelpCircle;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className={`relative rounded-xl p-4 cursor-pointer flex items-center gap-4 text-left select-none transition-all duration-300 ease-out ${
        isSelected
          ? "bg-white border-[1.5px] border-amber-500/80 shadow-md shadow-amber-100/60 ring-1 ring-amber-200/50"
          : "bg-white border border-stone-200/80 shadow-sm hover:shadow-md hover:shadow-stone-200/40 hover:border-stone-300"
      }`}
    >
      <div className={`absolute top-4 right-4 w-4 h-4 rounded-[4px] border-[1.5px] flex items-center justify-center transition-all duration-300 ease-out ${
        isSelected ? "border-amber-600 bg-amber-600" : "border-stone-300 bg-white"
      }`}>
        {isSelected && (
          <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
      </div>
      <div className={`p-2.5 rounded-xl flex-shrink-0 transition-colors duration-300 ease-out ${
        isSelected ? "bg-amber-50 text-amber-800" : "bg-stone-50 text-stone-500"
      }`}>
        <IconComponent className="w-5 h-5" strokeWidth={1.5} />
      </div>
      <div className="min-w-0">
        <h3 className={`text-[15px] font-semibold tracking-tight font-display transition-colors duration-300 ease-out ${
          isSelected ? "text-stone-900" : "text-stone-800"
        }`}>{title}</h3>
        <p className="text-stone-500 text-[13px] leading-snug font-normal mt-0.5">{description}</p>
      </div>
    </motion.div>
  );
}
