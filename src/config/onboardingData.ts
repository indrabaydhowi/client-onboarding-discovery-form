/**
 * Static configuration data for Client Onboarding & Project Discovery Form.
 */

export interface ProjectTypeOption {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FeatureOption {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface AssetOption {
  id: string;
  label: string;
  options: {
    value: 'READY' | 'NEEDS_CREATION' | 'UNSURE';
    label: string;
  }[];
}

export interface BudgetOption {
  id: string;
  label: string;
}

export interface TimelineOption {
  id: string;
  label: string;
}

export const projectTypes: ProjectTypeOption[] = [
  {
    id: "landing-page",
    title: "Landing Page Singkat",
    description: "Halaman tunggal terfokus untuk promosi produk, event, atau perkenalan layanan.",
    iconName: "Layout",
  },
  {
    id: "company-profile",
    title: "Website Bisnis / Company Profile",
    description: "Website multi-halaman untuk membangun kredibilitas dan profil perusahaan.",
    iconName: "Building2",
  },
  {
    id: "ecommerce",
    title: "Toko Online / E-Commerce",
    description: "Website dengan katalog produk, keranjang belanja, dan sistem pembayaran.",
    iconName: "ShoppingBag",
  },
  {
    id: "custom-app",
    title: "Aplikasi Web Kustom",
    description: "Sistem web dengan kebutuhan khusus, portal pengguna, atau alur kerja kompleks.",
    iconName: "Code2",
  },
];

export const featureOptions: FeatureOption[] = [
  {
    id: "product-catalog",
    title: "Katalog Produk",
    description: "Tampilan daftar produk dengan pencarian dan filter.",
    category: "ecommerce",
  },
  {
    id: "payment-gateway",
    title: "Integrasi Pembayaran",
    description: "Dukungan mentransfer via Bank, QRIS, atau E-Wallet.",
    category: "ecommerce",
  },
  {
    id: "contact-form",
    title: "Formulir Kontak / Inquiry",
    description: "Form untuk pengunjung mengirimkan pesan langsung ke email/WhatsApp.",
    category: "general",
  },
  {
    id: "blog-news",
    title: "Blog & Berita",
    description: "Fasilitas publikasi artikel dan edukasi bagi calon klien.",
    category: "general",
  },
  {
    id: "gallery-portfolio",
    title: "Galeri / Portofolio",
    description: "Tampilan visual karya atau dokumentasi proyek lalu.",
    category: "general",
  },
];

export const assetQuestions: AssetOption[] = [
  {
    id: "logo",
    label: "Apakah Anda sudah memiliki logo resmi?",
    options: [
      { value: "READY", label: "Sudah Ada & Siap Pakai" },
      { value: "NEEDS_CREATION", label: "Belum Ada (Perlu Dibuatkan)" },
      { value: "UNSURE", label: "Belum Yakin" },
    ],
  },
  {
    id: "copywriting",
    label: "Bagaimana ketersediaan teks/konten website?",
    options: [
      { value: "READY", label: "Sudah Lengkap" },
      { value: "NEEDS_CREATION", label: "Perlu Bantuan Copywriting" },
      { value: "UNSURE", label: "Belum Siap" },
    ],
  },
  {
    id: "photography",
    label: "Bagaimana dengan gambar/foto pendukung?",
    options: [
      { value: "READY", label: "Sudah Memiliki Foto Sendiri" },
      { value: "NEEDS_CREATION", label: "Perlu Foto Stock / Desain Grafis" },
      { value: "UNSURE", label: "Belum Ada" },
    ],
  },
];

export const budgetRanges: BudgetOption[] = [
  { id: "budget-1", label: "Di bawah Rp 3.000.000" },
  { id: "budget-2", label: "Rp 3.000.000 – Rp 5.000.000" },
  { id: "budget-3", label: "Rp 5.000.000 – Rp 10.000.000" },
  { id: "budget-4", label: "Di atas Rp 10.000.000" },
];

export const timelineOptions: TimelineOption[] = [
  { id: "timeline-1", label: "Sangat Segera (< 2 Minggu)" },
  { id: "timeline-2", label: "1 – 2 Bulan" },
  { id: "timeline-3", label: "Lebih dari 2 Bulan" },
  { id: "timeline-4", label: "Fleksibel / Belum Ditentukan" },
];

export const onboardingData = {
  projectTypes,
  featureOptions,
  assetQuestions,
  budgetRanges,
  timelineOptions,
};
