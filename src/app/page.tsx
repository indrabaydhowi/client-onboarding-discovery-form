"use client";

import React from 'react';

import { projectTypes, additionalFeatures } from '@/config/onboardingData';
import ProjectCard from '@/components/ui/ProjectCard';
import FeatureCard from '@/components/ui/FeatureCard';
import { useFormContext } from '@/context/FormContext';
import { CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        return "Santai (1–2 Bulan)";
      case "normal":
        return "Normal (2–4 Minggu)";
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

  const pageTransition = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  };

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-stone-800 py-16 px-5 sm:px-8 lg:px-10 flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="max-w-4xl w-full space-y-10 relative z-10">
        
        {/* Progress — clean and minimal */}
        {!isSubmitted && (
          <div className="space-y-5 max-w-md mx-auto">
            <div className="w-full bg-stone-200/60 h-1.5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-amber-500 rounded-full"
                initial={{ width: "33.33%" }}
                animate={{
                  width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%",
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs font-medium">
              {[
                { n: 1, label: "Jenis Proyek" },
                { n: 2, label: "Fitur" },
                { n: 3, label: "Detail" },
              ].map((s, i) => (
                <React.Fragment key={s.n}>
                  {i > 0 && <span className="text-stone-300 text-[10px]">—</span>}
                  <span
                    className={`px-2.5 py-1 rounded-full transition-all duration-300 ${
                      step === s.n
                        ? "bg-amber-600 text-white font-medium"
                        : step > s.n
                        ? "bg-amber-100/80 text-amber-800"
                        : "bg-stone-100 text-stone-400"
                    }`}
                  >
                    {s.n}. {s.label}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              {...pageTransition}
              className="max-w-xl mx-auto text-center py-6 space-y-10"
            >
              <div className="space-y-5">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 250, damping: 22, delay: 0.08 }}
                  className="inline-flex p-4 bg-emerald-50 text-emerald-600 rounded-full"
                >
                  <CheckCircle2 className="w-12 h-12" strokeWidth={1.5} />
                </motion.div>
                <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-tight">
                  Permintaan proyek Anda sudah kami terima
                </h1>
                <p className="text-stone-500 text-[15px] max-w-md mx-auto leading-relaxed">
                  Terima kasih, <span className="font-medium text-stone-700">{name}</span>. Tim kami akan mempelajari kebutuhan proyek <span className="font-medium text-amber-700">{selectedProjectData?.title || "Website"}</span> Anda dan mengirimkan proposal estimasi ke kontak Anda dalam waktu 1×24 jam.
                </p>
              </div>

              {/* Summary card */}
              <div className="bg-white border border-stone-200/80 rounded-2xl p-6 text-left shadow-sm">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-5">
                  <h2 className="text-sm font-semibold text-stone-800 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Ringkasan
                  </h2>
                  <span className="text-[11px] px-2 py-0.5 bg-emerald-50 text-emerald-700 font-medium rounded-full">
                    Terkirim
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium block mb-1">Proyek</span>
                    <p className="text-stone-800 font-medium">{selectedProjectData?.title || "-"}</p>
                    <p className="text-stone-400 text-xs mt-0.5">{selectedProjectData?.description}</p>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium block mb-1">Timeline</span>
                    <p className="text-stone-800 font-medium">{getTimelineLabel(timeline)}</p>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium block mb-2">
                      Fitur ({selectedFeatures.length})
                    </span>
                    {selectedFeatures.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {selectedFeatures.map((featureId) => {
                          const feat = additionalFeatures.find((f) => f.id === featureId);
                          return (
                            <span
                              key={featureId}
                              className="px-2.5 py-1 bg-stone-50 border border-stone-200/80 text-stone-700 text-xs rounded-md font-normal"
                            >
                              {feat?.title || featureId}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-stone-400 text-xs">Tidak ada fitur tambahan.</p>
                    )}
                  </div>

                  <div className="sm:col-span-2 pt-4 border-t border-stone-100 flex flex-col sm:flex-row justify-between text-xs text-stone-500 gap-1.5">
                    <span>Nama: <span className="text-stone-700 font-medium">{name}</span></span>
                    <span>Kontak: <span className="text-stone-700 font-medium">{contact}</span></span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <motion.button
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium bg-emerald-600 hover:bg-emerald-700 text-white text-sm shadow-sm transition-colors duration-200 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={2} /> Hubungi via WhatsApp
                </motion.button>
              </div>
            </motion.div>

          ) : step === 1 ? (
            <motion.div
              key="step-1"
              {...pageTransition}
              className="space-y-10"
            >
              <div className="text-center space-y-3 max-w-lg mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                  Mulai dari sini
                </h1>
                <p className="text-stone-500 text-[15px] leading-relaxed">
                  Pilih jenis proyek yang paling menggambarkan kebutuhan Anda. Nanti kita sesuaikan bersama.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {projectTypes.map((project) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    iconName={project.icon}
                    isSelected={selectedProject === project.id}
                    onClick={() => {
                      setSelectedProject(project.id);
                      setTimeout(() => setStep(2), 300);
                    }}
                  />
                ))}
              </div>
            </motion.div>

          ) : step === 2 ? (
            <motion.div
              key="step-2"
              {...pageTransition}
              className="space-y-8"
            >
              <div className="text-center space-y-3 max-w-lg mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                  Apa saja yang Anda butuhkan?
                </h1>
                <p className="text-stone-500 text-[15px] leading-relaxed">
                  Centang fitur yang relevan. Lewati saja kalau belum yakin — kita bisa diskusikan nanti.
                </p>
                {selectedProjectData && (
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50/80 text-amber-800 text-xs font-medium border border-amber-200/70">
                      {selectedProjectData.title}
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

              <div className="flex justify-between items-center pt-2">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium text-stone-600 hover:text-stone-800 hover:bg-stone-100 transition-colors duration-200 cursor-pointer"
                >
                  ← Kembali
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-colors duration-200 cursor-pointer"
                >
                  Lanjut →
                </motion.button>
              </div>
            </motion.div>

          ) : (
            <motion.div
              key="step-3"
              {...pageTransition}
            >
              <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm max-w-2xl mx-auto">
                <div className="text-center space-y-3">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                    Satu langkah lagi
                  </h1>
                  <p className="text-stone-500 text-[15px] leading-relaxed max-w-md mx-auto">
                    Beri tahu kami target waktu dan cara menghubungi Anda. Estimasi biaya akan kami kirimkan secara privat.
                  </p>
                  {selectedProjectData && (
                    <div className="pt-1 flex justify-center flex-wrap gap-2">
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-amber-50/80 text-amber-800 text-xs font-medium border border-amber-200/70">
                        {selectedProjectData.title}
                      </span>
                      {selectedFeatures.length > 0 && (
                        <span className="inline-flex px-2.5 py-1 rounded-full bg-stone-50 text-stone-600 text-xs font-medium border border-stone-200/80">
                          {selectedFeatures.length} fitur
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Timeline */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-stone-700">
                    Kapan idealnya proyek ini selesai?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "relaxed", label: "1–2 Bulan", sub: "Fleksibel" },
                      { id: "normal", label: "2–4 Minggu", sub: "Standar" },
                      { id: "asap", label: "ASAP", sub: "Mendesak" },
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTimeline(item.id)}
                        className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all duration-300 ease-out ${
                          timeline === item.id
                            ? "border-amber-500/80 bg-amber-50/50 ring-1 ring-amber-200/50"
                            : "border-stone-200/80 bg-white hover:border-stone-300 hover:bg-stone-50/50"
                        }`}
                      >
                        <span className={`text-sm font-medium block ${timeline === item.id ? "text-stone-900" : "text-stone-700"}`}>
                          {item.label}
                        </span>
                        <span className={`text-[11px] mt-0.5 block ${timeline === item.id ? "text-amber-700" : "text-stone-400"}`}>
                          {item.sub}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-4 pt-5 border-t border-stone-100">
                  <label className="block text-sm font-medium text-stone-700">
                    Bagaimana cara kami menghubungi Anda?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1.5">Nama</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Budi Santoso"
                        className="w-full px-4 py-3 rounded-xl bg-stone-50/80 border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 focus:bg-white placeholder-stone-300 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1.5">WhatsApp atau Email</label>
                      <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="081234567890"
                        className="w-full px-4 py-3 rounded-xl bg-stone-50/80 border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 focus:bg-white placeholder-stone-300 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-5 border-t border-stone-100">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-medium text-stone-600 hover:text-stone-800 hover:bg-stone-100 transition-colors duration-200 cursor-pointer text-center"
                  >
                    ← Kembali
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={name.trim() && contact.trim() ? { y: -1 } : {}}
                    whileTap={name.trim() && contact.trim() ? { scale: 0.98 } : {}}
                    disabled={!name.trim() || !contact.trim()}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-center ${
                      name.trim() && contact.trim()
                        ? "bg-amber-600 hover:bg-amber-700 text-white shadow-sm cursor-pointer"
                        : "bg-stone-100 text-stone-300 border border-stone-200 cursor-not-allowed"
                    }`}
                  >
                    Kirim permintaan
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
