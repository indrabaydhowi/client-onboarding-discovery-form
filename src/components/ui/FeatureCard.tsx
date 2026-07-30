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

/**
 * Komponen visual kartu fitur tambahan dengan framer-motion micro-interactions.
 */
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
      whileHover={{ y: -2, scale: 1.005 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`rounded-xl p-5 shadow-sm hover:shadow-md transition-colors duration-200 cursor-pointer flex items-start gap-4 text-left select-none ${
        isSelected
          ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200 border"
          : "bg-white border border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className={`p-3 rounded-lg flex-shrink-0 transition-colors duration-200 ${isSelected ? "bg-blue-100 text-blue-600" : "bg-indigo-50 text-indigo-600"}`}>
        <IconComponent className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className={`text-lg font-bold transition-colors duration-200 ${isSelected ? "text-blue-950" : "text-slate-900"}`}>{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
