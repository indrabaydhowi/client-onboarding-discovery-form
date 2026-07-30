"use client";

import React from 'react';
import { Layout, Database, ShoppingCart, Globe, HelpCircle, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, LucideIcon> = {
  Layout,
  Database,
  ShoppingCart,
  Globe,
};

export interface ProjectCardProps {
  title: string;
  description: string;
  iconName: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function ProjectCard({
  title,
  description,
  iconName,
  isSelected = false,
  onClick,
}: ProjectCardProps) {
  const IconComponent = iconMap[iconName] || HelpCircle;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.975 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className={`rounded-2xl p-6 cursor-pointer flex flex-col gap-5 text-left select-none transition-all duration-300 ease-out ${
        isSelected
          ? "bg-white border-[1.5px] border-amber-500/80 shadow-md shadow-amber-100/60 ring-1 ring-amber-200/50"
          : "bg-white border border-stone-200/80 shadow-sm hover:shadow-md hover:shadow-stone-200/40 hover:border-stone-300"
      }`}
    >
      <div className={`p-2.5 rounded-xl w-fit transition-colors duration-300 ease-out ${
        isSelected ? "bg-amber-50 text-amber-700" : "bg-stone-50 text-stone-500"
      }`}>
        <IconComponent className="w-5 h-5" strokeWidth={1.8} />
      </div>
      <div className="space-y-1.5">
        <h3 className={`text-lg font-semibold tracking-tight transition-colors duration-300 ease-out ${
          isSelected ? "text-stone-900" : "text-stone-800"
        }`}>{title}</h3>
        <p className="text-stone-500 text-[13px] leading-relaxed font-normal">{description}</p>
      </div>
    </motion.div>
  );
}
