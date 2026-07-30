import React from 'react';
import * as Icons from 'lucide-react';

/**
 * Komponen visual kartu jenis proyek.
 * 
 * @param {Object} props
 * @param {string} props.title - Judul jenis proyek
 * @param {string} props.description - Deskripsi singkat jenis proyek
 * @param {string} props.iconName - Nama ikon dari Lucide Icons
 */
export default function ProjectCard({ title, description, iconName }) {
  // Mendapatkan komponen ikon Lucide secara dinamis berdasarkan nama
  const IconComponent = Icons[iconName] || Icons.HelpCircle;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col gap-4 text-left">
      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg w-fit">
        <IconComponent className="w-6 h-6" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
