/**
 * Consulta y descarga de referencias — estética institucional.
 *
 * Sin "cards" suaves: secciones planas, bandas de color, tablas
 * para los datos y bloques con encabezado oscuro.
 */
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Search, Download, AlertCircle, CheckCircle2, Clock, XCircle,
  FileText, ShieldCheck, ChevronRight, Loader2, Info, ArrowLeft, FileCheck,
} from 'lucide-react';
import { lookupReferences, downloadReferencePdf, downloadReferenceReceipt } from '../services/api';

const STATUS = {
  PENDING:   { label: 'Pendiente',    color: 'amber', icon: Clock,        desc: 'Esperando pago en banco' },
  PARTIAL:   { label: 'Pago parcial', color: 'blue',  icon: AlertCircle,  desc: 'Hay abonos; falta cubrir el saldo' },
  PAID:      { label: 'Pagada',       color: 'green', icon: CheckCircle2, desc: 'Pago validado por el Instituto' },
  EXPIRED:   { label: 'Vencida',      color: 'gray',  icon: XCircle,      desc: 'Solicita una nueva referencia' },
  CANCELLED: { label: 'Cancelada',    color: 'gray',  icon: XCircle,      desc: 'Anulada por el inscriptor' },
};

const fmtMoney = (n) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(n || 0));

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

export default function ConsultaReferencia() {
  const [creds, setCreds] = useState({ matricula: '', dateOfBirth: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [downloading, setDownloading] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!creds.matricula.trim() || !creds.dateOfBirth) {
      toast.error('Captura tu matrícula y fecha de nacimiento');
      return;
    }
    setLoading(true);
    try {
      const data = await lookupReferences(creds);
      setResult(data);
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.error
        || (err.response?.status === 401 ? 'Los datos no coinciden con un registro válido' : 'No se pudo consultar la información');
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Descarga el PDF apropiado según el estado de la referencia:
   *   - PENDING / PARTIAL → ficha bancaria BBVA para pagar
   *   - PAID              → recibo oficial de pago
   */
  const handleDownload = async (ref, kind) => {
    setDownloading(`${ref.id}-${kind}`);
    try {
      const args = {
        id: ref.id,
        matricula: creds.matricula,
        dateOfBirth: creds.dateOfBirth,
      };
      const blob = kind === 'receipt'
        ? await downloadReferenceReceipt(args)
        : await downloadReferencePdf(args);

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = kind === 'receipt'
        ? `recibo-${ref.reference}.pdf`
        : `referencia-${ref.reference}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(kind === 'receipt'
        ? 'Recibo oficial descargado'
        : 'Referencia descargada');
    } catch (err) {
      const msg = err.response?.data?.message
        || 'No se pudo descargar el documento. Verifica tus datos e intenta de nuevo.';
      toast.error(msg);
    } finally {
      setDownloading(null);
    }
  };

  // ─── Vista de formulario ────────────────────────────────────────────
  if (!result) {
    return (
      <div className="bg-[var(--color-paper)] py-10 lg:py-12">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          {/* Migas + título oficial */}
          <Breadcrumbs items={['Inicio', 'Consulta tu referencia']} />

          <SectionHeader
            number="01"
            title="Consulta tu referencia"
            description="Verificamos tu identidad para mostrar únicamente la información del socio titular. Captura los datos tal como aparecen en tu credencial."
          />

          {/* Formulario oficial — header oscuro y esquinas suaves */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 bg-white rounded-lg overflow-hidden border-t-4 border-[var(--color-gold)] shadow-md ring-1 ring-black/5"
          >
            <header className="bg-[var(--color-secondary)] text-white px-6 py-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[var(--color-gold)]" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Verificación de identidad
              </span>
            </header>

            <div className="p-6 space-y-5">
              <Field label="Matrícula del socio" required>
                <input
                  type="text"
                  required
                  autoFocus
                  value={creds.matricula}
                  onChange={(e) =>
                    setCreds({ ...creds, matricula: e.target.value.toUpperCase().slice(0, 12) })
                  }
                  placeholder="NDLA000001"
                  className="w-full font-mono tracking-wider rounded-md border border-[var(--color-border-strong)] bg-white px-3 py-2.5 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-colors"
                />
                <Hint>4 letras de la sucursal + 6 dígitos. Aceptamos identificadores legacy del sistema anterior.</Hint>
              </Field>

              <Field label="Fecha de nacimiento" required>
                <input
                  type="date"
                  required
                  value={creds.dateOfBirth}
                  onChange={(e) => setCreds({ ...creds, dateOfBirth: e.target.value })}
                  max={new Date().toISOString().slice(0, 10)}
                  className="w-full rounded-md border border-[var(--color-border-strong)] bg-white px-3 py-2.5 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-colors"
                />
              </Field>

              <Notice icon={Info}>
                Tus datos no se almacenan en este portal. Se utilizan únicamente
                para verificar tu identidad ante el sistema interno del Instituto.
              </Notice>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold uppercase tracking-wider text-sm py-3 rounded-md border-b-4 border-[var(--color-gold)] shadow-sm hover:shadow-md transition-all disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {loading ? 'Buscando…' : 'Consultar referencias'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ─── Vista de resultados ─────────────────────────────────────────────
  const { user, references } = result;
  return (
    <div className="bg-[var(--color-paper)] py-10 lg:py-12 min-h-[calc(100vh-300px)]">
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        <button
          type="button"
          onClick={() => setResult(null)}
          className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider hover:underline inline-flex items-center gap-1 mb-4"
        >
          <ArrowLeft className="h-3 w-3" /> Volver al formulario
        </button>

        {/* Ficha de identificación del socio — encabezado tipo cédula */}
        <div className="bg-white rounded-lg overflow-hidden border-t-4 border-[var(--color-gold)] shadow-sm ring-1 ring-black/5">
          <header className="bg-[var(--color-secondary)] text-white px-6 py-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
              Ficha del socio
            </span>
          </header>
          <dl className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border)]">
            <DataCell label="Socio titular" value={`${user.firstName} ${user.lastName}`} bold />
            <DataCell label="Matrícula" value={user.matricula} mono />
            <DataCell
              label="Sucursal"
              value={user.branch ? `${user.branch.siglas} — ${user.branch.name}` : '—'}
            />
          </dl>
        </div>

        {/* Sección de referencias */}
        <div className="mt-8">
          <SectionHeader
            number="02"
            title={`Referencias del socio (${references.length})`}
            description="Listado oficial de referencias emitidas. Los documentos vigentes pueden descargarse en formato PDF para su presentación bancaria."
          />

          {references.length === 0 ? (
            <div className="mt-6 bg-white rounded-lg border border-[var(--color-border)] p-10 text-center shadow-sm">
              <FileText className="h-10 w-10 mx-auto text-[var(--color-muted-foreground)] mb-3" />
              <p className="text-[var(--color-foreground)] font-bold uppercase tracking-wide text-sm">
                Sin referencias emitidas
              </p>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-2 max-w-md mx-auto">
                Acude a tu sucursal para que un inscriptor te emita una nueva referencia de pago.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {references.map((r) => (
                <ReferenceBlock
                  key={r.id}
                  ref_={r}
                  downloadingKind={
                    downloading === `${r.id}-pdf` ? 'pdf'
                    : downloading === `${r.id}-receipt` ? 'receipt'
                    : null
                  }
                  onDownload={(kind) => handleDownload(r, kind)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Bloques institucionales ───────────────────────────────────────── */

function Breadcrumbs({ items }) {
  return (
    <nav className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] mb-4">
      {items.map((it, i) => (
        <span key={i}>
          {i > 0 && <ChevronRight className="inline h-3 w-3 mx-1" />}
          {i === items.length - 1
            ? <span className="text-[var(--color-foreground)] font-semibold">{it}</span>
            : <span>{it}</span>}
        </span>
      ))}
    </nav>
  );
}

function SectionHeader({ number, title, description }) {
  return (
    <div className="border-l-4 border-[var(--color-primary)] pl-4">
      <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]">
        Sección {number}
      </span>
      <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mt-1">
        {title}
      </h1>
      {description && (
        <p className="mt-3 text-sm text-[var(--color-muted-foreground)] leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-foreground)] mb-1.5">
        {label} {required && <span className="text-[var(--color-destructive)]">*</span>}
      </span>
      {children}
    </label>
  );
}

function Hint({ children }) {
  return (
    <p className="text-[11px] text-[var(--color-muted-foreground)] mt-1.5 leading-relaxed">
      {children}
    </p>
  );
}

function Notice({ icon: Icon, children }) {
  return (
    <div className="border-l-4 border-[var(--color-primary)] bg-[var(--color-primary-light)]/60 p-3 text-xs text-[var(--color-foreground)] flex gap-2 leading-relaxed">
      <Icon className="h-3.5 w-3.5 text-[var(--color-primary)] shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

function DataCell({ label, value, bold, mono }) {
  return (
    <div className="px-5 py-4">
      <dt className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-muted-foreground)]">
        {label}
      </dt>
      <dd
        className={`mt-1.5 text-[var(--color-foreground)] ${
          bold ? 'text-base font-bold' : 'text-sm'
        } ${mono ? 'font-mono' : ''}`}
      >
        {value}
      </dd>
    </div>
  );
}

function ReferenceBlock({ ref_, downloadingKind, onDownload }) {
  const meta = STATUS[ref_.status] || STATUS.PENDING;
  const Icon = meta.icon;
  // PENDING / PARTIAL → puede descargar la ficha BBVA para pagar
  // PAID              → puede descargar el recibo oficial
  const canDownloadPdf = ref_.status === 'PENDING' || ref_.status === 'PARTIAL';
  const canDownloadReceipt = ref_.status === 'PAID';
  const outstanding =
    ref_.outstandingAmount ?? Math.max(0, (ref_.amount || 0) - (ref_.paidAmountTotal || 0));

  const banner = {
    amber: 'bg-amber-600',
    blue:  'bg-blue-700',
    green: 'bg-green-700',
    gray:  'bg-gray-500',
  }[meta.color];

  return (
    <article className="bg-white rounded-lg overflow-hidden border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow">
      {/* Banner de estado */}
      <header className={`${banner} text-white px-5 py-2.5 flex items-center justify-between`}>
        <span className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
          <Icon className="h-3.5 w-3.5" />
          {meta.label}
        </span>
        <span className="text-xs text-white/85">{meta.desc}</span>
      </header>

      {/* Cuerpo en grid con divisores verticales */}
      <div className="grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
        {/* Concepto y referencia (8 cols) */}
        <div className="md:col-span-8 p-5 space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-muted-foreground)]">
              Concepto
            </span>
            <p className="text-sm font-medium text-[var(--color-foreground)] mt-1 leading-snug">
              {ref_.concept}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-3 text-sm">
            <KV label="Referencia BBVA" value={<span className="font-mono">{ref_.reference}</span>} />
            <KV label="Emitida" value={fmtDate(ref_.issuedAt)} />
            <KV label="Periodo" value={`${fmtDate(ref_.periodFrom)} → ${fmtDate(ref_.periodTo)}`} />
            <KV
              label={ref_.status === 'PAID' ? 'Pagada el' : 'Vence el'}
              value={fmtDate(ref_.status === 'PAID' ? ref_.paidAt : ref_.expiresAt)}
            />
          </dl>
        </div>

        {/* Monto y acción (4 cols) */}
        <div className="md:col-span-4 p-5 bg-[var(--color-paper)] flex flex-col justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-muted-foreground)]">
              {ref_.status === 'PARTIAL' ? 'Saldo pendiente' : 'Monto total'}
            </span>
            <p className="text-3xl font-bold text-[var(--color-secondary)] mt-1 leading-none">
              {fmtMoney(ref_.status === 'PARTIAL' ? outstanding : ref_.amount)}
            </p>
            {ref_.status === 'PARTIAL' && (
              <p className="text-[11px] text-[var(--color-muted-foreground)] mt-2">
                Ya abonaste {fmtMoney(ref_.paidAmountTotal || 0)} de {fmtMoney(ref_.amount)}.
              </p>
            )}
          </div>

          {canDownloadPdf && (
            <button
              type="button"
              onClick={() => onDownload('pdf')}
              disabled={!!downloadingKind}
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold uppercase tracking-wider text-xs px-4 py-2.5 rounded-md border-b-4 border-[var(--color-gold)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-60"
            >
              {downloadingKind === 'pdf'
                ? <Loader2 className="h-4 w-4 animate-spin" />
                : <Download className="h-4 w-4" />}
              {downloadingKind === 'pdf' ? 'Generando…' : 'Descargar ficha BBVA'}
            </button>
          )}
          {canDownloadReceipt && (
            <button
              type="button"
              onClick={() => onDownload('receipt')}
              disabled={!!downloadingKind}
              className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold uppercase tracking-wider text-xs px-4 py-2.5 rounded-md border-b-4 border-[var(--color-gold)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-60"
            >
              {downloadingKind === 'receipt'
                ? <Loader2 className="h-4 w-4 animate-spin" />
                : <FileCheck className="h-4 w-4" />}
              {downloadingKind === 'receipt' ? 'Generando…' : 'Recibo oficial'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function KV({ label, value }) {
  return (
    <div>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
        {label}
      </span>
      <p className="text-sm text-[var(--color-foreground)] mt-0.5">{value}</p>
    </div>
  );
}
