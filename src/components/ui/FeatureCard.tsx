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
 * Komponen visual kartu fitur tambahan dengan estetika Claude Desktop (Warm Cream & Amber).
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
      className={`rounded-xl p-5 transition-all duration-200 cursor-pointer flex items-start gap-4 text-left select-none ${
        isSelected
          ? "bg-[#FDF8F3] border-2 border-amber-600 ring-2 ring-amber-200/70 shadow-sm"
          : "bg-white border border-stone-200/90 shadow-sm hover:border-amber-300 hover:shadow-stone-200/60"
      }`}
    >
      <div className={`p-3 rounded-lg flex-shrink-0 transition-colors duration-200 ${isSelected ? "bg-amber-100/90 text-amber-700" : "bg-stone-100 text-stone-700"}`}>
        <IconComponent className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className={`text-lg font-bold transition-colors duration-200 ${isSelected ? "text-amber-950" : "text-stone-900"}`}>{title}</h3>
        <p className="text-stone-600 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
