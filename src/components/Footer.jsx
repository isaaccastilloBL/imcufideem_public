/**
 * Pie de página institucional multi-columna estilo portal gubernamental.
 */
import { Phone, Mail, MapPin, Facebook, Instagram, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="mt-12">
      <div className="gov-rule" aria-hidden="true" />
      <div className="bg-[var(--color-secondary-dark)] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 grid gap-8 md:grid-cols-4">
          {/* Identidad */}
          <div className="md:col-span-1">
            <Logo size={44} orientation="horizontal" dark />
            <p className="mt-4 text-sm text-white/75 leading-relaxed">
              Instituto Municipal de Cultura Física, Recreación y Deporte.
              Sirviendo a la comunidad con instalaciones, clases y programas
              deportivos accesibles.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-3">
              Servicios
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/consulta" className="hover:text-white">Consulta tu referencia</Link></li>
              <li><Link to="/sucursales" className="hover:text-white">Sucursales y horarios</Link></li>
              <li><a href="#" className="hover:text-white">Calendario deportivo</a></li>
              <li><a href="#" className="hover:text-white">Reglamento interno</a></li>
              <li><a href="#" className="hover:text-white">Programas sociales</a></li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-3">
              Institucional
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/acerca" className="hover:text-white">¿Qué es IMCUFIDEEM?</Link></li>
              <li><a href="#" className="hover:text-white">Misión y visión</a></li>
              <li><a href="#" className="hover:text-white">Transparencia</a></li>
              <li><a href="#" className="hover:text-white">Aviso de privacidad</a></li>
              <li><a href="#" className="hover:text-white">Acceso al sistema interno</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-3">
              Contáctanos
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Av. Principal #123, Centro<br />C.P. 00000</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" /> 01 800 000 0000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:contacto@imcufideem.gob.mx" className="hover:text-white">
                  contacto@imcufideem.gob.mx
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" aria-label="Facebook" className="text-white/70 hover:text-white"><Facebook className="h-4 w-4" /></a>
              <a href="#" aria-label="Instagram" className="text-white/70 hover:text-white"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Sitio web" className="text-white/70 hover:text-white"><Globe className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/60">
            <span>© {new Date().getFullYear()} IMCUFIDEEM. Todos los derechos reservados.</span>
            <span>Portal oficial · Gobierno Municipal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
