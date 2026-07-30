"use client";

import { projectTypes, additionalFeatures } from '@/config/onboardingData';
import ProjectCard from '@/components/ui/ProjectCard';
import FeatureCard from '@/components/ui/FeatureCard';
import { useFormContext } from '@/context/FormContext';

/**
 * HomePage Component
 * Menampilkan form multi-step untuk onboarding & project discovery.
 */
export default function HomePage() {
  const {
    selectedProject,
    setSelectedProject,
    step,
    setStep,
    selectedFeatures,
    toggleFeature,
  } = useFormContext();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full space-y-8">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-4 text-sm font-medium text-slate-400">
          <span className={`px-3 py-1 rounded-full transition-colors ${step === 1 ? "bg-blue-600 text-white font-semibold" : "bg-slate-800 text-slate-400"}`}>
            Langkah 1: Jenis Proyek
          </span>
          <span>&rarr;</span>
          <span className={`px-3 py-1 rounded-full transition-colors ${step === 2 ? "bg-blue-600 text-white font-semibold" : "bg-slate-800 text-slate-400"}`}>
            Langkah 2: Fitur Tambahan
          </span>
        </div>

        {/* STEP 1: Pilih Jenis Proyek */}
        {step === 1 && (
          <div className="space-y-8">
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

            <div className="flex justify-end pt-4">
              <button
                disabled={!selectedProject}
                onClick={() => setStep(2)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  selectedProject
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg cursor-pointer"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                }`}
              >
                Lanjutkan &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Pilih Fitur Tambahan */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Pilih Fitur Tambahan
              </h1>
              <p className="text-slate-400 text-base max-w-2xl mx-auto">
                Pilih fitur pendukung yang Anda butuhkan untuk mengoptimalkan proyek web Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalFeatures.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  iconName={feature.icon}
                  isSelected={selectedFeatures.includes(feature.id)}
                  onClick={() => toggleFeature(feature.id)}
                />
              ))}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-lg font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all duration-200 cursor-pointer"
              >
                &larr; Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 cursor-pointer"
              >
                Lanjutkan &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 Placeholder */}
        {step >= 3 && (
          <div className="space-y-8 text-center py-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Langkah Selanjutnya
            </h1>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              Langkah 3 sedang dalam pengembangan.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-lg font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all duration-200 cursor-pointer"
              >
                &larr; Kembali ke Langkah 2
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
