/**
 * Catálogo institucional de sucursales — formato de ficha oficial.
 */
import { ChevronRight, MapPin, Phone, Clock } from 'lucide-react';

const SUCURSALES = [
  {
    siglas: 'NDLA',
    name: 'Sucursal Norte de la Loma',
    address: 'Av. Principal #123, Col. Centro · C.P. 00000',
    phone: '01 800 000 0000',
    hours: 'Lun a Vie 06:00 — 22:00 hrs · Sáb 07:00 — 19:00 hrs',
    services: ['Box', 'Pesas', 'Crossfit', 'Yoga', 'Natación'],
  },
  {
    siglas: 'NDHG',
    name: 'Sucursal Norte de Hermosillo Grande',
    address: 'Calle Reforma #456, Col. Norte · C.P. 00001',
    phone: '01 800 000 0001',
    hours: 'Lun a Vie 06:00 — 22:00 hrs · Sáb 07:00 — 19:00 hrs',
    services: ['Box', 'Pesas', 'Spinning', 'Karate', 'Zumba'],
  },
];

export default function Sucursales() {
  return (
    <div className="bg-[var(--color-paper)] py-10 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <nav className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] mb-4">
          Inicio <ChevronRight className="inline h-3 w-3 mx-1" />
          <span className="text-[var(--color-foreground)] font-semibold">Sucursales</span>
        </nav>

        <div className="border-l-4 border-[var(--color-primary)] pl-4">
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]">
            Directorio institucional
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mt-1">
            Sucursales del Instituto
          </h1>
          <p className="mt-3 text-sm text-[var(--color-muted-foreground)] leading-relaxed max-w-2xl">
            Cada sucursal cuenta con instalaciones equipadas y programas deportivos adaptados
            a su comunidad. Acude con tu credencial de socio para hacer check-in.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-8">
          {SUCURSALES.map((s, idx) => (
            <article
              key={s.siglas}
              className="bg-white rounded-lg overflow-hidden border border-[var(--color-border)] border-t-4 border-t-[var(--color-gold)] shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Banner oscuro institucional */}
              <header className="bg-[var(--color-secondary)] text-white px-5 py-3 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)]">
                    Ficha {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-base font-bold leading-tight mt-0.5">{s.name}</h2>
                </div>
                <span className="font-mono text-xs bg-white/15 px-2 py-1 rounded-md border border-white/20 tracking-widest">
                  {s.siglas}
                </span>
              </header>

              {/* Tabla de datos */}
              <dl className="divide-y divide-[var(--color-border)]">
                <Row icon={MapPin} label="Domicilio" value={s.address} />
                <Row icon={Phone}  label="Teléfono"  value={<a href={`tel:+52${s.phone.replace(/\s/g, '')}`} className="text-[var(--color-primary)] hover:underline">{s.phone}</a>} />
                <Row icon={Clock}  label="Horario"   value={s.hours} />
              </dl>

              {/* Clases */}
              <div className="px-5 py-4 border-t border-[var(--color-border)] bg-[var(--color-paper)]/40">
                <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-muted-foreground)] mb-2">
                  Clases disponibles
                </span>
                <ul className="flex flex-wrap gap-1.5">
                  {s.services.map((srv) => (
                    <li
                      key={srv}
                      className="inline-block text-xs bg-white text-[var(--color-foreground)] border border-[var(--color-border-strong)] rounded-md px-2.5 py-1 uppercase tracking-wider font-semibold"
                    >
                      {srv}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[140px_1fr]">
      <dt className="bg-[var(--color-paper)] border-r border-[var(--color-border)] px-3 py-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
        <Icon className="h-3 w-3 text-[var(--color-primary)]" />
        {label}
      </dt>
      <dd className="px-4 py-3 text-sm text-[var(--color-foreground)] leading-snug">
        {value}
      </dd>
    </div>
  );
}
