"use client";

import { projectTypes } from '@/config/onboardingData';
import ProjectCard from '@/components/ui/ProjectCard';
import { useFormContext } from '@/context/FormContext';

/**
 * HomePage Component
 * Menampilkan grid kartu jenis proyek interaktif.
 */
export default function HomePage() {
  const { selectedProject, setSelectedProject } = useFormContext();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Pilih Jenis Proyek Anda
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Temukan solusi web development yang paling sesuai dengan kebutuhan bisnis atau organisasi Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectTypes.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              iconName={project.icon}
              isSelected={selectedProject === project.id}
              onClick={() => setSelectedProject(project.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
