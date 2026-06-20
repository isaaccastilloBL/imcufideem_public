/**
 * Navegación principal del portal — barra horizontal con secciones.
 * Se colapsa en móvil con un menú hamburguesa nativo.
 */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const ITEMS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/consulta', label: 'Consulta tu referencia' },
  { to: '/sucursales', label: 'Sucursales' },
  { to: '/acerca', label: 'Acerca de IMCUFIDEEM' },
  { to: '/contacto', label: 'Contacto' },
];

export default function MainNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[var(--color-secondary)] text-white sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between">
        <ul className="hidden md:flex">
          {ITEMS.map((it) => (
            <li key={it.to}>
              <NavLink
                to={it.to}
                end={it.end}
                className={({ isActive }) =>
                  `inline-block px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-[var(--color-gold)] text-white bg-white/5'
                      : 'border-transparent text-white/85 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {it.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden inline-flex items-center gap-2 px-3 py-3 text-sm"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          Menú
        </button>

        <a
          href="/consulta"
          className="hidden md:inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] hover:-translate-y-0.5 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-md border-b-2 border-[var(--color-gold)] shadow-sm hover:shadow-md transition-all"
        >
          Consultar referencia
        </a>
      </div>

      {/* Drawer móvil */}
      {open && (
        <ul className="md:hidden border-t border-white/10 pb-2">
          {ITEMS.map((it) => (
            <li key={it.to}>
              <NavLink
                to={it.to}
                end={it.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 text-sm font-medium border-l-4 ${
                    isActive
                      ? 'border-[var(--color-gold)] bg-white/5 text-white'
                      : 'border-transparent text-white/85'
                  }`
                }
              >
                {it.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
