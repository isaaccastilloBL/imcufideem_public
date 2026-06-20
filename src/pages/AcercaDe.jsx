/**
 * Acerca del Instituto — estructura editorial, secciones tipo gaceta.
 */
import { ChevronRight } from 'lucide-react';

export default function AcercaDe() {
  return (
    <div className="bg-[var(--color-paper)] py-10 lg:py-12">
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        <nav className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] mb-4">
          Inicio <ChevronRight className="inline h-3 w-3 mx-1" />
          <span className="text-[var(--color-foreground)] font-semibold">Acerca de IMCUFIDEEM</span>
        </nav>

        <div className="border-l-4 border-[var(--color-primary)] pl-4">
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]">
            Información institucional
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mt-1">
            Acerca del Instituto
          </h1>
        </div>

        {/* Bloque editorial principal */}
        <div className="mt-8 bg-white rounded-lg overflow-hidden border-t-4 border-[var(--color-gold)] shadow-sm ring-1 ring-black/5">
          <header className="bg-[var(--color-secondary)] text-white px-6 py-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
              Quiénes somos
            </span>
          </header>
          <div className="p-6 lg:p-8 prose prose-sm max-w-none text-[var(--color-foreground)] leading-relaxed">
            <p className="mb-3">
              El <strong>Instituto Municipal de Cultura Física, Recreación y Deporte (IMCUFIDEEM)</strong>{' '}
              es un organismo público descentralizado de la administración municipal, dedicado a promover,
              organizar y desarrollar la práctica del deporte y la actividad física entre los habitantes
              del municipio.
            </p>
            <p>
              Operamos con instalaciones equipadas en distintas zonas de la ciudad, ofreciendo desde
              programas formativos para niñas, niños y jóvenes, hasta programas de mantenimiento físico
              para adultos mayores. Trabajamos bajo principios de inclusión, transparencia y servicio
              ciudadano.
            </p>
          </div>
        </div>

        {/* Cuatro bloques institucionales en grid sin redondeo */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <Statement n="01" title="Misión">
            Fomentar el desarrollo integral de las personas a través de la cultura física,
            la recreación y el deporte, garantizando instalaciones seguras y programas accesibles
            a toda la ciudadanía del municipio.
          </Statement>
          <Statement n="02" title="Visión">
            Ser el referente municipal en el impulso de hábitos saludables y formación
            deportiva, con servicios modernos, transparentes y orientados al ciudadano.
          </Statement>
          <Statement n="03" title="Valores">
            Inclusión, transparencia, respeto, responsabilidad social y excelencia
            en el servicio público.
          </Statement>
          <Statement n="04" title="Compromiso">
            Servicio cercano, instalaciones bien mantenidas, atención humana
            y procesos digitales sencillos para todos los ciudadanos.
          </Statement>
        </div>

        {/* Marco normativo */}
        <div className="mt-8 bg-white rounded-lg border-t-4 border-[var(--color-primary)] border-x border-b border-[var(--color-border)] p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-secondary)] mb-3">
            Marco normativo
          </h2>
          <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
            Nuestras actividades se rigen por el <strong>Reglamento Interno del IMCUFIDEEM</strong>,
            la <strong>Ley General de Cultura Física y Deporte</strong>, así como por los acuerdos
            del Consejo Directivo. Los documentos están disponibles en la sección de transparencia.
          </p>
        </div>
      </div>
    </div>
  );
}

function Statement({ n, title, children }) {
  return (
    <section className="group bg-white rounded-lg border-l-4 border-[var(--color-primary)] border-y border-r border-[var(--color-border)] p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-3xl font-bold text-[var(--color-border-strong)] group-hover:text-[var(--color-primary)] transition-colors leading-none">
          {n}
        </span>
        <h3 className="font-bold uppercase tracking-widest text-sm text-[var(--color-secondary)]">
          {title}
        </h3>
      </div>
      <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
        {children}
      </p>
    </section>
  );
}
