/**
 * Página de inicio — formato de LANDING institucional.
 *
 * Estructura editorial, no de panel administrativo:
 *   1. Hero amplio con CTA único y claro
 *   2. Servicios como banda horizontal (no cards)
 *   3. Sección storytelling "Quiénes somos" (ilustración + texto)
 *   4. Cifras inline en una sola línea narrativa
 *   5. Banner CTA principal (full-width)
 *   6. Comunicados como tira editorial (no grid)
 *   7. Cierre con compromisos institucionales
 */
import { Link } from 'react-router-dom';
import {
  Search, FileText, Building2, Users, ArrowRight, Calendar,
  ChevronRight, Award, Heart, MapPin,
} from 'lucide-react';
import Logo from '../components/Logo';

export default function Home() {
  return (
    <>
      {/* ═══ HERO LANDING ═══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(120deg, #930D31 0%, #6E0A24 55%, #4F0719 100%)',
        }}
      >
        <div aria-hidden="true" className="absolute inset-0 gov-pattern opacity-60" />

        {/* Ornamento heráldico esquina superior derecha */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(180,83,9,0.8) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 lg:px-6 py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="inline-block w-10 h-px bg-[var(--color-gold)]" />
            <span className="text-[11px] font-semibold tracking-[0.4em] text-[var(--color-gold)] uppercase">
              Portal oficial · Servicios en línea
            </span>
            <span className="inline-block w-10 h-px bg-[var(--color-gold)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white max-w-4xl mx-auto">
            Tu instituto deportivo,<br />
            <span className="text-[var(--color-gold)]">ahora en línea</span>
          </h1>
          <p className="mt-6 text-base md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Consulta tu referencia de pago, descárgala y mantén tu membresía vigente
            sin acudir a ventanilla. Un trámite. Tres minutos.
          </p>
          <div className="mt-10 inline-flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/consulta"
              className="group inline-flex items-center gap-2 bg-white text-[var(--color-primary)] hover:bg-[var(--color-gold-light)] hover:-translate-y-0.5 font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-md shadow-lg shadow-black/30 transition-all"
            >
              <Search className="h-5 w-5" />
              Consultar mi referencia
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/acerca"
              className="text-white/90 hover:text-white font-semibold underline underline-offset-4 decoration-[var(--color-gold)] decoration-2 transition-colors px-4 py-2"
            >
              Conocer al Instituto
            </Link>
          </div>
        </div>

        {/* Onda decorativa inferior */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 80"
          className="block w-full text-white"
          preserveAspectRatio="none"
          style={{ height: 48 }}
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="currentColor"
          />
        </svg>
      </section>

      {/* ═══ SERVICIOS EN BANDA HORIZONTAL ═════════════════════════ */}
      <section className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <ul className="flex flex-col md:flex-row md:items-stretch md:divide-x divide-[var(--color-border)]">
            <ServiceLink to="/consulta"   icon={Search}     title="Consulta de referencia"   desc="Pagos pendientes y vigentes" />
            <ServiceLink to="/consulta"   icon={FileText}   title="Descarga de ficha BBVA"   desc="PDF oficial bancario" />
            <ServiceLink to="/sucursales" icon={MapPin}     title="Sucursales y horarios"    desc="Centros deportivos del Instituto" />
            <ServiceLink to="/acerca"     icon={Users}      title="Acerca de IMCUFIDEEM"     desc="Misión, visión y programas" />
          </ul>
        </div>
      </section>

      {/* ═══ STORYTELLING: SOMOS EL INSTITUTO ═══════════════════════ */}
      <section className="py-16 lg:py-24 bg-[var(--color-paper)]">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Bloque visual institucional (sin imagen real, ornamental) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-xl shadow-[var(--color-primary-darker)]/20">
              {/* Fondo institucional con marca de agua */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, #930D31 0%, #6E0A24 100%)',
                }}
              />
              <div aria-hidden="true" className="absolute inset-0 gov-pattern opacity-40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="text-[var(--color-gold)] text-[10px] font-bold uppercase tracking-[0.5em] mb-6">
                  Instituto Municipal
                </div>
                <Logo size={120} orientation="vertical" dark />
                <div className="mt-6 text-white/80 text-xs uppercase tracking-widest">Desde 2005</div>
                <div className="mt-8 w-12 h-px bg-[var(--color-gold)]" />
                <div className="mt-4 text-white/70 text-xs italic max-w-xs">
                  "Salud, deporte y comunidad al servicio de la ciudadanía."
                </div>
              </div>
            </div>
            {/* Sello dorado decorativo */}
            <div className="hidden md:block absolute -bottom-6 -right-6 bg-[var(--color-gold)] text-white p-4 rounded-md shadow-lg rotate-3">
              <div className="text-[10px] uppercase tracking-widest text-center">Aval</div>
              <div className="text-xs font-bold uppercase tracking-wider">Municipal</div>
            </div>
          </div>

          {/* Texto editorial */}
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
              Quiénes somos
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[var(--color-institutional-dark)] tracking-tight leading-tight">
              Un Instituto al servicio<br />
              de la ciudadanía.
            </h2>
            <div className="mt-5 w-16 h-1 bg-[var(--color-primary)]" />
            <div className="mt-6 space-y-4 text-base text-[var(--color-foreground)] leading-relaxed">
              <p>
                IMCUFIDEEM es el organismo público descentralizado de la administración municipal
                dedicado a la <strong>cultura física, la recreación y el deporte</strong>. Operamos con
                instalaciones equipadas en distintas zonas de la ciudad.
              </p>
              <p>
                Trabajamos bajo principios de <strong>inclusión, transparencia y servicio
                ciudadano</strong>, ofreciendo desde programas formativos para niñas, niños y jóvenes,
                hasta programas de mantenimiento físico para adultos mayores.
              </p>
            </div>
            <Link
              to="/acerca"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] hover:gap-3 transition-all"
            >
              Más información sobre el Instituto <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ CIFRAS COMO NARRATIVA INLINE ═══════════════════════════ */}
      <section className="bg-white border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-10">
            El Instituto en cifras
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            <InlineStat value="4,000+" label="Socios activos atendidos" />
            <InlineStat value="2"       label="Sucursales en operación" />
            <InlineStat value="15"      label="Disciplinas deportivas" />
            <InlineStat value="20 años" label="Sirviendo a la comunidad" />
          </div>
        </div>
      </section>

      {/* ═══ BANNER CTA FULL-WIDTH ═════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(120deg, #930D31 0%, #6E0A24 100%)',
        }}
      >
        <div aria-hidden="true" className="absolute inset-0 gov-pattern opacity-50" />
        <div className="relative max-w-6xl mx-auto px-4 lg:px-6 py-14 lg:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-center md:text-left">
          <div className="text-white">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)]">
              Hazlo en tres minutos
            </span>
            <h2 className="mt-2 text-2xl md:text-4xl font-bold leading-tight">
              Consulta tu referencia ahora mismo.
            </h2>
            <p className="mt-3 text-white/85 max-w-xl">
              Sólo necesitas tu matrícula y fecha de nacimiento. Sin filas, sin trámites
              presenciales, sin papeleo adicional.
            </p>
          </div>
          <Link
            to="/consulta"
            className="group shrink-0 inline-flex items-center gap-2 bg-white text-[var(--color-primary)] hover:bg-[var(--color-gold-light)] hover:-translate-y-0.5 font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-md shadow-lg shadow-black/30 transition-all self-center"
          >
            Consultar referencia
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ═══ COMUNICADOS COMO TIRA EDITORIAL ════════════════════════ */}
      <section className="py-16 lg:py-20 bg-[var(--color-paper)]">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
                Comunicados oficiales
              </span>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[var(--color-institutional-dark)] tracking-tight">
                Lo último del Instituto
              </h2>
            </div>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] hover:underline inline-flex items-center gap-1">
              Ver todos <ChevronRight className="h-3 w-3" />
            </a>
          </div>

          {/* Tira editorial: un destacado + dos secundarios en línea */}
          <div className="space-y-0 divide-y divide-[var(--color-border-strong)] border-t border-b border-[var(--color-border-strong)]">
            <EditorialNote
              date="01 jun 2026"
              tag="Operación"
              title="Horarios extendidos en sucursal Norte de la Loma"
              desc="A partir del 15 de junio, la sucursal Norte de la Loma estará abierta los sábados de 7:00 a 19:00 horas para atender la creciente demanda de socios. Adicionalmente se habilitarán dos nuevos horarios de natación matutina."
              featured
            />
            <EditorialNote
              date="20 may 2026"
              tag="Pagos"
              title="Recordatorio: vigencia de referencias BBVA"
              desc="Las referencias bancarias tienen una vigencia de 15 días naturales a partir de su emisión. Solicita una nueva si tu referencia ha vencido."
            />
            <EditorialNote
              date="10 may 2026"
              tag="Programas"
              title="Inscripciones abiertas al torneo de verano 2026"
              desc="Acude a tu sucursal o emite tu referencia para inscribirte al torneo interno. Cupo limitado por categoría."
            />
          </div>
        </div>
      </section>

      {/* ═══ COMPROMISOS INSTITUCIONALES ═══════════════════════════ */}
      <section className="bg-[var(--color-institutional-dark)] text-white py-10">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 grid sm:grid-cols-3 gap-8 text-center sm:text-left">
          <Pillar icon={Award} title="Transparencia" desc="Información pública y auditada." />
          <Pillar icon={Heart} title="Servicio humano" desc="Atención cercana y cordial." />
          <Pillar icon={Building2} title="Compromiso municipal" desc="Inversión en infraestructura deportiva." />
        </div>
      </section>
    </>
  );
}

/* ─── Componentes auxiliares ────────────────────────────────────────── */

function ServiceLink({ to, icon: Icon, title, desc }) {
  return (
    <li className="flex-1">
      <Link
        to={to}
        className="group flex items-center gap-4 px-4 lg:px-6 py-5 hover:bg-[var(--color-primary-light)]/50 transition-colors h-full"
      >
        <div className="shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center group-hover:bg-[var(--color-primary)] transition-colors">
          <Icon className="h-5 w-5 text-[var(--color-primary)] group-hover:text-white transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-[var(--color-institutional-dark)] leading-tight">
            {title}
          </div>
          <div className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
            {desc}
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-[var(--color-primary)] group-hover:translate-x-1 transition-transform shrink-0" />
      </Link>
    </li>
  );
}

function InlineStat({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl font-bold text-[var(--color-primary)] leading-none tracking-tight">
        {value}
      </div>
      <div className="mt-3 text-xs uppercase tracking-widest text-[var(--color-muted-foreground)] max-w-[180px] mx-auto">
        {label}
      </div>
    </div>
  );
}

function EditorialNote({ date, tag, title, desc, featured }) {
  return (
    <article className={`grid md:grid-cols-12 gap-6 py-6 lg:py-8 ${featured ? 'bg-white px-4 lg:px-6 -mx-4 lg:-mx-6' : ''}`}>
      {/* Columna fecha */}
      <div className="md:col-span-3 flex md:flex-col gap-2 md:gap-1">
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
          {tag}
        </div>
        <div className="flex items-center gap-1 text-xs text-[var(--color-muted-foreground)] uppercase tracking-wide">
          <Calendar className="h-3 w-3" /> {date}
        </div>
        {featured && (
          <span className="hidden md:inline-block mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)]">
            ★ Destacado
          </span>
        )}
      </div>

      {/* Columna contenido */}
      <div className="md:col-span-9">
        <h3 className={`font-bold text-[var(--color-institutional-dark)] leading-snug ${featured ? 'text-xl' : 'text-base'}`}>
          {title}
        </h3>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)] leading-relaxed">
          {desc}
        </p>
        <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] hover:underline">
          Leer comunicado <ChevronRight className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}

function Pillar({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-6 w-6 text-[var(--color-gold)] shrink-0 mt-0.5" />
      <div>
        <div className="font-bold uppercase tracking-wider text-sm">{title}</div>
        <div className="text-sm text-white/80 mt-1">{desc}</div>
      </div>
    </div>
  );
}
