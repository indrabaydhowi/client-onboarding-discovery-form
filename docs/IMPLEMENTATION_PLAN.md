# Implementation Plan

**Proyek:** Client Onboarding & Project Discovery Form
**Versi:** 1.0.0
**Metodologi:** Spec-Driven Development
**Terakhir Diperbarui:** 2026-07-30

---

> [!IMPORTANT]
> **Aturan Eksekusi Wajib:** Setiap fase harus **diselesaikan dan diverifikasi** sebelum fase berikutnya dimulai. Melompati fase atau mengerjakan sub-task dari fase berbeda secara bersamaan adalah pelanggaran terhadap metodologi proyek ini.

---

## Daftar Isi

- [Phase 1: Konfigurasi & Data Dasar](#phase-1-konfigurasi--data-dasar)
- [Phase 2: Global State & Context](#phase-2-global-state--context)
- [Phase 3: Komponen UI Fundamental](#phase-3-komponen-ui-fundamental)
- [Phase 4: Perakitan Form Multi-Step](#phase-4-perakitan-form-multi-step)

---

## Phase 1: Konfigurasi & Data Dasar

**Tujuan:** Memastikan fondasi teknis dan seluruh data statis aplikasi tersedia dan berfungsi sebelum satu baris UI ditulis.

**Referensi Dokumen:** `PRD.md §3 Arsitektur Teknologi`, `UI_UX_BRIEF.md §2 Color Palette`, `UI_UX_BRIEF.md §3 Typography`

---

### 1.1 — Konfigurasi Proyek

- [x] Inisialisasi proyek Next.js 14 dengan App Router dan TypeScript.
- [x] Install dan konfigurasi Tailwind CSS (`tailwind.config.ts`, `postcss.config.js`).
- [x] Install dependensi `lucide-react` untuk ikonografi.
- [ ] Perbarui `tailwind.config.ts` dengan custom color tokens dari `UI_UX_BRIEF.md §2.1` (tambahkan warna `indigo`, `violet`, `slate` ke konfigurasi extend).
- [ ] Perbarui `src/app/globals.css` dengan import font **Inter** dari Google Fonts via `next/font/google` dan definisi CSS Custom Properties dari `UI_UX_BRIEF.md §2.1`.
- [ ] Perbarui `src/app/layout.tsx` untuk menerapkan font Inter ke seluruh aplikasi menggunakan variabel CSS.
- [ ] Verifikasi server development berjalan tanpa error: `npm run dev`.

### 1.2 — Data Statis Onboarding

- [x] Buat file `src/config/onboardingData.ts`.
- [x] Definisikan TypeScript interfaces: `ProjectTypeOption`, `FeatureOption`, `AssetOption`, `BudgetOption`, `TimelineOption`.
- [x] Isi data array `projectTypes` (minimal 4 opsi).
- [x] Isi data array `featureOptions` (minimal 5 opsi, dengan properti `category`).
- [x] Isi data array `assetQuestions` (3 pertanyaan: logo, copywriting, photography).
- [x] Isi data array `budgetRanges` (minimal 4 rentang harga dalam Rupiah).
- [x] Isi data array `timelineOptions` (minimal 4 opsi timeline).
- [ ] Verifikasi tidak ada TypeScript error pada file ini dengan menjalankan `npx tsc --noEmit`.

### 1.3 — Commit Checkpoint

- [x] Commit dengan pesan: `chore: project initialization and architectural scaffolding setup`

---

## Phase 2: Global State & Context

**Tujuan:** Membangun lapisan manajemen state yang akan menjadi "tulang punggung" penyimpanan data antar-langkah form. Tidak ada komponen UI yang dibangun di fase ini.

**Referensi Dokumen:** `PRD.md §5 State Management & Data Flow`

---

### 2.1 — Definisi Type System

- [x] Buat atau pastikan interface `FormState` sudah terdefinisi (di `src/context/FormContext.tsx` atau file types terpisah).
- [ ] Pastikan tipe `AssetStatus = 'READY' | 'NEEDS_CREATION' | 'UNSURE'` sudah diekspor dan dapat digunakan di seluruh aplikasi.
- [ ] Buat tipe `FormAction` yang mencakup seluruh kemungkinan aksi reducer (SET_STEP, SET_PROJECT_TYPE, TOGGLE_FEATURE, SET_ASSET, SET_BUDGET, SET_TIMELINE, SET_CONTACT, SET_AGREEMENT, RESET_FORM).

### 2.2 — Implementasi Context & Reducer

- [x] Buat `src/context/FormContext.tsx`.
- [x] Implementasikan `initialState` yang merepresentasikan state kosong di awal form.
- [x] Implementasikan fungsi `formReducer(state, action)` yang menangani semua `FormAction`.
- [x] Implementasikan `FormProvider` component yang membungkus Context.Provider.
- [x] Implementasikan custom hook `useFormContext()` dengan guard `if (!context) throw new Error(...)`.

### 2.3 — Integrasi ke Root Layout

- [ ] Bungkus konten `src/app/layout.tsx` dengan `<FormProvider>` agar state tersedia secara global.

### 2.4 — Utility Functions

- [ ] Buat `src/utils/validators.ts` dengan fungsi-fungsi berikut:
  - [ ] `validateName(name: string): boolean` — Min. 3 karakter.
  - [ ] `validateWhatsApp(number: string): boolean` — Regex sesuai `PRD.md §6.2`.
  - [ ] `isStepValid(state: FormState, step: number): boolean` — Mengembalikan `true` jika pilihan wajib di `step` tersebut sudah terisi.
- [ ] Buat `src/utils/payload-builder.ts` dengan fungsi:
  - [ ] `buildPayload(state: FormState): SubmissionPayload` — Memetakan state ke struktur JSON sesuai `PRD.md §7.2`.
  - [ ] `buildWhatsAppMessage(payload: SubmissionPayload): string` — Meng-serialize payload menjadi teks pesan WhatsApp terformat.

### 2.5 — Commit Checkpoint

- [ ] Commit dengan pesan: `feat(context): implement form state management with context and reducer`

---

## Phase 3: Komponen UI Fundamental

**Tujuan:** Membangun semua komponen UI atomik yang *reusable*. Setiap komponen harus dapat berfungsi secara *standalone* dan tidak bergantung pada `FormContext`. Data dilewatkan murni melalui *props*.

**Referensi Dokumen:** `UI_UX_BRIEF.md §5 Komponen UI Utama`, `USER_STORY.md §US-10`, `USER_STORY.md §US-11`

---

### 3.1 — Komponen `Button`

- [ ] Buat `src/components/ui/Button.tsx`.
- [ ] Implementasikan tiga varian: `primary`, `secondary`, `danger` (sesuai `UI_UX_BRIEF.md §5.2`).
- [ ] Implementasikan prop `isLoading` yang menampilkan spinner dan menonaktifkan klik.
- [ ] Implementasikan prop `disabled` yang menerapkan style `disabled:opacity-40 disabled:cursor-not-allowed`.
- [ ] Pastikan button dapat menerima atribut HTML standar melalui rest props (`...rest`).
- [ ] Tambahkan `focus-visible:ring` untuk aksesibilitas keyboard.
- [ ] Terapkan `w-full sm:w-auto` untuk perilaku responsif (sesuai `UI_UX_BRIEF.md §5.2 Aturan Lebar`).

### 3.2 — Komponen `SelectionCard`

- [ ] Buat `src/components/ui/SelectionCard.tsx`.
- [ ] Implementasikan props: `id`, `title`, `description`, `iconName`, `isSelected`, `onClick`.
- [ ] Render ikon dari `lucide-react` secara dinamis berdasarkan prop `iconName`.
- [ ] Implementasikan semua visual state: `default`, `hover`, `selected`, `focus`, `disabled` (sesuai `UI_UX_BRIEF.md §5.1`).
- [ ] Tambahkan `role="button"`, `tabIndex={0}`, dan `aria-pressed={isSelected}` untuk aksesibilitas.
- [ ] Tambahkan event handler `onKeyDown` yang merespons `Enter` dan `Space` (sesuai `USER_STORY.md §US-11`).
- [ ] Tampilkan ikon centang (`CheckCircle2` dari Lucide) di pojok kanan atas saat `isSelected === true`.
- [ ] Terapkan `transition-all duration-200 ease-in-out` pada semua perubahan visual.

### 3.3 — Komponen `ProgressBar`

- [ ] Buat `src/components/ui/ProgressBar.tsx`.
- [ ] Implementasikan props: `currentStep`, `totalSteps`, `stepLabels?: string[]`.
- [ ] Tampilkan indikator visual untuk tiga state: `done`, `active`, `upcoming` (sesuai `UI_UX_BRIEF.md §5.3`).
- [ ] Tambahkan `<nav aria-label="Progres pengisian form">` dan `aria-current="step"` untuk aksesibilitas.
- [ ] Tambahkan atribut `aria-label={`Langkah ${currentStep} dari ${totalSteps}`}` pada kontainer.

### 3.4 — Komponen `FormInput`

- [ ] Buat `src/components/ui/FormInput.tsx`.
- [ ] Implementasikan props: `id`, `label`, `type`, `placeholder`, `value`, `onChange`, `onBlur`, `errorMessage?`, `autoComplete?`.
- [ ] Tampilkan `errorMessage` secara *inline* di bawah input saat prop tersebut berisi nilai.
- [ ] Terapkan `error state` style (border merah) saat `errorMessage` ada.
- [ ] Gunakan `aria-live="polite"` pada container pesan error.
- [ ] Gunakan `aria-describedby` yang menghubungkan input ke elemen pesan error.

### 3.5 — Komponen `StepWrapper`

- [ ] Buat `src/components/ui/StepWrapper.tsx`.
- [ ] Implementasikan props: `stepNumber`, `totalSteps`, `title`, `description?`, `children`.
- [ ] Tampilkan badge label langkah (contoh: "LANGKAH 2 DARI 6") dengan styling sesuai `UI_UX_BRIEF.md §3.3`.
- [ ] Implementasikan animasi masuk (`animate-in fade-in`) sesuai `UI_UX_BRIEF.md §6`.
- [ ] Pastikan animasi dinonaktifkan saat `prefers-reduced-motion: reduce` aktif.

### 3.6 — Commit Checkpoint

- [ ] Commit dengan pesan: `feat(ui): implement foundational reusable UI components`

---

## Phase 4: Perakitan Form Multi-Step

**Tujuan:** Merakit semua komponen yang telah dibangun di Phase 3 menjadi alur onboarding form yang fungsional dan terintegrasi dengan `FormContext`.

**Referensi Dokumen:** `PRD.md §4 Fitur Utama`, `USER_STORY.md` (seluruh epik), `UI_UX_BRIEF.md §5.5 StepWrapper`

---

### 4.1 — Halaman Sambutan (Step 0)

- [ ] Buat `src/components/form/WelcomeStep.tsx`.
- [ ] Implementasikan judul hero dengan gradient teks (sesuai `UI_UX_BRIEF.md §2.3`).
- [ ] Tampilkan penjelasan singkat tujuan form menggunakan bahasa awam.
- [ ] Sematkan tombol CTA "Mulai Sekarang" yang men-dispatch `SET_STEP: 1`.
- [ ] Verifikasi: `US-01` semua Acceptance Criteria terpenuhi.

### 4.2 — Step 1: Pemilihan Jenis Proyek

- [ ] Buat `src/components/form/ProjectTypeStep.tsx`.
- [ ] Render grid `SelectionCard` menggunakan data dari `onboardingData.projectTypes`.
- [ ] Hubungkan dengan `dispatch({ type: 'SET_PROJECT_TYPE', payload: id })`.
- [ ] Tombol "Lanjut" disabled saat `state.projectType === null`.
- [ ] Tombol "Lanjut" menjadi aktif segera setelah kartu dipilih.
- [ ] Verifikasi: `US-02` semua Acceptance Criteria terpenuhi.

### 4.3 — Step 2: Pemilihan Fitur

- [ ] Buat `src/components/form/FeaturesStep.tsx`.
- [ ] Filter `onboardingData.featureOptions` berdasarkan `state.projectType` yang dipilih.
- [ ] Implementasikan *multi-select* dengan `dispatch({ type: 'TOGGLE_FEATURE', payload: id })`.
- [ ] Tombol "Lanjut" **tidak** disabled (langkah opsional).
- [ ] Tampilkan teks petunjuk multi-select.
- [ ] Verifikasi: `US-03` semua Acceptance Criteria terpenuhi.

### 4.4 — Step 3: Kesiapan Aset

- [ ] Buat `src/components/form/AssetsStep.tsx`.
- [ ] Render pertanyaan dari `onboardingData.assetQuestions` (logo, copywriting, photography).
- [ ] Hubungkan setiap jawaban dengan `dispatch({ type: 'SET_ASSET', payload: { key, value } })`.
- [ ] Tombol "Lanjut" disabled selama ada aset yang nilainya masih `null`.
- [ ] Gunakan `isStepValid(state, 3)` dari `validators.ts` untuk kontrol disabled state.
- [ ] Verifikasi: `US-04` semua Acceptance Criteria terpenuhi.

### 4.5 — Step 4: Anggaran & Timeline

- [ ] Buat `src/components/form/BudgetTimelineStep.tsx`.
- [ ] Render grid opsi budget dari `onboardingData.budgetRanges`.
- [ ] Render grid opsi timeline dari `onboardingData.timelineOptions`.
- [ ] Hubungkan dengan dispatch `SET_BUDGET` dan `SET_TIMELINE`.
- [ ] Tombol "Lanjut" disabled hingga kedua pilihan terisi.
- [ ] Verifikasi: `US-05`, `US-06` semua Acceptance Criteria terpenuhi.

### 4.6 — Step 5: Persetujuan & Kontak

- [ ] Buat `src/components/form/AgreementStep.tsx`.
- [ ] Tampilkan ringkasan pilihan pengguna (project type, fitur, aset, budget, timeline).
- [ ] Tampilkan 5 poin ketentuan kerja sama.
- [ ] Implementasikan checkbox "Saya setuju" yang di-dispatch ke `SET_AGREEMENT`.
- [ ] Render dua `FormInput`: Nama Lengkap dan Nomor WhatsApp.
- [ ] Validasi input menggunakan `validateName()` dan `validateWhatsApp()` dari `validators.ts` (validasi *on blur*).
- [ ] Tampilkan pesan error inline saat validasi gagal.
- [ ] Tombol "Kirim Requirement" disabled hingga: `hasAgreedToTerms === true` AND `validateName(name)` AND `validateWhatsApp(whatsapp)`.
- [ ] Verifikasi: `US-07`, `US-08` semua Acceptance Criteria terpenuhi.

### 4.7 — Logika Submit & Halaman Sukses

- [ ] Implementasikan fungsi `handleSubmit` yang memanggil `buildWhatsAppMessage(buildPayload(state))` dan membuka `wa.me/` deep link.
- [ ] Terapkan `isLoading` state pada tombol selama proses submit berlangsung.
- [ ] Buat `src/components/form/SuccessStep.tsx` yang tampil setelah submit berhasil.
- [ ] Tampilkan nama pengguna pada pesan sukses.
- [ ] Reset form state dengan `dispatch({ type: 'RESET_FORM' })` setelah navigasi ke halaman sukses.
- [ ] Verifikasi: `US-09` semua Acceptance Criteria terpenuhi.

### 4.8 — Orkestrasi Multi-Step di Halaman Utama

- [ ] Perbarui `src/app/page.tsx` untuk merender `ProgressBar` di bagian atas.
- [ ] Implementasikan logika render kondisional berdasarkan `state.currentStep` untuk menampilkan komponen step yang tepat.
- [ ] Pastikan tombol "Kembali" (`dispatch SET_STEP`) tersedia di setiap langkah kecuali langkah pertama.
- [ ] Verifikasi: `US-10` semua Acceptance Criteria terpenuhi.

### 4.9 — Verifikasi Aksesibilitas Final

- [ ] Lakukan pengujian navigasi keyboard penuh dari Step 0 hingga halaman sukses hanya menggunakan `Tab`, `Enter`, dan `Space`.
- [ ] Pastikan tidak ada *focus trap* yang tidak disengaja.
- [ ] Verifikasi `prefers-reduced-motion` dipatuhi (nonaktifkan semua animasi).
- [ ] Verifikasi: `US-11` semua Acceptance Criteria terpenuhi.

### 4.10 — Pengujian Final & Commit Penutup

- [ ] Jalankan `npm run build` dan pastikan tidak ada error TypeScript atau build error.
- [ ] Jalankan `npm run lint` dan pastikan tidak ada ESLint warning atau error.
- [ ] Lakukan pengujian fungsional menyeluruh pada viewport `375px` (mobile) dan `1280px` (desktop).
- [ ] Commit dengan pesan: `feat: complete multi-step onboarding form assembly and integration`

---

## Ringkasan Status Fase

| Fase | Nama | Status |
|---|---|---|
| Phase 1 | Konfigurasi & Data Dasar | 🟡 In Progress |
| Phase 2 | Global State & Context | 🟡 In Progress |
| Phase 3 | Komponen UI Fundamental | ⬜ Not Started |
| Phase 4 | Perakitan Form Multi-Step | ⬜ Not Started |

> **Legend:** ✅ Done &nbsp;|&nbsp; 🟡 In Progress &nbsp;|&nbsp; ⬜ Not Started &nbsp;|&nbsp; 🔴 Blocked
