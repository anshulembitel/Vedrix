export default function NotFound() {
  return (
    <main className="min-h-[320px] flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-sm text-slate-500">
          The page you’re looking for doesn&apos;t exist or may have been moved.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium
                     bg-[#6E4BFF] text-white shadow-[0_8px_20px_rgba(110,75,255,0.4)]
                     hover:opacity-90 transition"
        >
          Go back home
        </a>
      </div>
    </main>
  );
}