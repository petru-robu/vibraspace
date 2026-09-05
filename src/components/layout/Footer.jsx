export default function Footer() {
  return (
    <footer className="border-t border-neutral-500/20 py-12 text-xs leading-relaxed text-neutral-500">
      <p className="mb-10 w-full text-center">
        Au fost folosite proiectele realizate în cadrul atelierului de proiectare nr. 46, desfășurat în anul universitar 2025-2026 în cadrul Facultății de Arhitectură.
      </p>

      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-3">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]">
            Credentials
          </p>
          <p className="text-neutral-400">© Composing Atmospheres</p>
          <p className="mt-2">An experimental architecture workshop</p>
        </div>

        <div className="md:col-span-3">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]">
            Autor
          </p>
          <p className="text-neutral-400">drd. arh. Ioana Robu</p>
        </div>

        <div className="md:col-span-3">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]">
            Coordonatori
          </p>
          <ul className="space-y-1 text-neutral-400">
            <li>Prof. dr. arh. Daniela Rădulescu Andronic</li>
            <li>Conf. dr. arh. Haytham Zeki</li>
            <li>Asist. dr. arh. Cătălin Caragea</li>
            <li>Șef lucr. dr. arh. Flavia Roșu</li>
            <li>Drd. arh. Ioana Robu</li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]">
            Consultanți
          </p>
          <ul className="space-y-1 text-neutral-400">
            <li>Dr. Raul Mihalyi - rezident neurochirurgie</li>
            <li>Radu Vâlcu - muzician și producător</li>
            <li>Petru Robu - sound studio și IT</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
