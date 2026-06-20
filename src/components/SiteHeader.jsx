/**
 * Encabezado institucional principal.
 * Logo + nombre completo del instituto, con regla institucional decorativa.
 */
import Logo from './Logo';

export default function SiteHeader() {
  return (
    <header className="bg-white border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-5 flex items-center justify-between gap-4">
        <Logo size={56} orientation="horizontal" />
        <div className="hidden lg:flex flex-col items-end text-right">
          <span className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Portal oficial de servicios
          </span>
          <span className="text-sm font-semibold text-[var(--color-secondary)] mt-0.5">
            Periodo de gestión 2025 — 2027
          </span>
        </div>
      </div>
      <div className="gov-rule" aria-hidden="true" />
    </header>
  );
}
