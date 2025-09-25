import React, { useEffect, useRef } from "react";

export default function Modal({ open, onClose, title, children, footer }) {
  const panelRef = useRef(null);

  // Fecha com ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Impede scroll do body e foca o primeiro foco
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // foco inicial
    const id = setTimeout(() => {
      const focusable = panelRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = prev;
      clearTimeout(id);
    };
  }, [open]);

  // Trap de foco simples
  const handleKeyDown = (e) => {
    if (e.key !== "Tab") return;
    const focusables = panelRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables?.length) return;
    const list = Array.from(focusables);
    const first = list[0];
    const last = list[list.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      aria-hidden={!open}
      onMouseDown={(e) => {
        // clique fora
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-xl rounded-2xl bg-[var(--pb-card,#161a1d)] text-white shadow-2xl ring-1 ring-white/10"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-start justify-between gap-3 p-5 border-b border-white/5">
          <h2 id="modal-title" className="text-lg font-semibold">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="rounded-xl px-3 py-1.5 bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring focus-visible:ring-pink-500"
          >
            ✕
          </button>
        </div>

        <div className="p-5">{children}</div>

        {footer ? (
          <div className="p-5 border-t border-white/5">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
