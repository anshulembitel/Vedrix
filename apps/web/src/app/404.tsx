
export default function Global404() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-white text-slate-900"
    >
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-sm text-slate-600">
          The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium
                     bg-[#6E4BFF] text-white shadow-[0_8px_20px_rgba(110,75,255,0.4)] hover:opacity-90 transition"
        >
          Go back home
        </a>
      </div>
    </main>
  );
}