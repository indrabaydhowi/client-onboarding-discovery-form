"use client";

import React from 'react';

import { projectTypes, additionalFeatures } from '@/config/onboardingData';
import { dummyPrices, whyChooseMe, dummyTestimonials, dummyStats, SHOW_DUMMY_WATERMARK } from '@/config/dummyData';
import ProjectCard from '@/components/ui/ProjectCard';
import FeatureCard from '@/components/ui/FeatureCard';
import { useFormContext } from '@/context/FormContext';
import { CheckCircle2, Sparkles, MessageCircle, ArrowRight, ShieldCheck, Users, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Users,
  Settings,
  MessageCircle,
};

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
    additionalNotes,
    setAdditionalNotes,
    isWizardStarted,
    setIsWizardStarted,
    isSubmitted,
    setIsSubmitted,
    resetForm,
  } = useFormContext();

  const [errors, setErrors] = React.useState<{ name?: string; contact?: string; consent?: string }>({});
  const [honeypot, setHoneypot] = React.useState("");
  const [consent, setConsent] = React.useState(false);

  const filteredFeatures = additionalFeatures.filter(
    (feature) =>
      feature.compatibleWith.includes("all") ||
      feature.compatibleWith.includes(selectedProject || "")
  );

  const selectedProjectData = projectTypes.find((p) => p.id === selectedProject);

  const validateForm = () => {
    const newErrors: { name?: string; contact?: string; consent?: string } = {};
    
    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Nama minimal 2 karakter";
    }
    
    const contactStr = contact.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactStr);
    const isWA = /^(\+62|62|0)8[0-9]{8,11}$/.test(contactStr);
    
    if (!contactStr) {
      newErrors.contact = "Kontak wajib diisi";
    } else if (!isEmail && !isWA) {
      newErrors.contact = "Gunakan email atau nomor WA valid (10-13 digit)";
    }

    if (!consent) {
      newErrors.consent = "Wajib disetujui untuk melanjutkan";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Spam protection
    if (validateForm()) {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

    let notesText = "";
    if (additionalNotes.trim()) {
      notesText = `• *Catatan Tambahan:*\n_${additionalNotes}_\n\n`;
    }

    const message = `Halo, saya *${clientName}*. Saya baru saja mengajukan estimasi proyek melalui website.\n\n` +
                    `• *Jenis Proyek:* ${projectName}\n` +
                    `• *Fitur Tambahan:* ${featuresList}\n` +
                    `• *Timeline:* ${clientTimeline}\n\n` +
                    notesText +
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

  if (!isWizardStarted) {
    return (
      <main className="min-h-screen text-stone-800 pb-20">
        {/* HERO SECTION */}
        <section className="pt-24 pb-20 px-5 sm:px-8 max-w-5xl mx-auto text-center space-y-12">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.1] mx-auto max-w-4xl font-display">
              Website yang Bukan Cuma Bagus Dilihat, Tapi <span className="text-amber-600">Bekerja untuk Bisnis Anda</span>
            </h1>
            <p className="text-lg sm:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed">
              Dari landing page yang mengonversi sampai sistem manajemen data yang rumit — saya bantu wujudkan aplikasi web Anda dengan proses yang jelas, transparan, dan tanpa drama.
            </p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="space-y-4">
            <button 
              onClick={() => setIsWizardStarted(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-600/20 transition-all hover:scale-105 active:scale-95"
            >
              Mulai Proyek Anda <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-stone-400 font-medium tracking-wide block">
              Tanpa komitmen — isi kebutuhan Anda dulu, estimasi biaya dikirim privat dalam 1×24 jam.
            </p>
          </motion.div>

          {/* Visual Hero Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4, duration: 0.7, type: "spring", stiffness: 100 }}
            className="w-full max-w-4xl mx-auto mt-12 hidden sm:block relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/40 via-transparent to-stone-200/40 blur-3xl -z-10 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
            <div className="rounded-xl overflow-hidden border border-stone-200/80 shadow-2xl bg-white flex flex-col">
              {/* Browser Header */}
              <div className="bg-stone-50 border-b border-stone-200 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-stone-300"></div>
                <div className="w-3 h-3 rounded-full bg-stone-300"></div>
                <div className="w-3 h-3 rounded-full bg-stone-300"></div>
                <div className="mx-auto w-1/3 h-5 bg-stone-200/70 rounded-md"></div>
              </div>
              {/* Browser Content (Wireframe) */}
              <div className="h-64 sm:h-80 lg:h-96 bg-stone-100 p-8 flex flex-col gap-6 relative overflow-hidden">
                <div className="w-1/2 h-8 bg-stone-200 rounded-lg"></div>
                <div className="w-3/4 h-4 bg-stone-200 rounded"></div>
                <div className="w-2/3 h-4 bg-stone-200 rounded"></div>
                <div className="mt-auto grid grid-cols-3 gap-4">
                  <div className="h-24 bg-white rounded-lg border border-stone-200 shadow-sm"></div>
                  <div className="h-24 bg-white rounded-lg border border-stone-200 shadow-sm"></div>
                  <div className="h-24 bg-white rounded-lg border border-stone-200 shadow-sm"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-100 via-transparent to-transparent z-10"></div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* STATS BAR */}
        <section className="border-y border-stone-200/60 bg-white relative">
          {SHOW_DUMMY_WATERMARK && (
            <div className="absolute top-4 left-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border border-red-200 z-20 uppercase shadow-sm">
              ⚠️ Dummy
            </div>
          )}
          <div className="max-w-4xl mx-auto px-5 py-8 grid grid-cols-3 divide-x divide-stone-100 text-center relative z-10">
            {dummyStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-stone-900">{stat.value}</span>
                <span className="text-[10px] sm:text-xs text-stone-500 font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-20 px-5 sm:px-8 max-w-6xl mx-auto space-y-10 relative">
          {SHOW_DUMMY_WATERMARK && (
            <div className="absolute top-4 right-4 bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest border border-red-200 z-20 uppercase shadow-sm">
              ⚠️ Contoh Tampilan / Dummy Data
            </div>
          )}
          <div className="text-center space-y-3 relative z-10">
            <h2 className="text-3xl font-bold text-stone-900 tracking-tight font-display">Layanan yang Tersedia</h2>
            <p className="text-stone-500">Pilih dari layanan inti ini, dan sesuaikan dengan kebutuhan Anda nanti.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projectTypes.map((project) => (
              <div key={project.id} className="relative rounded-2xl p-6 bg-white border border-stone-200/80 shadow-sm flex flex-col h-full hover:border-amber-300 transition-colors">
                <div className="space-y-4 flex-grow">
                  <h3 className="text-lg font-bold text-stone-900 font-display">{project.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{project.description}</p>
                </div>
                <div className="pt-6 mt-auto flex flex-wrap items-center gap-2">
                  <span className="inline-flex px-3 py-1 bg-amber-50 text-amber-950 text-xs font-semibold rounded-md border border-amber-200/60">
                    {dummyPrices[project.id]}
                  </span>
                  {SHOW_DUMMY_WATERMARK && (
                    <span className="inline-flex px-2 py-0.5 bg-red-100 text-red-600 text-[9px] font-bold tracking-widest border border-red-200 uppercase rounded-sm shadow-sm">
                      DUMMY
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE ME */}
        <section className="py-20 px-5 sm:px-8 bg-stone-900 text-stone-50">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white font-display">Kenapa Memilih Saya</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
              {whyChooseMe.map((item, i) => {
                const Icon = iconMap[item.icon] || CheckCircle2;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 p-3 bg-stone-800 rounded-xl h-fit">
                      <Icon className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white font-display">{item.title}</h3>
                      <p className="text-stone-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* PROJECTS / SOCIAL PROOF */}
        <section id="projects" className="py-24 px-5 sm:px-8 max-w-6xl mx-auto space-y-12 relative">
          {SHOW_DUMMY_WATERMARK && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest border border-red-200 z-20 uppercase shadow-sm">
              ⚠️ Contoh Tampilan / Dummy Data
            </div>
          )}
          <div className="text-center space-y-3 relative z-10">
            <h2 className="text-3xl font-bold text-stone-900 tracking-tight font-display">Beberapa Proyek yang Sudah Saya Kerjakan</h2>
            <p className="text-stone-500">Hasil kolaborasi dengan klien-klien luar biasa.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {dummyTestimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col h-full space-y-6 relative">
                <span className="text-6xl text-stone-100 absolute top-4 right-6 font-serif leading-none">"</span>
                <p className="text-stone-600 text-sm leading-relaxed italic relative z-10 flex-grow">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-stone-100">
                  <p className="font-bold text-stone-900 text-sm font-display">{t.author}</p>
                  <p className="text-xs text-stone-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-8 text-center relative z-10">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsWizardStarted(true);
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-md shadow-amber-600/20 transition-all hover:scale-105 active:scale-95"
            >
              Mulai Proyek Anda Sekarang <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#FAF9F5] text-stone-800 py-12 px-5 sm:px-8 lg:px-10 flex flex-col items-center justify-start relative overflow-hidden">
      
      <div className="max-w-4xl w-full space-y-10 relative z-10 pt-4">
        
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
                <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-tight font-display">
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
                    <Sparkles className="w-4 h-4 text-amber-500" strokeWidth={1.5} /> Ringkasan
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

                  <div className="sm:col-span-2 pt-4 border-t border-stone-100 flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-stone-500 bg-stone-50 p-3 rounded-lg border border-stone-100">
                      <div className="flex items-center gap-1.5 mb-1 sm:mb-0">
                        <span className="uppercase tracking-wider font-medium text-[10px]">Nama:</span> 
                        <span className="text-stone-800 font-medium text-sm">{name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="uppercase tracking-wider font-medium text-[10px]">Kontak:</span> 
                        <span className="text-stone-800 font-medium text-sm">{contact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-col items-center gap-3">
                <motion.button
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white text-sm shadow-md transition-all duration-200 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={1.5} /> Hubungi via WhatsApp
                </motion.button>
                
                <div className="pt-8 w-full max-w-sm space-y-3">
                  <p className="text-xs text-stone-400 text-center font-medium">Sambil menunggu, boleh mampir dulu ke halaman lain 👇</p>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => {
                        resetForm();
                        setTimeout(() => {
                          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="w-full px-5 py-2.5 rounded-lg text-sm font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors border border-amber-200/60"
                    >
                      Lihat Proyek Lainnya &rarr;
                    </button>
                    <button 
                      onClick={() => {
                        resetForm();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full px-5 py-2.5 rounded-lg text-sm font-semibold text-stone-600 bg-white hover:bg-stone-50 transition-colors border border-stone-200/80"
                    >
                      &larr; Kembali ke Beranda
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

          ) : step === 1 ? (
            <motion.div
              key="step-1"
              {...pageTransition}
              className="space-y-10 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-200 via-amber-400 to-stone-200"></div>
              <div className="text-center space-y-3 max-w-lg mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display">
                  Apa jenis proyek yang Anda butuhkan?
                </h2>
                <p className="text-stone-500">
                  Pilih salah satu yang paling mendekati, kita bisa sesuaikan detailnya nanti.
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
              className="space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-stone-200"></div>
              <div className="text-center space-y-3 max-w-lg mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display">
                  Fitur apa saja yang Anda perlukan?
                </h2>
                <p className="text-stone-500">
                  Centang fitur yang relevan. Lewati saja kalau belum yakin — kita bisa diskusikan nanti.
                </p>
                {selectedProjectData && (
                  <div className="pt-1 flex flex-wrap justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50/80 text-amber-800 text-xs font-medium border border-amber-200/70">
                      {selectedProjectData.title}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedFeatures.length > 0 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-stone-50 text-stone-500 border-stone-200"}`}>
                      {selectedFeatures.length} fitur dipilih
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
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display">
                    Satu langkah lagi
                  </h2>
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
                    Kapan idealnya proyek ini selesai? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "asap", label: "ASAP", sub: "Mendesak" },
                      { id: "normal", label: "2–4 Minggu", sub: "Standar" },
                      { id: "relaxed", label: "1–2 Bulan", sub: "Fleksibel" },
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTimeline(item.id)}
                        className={`relative p-3.5 rounded-xl border text-center cursor-pointer transition-all duration-300 ease-out overflow-hidden ${
                          timeline === item.id
                            ? "border-amber-500/80 bg-amber-50/50 ring-1 ring-amber-200/50"
                            : "border-stone-200/80 bg-white hover:border-stone-300 hover:bg-stone-50/50"
                        }`}
                      >
                        <div className={`absolute top-2.5 right-2.5 w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${timeline === item.id ? "border-amber-600 bg-amber-600" : "border-stone-300"}`}>
                           {timeline === item.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className={`text-sm font-medium block mt-1 ${timeline === item.id ? "text-stone-900" : "text-stone-700"}`}>
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
                  
                  {/* Honeypot field (hidden) */}
                  <div className="absolute opacity-0 -z-10 overflow-hidden w-0 h-0">
                    <label htmlFor="website_url">Website URL</label>
                    <input type="text" id="website_url" name="website_url" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-600 mb-1.5">Nama <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({...errors, name: undefined});
                        }}
                        placeholder="Cth: Budi Santoso"
                        className={`w-full px-4 py-3 rounded-xl bg-stone-50/80 border text-stone-800 text-sm focus:outline-none focus:ring-2 focus:bg-white placeholder-stone-400 transition-all duration-200 ${
                          errors.name ? "border-red-300 focus:border-red-400 focus:ring-red-500/20" : "border-stone-200 focus:border-amber-400 focus:ring-amber-500/40"
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-600 mb-1.5">WhatsApp / Email <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={contact}
                        onChange={(e) => {
                          setContact(e.target.value);
                          if (errors.contact) setErrors({...errors, contact: undefined});
                        }}
                        placeholder="Cth: 0812xxx / budi@email.com"
                        className={`w-full px-4 py-3 rounded-xl bg-stone-50/80 border text-stone-800 text-sm focus:outline-none focus:ring-2 focus:bg-white placeholder-stone-400 transition-all duration-200 ${
                          errors.contact ? "border-red-300 focus:border-red-400 focus:ring-red-500/20" : "border-stone-200 focus:border-amber-400 focus:ring-amber-500/40"
                        }`}
                      />
                      {errors.contact && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.contact}</p>}
                    </div>
                  </div>
                  
                  {/* Additional Notes */}
                  <div className="pt-2">
                    <label className="block text-xs font-medium text-stone-600 mb-1.5">Catatan tambahan (opsional)</label>
                    <textarea
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Ceritakan kebutuhan spesifik Anda di luar yang sudah dipilih..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50/80 border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 focus:bg-white placeholder-stone-300 transition-all duration-200 resize-y"
                    ></textarea>
                  </div>
                  
                  {/* Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input 
                          type="checkbox" 
                          className="peer sr-only" 
                          checked={consent}
                          onChange={(e) => {
                            setConsent(e.target.checked);
                            if (errors.consent) setErrors({...errors, consent: undefined});
                          }}
                        />
                        <div className={`w-4 h-4 rounded border transition-colors ${consent ? "bg-amber-600 border-amber-600" : "bg-white border-stone-300 group-hover:border-amber-400"}`}>
                          {consent && (
                            <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-stone-600 leading-relaxed">
                          Saya setuju data ini digunakan untuk keperluan penawaran proyek sesuai dengan <a href="#" className="text-amber-700 hover:underline font-medium" onClick={(e) => { e.preventDefault(); alert("Kebijakan privasi akan ditampilkan di sini."); }}>Kebijakan Privasi</a>.
                        </span>
                        {errors.consent && <span className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.consent}</span>}
                      </div>
                    </label>
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
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-center bg-amber-600 hover:bg-amber-700 text-white shadow-sm cursor-pointer"
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
