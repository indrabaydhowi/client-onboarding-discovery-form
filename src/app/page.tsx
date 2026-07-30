/**
 * HomePage Component
 * Entry point for the Client Onboarding SPA.
 */
export default function HomePage() {
  return (
    <main class="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div class="max-w-2xl space-y-6">
        <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Client Onboarding & Project Discovery Form
        </h1>
        <p class="text-lg text-slate-400">
          Aplikasi interaktif berbasis kartu untuk pengumpulan requirement proyek web development.
        </p>
      </div>
    </main>
  );
}
