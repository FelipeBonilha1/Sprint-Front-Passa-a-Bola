import { useEffect, useMemo, useRef, useState } from "react";

export default function PublishModal({ open, onClose, onSubmit }) {
  const refDialog = useRef(null);
  const firstFocus = useRef(null);
  const [form, setForm] = useState({
    titulo: "", arena: "", cidade: "", vagas: "", data: "", hora: ""
  });

  // reset quando abre/fecha
  useEffect(() => {
    if (open) {
      setTimeout(() => firstFocus.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // ESC e focus-trap (TAB)
  useEffect(() => {
    if (!open) return;

    const el = refDialog.current;
    const focusables = () => {
      const selectors = [
        "a[href]", "button:not([disabled])", "textarea",
        "input", "select", "[tabindex]:not([tabindex='-1'])"
      ];
      return Array.from(el.querySelectorAll(selectors.join(",")));
    };

    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); onClose?.(); }
      if (e.key === "Tab") {
        const list = focusables();
        if (list.length === 0) return;
        const first = list[0], last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const disabled = useMemo(() => {
    return !form.titulo || !form.arena || !form.cidade || !form.data || !form.hora;
  }, [form]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (disabled) return;
    onSubmit?.(form);
    onClose?.();
  }

  if (!open) return null;

  return (
    <div
      aria-hidden="false"
      className="fixed inset-0 z-50 grid place-items-center"
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* dialog */}
      <div
        ref={refDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pub-title"
        aria-describedby="pub-desc"
        className="relative mx-4 w-full max-w-xl rounded-2xl border border-white/15 bg-black/70 backdrop-blur p-4 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4 mb-2">
          <h2 id="pub-title" className="text-xl font-semibold">Publique sua partida</h2>
          <button onClick={onClose} className="btn-outline px-2 py-1" aria-label="Fechar modal">✕</button>
        </div>
        <p id="pub-desc" className="text-sm opacity-80 mb-4">
          Preencha os campos abaixo para publicar.
        </p>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            ref={firstFocus}
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={handleChange}
            className="w-full rounded-xl px-3 py-2 bg-white/5 border border-white/15 outline-none focus:ring-2 focus:ring-pink-400/40"
          />
          <input
            name="arena" placeholder="Arena / Quadra"
            value={form.arena} onChange={handleChange}
            className="w-full rounded-xl px-3 py-2 bg-white/5 border border-white/15 outline-none focus:ring-2 focus:ring-pink-400/40"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              name="cidade" placeholder="Cidade"
              value={form.cidade} onChange={handleChange}
              className="rounded-xl px-3 py-2 bg-white/5 border border-white/15 outline-none focus:ring-2 focus:ring-pink-400/40"
            />
            <input
              name="vagas" placeholder="Vagas (opcional)"
              value={form.vagas} onChange={handleChange}
              className="rounded-xl px-3 py-2 bg-white/5 border border-white/15 outline-none focus:ring-2 focus:ring-pink-400/40"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              name="data" placeholder="Data (ex.: 20/09)"
              value={form.data} onChange={handleChange}
              className="rounded-xl px-3 py-2 bg-white/5 border border-white/15 outline-none focus:ring-2 focus:ring-pink-400/40"
            />
            <input
              name="hora" placeholder="Hora (ex.: 19:30)"
              value={form.hora} onChange={handleChange}
              className="rounded-xl px-3 py-2 bg-white/5 border border-white/15 outline-none focus:ring-2 focus:ring-pink-400/40"
            />
          </div>

          <div className="mt-2 flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="btn-outline px-4 py-2">
              Cancelar
            </button>
            <button type="submit" disabled={disabled} className="btn px-4 py-2 disabled:opacity-50">
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
