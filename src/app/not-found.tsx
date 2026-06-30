import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header lang="en" />
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 text-8xl font-bold text-tactical-accent">
          404
        </div>
        <h1 className="mb-2 font-tactical-display text-2xl font-bold text-tactical-text">
          Target Not Found
        </h1>
        <p className="mb-8 max-w-md text-tactical-text-secondary">
          The requested resource could not be located in the database.
        </p>
        <Link
          href="/"
          className="rounded bg-tactical-accent px-6 py-2 font-tactical-body font-bold text-tactical-bg transition-colors hover:bg-tactical-accent/80"
        >
          Return to Base
        </Link>
      </main>
      <Footer lang="en" />
    </>
  );
}
