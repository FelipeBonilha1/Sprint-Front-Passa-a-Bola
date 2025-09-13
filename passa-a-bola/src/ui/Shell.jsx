import { Outlet, NavLink, useLocation } from "react-router-dom";

const LinkTop = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      "text-sm hover:text-[color:var(--pb-accent)] " +
      (isActive ? "text-[color:var(--pb-accent)] font-semibold" : "")
    }
  >
    {children}
  </NavLink>
);

export default function Shell() {
  const { pathname } = useLocation();

  return (
    <div
      style={{
        background:
          "radial-gradient(1200px 600px at 10% 10%, #3b1bff55, transparent 60%), radial-gradient(1200px 600px at 90% 80%, #7a3dff55, transparent 60%), var(--pb-bg)",
        color: "var(--pb-text)",
        minHeight: "100dvh",
      }}
    >
      {/* HEADER idêntico ao layout 1 */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="inline-grid place-items-center h-9 w-9 rounded-lg"
              style={{ background: "var(--pb-primary)", color: "#0A0A0A", fontWeight: 800 }}>PB</span>
            <span className="font-semibold tracking-tight">Passa a Bola</span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-6">
            <LinkTop to="/feed">Feed</LinkTop>
            <LinkTop to="/buscar">Buscar</LinkTop>
            <LinkTop to="/publicar">Publicar</LinkTop>
            <LinkTop to="/perfil">Perfil</LinkTop>
          </nav>

          <NavLink to="/login" className="btn hidden md:inline-flex">Entrar</NavLink>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="mx-auto max-w-6xl px-4 pt-8 pb-24">
        <Outlet />
      </main>

      {/* BOTTOM BAR mobile (opcional, mantém o look do layout) */}
      <nav className="fixed inset-x-0 bottom-0 z-40 md:hidden border-t border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-6xl grid grid-cols-5">
          {[
            { to: "/", label: "Home", emoji: "🏠" },
            { to: "/feed", label: "Feed", emoji: "🏟️" },
            { to: "/buscar", label: "Buscar", emoji: "🔍" },
            { to: "/publicar", label: "Publicar", emoji: "📌" },
            { to: "/perfil", label: "Perfil", emoji: "👤" },
          ].map((i) => (
            <NavLink key={i.to} to={i.to}
              className={"py-2 text-center text-xs " + (pathname === i.to ? "text-[color:var(--pb-accent)] font-semibold" : "opacity-80")}>
              <div>{i.emoji}</div>{i.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* FOOTER igual ao layout 1 */}
      <footer className="border-t border-white/10 py-8 mt-8">
        <div className="mx-auto max-w-6xl px-4 text-sm opacity-80 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Passa a Bola. MVP acadêmico.</p>
          <p>Feito com <span style={{ color: "var(--pb-accent)" }}>Tailwind</span> + React.</p>
        </div>
      </footer>
    </div>
  );
}
