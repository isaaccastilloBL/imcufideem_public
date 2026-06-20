/**
 * Barra superior estilo portal gubernamental (similar a gob.mx).
 * Fondo oscuro institucional con accesos rápidos y datos de contacto.
 */
import { Phone, Mail, MapPin } from 'lucide-react';

export default function GobBar() {
  return (
    <div className="bg-[var(--color-secondary-dark)] text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-white/85">
            <MapPin className="h-3 w-3" /> Gobierno Municipal
          </span>
          <a href="#" className="hidden md:inline text-white/85 hover:text-white">Trámites</a>
          <a href="#" className="hidden md:inline text-white/85 hover:text-white">Transparencia</a>
          <a href="#" className="hidden md:inline text-white/85 hover:text-white">Contacto</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+520000000000" className="inline-flex items-center gap-1.5 text-white/85 hover:text-white">
            <Phone className="h-3 w-3" /> 01 800 000 0000
          </a>
          <a href="mailto:contacto@imcufideem.gob.mx" className="hidden sm:inline-flex items-center gap-1.5 text-white/85 hover:text-white">
            <Mail className="h-3 w-3" /> contacto@imcufideem.gob.mx
          </a>
        </div>
      </div>
    </div>
  );
}
