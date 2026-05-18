export default function DarkPage({ children }) {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 font-['Poppins',_sans-serif] selection:bg-neutral-100 selection:text-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12">
        {children}
      </div>
    </main>
  );
}
