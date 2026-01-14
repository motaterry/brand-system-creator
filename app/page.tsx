import BrandIntakeForm from "@/components/BrandIntakeForm";

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4 text-neutral-dark-80 dark:text-neutral-light-80 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg p-8 border border-neutral-dark-40 dark:border-neutral-dark-60 bg-white/20 dark:bg-neutral-dark-70/50 transition-colors duration-300">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-neutral-dark-90 dark:text-neutral-light-90 mb-2 transition-colors duration-300">
              Brand System Creator
            </h1>
            <p className="text-lg text-neutral-dark-40 dark:text-neutral-light-50 transition-colors duration-300">
              Fill out your brand details to generate a complete brand pack with Cursor AI task
            </p>
          </div>
          <BrandIntakeForm />
        </div>
      </div>
    </main>
  );
}
