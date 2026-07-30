import React from 'react';
import { Layout, Database, ShoppingCart, Globe, HelpCircle, LucideIcon } from 'lucide-react';

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
 * Komponen visual kartu jenis proyek.
 */
export default function ProjectCard({
  title,
  description,
  iconName,
  isSelected = false,
  onClick,
}: ProjectCardProps) {
  // Mendapatkan komponen ikon Lucide secara dinamis berdasarkan nama
  const IconComponent = iconMap[iconName] || HelpCircle;

  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col gap-4 text-left ${
        isSelected
          ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200 border"
          : "bg-white border border-slate-200"
      }`}
    >
      <div className={`p-3 rounded-lg w-fit ${isSelected ? "bg-blue-100 text-blue-600" : "bg-indigo-50 text-indigo-600"}`}>
        <IconComponent className="w-6 h-6" />
      </div>
      <div className="space-y-2">
        <h3 className={`text-xl font-bold ${isSelected ? "text-blue-950" : "text-slate-900"}`}>{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
