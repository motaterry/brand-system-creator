import BrandIntakeForm from "@/components/BrandIntakeForm";

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4 text-neutral-dark-80">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg p-8 border border-neutral-dark-40 bg-white/20" style={{ color: 'var(--neutral-light-80)' }}>
          <div className="mb-8">
            <h1 className="text-4xl font-black text-neutral-dark-90 mb-2">
              Brand System Creator
            </h1>
            <p className="text-lg text-neutral-dark-40">
              Fill out your brand details to generate a complete brand pack with Cursor AI task
            </p>
          </div>
          <BrandIntakeForm />
        </div>
      </div>
    </main>
  );
}
