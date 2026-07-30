"use client";

import { projectTypes, additionalFeatures } from '@/config/onboardingData';
import ProjectCard from '@/components/ui/ProjectCard';
import FeatureCard from '@/components/ui/FeatureCard';
import { useFormContext } from '@/context/FormContext';
import { CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HomePage Component
 * Menampilkan form multi-step untuk onboarding & project discovery dengan animasi Framer Motion.
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
    name,
    setName,
    contact,
    setContact,
    isSubmitted,
    setIsSubmitted,
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
    setIsSubmitted(true);
  };

  const getTimelineLabel = (id: string) => {
    switch (id) {
      case "relaxed":
        return "Santai (1-2 Bulan)";
      case "normal":
        return "Normal (2-4 Minggu)";
      case "asap":
        return "Butuh Cepat / ASAP";
      default:
        return "Belum ditentukan";
    }
  };

  const handleWhatsAppClick = () => {
    const projectName = selectedProjectData?.title || "Kustom Web";
    const featureNames = selectedFeatures.map((id) => {
      const feat = additionalFeatures.find((f) => f.id === id);
      return feat?.title || id;
    });
    const featuresList = featureNames.length > 0 ? featureNames.join(", ") : "Tidak ada";
    const clientName = name || "Klien";
    const clientTimeline = getTimelineLabel(timeline);

    const message = `Halo, saya *${clientName}*. Saya baru saja mengajukan estimasi proyek melalui website.\n\n` +
                    `• *Jenis Proyek:* ${projectName}\n` +
                    `• *Fitur Tambahan:* ${featuresList}\n` +
                    `• *Timeline:* ${clientTimeline}\n\n` +
                    `Mohon informasikan estimasi rincian biaya dan kelanjutannya. Terima kasih!`;

    const phoneNumber = "6281234567890";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl w-full space-y-8 relative z-10">
        
        {/* Dynamic Progress Indicator & Step Badges */}
        {!isSubmitted && (
          <div className="space-y-4 max-w-xl mx-auto">
            {/* Animated Progress Bar */}
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800/80 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 rounded-full"
                initial={{ width: "33.33%" }}
                animate={{
                  width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%",
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Step Badges */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-xs sm:text-sm font-medium text-slate-400">
              <motion.span
                animate={{ scale: step === 1 ? 1.04 : 1 }}
                className={`px-3 py-1 rounded-full transition-colors duration-300 ${
                  step === 1
                    ? "bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30"
                    : step > 1
                    ? "bg-blue-950/60 text-blue-400 border border-blue-800/50"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                Langkah 1: Jenis Proyek
              </motion.span>
              <span className="text-slate-600">&rarr;</span>
              <motion.span
                animate={{ scale: step === 2 ? 1.04 : 1 }}
                className={`px-3 py-1 rounded-full transition-colors duration-300 ${
                  step === 2
                    ? "bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30"
                    : step > 2
                    ? "bg-blue-950/60 text-blue-400 border border-blue-800/50"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                Langkah 2: Fitur Tambahan
              </motion.span>
              <span className="text-slate-600">&rarr;</span>
              <motion.span
                animate={{ scale: step === 3 ? 1.04 : 1 }}
                className={`px-3 py-1 rounded-full transition-colors duration-300 ${
                  step === 3
                    ? "bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                Langkah 3: Detail & Kontak
              </motion.span>
            </div>
          </div>
        )}

        {/* Animated Container for Smooth Step Transitions */}
        <AnimatePresence mode="wait">
          {/* SUCCESS CONFIRMATION SCREEN */}
          {isSubmitted ? (
            <motion.div
              key="success-screen"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 max-w-2xl mx-auto text-center py-4"
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 shadow-lg shadow-emerald-500/10"
                >
                  <CheckCircle2 className="w-14 h-14" />
                </motion.div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Permintaan Proyek Berhasil Dikirim!
                </h1>
                <p className="text-slate-300 text-base max-w-lg leading-relaxed">
                  Terima kasih <strong className="text-white">{name}</strong>. Tim kami sedang memproses rincian fitur untuk proyek <strong className="text-blue-400">{selectedProjectData?.title || "Website"}</strong> Anda. Proposal resmi dan estimasi harga akan segera kami kirimkan ke kontak Anda dalam 1x24 jam.
                </p>
              </div>

              {/* Response Summary Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-left space-y-6 shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" /> Ringkasan Pengajuan Proyek
                  </h2>
                  <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-semibold rounded-full border border-emerald-500/30">
                    Status: Terverifikasi
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div>
                    <span className="text-xs text-slate-400 font-medium block mb-1">Jenis Proyek</span>
                    <p className="text-white font-semibold text-base">{selectedProjectData?.title || "-"}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{selectedProjectData?.description}</p>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 font-medium block mb-1">Target Waktu</span>
                    <p className="text-white font-semibold text-base">{getTimelineLabel(timeline)}</p>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-xs text-slate-400 font-medium block mb-2">
                      Fitur Tambahan Terpilih ({selectedFeatures.length})
                    </span>
                    {selectedFeatures.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedFeatures.map((featureId) => {
                          const feat = additionalFeatures.find((f) => f.id === featureId);
                          return (
                            <span
                              key={featureId}
                              className="px-3 py-1.5 bg-blue-950/60 border border-blue-800/60 text-blue-300 text-xs font-medium rounded-lg"
                            >
                              {feat?.title || featureId}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-xs italic">Tidak ada fitur tambahan khusus yang dipilih.</p>
                    )}
                  </div>

                  <div className="sm:col-span-2 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between text-xs text-slate-400 gap-2">
                    <div>
                      <span>Nama Klien: </span>
                      <strong className="text-slate-200">{name}</strong>
                    </div>
                    <div>
                      <span>Kontak Utama: </span>
                      <strong className="text-slate-200">{contact}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Consultation Action Button */}
              <div className="pt-2 flex justify-center">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleWhatsAppClick}
                  className="px-6 py-3.5 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-colors duration-200 flex items-center gap-2.5 text-sm cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" /> Konsultasi Langsung via WhatsApp
                </motion.button>
              </div>
            </motion.div>
          ) : step === 1 ? (
            /* STEP 1: Pilih Jenis Proyek */
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
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
            </motion.div>
          ) : step === 2 ? (
            /* STEP 2: Pilih Fitur Tambahan */
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
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
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-lg font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors duration-200 cursor-pointer"
                >
                  &larr; Kembali
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors duration-200 cursor-pointer"
                >
                  Lanjutkan &rarr;
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* STEP 3: Closing & Lead Capture */
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
                <div className="text-center space-y-3">
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                    Estimasi Waktu & Data Kontak
                  </h1>
                  <p className="text-slate-400 text-base max-w-2xl mx-auto">
                    Lengkapi detail singkat ini agar kami dapat menghitung dan mengirimkan penawaran estimasi secara privat.
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

                {/* Estimasi Waktu (Timeline) */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-200">
                    Estimasi Waktu Pengerjaan
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "relaxed", label: "Santai (1-2 Bulan)" },
                      { id: "normal", label: "Normal (2-4 Minggu)" },
                      { id: "asap", label: "Butuh Cepat / ASAP" },
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTimeline(item.id)}
                        className={`p-4 rounded-xl border text-sm font-medium transition-colors text-center cursor-pointer ${
                          timeline === item.id
                            ? "border-blue-500 bg-blue-900/30 text-white ring-2 ring-blue-500/50"
                            : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:bg-slate-800"
                        }`}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Informasi Kontak */}
                <div className="space-y-4 pt-2 border-t border-slate-800">
                  <h3 className="text-sm font-semibold text-slate-200">
                    Informasi Kontak
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
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors duration-200 cursor-pointer text-center"
                  >
                    &larr; Kembali
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={name.trim() && contact.trim() ? { scale: 1.02 } : {}}
                    whileTap={name.trim() && contact.trim() ? { scale: 0.98 } : {}}
                    disabled={!name.trim() || !contact.trim()}
                    className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold transition-all duration-200 text-center ${
                      name.trim() && contact.trim()
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 cursor-pointer"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                    }`}
                  >
                    Kirim Permintaan Estimasi 🚀
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
