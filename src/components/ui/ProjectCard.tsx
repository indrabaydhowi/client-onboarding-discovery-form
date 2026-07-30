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

/**
 * Komponen visual kartu jenis proyek dengan estetika Claude Desktop (Warm Cream & Amber).
 */
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
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`rounded-xl p-6 transition-all duration-200 cursor-pointer flex flex-col gap-4 text-left select-none ${
        isSelected
          ? "bg-[#FDF8F3] border-2 border-amber-600 ring-2 ring-amber-200/70 shadow-sm"
          : "bg-white border border-stone-200/90 shadow-sm hover:border-amber-300 hover:shadow-stone-200/60"
      }`}
    >
      <div className={`p-3 rounded-lg w-fit transition-colors duration-200 ${isSelected ? "bg-amber-100/90 text-amber-700" : "bg-stone-100 text-stone-700"}`}>
        <IconComponent className="w-6 h-6" />
      </div>
      <div className="space-y-2">
        <h3 className={`text-xl font-bold transition-colors duration-200 ${isSelected ? "text-amber-950" : "text-stone-900"}`}>{title}</h3>
        <p className="text-stone-600 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
