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
    timeline,
    setTimeline,
    budget,
    setBudget,
    name,
    setName,
    contact,
    setContact,
  } = useFormContext();

  const filteredFeatures = additionalFeatures.filter(
    (feature) =>
      feature.compatibleWith.includes("all") ||
      feature.compatibleWith.includes(selectedProject || "")
  );

  const selectedProjectData = projectTypes.find((p) => p.id === selectedProject);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    alert("Terima kasih! Estimasi proyek Anda telah berhasil dikirim.");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full space-y-8">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-xs sm:text-sm font-medium text-slate-400">
          <span className={`px-3 py-1 rounded-full transition-colors ${step === 1 ? "bg-blue-600 text-white font-semibold" : "bg-slate-800 text-slate-400"}`}>
            Langkah 1: Jenis Proyek
          </span>
          <span>&rarr;</span>
          <span className={`px-3 py-1 rounded-full transition-colors ${step === 2 ? "bg-blue-600 text-white font-semibold" : "bg-slate-800 text-slate-400"}`}>
            Langkah 2: Fitur Tambahan
          </span>
          <span>&rarr;</span>
          <span className={`px-3 py-1 rounded-full transition-colors ${step === 3 ? "bg-blue-600 text-white font-semibold" : "bg-slate-800 text-slate-400"}`}>
            Langkah 3: Detail & Kontak
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
                  onClick={() => {
                    setSelectedProject(project.id);
                    setTimeout(() => {
                      setStep(2);
                    }, 300);
                  }}
                />
              ))}
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
              {selectedProjectData && (
                <div className="pt-2 flex justify-center">
                  <span className="px-4 py-2 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium border border-blue-800/50">
                    Proyek Terpilih: <strong className="text-white ml-1">{selectedProjectData.title}</strong>
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFeatures.map((feature) => (
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
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-lg font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all duration-200 cursor-pointer"
              >
                &larr; Kembali
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 cursor-pointer"
              >
                Lanjutkan &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Closing & Lead Capture */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-800">
            <div className="text-center space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Estimasi Proyek & Data Kontak
              </h1>
              <p className="text-slate-400 text-base max-w-2xl mx-auto">
                Lengkapi detail singkat ini agar kami dapat memberikan penawaran dan estimasi terbaik untuk Anda.
              </p>
              {selectedProjectData && (
                <div className="pt-2 flex justify-center flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-xs font-medium border border-blue-800/50">
                    Proyek: <strong className="text-white ml-1">{selectedProjectData.title}</strong>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                    {selectedFeatures.length} Fitur Dipilih
                  </span>
                </div>
              )}
            </div>

            {/* Bagian A: Estimasi Waktu (Timeline) */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-200">
                Estimasi Waktu Pengerjaan
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "relaxed", label: "Santai (> 1 Bulan)" },
                  { id: "normal", label: "Normal (2-4 Minggu)" },
                  { id: "asap", label: "ASAP (Butuh Cepat)" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTimeline(item.id)}
                    className={`p-4 rounded-xl border text-sm font-medium transition-all text-center cursor-pointer ${
                      timeline === item.id
                        ? "border-blue-500 bg-blue-900/30 text-white ring-2 ring-blue-500/50"
                        : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bagian B: Estimasi Investasi (Budget) */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-200">
                Estimasi Alokasi Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all cursor-pointer"
              >
                <option value="" disabled>Pilih rentang budget...</option>
                <option value="under-5m">Di bawah Rp 5 Juta</option>
                <option value="5m-15m">Rp 5 Juta - Rp 15 Juta</option>
                <option value="above-15m">Di atas Rp 15 Juta</option>
              </select>
            </div>

            {/* Bagian C: Data Kontak (Minimalis) */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <h3 className="text-sm font-semibold text-slate-200">
                Informasi Kontak Anda
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Nama Anda *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-slate-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Nomor WhatsApp / Email *</label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Contoh: 081234567890 / budi@email.com"
                    className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-slate-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Tombol Final (Call to Action) */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all duration-200 cursor-pointer text-center"
              >
                &larr; Kembali
              </button>
              <button
                type="submit"
                disabled={!name.trim() || !contact.trim()}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold transition-all duration-200 text-center ${
                  name.trim() && contact.trim()
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 cursor-pointer hover:scale-[1.02]"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                }`}
              >
                Dapatkan Estimasi Proyek 🚀
              </button>
            </div>
          </form>
        )}

      </div>
    </main>
  );
}
