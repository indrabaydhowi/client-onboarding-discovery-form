# Product Requirements Document (PRD)

**Proyek:** Client Onboarding & Project Discovery Form
**Versi:** 1.0.0
**Status:** Draft — In Review
**Penulis:** [Nama Engineer]
**Terakhir Diperbarui:** 2026-07-30

---

## Daftar Isi

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Target Pengguna](#2-target-pengguna)
3. [Arsitektur Teknologi](#3-arsitektur-teknologi)
4. [Daftar Fitur Utama](#4-daftar-fitur-utama)
5. [State Management & Data Flow](#5-state-management--data-flow)
6. [Non-Functional Requirements (NFR)](#6-non-functional-requirements-nfr)
7. [API & Data Payload](#7-api--data-payload)

---

## 1. Ringkasan Eksekutif

**Client Onboarding & Project Discovery Form** adalah sebuah *Single Page Application* (SPA) berbasis web yang dirancang untuk mendigitalisasi dan menyederhanakan proses pengumpulan *requirement* proyek dari calon klien *freelance web development*.

Permasalahan inti yang diselesaikan aplikasi ini adalah inefisiensi komunikasi awal antara *developer* dan klien. Form esai terbuka (*open-ended*) tradisional sering menghasilkan jawaban yang tidak terstruktur, tidak lengkap, atau ambigu, sehingga memperpanjang siklus diskusi awal dan berpotensi menurunkan kualitas estimasi proyek.

Solusi yang dihadirkan adalah pendekatan UI berbasis **Card/Menu Selection** (pemilihan berbasis kartu visual) yang interaktif dan multi-langkah (*multi-step*). Klien dipandu melalui serangkaian pertanyaan terstruktur dengan opsi visual yang jelas, sehingga proses pengisian terasa intuitif bahkan bagi pengguna yang tidak memiliki latar belakang teknologi. Hasil akhirnya adalah sebuah data *payload* terstruktur (JSON) yang siap digunakan oleh *developer* untuk menyusun proposal proyek secara akurat dan efisien.

---

## 2. Target Pengguna

### 2.1 Persona Utama: Calon Klien Awam Teknologi

| Atribut | Detail |
|---|---|
| **Profil** | Pemilik bisnis kecil-menengah, wirausahawan, profesional individual |
| **Keahlian Teknis** | Minimal hingga tidak ada. Tidak familiar dengan terminologi web seperti *API*, *CMS*, *hosting*, dsb. |
| **Tujuan** | Mendapatkan website untuk keperluan bisnis (toko online, profil perusahaan, *landing page* promosi) |
| **Titik Kesulitan** | Bingung harus menyampaikan kebutuhan dari mana, takut salah menggunakan istilah, tidak tahu estimasi biaya yang wajar |
| **Ekspektasi** | Proses yang cepat, tidak membebani, dan hasilnya terasa "dimengerti" oleh *developer* |

### 2.2 Persona Sekunder: Developer/Freelancer (Pengguna Tidak Langsung)

Developer adalah konsumen dari *output* data yang dihasilkan oleh form ini. Kebutuhan mereka adalah mendapatkan data *requirement* yang terstruktur, lengkap, dan konsisten sehingga dapat langsung digunakan untuk menyusun proposal dan estimasi anggaran.

---

## 3. Arsitektur Teknologi

### 3.1 Tech Stack Utama

| Layer | Teknologi | Justifikasi |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | SSR/SSG siap pakai, file-based routing, ekosistem React yang matang, dan optimasi performa bawaan |
| **Styling** | Tailwind CSS v3 | Utility-first CSS memungkinkan pengembangan UI yang cepat, konsisten, dan mudah dirawat tanpa *class naming conflicts* |
| **Iconography** | Lucide Icons | Koleksi ikon SVG yang ringan, konsisten secara visual, dan mendukung *tree-shaking* |
| **Bahasa** | TypeScript | *Type safety* untuk mencegah *runtime errors*, meningkatkan keterbacaan kode, dan mempermudah *refactoring* |

### 3.2 Pola Arsitektur

Proyek ini mengadopsi prinsip **Separation of Concerns** secara ketat:

- **`src/config/`**: Bertanggung jawab penuh atas data statis. Seluruh pertanyaan, opsi kartu, label, dan konten teks disimpan di sini sebagai objek/array TypeScript murni. Komponen UI **tidak boleh** mendefinisikan data konten secara *hardcoded*.
- **`src/components/`**: Murni berisi komponen UI yang bersifat *presentational* dan/atau *container*. Komponen menerima data sebagai *props* dan tidak bertanggung jawab atas logika bisnis atau pengambilan data.
- **`src/utils/`**: Berisi fungsi-fungsi *helper* yang murni (*pure functions*) seperti validator, formatter, dan *serializer* payload.

---

## 4. Daftar Fitur Utama

### 4.1 Multi-Step Form Navigator

Antarmuka utama yang mengelola alur navigasi antar langkah (*step*) secara linear. Menampilkan indikator progres (*progress bar* atau *step indicator*) sehingga pengguna selalu mengetahui posisi mereka dalam proses pengisian.

### 4.2 Pemilihan Jenis Proyek (Card Selection)

Layar pertama yang menyajikan pilihan jenis proyek dalam bentuk kartu visual interaktif (contoh: *Landing Page*, *Company Profile*, *E-Commerce*, *Custom Web App*). Hanya satu pilihan yang dapat dipilih (*single-select*).

### 4.3 Pemilihan Fitur & Halaman (Multi-Select Cards)

Berdasarkan jenis proyek yang dipilih pada langkah sebelumnya, pengguna diberikan daftar fitur atau halaman yang relevan (contoh: Blog, Formulir Kontak, Galeri, Integrasi Pembayaran). Pengguna dapat memilih beberapa opsi (*multi-select*).

### 4.4 Asesmen Kesiapan Aset

Serangkaian pertanyaan berbasis kartu pilihan untuk menilai ketersediaan aset yang dimiliki klien (logo, teks/*copywriting*, foto/gambar produk). Tiap item aset memiliki jawaban yang dipetakan ke nilai enum (contoh: `READY`, `NEEDS_CREATION`, `UNSURE`).

### 4.5 Penentuan Anggaran & Timeline

Pemilihan rentang anggaran (*budget range*) dan estimasi urgensi penyelesaian proyek melalui opsi visual yang telah dikurasi, menghindari kolom input angka bebas yang dapat membingungkan klien.

### 4.6 Persetujuan Ketentuan & Pengiriman Data

Ringkasan pilihan pengguna, tampilan ketentuan kerja sama (*terms of engagement*), dan formulir kontak final (nama & nomor WhatsApp). Tombol *Submit* hanya aktif setelah semua validasi terpenuhi.

---

## 5. State Management & Data Flow

### 5.1 Strategi State Management

Aplikasi ini menggunakan **React Context API** dikombinasikan dengan **`useReducer`** Hook sebagai solusi *state management*. Keputusan ini diambil berdasarkan pertimbangan berikut:

- **Skala aplikasi:** Cakupan *state* terbatas pada satu alur form linear, tidak memerlukan solusi eksternal seperti Zustand atau Redux Toolkit yang lebih tepat untuk aplikasi berskala besar.
- **Zero external dependency:** Mengurangi ukuran *bundle* dan menghilangkan ketergantungan pada *library* pihak ketiga untuk kebutuhan yang sudah dapat dipenuhi oleh React itu sendiri.
- **Keterbacaan:** Pola `Context + useReducer` familiar bagi semua engineer React dan mengikuti pola yang direkomendasikan oleh dokumentasi React resmi.

### 5.2 Struktur State Global (`FormState`)

```typescript
// src/config/form-state.types.ts

type AssetStatus = 'READY' | 'NEEDS_CREATION' | 'UNSURE';

interface FormState {
  currentStep: number;           // Langkah aktif saat ini (0-indexed)
  projectType: string | null;    // ID jenis proyek yang dipilih
  selectedFeatures: string[];    // Array ID fitur yang dipilih (multi-select)
  assets: {
    logo: AssetStatus | null;
    copywriting: AssetStatus | null;
    photography: AssetStatus | null;
  };
  budgetRange: string | null;    // ID rentang anggaran yang dipilih
  timeline: string | null;       // ID target waktu yang dipilih
  contact: {
    name: string;
    whatsapp: string;
  };
  hasAgreedToTerms: boolean;     // Status persetujuan ketentuan
}
```

### 5.3 Alur Data (Data Flow Diagram)

```
[User Interaction] --> [Dispatch Action] --> [useReducer] --> [FormState Update]
                                                                      |
                                                           [Context Provider]
                                                                      |
                                             [Seluruh komponen Form membaca State]
                                                                      |
                                                [Submit] --> [buildPayload(state)]
                                                                      |
                                                         [JSON Payload Terstruktur]
```

Data **tidak** disimpan ke *local storage* atau *session storage* selama proses pengisian untuk menjaga kesederhanaan. Seluruh *state* bersifat *in-memory* dan akan di-reset saat halaman di-refresh.

---

## 6. Non-Functional Requirements (NFR)

### 6.1 Responsive Design (Mobile-First)

| Breakpoint | Target Device | Perilaku yang Diharapkan |
|---|---|---|
| `< 640px` (sm) | Smartphone | Layout satu kolom, kartu ditampilkan secara vertikal (*stacked*), tombol lebar penuh |
| `640px - 1024px` (md) | Tablet | Layout dua kolom untuk grid kartu |
| `> 1024px` (lg) | Desktop | Layout tiga atau empat kolom untuk grid kartu |

- Seluruh implementasi CSS **wajib** menggunakan pendekatan *mobile-first*.
- Tidak boleh ada elemen UI yang terpotong (*overflow*) atau tidak dapat diakses pada layar berukuran `320px`.

### 6.2 Form Validation

- **Validasi Navigasi Antar-Step:** Tombol "Lanjut" (*Next*) pada setiap langkah harus dalam kondisi `disabled` jika pilihan wajib pada langkah tersebut belum dibuat.
- **Validasi Input Teks:** Field `name` wajib diisi minimal 3 karakter. Field `whatsapp` wajib diisi dengan format nomor yang valid (hanya angka, diawali `08` atau `62`, panjang 10-14 digit).
- **Validasi Persetujuan:** Tombol "Kirim Requirement" harus dalam kondisi `disabled` hingga `hasAgreedToTerms === true` **DAN** seluruh field kontak terisi valid.
- Pesan error harus ditampilkan secara *inline*, berdekatan dengan elemen yang gagal validasi.

### 6.3 Accessibility (A11y)

Standar aksesibilitas yang wajib dipenuhi mengacu pada **WCAG 2.1 Level AA**:

- **Navigasi Keyboard Penuh:** Seluruh elemen interaktif **wajib** dapat diakses dan dioperasikan menggunakan tombol `Tab`, `Enter`, dan `Space`.
- **ARIA Attributes:** Elemen kartu yang berfungsi sebagai *selectable item* wajib menggunakan atribut `role="button"`, `aria-pressed`, dan `tabIndex={0}`.
- **Focus Indicator:** Setiap elemen yang menerima fokus *keyboard* harus menampilkan *focus ring* yang jelas.
- **Kontras Warna:** Rasio kontras minimal **4.5:1** untuk teks normal dan **3:1** untuk teks berukuran besar.
- **Screen Reader Support:** Elemen dekoratif menggunakan `aria-hidden="true"`. Pesan status menggunakan `aria-live="polite"`.

---

## 7. API & Data Payload

### 7.1 Mekanisme Pengiriman

Pada fase MVP ini, data form **tidak** dikirimkan ke *back-end server*. Mekanisme pengiriman yang digunakan adalah **integrasi WhatsApp API** melalui skema `wa.me` deep link, dengan data payload yang di-*serialize* menjadi teks pesan terformat.

Ini adalah keputusan desain yang disengaja untuk menghilangkan kebutuhan *back-end* dan mengurangi kompleksitas *deployment*.

### 7.2 Struktur JSON Payload

```json
{
  "metadata": {
    "submittedAt": "2026-07-30T16:05:00.000Z",
    "formVersion": "1.0.0",
    "sessionId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  },
  "contact": {
    "name": "Budi Santoso",
    "whatsapp": "081234567890"
  },
  "projectRequirement": {
    "projectType": {
      "id": "ecommerce",
      "label": "Toko Online / E-Commerce"
    },
    "selectedFeatures": [
      { "id": "product-catalog", "label": "Katalog Produk" },
      { "id": "payment-gateway", "label": "Integrasi Pembayaran" },
      { "id": "contact-form", "label": "Formulir Kontak" }
    ],
    "assets": {
      "logo": "READY",
      "copywriting": "NEEDS_CREATION",
      "photography": "UNSURE"
    },
    "budgetRange": {
      "id": "range-3",
      "label": "Rp 5.000.000 - Rp 10.000.000"
    },
    "timeline": {
      "id": "timeline-2",
      "label": "1 - 2 Bulan"
    }
  },
  "agreement": {
    "hasAgreedToTerms": true,
    "agreedAt": "2026-07-30T16:04:55.000Z"
  }
}
```

### 7.3 Fungsi Serialisasi Payload

Fungsi `buildPayload(state: FormState): SubmissionPayload` akan diimplementasikan di `src/utils/payload-builder.ts`. Fungsi ini bertanggung jawab untuk:

1. Memetakan ID pilihan pengguna ke label yang dapat dibaca manusia.
2. Menambahkan metadata seperti *timestamp* dan *form version*.
3. Menghasilkan objek payload yang bersih dan siap untuk di-*serialize* menjadi string JSON maupun pesan teks WhatsApp terformat.
