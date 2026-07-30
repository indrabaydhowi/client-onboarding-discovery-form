# User Stories & Acceptance Criteria

**Proyek:** Client Onboarding & Project Discovery Form
**Versi:** 1.0.0
**Metodologi:** Agile Scrum
**Terakhir Diperbarui:** 2026-07-30

---

## Daftar Isi

- [Epic 1: Onboarding & Pengenalan](#epic-1-onboarding--pengenalan)
- [Epic 2: Pemilihan Jenis Proyek](#epic-2-pemilihan-jenis-proyek)
- [Epic 3: Pemilihan Fitur & Halaman](#epic-3-pemilihan-fitur--halaman)
- [Epic 4: Asesmen Kesiapan Aset](#epic-4-asesmen-kesiapan-aset)
- [Epic 5: Penentuan Anggaran & Timeline](#epic-5-penentuan-anggaran--timeline)
- [Epic 6: Persetujuan & Pengiriman Data](#epic-6-persetujuan--pengiriman-data)
- [Epic 7: Konfirmasi Sukses](#epic-7-konfirmasi-sukses)
- [Epic 8: Navigasi & Aksesibilitas Global](#epic-8-navigasi--aksesibilitas-global)

---

## Epic 1: Onboarding & Pengenalan

### US-01 — Halaman Sambutan

**As a** calon klien yang baru pertama kali mengakses aplikasi,
**I want to** melihat halaman sambutan yang ramah dan menjelaskan tujuan form ini,
**so that** saya memahami apa yang akan saya lakukan dan merasa nyaman untuk melanjutkan.

#### Acceptance Criteria

- [ ] Halaman menampilkan judul utama (`<h1>`) yang jelas dan tidak menggunakan jargon teknis.
- [ ] Halaman menampilkan deskripsi singkat (1-2 kalimat) yang menjelaskan tujuan dan manfaat mengisi form.
- [ ] Tersedia sebuah tombol *Call to Action* (CTA) yang jelas, contoh: "Mulai Sekarang" atau "Ceritakan Proyek Anda".
- [ ] Tombol CTA dapat diklik menggunakan tetikus maupun tombol `Enter`/`Space` pada keyboard.
- [ ] Halaman responsif dan tampil dengan baik pada viewport minimum `320px`.

---

## Epic 2: Pemilihan Jenis Proyek

### US-02 — Memilih Jenis Proyek via Kartu Visual

**As a** calon klien yang ingin membuat website,
**I want to** memilih jenis proyek saya dari pilihan kartu visual yang disajikan dengan bahasa sederhana,
**so that** saya dapat mengkomunikasikan kebutuhan utama saya tanpa harus memahami istilah teknis.

#### Acceptance Criteria

- [ ] Layar menampilkan minimal 4 opsi kartu jenis proyek (contoh: *Landing Page*, *Company Profile*, *E-Commerce*, *Aplikasi Web Kustom*).
- [ ] Setiap kartu memiliki ikon relevan, judul singkat, dan deskripsi 1 baris yang menggunakan bahasa awam.
- [ ] Kartu yang dipilih mendapatkan visual *state* yang jelas secara visual (contoh: border berwarna, background berubah, ikon centang muncul) dan disampaikan via atribut `aria-pressed="true"` untuk *screen reader*.
- [ ] Hanya **satu** kartu yang dapat dipilih pada satu waktu (*single-select*). Memilih kartu baru secara otomatis membatalkan pilihan sebelumnya.
- [ ] Tombol "Lanjut" berada dalam kondisi `disabled` dan tidak dapat diklik **sebelum** salah satu kartu dipilih.
- [ ] Tombol "Lanjut" berubah menjadi kondisi aktif (`enabled`) **segera setelah** satu kartu dipilih.
- [ ] Seluruh kartu dapat diakses dan dipilih menggunakan navigasi keyboard (`Tab` untuk fokus, `Enter`/`Space` untuk memilih).

---

## Epic 3: Pemilihan Fitur & Halaman

### US-03 — Memilih Fitur Tambahan yang Diinginkan

**As a** calon klien yang telah memilih jenis proyeknya,
**I want to** memilih fitur-fitur atau halaman spesifik yang saya inginkan dari daftar opsi yang relevan,
**so that** developer dapat memahami scope proyek saya secara lebih detail dan akurat.

#### Acceptance Criteria

- [ ] Daftar opsi fitur yang ditampilkan **relevan** dengan jenis proyek yang dipilih pada langkah sebelumnya (contoh: jika memilih *E-Commerce*, maka muncul opsi "Keranjang Belanja", "Integrasi Pembayaran", dst.).
- [ ] Pengguna dapat memilih **lebih dari satu** kartu fitur secara bersamaan (*multi-select*).
- [ ] Kartu yang dipilih mendapatkan visual *state* terpilih yang konsisten dengan langkah sebelumnya.
- [ ] Langkah ini bersifat **opsional**; tombol "Lanjut" **tidak** dalam kondisi `disabled` meskipun tidak ada kartu yang dipilih.
- [ ] Terdapat teks petunjuk yang menginformasikan kepada pengguna bahwa mereka dapat memilih beberapa opsi sekaligus.
- [ ] Tombol "Kembali" tersedia dan berfungsi mengembalikan pengguna ke langkah sebelumnya tanpa menghapus pilihan yang telah dibuat.

---

## Epic 4: Asesmen Kesiapan Aset

### US-04 — Menginformasikan Ketersediaan Aset yang Dimiliki

**As a** calon klien,
**I want to** memberitahu developer aset apa saja yang sudah saya miliki (logo, teks, foto),
**so that** developer dapat memberikan estimasi biaya yang lebih akurat dan saya tidak dikenakan biaya untuk aset yang sudah saya sediakan.

#### Acceptance Criteria

- [ ] Tersedia pertanyaan terpisah untuk setiap kategori aset: **Logo**, **Teks/Copywriting**, dan **Foto/Gambar**.
- [ ] Setiap pertanyaan memiliki tiga opsi jawaban yang dipetakan ke enum: `READY` ("Sudah ada"), `NEEDS_CREATION` ("Perlu dibuatkan"), `UNSURE` ("Belum tahu").
- [ ] Setiap item pertanyaan bersifat **wajib diisi** (*mandatory*). Tombol "Lanjut" berada dalam kondisi `disabled` selama masih ada pertanyaan aset yang belum dijawab.
- [ ] Tombol "Lanjut" menjadi `enabled` hanya setelah **ketiga** pertanyaan aset telah mendapatkan jawaban.
- [ ] Tombol "Kembali" berfungsi dengan benar dan mempertahankan jawaban yang sudah diberikan pada langkah ini.

---

## Epic 5: Penentuan Anggaran & Timeline

### US-05 — Memilih Rentang Anggaran Proyek

**As a** calon klien,
**I want to** memilih rentang anggaran yang saya siapkan dari pilihan yang sudah dikurasi,
**so that** saya tidak perlu menebak angka spesifik dan developer dapat mengetahui ekspektasi finansial saya sejak awal.

#### Acceptance Criteria

- [ ] Tersedia minimal 4 opsi rentang anggaran yang realistis dan disajikan dalam format kartu yang mudah dibaca.
- [ ] Setiap opsi anggaran ditampilkan dengan label yang jelas dalam format Rupiah (contoh: "Di bawah Rp 3.000.000", "Rp 5.000.000 - Rp 10.000.000").
- [ ] Hanya satu opsi anggaran yang dapat dipilih (*single-select*).
- [ ] Pilihan anggaran bersifat **wajib**. Tombol "Lanjut" berada dalam kondisi `disabled` sebelum opsi dipilih.

### US-06 — Memilih Target Waktu Penyelesaian

**As a** calon klien,
**I want to** menentukan seberapa cepat saya membutuhkan website saya selesai,
**so that** developer dapat memprioritaskan pekerjaan dan mempertimbangkan ketersediaan jadwal mereka.

#### Acceptance Criteria

- [ ] Tersedia minimal 4 opsi timeline yang disajikan dalam format kartu (contoh: "Sangat Segera < 2 minggu", "1 - 2 Bulan", "Lebih dari 3 Bulan", "Belum Ada Target").
- [ ] Hanya satu opsi timeline yang dapat dipilih (*single-select*).
- [ ] Pilihan timeline bersifat **wajib**. Tombol "Lanjut" berada dalam kondisi `disabled` sebelum opsi dipilih.
- [ ] Kedua pilihan (anggaran dan timeline) berada dalam **satu langkah yang sama** untuk efisiensi alur.

---

## Epic 6: Persetujuan & Pengiriman Data

### US-07 — Membaca dan Menyetujui Ketentuan Kerja Sama

**As a** calon klien yang telah menyelesaikan semua pertanyaan,
**I want to** membaca ketentuan kerja sama yang singkat dan jelas sebelum mengirimkan data saya,
**so that** saya dan developer memiliki ekspektasi yang sama sejak awal terkait proses kerja, revisi, dan pembayaran.

#### Acceptance Criteria

- [ ] Halaman ini menampilkan ringkasan singkat dari semua pilihan yang telah dibuat pengguna di langkah-langkah sebelumnya.
- [ ] Tersedia teks ketentuan kerja sama yang jelas, ringkas, dan dapat dibaca (tidak lebih dari 5 poin).
- [ ] Tersedia elemen checkbox (atau kartu toggle) dengan label "Saya telah membaca dan menyetujui ketentuan di atas".
- [ ] Checkbox dapat diaktifkan menggunakan tombol `Space` pada keyboard saat dalam kondisi fokus.
- [ ] Tombol "Kirim Requirement" berada dalam kondisi `disabled` secara default.
- [ ] Tombol "Kirim Requirement" **hanya berubah menjadi `enabled`** setelah checkbox dicentang **DAN** semua field kontak (nama & WhatsApp) terisi dengan format yang valid.
- [ ] Jika pengguna menghapus centang checkbox setelah sebelumnya mencentang, tombol "Kirim Requirement" **harus kembali ke kondisi `disabled`** secara instan.

### US-08 — Mengisi Data Kontak Final

**As a** calon klien yang siap mengirimkan requirement saya,
**I want to** memasukkan nama dan nomor WhatsApp saya,
**so that** developer dapat menghubungi saya untuk mendiskusikan proposal lebih lanjut.

#### Acceptance Criteria

- [ ] Tersedia field input untuk **Nama Lengkap** dan **Nomor WhatsApp**.
- [ ] Field Nama Lengkap divalidasi: tidak boleh kosong, minimal 3 karakter. Pesan error: "Nama minimal 3 karakter."
- [ ] Field Nomor WhatsApp divalidasi menggunakan regex: hanya angka, diawali `08` atau `+62` atau `62`, total panjang 10-14 digit. Pesan error: "Masukkan nomor WhatsApp yang valid."
- [ ] Pesan error ditampilkan secara *inline* di bawah field yang bersangkutan, menggunakan `aria-live="polite"` agar dapat dibaca oleh *screen reader*.
- [ ] Validasi dilakukan saat pengguna berpindah dari field tersebut (*on blur*), bukan saat pengguna masih mengetik.
- [ ] Kedua field memiliki atribut `autocomplete` yang sesuai (`name` dan `tel`) untuk memudahkan pengisian di perangkat mobile.

---

## Epic 7: Konfirmasi Sukses

### US-09 — Melihat Halaman Konfirmasi Setelah Submit

**As a** calon klien yang baru saja mengirimkan requirement saya,
**I want to** melihat halaman konfirmasi yang jelas,
**so that** saya mendapatkan kepastian bahwa data saya telah berhasil terkirim dan mengetahui apa langkah selanjutnya.

#### Acceptance Criteria

- [ ] Setelah tombol "Kirim" berhasil diproses, pengguna dinavigasikan ke halaman/tampilan konfirmasi sukses.
- [ ] Halaman menampilkan pesan sukses yang positif dan personal (menyebut nama pengguna jika memungkinkan).
- [ ] Halaman menjelaskan langkah selanjutnya secara eksplisit (contoh: "Developer akan menghubungi Anda melalui WhatsApp dalam 1x24 jam kerja.").
- [ ] Tombol submit pada halaman sebelumnya beralih ke kondisi *loading* (menampilkan *spinner* atau mengubah teks menjadi "Mengirim...") selama proses pengiriman berlangsung untuk mencegah *double submission*.
- [ ] Setelah halaman konfirmasi tampil, tombol "Kembali" pada browser **tidak** membawa pengguna kembali ke form yang sudah terisi (state form direset).

---

## Epic 8: Navigasi & Aksesibilitas Global

### US-10 — Melihat Indikator Progres Pengisian Form

**As a** calon klien yang sedang mengisi form multi-langkah,
**I want to** selalu mengetahui saya sedang berada di langkah keberapa dari total langkah yang ada,
**so that** saya tidak merasa bingung atau kewalahan dan dapat memperkirakan berapa lama proses ini akan berlangsung.

#### Acceptance Criteria

- [ ] Terdapat komponen *progress indicator* (misalnya *progress bar* atau *step dots*) yang terlihat jelas di bagian atas form.
- [ ] Indikator progres diperbarui secara akurat setiap kali pengguna berhasil berpindah ke langkah berikutnya.
- [ ] Indikator progres menyertakan teks yang dapat dibaca *screen reader* (contoh: `aria-label="Langkah 2 dari 6"`).
- [ ] Langkah-langkah yang sudah diselesaikan mendapatkan visual *state* berbeda dari langkah aktif dan langkah yang belum dikunjungi.

### US-11 — Navigasi Keyboard Penuh

**As a** pengguna yang mengandalkan navigasi keyboard (disabilitas motorik atau preferensi pribadi),
**I want to** dapat mengisi dan mengirimkan seluruh form hanya menggunakan keyboard,
**so that** aplikasi ini dapat saya gunakan tanpa hambatan.

#### Acceptance Criteria

- [ ] Seluruh elemen interaktif (kartu, tombol, input, checkbox) dapat difokuskan menggunakan tombol `Tab` dan `Shift+Tab`.
- [ ] *Focus order* mengikuti urutan yang logis dan konsisten dengan alur visual di layar.
- [ ] Kartu pilihan (`role="button"`) dapat diaktifkan/dipilih menggunakan tombol `Enter` atau `Space`.
- [ ] *Focus ring* (indikator fokus) terlihat dengan jelas pada setiap elemen yang difokuskan. Atribut `outline: none` **dilarang keras** digunakan tanpa pengganti *focus indicator* yang setara.
- [ ] Tidak ada elemen yang menjebak fokus (*focus trap*) kecuali dalam konteks modal/dialog yang memang disengaja.
