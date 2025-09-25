// src/components/MobileMenu.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/",          label: "Home" },
  { to: "/feed",      label: "Feed" },
  { to: "/buscar",    label: "Buscar" },
  { to: "/publicar",  label: "Publicar" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/perfil",    label: "Perfil" },
];

export default function MobileMenu({ className = "" }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={className}>
      {/* Botão */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-white/10 hover:bg-white/15 focus-visible:ring focus-visible:ring-pink-500"
      >
        <span className="text-lg leading-none">≡</span>
        <span className="text-sm">Menu</span>
      </button>

      {/* Painel que desce do topo */}
      {open && (
        <section
          role="dialog"
          aria-modal="true"
          className="fixed left-0 right-0 top-0 z-50
                     bg-[color:var(--pb-card,#191c1f)] text-white
                     shadow-2xl ring-1 ring-white/10
                     animate-[dropIn_.22s_ease-out]"
          style={{ maxHeight: "85vh" }}  // painel rola até 85% da altura
        >
          {/* Cabeçalho do painel */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="font-semibold">Navegação</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              className="rounded-xl px-3 py-1.5 bg-white/10 hover:bg-white/15 focus-visible:ring focus-visible:ring-pink-500"
            >
              ✕
            </button>
          </div>

          {/* Lista de links (AQUI que estava faltando render/li/altura) */}
          <nav className="overflow-y-auto">
            <ul>
              {LINKS.map(({ to, label }) => {
                const active = pathname === to;
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      className={`block px-5 py-4 text-base tracking-tight
                        ${active
                          ? "bg-pink-500/15 text-pink-300 ring-1 ring-pink-500/30"
                          : "hover:bg-white/5 opacity-95 hover:opacity-100"}`}
                    >
                      {label}
                    </Link>
                    <div className="h-px bg-white/10" />
                  </li>
                );
              })}
              {/* Botão Entrar (fica só no menu no mobile) */}
              <li className="px-5 py-4">
                <Link
                  to="/login"
                  className="w-full block text-center rounded-lg bg-[color:var(--pb-accent)] text-black font-semibold py-3 hover:opacity-90"
                >
                  Entrar
                </Link>
              </li>
            </ul>
            <div className="pb-[max(env(safe-area-inset-bottom),16px)]" />
          </nav>

          {/* Anim. */}
          <style>{`
            @keyframes dropIn {
              from { transform: translateY(-12%); opacity:.85 }
              to   { transform: translateY(0);     opacity:1   }
            }
          `}</style>
        </section>
      )}
    </div>
  );
}
