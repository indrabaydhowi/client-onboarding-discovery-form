# Client Onboarding & Project Discovery Form

Aplikasi web interaktif Single Page Application (SPA) berbasis Next.js dan Tailwind CSS yang dirancang untuk menyederhanakan proses pengumpulan *requirement* proyek web development dari calon klien melalui antarmuka visual berbasis kartu (Card/Menu Selection).

---

## 🎯 Fitur Utama

1. **Card/Menu Selection UI:** Pengalaman pengisian form bebas esai kosong, digantikan dengan kartu interaktif visual.
2. **Multi-Step Form Flow:** Alur terstruktur mulai dari pemilihan jenis proyek, eksplorasi fitur, kesiapan aset, anggaran & timeline, hingga pengiriman data kontak.
3. **Data & UI Separation:** Seluruh data pertanyaan dan opsi tersimpan secara terpisah di `src/config/onboardingData.ts`.
4. **State Management Terpusat:** Pengelolaan state menggunakan React Context API + `useReducer` di `src/context/FormContext.tsx`.
5. **Aksesibilitas & Responsif:** Memenuhi standar WCAG 2.1 AA (navigasi keyboard penuh, ARIA attribute) dan desain mobile-first.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Iconography:** [Lucide Icons](https://lucide.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** React Context API & `useReducer`

---

## 📁 Struktur Direktori

```text
client-onboarding-discovery-form/
├── .cursorrules           # Aturan AI & konvensi pengkodean
├── docs/                  # Dokumentasi arsitektur proyek
│   ├── PRD.md             # Product Requirements Document
│   └── USER_STORY.md      # User Stories & Acceptance Criteria (Agile)
├── src/
│   ├── app/               # Routing & layout utama (Next.js App Router)
│   ├── components/        # Komponen UI modular
│   │   ├── ui/            # Komponen dasar (Button, Card, Input)
│   │   └── form/          # Komponen alur onboarding
│   ├── config/            # Data statis & opsi form (onboardingData.ts)
│   ├── context/           # FormContext & State Management
│   └── utils/             # Helper & payload builder
└── README.md
```

---

## 🚀 Memulai Proyek secara Lokal

### Prasyarat

- Node.js versi 18.x atau lebih baru
- npm, yarn, atau pnpm

### Langkah-langkah

1. **Clone Repositori:**
   ```bash
   git clone <repository-url>
   cd "Client Onboarding & Project Discovery Form"
   ```

2. **Install Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembang:**
   ```bash
   npm run dev
   ```

4. **Buka di Browser:**
   Akses `http://localhost:3000` melalui peramban web Anda.

---

## 📄 Dokumentasi Terkait

- [Product Requirements Document (PRD)](file:///docs/PRD.md)
- [User Stories & Acceptance Criteria](file:///docs/USER_STORY.md)
