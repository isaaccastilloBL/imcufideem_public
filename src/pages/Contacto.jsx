/**
 * Contacto — formulario y datos institucionales en formato oficial.
 */
import { useState } from 'react';
import { toast } from 'sonner';
import { ChevronRight, Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

export default function Contacto() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success('Mensaje recibido. Te contactaremos pronto.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setSending(false);
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="bg-[var(--color-paper)] py-10 lg:py-12">
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        <nav className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] mb-4">
          Inicio <ChevronRight className="inline h-3 w-3 mx-1" />
          <span className="text-[var(--color-foreground)] font-semibold">Contacto</span>
        </nav>

        <div className="border-l-4 border-[var(--color-primary)] pl-4">
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]">
            Atención ciudadana
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mt-1">
            Contáctanos
          </h1>
          <p className="mt-3 text-sm text-[var(--color-muted-foreground)] leading-relaxed max-w-2xl">
            Escríbenos para resolver dudas sobre tu membresía, horarios, instalaciones
            o cualquier otro tema institucional.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 mt-8">
          {/* Bloque de directorio (4 cols) */}
          <aside className="lg:col-span-4 space-y-4">
            <DirectoryRow icon={MapPin} title="Domicilio">
              Av. Principal #123<br />
              Col. Centro, C.P. 00000
            </DirectoryRow>
            <DirectoryRow icon={Phone} title="Teléfonos">
              Conmutador:{' '}
              <a href="tel:+520000000000" className="text-[var(--color-primary)] hover:underline">
                01 800 000 0000
              </a>
              <br />
              Atención:{' '}
              <a href="tel:+520000000001" className="text-[var(--color-primary)] hover:underline">
                01 800 000 0001
              </a>
            </DirectoryRow>
            <DirectoryRow icon={Mail} title="Correo institucional">
              <a href="mailto:contacto@imcufideem.gob.mx" className="text-[var(--color-primary)] hover:underline break-all">
                contacto@imcufideem.gob.mx
              </a>
            </DirectoryRow>
          </aside>

          {/* Formulario oficial (8 cols) */}
          <form
            onSubmit={submit}
            className="lg:col-span-8 bg-white rounded-lg overflow-hidden border-t-4 border-[var(--color-gold)] shadow-sm ring-1 ring-black/5"
          >
            <header className="bg-[var(--color-secondary)] text-white px-6 py-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
                Formulario de contacto
              </span>
            </header>

            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nombre completo" required>
                  <input
                    required value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    className="w-full rounded-md border border-[var(--color-border-strong)] bg-white px-3 py-2.5 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-colors"
                  />
                </Field>
                <Field label="Correo electrónico" required>
                  <input
                    type="email" required value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    className="w-full rounded-md border border-[var(--color-border-strong)] bg-white px-3 py-2.5 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-colors"
                  />
                </Field>
              </div>

              <Field label="Asunto" required>
                <input
                  required value={form.subject}
                  onChange={(e) => set('subject', e.target.value)}
                  className="w-full rounded-none border border-[var(--color-border-strong)] bg-white px-3 py-2.5 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none"
                />
              </Field>

              <Field label="Mensaje" required>
                <textarea
                  required rows={5} value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  className="w-full rounded-none border border-[var(--color-border-strong)] bg-white px-3 py-2.5 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none resize-y"
                />
              </Field>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-md border-b-4 border-[var(--color-gold)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-60"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {sending ? 'Enviando…' : 'Enviar mensaje'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function DirectoryRow({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border-l-4 border-[var(--color-primary)] border-y border-r border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow">
      <div className="px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-paper)] flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-[var(--color-primary)]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-foreground)]">
          {title}
        </span>
      </div>
      <div className="px-4 py-3 text-sm text-[var(--color-foreground)] leading-relaxed">
        {children}
      </div>
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
