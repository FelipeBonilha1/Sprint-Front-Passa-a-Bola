import { Outlet, NavLink } from "react-router-dom";
import MobileMenu from "../components/MobileMenu";
import AccessibilityBar from "../components/AccessibilityBar";
import Toaster from "../components/Toaster";
import { Suspense } from "react";
import AppLoader from "../components/AppLoader";

const LinkTop = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        "px-3 py-1.5 rounded-xl text-sm transition-colors",
        "hover:bg-white/5 hover:text-white",
        "focus-visible:outline-2 focus-visible:outline-[color:var(--pb-accent)]",
        isActive
          ? "bg-[color:var(--pb-accent)]/15 text-[color:var(--pb-accent)] ring-1 ring-[color:var(--pb-accent)]/30"
          : "text-white/80",
      ].join(" ")
    }
  >
    {children}
  </NavLink>
);

export default function Shell() {
  return (
    <div
      style={{
        background:
          "radial-gradient(1200px 600px at 10% 10%, #3b1bff55, transparent 60%), radial-gradient(1200px 600px at 90% 80%, #7a3dff55, transparent 60%), var(--pb-bg)",
        color: "var(--pb-text)",
        minHeight: "100dvh",
      }}
    >
      {/* TOP BAR A11Y + TOASTER */}
      <AccessibilityBar />
      <Toaster />

      {/* HEADER */}
      <header className="sticky top-[40px] z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <div className="relative mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 whitespace-nowrap">
            <img src="/images/imagem6.png" alt="Passa a Bola" className="w-8 h-8 rounded-full" />
            <span
              className="font-semibold tracking-tight bg-clip-text text-transparent
                         bg-gradient-to-r from-white to-[color:var(--pb-accent)]/80"
            >
              Passa a Bola
            </span>
          </NavLink>

          {/* Navegação central  */}
          <nav className="hidden md:flex flex-1 justify-center items-center">
            <div className="rounded-2xl bg-white/5 px-2 py-1 flex items-center gap-1">
              <LinkTop to="/feed">Feed</LinkTop>
              <LinkTop to="/buscar">Buscar</LinkTop>
              <LinkTop to="/publicar">Publicar</LinkTop>
              <LinkTop to="/dashboard">Dashboard</LinkTop>
              <LinkTop to="/perfil">Perfil</LinkTop>
            </div>
          </nav>

          {/* Entrar só no DESKTOP */}
          <div className="hidden md:block">
            <NavLink to="/login" className="btn">
              Entrar
            </NavLink>
          </div>

          {/* Menu hambúrguer só no MOBILE */}
          <div className="flex items-center gap-2 md:hidden">
            <MobileMenu />
          </div>

          {/* Glow line (acabamento) */}
          <span
            className="pointer-events-none absolute inset-x-0 -bottom-[1px] h-[1px]
                       bg-gradient-to-r from-transparent via-[color:var(--pb-accent)] to-transparent opacity-60"
          />
        </div>
      </header>

      {/* CONTEÚDO (id="main" para o skip link da barra de acessibilidade) */}
      <main id="main" className="mx-auto max-w-6xl px-4 pt-8 pb-24">
        <Suspense fallback={<AppLoader text="Carregando página…" />}>
          <Outlet />
        </Suspense>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 mt-8">
        <div className="mx-auto max-w-6xl px-4 text-sm opacity-80 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Passa a Bola. MVP acadêmico.</p>
          <p>
            Feito com <span style={{ color: "var(--pb-accent)" }}>Tailwind</span> + React.
          </p>
        </div>
      </footer>
    </div>
  );
}
