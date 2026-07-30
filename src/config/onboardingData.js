/**
 * Data konfigurasi statis untuk jenis proyek onboarding klien.
 */
export const projectTypes = [
  {
    id: "landing-page",
    title: "Landing Page",
    description: "Website satu halaman untuk promosi atau profil bisnis.",
    icon: "Layout",
  },
  {
    id: "company-profile",
    title: "Website Multipage",
    description: "Website Company Profile dengan beberapa halaman (Home, About, Services).",
    icon: "Globe",
  },
  {
    id: "data-management",
    title: "Manajemen Data",
    description: "Aplikasi web dengan dashboard untuk mengelola data internal.",
    icon: "Database",
  },
  {
    id: "e-commerce",
    title: "Toko Online",
    description: "Website lengkap dengan keranjang belanja dan pembayaran.",
    icon: "ShoppingCart",
  },
];

export const additionalFeatures = [
  { id: "seo-analytics", title: "SEO & Analytics", description: "Optimasi Google dan pelacakan statistik.", icon: "Search", compatibleWith: ["all"] },
  { id: "copywriting", title: "Copywriting", description: "Penulisan teks website profesional.", icon: "PenTool", compatibleWith: ["all"] },
  { id: "live-chat", title: "Live Chat / WhatsApp", description: "Tombol chat langsung untuk pengunjung.", icon: "MessageCircle", compatibleWith: ["landing-page", "company-profile", "e-commerce"] },
  { id: "cms", title: "Content Management", description: "Dashboard untuk mengubah teks dan gambar.", icon: "Settings", compatibleWith: ["landing-page", "company-profile"] },
  { id: "export-report", title: "Export Laporan", description: "Unduh data ke format PDF atau Excel.", icon: "FileDown", compatibleWith: ["data-management"] },
  { id: "role-access", title: "Login Bertingkat", description: "Akses berbeda untuk Admin, Manager, dll.", icon: "Users", compatibleWith: ["data-management"] },
  { id: "payment-gateway", title: "Payment Gateway", description: "Terima pembayaran otomatis (Transfer, e-Wallet).", icon: "CreditCard", compatibleWith: ["e-commerce"] },
  { id: "inventory", title: "Manajemen Stok", description: "Sistem pelacakan ketersediaan barang.", icon: "Package", compatibleWith: ["e-commerce"] }
];
