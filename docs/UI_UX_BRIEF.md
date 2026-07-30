# UI/UX Design Brief

**Proyek:** Client Onboarding & Project Discovery Form
**Versi:** 1.0.0
**Status:** Approved — Design Freeze
**Terakhir Diperbarui:** 2026-07-30

---

## Daftar Isi

1. [Prinsip Desain](#1-prinsip-desain)
2. [Color Palette](#2-color-palette)
3. [Typography](#3-typography)
4. [Spacing & Layout System](#4-spacing--layout-system)
5. [Komponen UI Utama](#5-komponen-ui-utama)
6. [Panduan Motion & Animasi](#6-panduan-motion--animasi)
7. [Aksesibilitas Visual](#7-aksesibilitas-visual)

---

## 1. Prinsip Desain

Desain aplikasi ini berakar pada tiga prinsip utama yang harus dipertahankan di setiap keputusan visual:

| Prinsip | Deskripsi |
|---|---|
| **Clarity over Complexity** | Setiap elemen harus memiliki tujuan yang jelas. Tidak ada dekorasi yang tidak berkontribusi pada pemahaman pengguna. |
| **Guided & Trustworthy** | Visual harus memberikan rasa aman dan profesional kepada klien awam teknologi, seolah mereka sedang dipandu oleh seorang konsultan berpengalaman. |
| **Responsive by Default** | Tidak ada desain yang dianggap selesai sebelum diverifikasi pada viewport mobile (`320px`). Mobile adalah *first-class citizen*. |

---

## 2. Color Palette

### 2.1 Skema Warna Utama (Dark Mode — Default)

Skema warna menggunakan pendekatan **dark slate** yang terkesan premium dan modern, dengan warna aksen biru-ungu yang profesional.

```css
/* globals.css — CSS Custom Properties */
:root {
  /* === Background Layers === */
  --color-bg-base:       #0f172a; /* slate-950 — Latar belakang terdalam */
  --color-bg-surface:    #1e293b; /* slate-800 — Surface kartu & panel */
  --color-bg-elevated:   #334155; /* slate-700 — Hover state & elemen elevated */

  /* === Primary Brand Color (Blue-Indigo) === */
  --color-primary:       #6366f1; /* indigo-500 — CTA, progress, selected state */
  --color-primary-hover: #4f46e5; /* indigo-600 — Hover state untuk primary */
  --color-primary-light: #e0e7ff; /* indigo-100 — Subtle tint untuk background badge */
  --color-primary-muted: #3730a3; /* indigo-800 — Ring/outline pada dark background */

  /* === Accent Color (Violet) === */
  --color-accent:        #8b5cf6; /* violet-500 — Elemen pelengkap, gradient ujung */
  --color-accent-hover:  #7c3aed; /* violet-600 — Hover state untuk accent */

  /* === Semantic Colors === */
  --color-success:       #22c55e; /* green-500 — Konfirmasi sukses, checkmark */
  --color-warning:       #f59e0b; /* amber-500 — Peringatan & info penting */
  --color-error:         #ef4444; /* red-500 — Pesan validasi error */

  /* === Text Hierarchy === */
  --color-text-primary:  #f8fafc; /* slate-50 — Judul & teks utama */
  --color-text-secondary:#94a3b8; /* slate-400 — Deskripsi & teks pendukung */
  --color-text-muted:    #64748b; /* slate-500 — Placeholder, label non-aktif */
  --color-text-inverse:  #0f172a; /* slate-950 — Teks di atas background terang */

  /* === Border === */
  --color-border:        #334155; /* slate-700 — Border default elemen */
  --color-border-focus:  #6366f1; /* indigo-500 — Focus ring */
}
```

### 2.2 Pemetaan ke Tailwind CSS

Warna-warna di atas dipetakan ke kelas Tailwind berikut:

| Token | Kelas Tailwind | Penggunaan |
|---|---|---|
| `bg-base` | `bg-slate-950` | Body background |
| `bg-surface` | `bg-slate-800` | Background kartu |
| `bg-elevated` | `bg-slate-700` | Hover state kartu |
| `primary` | `bg-indigo-500` / `text-indigo-500` | Tombol CTA, selected card |
| `primary-hover` | `hover:bg-indigo-600` | Hover tombol |
| `accent` | `bg-violet-500` / `text-violet-500` | Gradient, dekorasi |
| `success` | `text-green-500` | Ikon centang terpilih |
| `error` | `text-red-500` | Pesan error validasi |
| `text-primary` | `text-slate-50` | Judul, body text |
| `text-secondary` | `text-slate-400` | Deskripsi, subtitle |
| `border` | `border-slate-700` | Border kartu default |
| `border-focus` | `focus:ring-indigo-500` | Focus ring aksesibilitas |

### 2.3 Gradient Signatur

Digunakan pada judul halaman sambutan dan elemen hero:

```css
/* Gradient teks untuk headline utama */
.gradient-text {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Tailwind equivalent: */
/* bg-gradient-to-br from-indigo-500 via-violet-500 to-violet-400 bg-clip-text text-transparent */
```

---

## 3. Typography

### 3.1 Font Utama: Inter

**Inter** dipilih sebagai satu-satunya typeface karena keterbacaannya yang luar biasa pada layar digital di semua ukuran, serta dukungan penuhnya terhadap karakter Latin.

**Import via `src/app/layout.tsx`:**
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
```

### 3.2 Skala Tipografi

| Role | Tag HTML | Kelas Tailwind | Ukuran (Mobile → Desktop) | Weight |
|---|---|---|---|---|
| **Display / Hero** | `h1` | `text-3xl sm:text-4xl lg:text-5xl` | 30px → 48px | `font-extrabold` (800) |
| **Section Title** | `h2` | `text-xl sm:text-2xl lg:text-3xl` | 20px → 30px | `font-bold` (700) |
| **Card Title** | `h3` | `text-base sm:text-lg` | 16px → 18px | `font-semibold` (600) |
| **Body / Description** | `p` | `text-sm sm:text-base` | 14px → 16px | `font-normal` (400) |
| **Label / Caption** | `span` | `text-xs sm:text-sm` | 12px → 14px | `font-medium` (500) |
| **Error Message** | `p` | `text-xs` | 12px | `font-medium` (500) |

### 3.3 Line Height & Tracking

- **Judul:** `leading-tight` (line-height: 1.25)
- **Body:** `leading-relaxed` (line-height: 1.625)
- **Caps Label:** `tracking-widest uppercase text-xs font-semibold` (digunakan untuk label step indicator)

---

## 4. Spacing & Layout System

### 4.1 Unit Spacing

Proyek menggunakan sistem spacing **4px base unit** bawaan Tailwind. Semua padding dan margin harus menggunakan nilai dari skala ini (bukan nilai arbitrer).

| Token | Nilai | Kelas Tailwind | Penggunaan Tipikal |
|---|---|---|---|
| `xs` | 4px | `p-1` / `gap-1` | Spacing internal elemen kecil |
| `sm` | 8px | `p-2` / `gap-2` | Spacing antar label & ikon |
| `md` | 16px | `p-4` / `gap-4` | Padding kartu internal |
| `lg` | 24px | `p-6` / `gap-6` | Padding section |
| `xl` | 32px | `p-8` / `gap-8` | Padding container utama |
| `2xl` | 48px | `p-12` / `gap-12` | Margin antar section besar |

### 4.2 Responsive Breakpoints (Mobile-First)

| Breakpoint | Min-Width | Tailwind Prefix | Target |
|---|---|---|---|
| **Default** | 0px | *(tanpa prefix)* | Smartphone portrait |
| **`sm`** | 640px | `sm:` | Smartphone landscape, tablet kecil |
| **`md`** | 768px | `md:` | Tablet |
| **`lg`** | 1024px | `lg:` | Desktop |
| **`xl`** | 1280px | `xl:` | Desktop lebar |

### 4.3 Standar Container

```
/* Wrapper utama halaman */
max-w-4xl mx-auto px-4 sm:px-6 lg:px-8
```

### 4.4 Grid Kartu (Responsive)

```
/* Grid kartu pilihan — default 1 kolom, melebar seiring viewport */
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4
```

---

## 5. Komponen UI Utama

### 5.1 `SelectionCard` — Kartu Pilihan Interaktif

Komponen paling fundamental. Digunakan pada setiap langkah pemilihan (jenis proyek, fitur, aset, anggaran, timeline).

#### Spesifikasi Visual

```
┌─────────────────────────────────────────┐
│  ┌─────┐                                │
│  │ 🎨 │  Card Title                    │
│  └─────┘  Deskripsi singkat satu baris  │
│                                         │
└─────────────────────────────────────────┘
```

| State | Tampilan |
|---|---|
| **Default** | `bg-slate-800`, `border border-slate-700`, `rounded-xl`, `shadow-sm` |
| **Hover** | `bg-slate-700`, `border-slate-600`, `shadow-md` (transisi 200ms) |
| **Selected** | `bg-indigo-950`, `border-2 border-indigo-500`, `shadow-indigo-500/20`, ikon centang `text-green-500` tampil di pojok kanan atas |
| **Focus (Keyboard)** | `ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950` |
| **Disabled** | `opacity-40 cursor-not-allowed` |

#### Kelas Tailwind Dasar

```
/* Base classes untuk SelectionCard */
relative flex flex-col gap-3 p-5 rounded-xl border border-slate-700
bg-slate-800 cursor-pointer transition-all duration-200 ease-in-out
hover:bg-slate-700 hover:border-slate-600 hover:shadow-md
focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950

/* Selected state tambahan */
border-2 border-indigo-500 bg-indigo-950/50 shadow-lg shadow-indigo-500/10
```

---

### 5.2 `Button` — Tombol Aksi

Terdapat tiga varian tombol yang digunakan dalam aplikasi:

| Varian | Penggunaan | Kelas Tailwind |
|---|---|---|
| **Primary** | Tombol "Lanjut" & "Kirim" | `bg-indigo-500 hover:bg-indigo-600 text-white font-semibold` |
| **Secondary / Ghost** | Tombol "Kembali" | `bg-transparent border border-slate-600 hover:bg-slate-800 text-slate-300` |
| **Danger** | Tombol reset (jika ada) | `bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30` |

#### Spesifikasi Umum Semua Button

```
/* Kelas dasar semua tombol */
inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg
text-sm font-semibold transition-all duration-200 ease-in-out
focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-950

/* Disabled state */
disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
```

#### Aturan Lebar

- Di **mobile** (`< 640px`): Tombol "Lanjut" dan "Kembali" harus `w-full` (lebar penuh).
- Di **desktop** (`>= 640px`): Tombol berukuran intrinsik (`w-auto`).

---

### 5.3 `ProgressBar` — Indikator Langkah

Komponen visual yang menunjukkan progres pengguna dalam alur multi-step form.

#### Spesifikasi

```
STEP 1   STEP 2   STEP 3   STEP 4   STEP 5   STEP 6
  ●────────●────────●────────○────────○────────○
[Done]   [Done]  [Active]             [Upcoming]
```

| State | Tampilan |
|---|---|
| **Done** | `bg-indigo-500`, ikon centang di dalam lingkaran |
| **Active** | `bg-indigo-500` ring luar `ring-2 ring-indigo-500/30`, animasi pulse subtle |
| **Upcoming** | `bg-slate-700 text-slate-500` |

#### Aksesibilitas

Komponen harus menyertakan:
```html
<nav aria-label="Progres pengisian form">
  <ol role="list">
    <li aria-current="step">...</li>
  </ol>
</nav>
```

---

### 5.4 `FormInput` — Input Teks Kontak

Digunakan pada langkah terakhir untuk mengisi nama dan nomor WhatsApp.

```
/* Kelas dasar FormInput */
w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700
text-slate-50 placeholder:text-slate-500
focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
transition-colors duration-200

/* Error state */
border-red-500 focus:ring-red-500

/* Label */
block text-sm font-medium text-slate-300 mb-1.5
```

---

### 5.5 `StepWrapper` — Container Langkah

Setiap langkah form dibungkus oleh `StepWrapper` yang memberikan konsistensi visual:

```
/* Animasi masuk per langkah */
animate-in fade-in slide-in-from-right-4 duration-300

/* Layout internal */
flex flex-col gap-6
```

Header setiap langkah terdiri dari:
1. Badge label langkah: `LANGKAH X DARI 6`
2. `h2` judul pertanyaan utama
3. `p` teks penjelasan konteks (opsional)

---

## 6. Panduan Motion & Animasi

Prinsip animasi: **Subtle & Purposeful**. Animasi hanya boleh ada jika memberikan konteks atau umpan balik kepada pengguna.

| Jenis Animasi | Durasi | Easing | Trigger |
|---|---|---|---|
| Kartu hover (bg, shadow) | `150ms` | `ease-in-out` | `:hover` |
| Kartu selected state | `200ms` | `ease-out` | `click / keypress` |
| Transisi antar langkah | `300ms` | `ease-in-out` | Tombol "Lanjut" / "Kembali" |
| Tombol loading spinner | `1000ms` | `linear` (loop) | Submit processing |
| Pesan error muncul | `200ms` | `ease-out` | Validasi gagal |

**Aturan keras:**
- `prefers-reduced-motion: reduce` **wajib** dihormati. Semua transisi harus dinonaktifkan untuk pengguna yang mengaktifkan pengaturan ini.
- Jangan gunakan animasi yang dapat memicu *vestibular disorder* (gerakan besar, parallax, flicker).

---

## 7. Aksesibilitas Visual

### 7.1 Rasio Kontras Warna

Berdasarkan standar **WCAG 2.1 Level AA**:

| Kombinasi | Rasio | Status |
|---|---|---|
| `text-slate-50` di atas `bg-slate-950` | ~17:1 | ✅ AAA |
| `text-slate-400` di atas `bg-slate-950` | ~5.9:1 | ✅ AA |
| `text-indigo-400` di atas `bg-indigo-950` | ~5.2:1 | ✅ AA |
| `text-red-400` di atas `bg-slate-800` | ~4.7:1 | ✅ AA |

### 7.2 Focus Indicator

Semua elemen interaktif **wajib** memiliki *focus ring* yang terlihat jelas:

```css
/* Standar focus ring global */
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-indigo-500
focus-visible:ring-offset-2
focus-visible:ring-offset-slate-950
```

**Dilarang keras** menggunakan `outline: none` atau `focus:outline-none` tanpa memberikan indikator fokus pengganti yang setara atau lebih baik.
