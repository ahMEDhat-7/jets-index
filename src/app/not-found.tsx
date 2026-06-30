export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0f0a] px-4 text-center font-mono text-[#c4d9c4]">
      <div className="mb-6 text-8xl font-bold text-[#d4a574]">404</div>
      <h1 className="mb-2 text-2xl font-bold">Target Not Found</h1>
      <p className="mb-8 max-w-md text-[#7a8f7a]">
        The requested resource could not be located in the database.
      </p>
      <a
        href="/"
        className="rounded bg-[#d4a574] px-6 py-2 font-bold text-[#0a0f0a] hover:bg-[#d4a574]/80"
      >
        Return to Base
      </a>
    </div>
  );
}
