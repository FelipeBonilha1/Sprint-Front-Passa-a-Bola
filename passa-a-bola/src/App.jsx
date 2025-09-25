import { useState } from "react";


/** Ícone simples */
const IconCheck = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function App() {
  const [email, setEmail] = useState("");

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="inline-grid place-items-center h-9 w-9 rounded-lg"
              style={{ background: "var(--pb-primary)", color: "#0A0A0A", fontWeight: 800 }}>
              PB
            </span>
            <span className="font-semibold tracking-tight">Passa a Bola</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a className="hover:text-[color:var(--pb-accent)]" href="#sobre">Sobre</a>
            <a className="hover:text-[color:var(--pb-accent)]" href="#metas">Metas</a>
            <a className="hover:text-[color:var(--pb-accent)]" href="#contato">Contato</a>
          </nav>
          <a href="#contato" className="btn">Participar</a>
        </div>
      </header>

      <main
        style={{
          background:
            "radial-gradient(1200px 600px at 10% 10%, #3b1bff55, transparent 60%), radial-gradient(1200px 600px at 90% 80%, #7a3dff55, transparent 60%), var(--pb-bg)",
        }}
      >
        {/* HERO */}
        <section aria-labelledby="hero-title" className="relative">
          <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-8 px-4 pt-10 md:pt-16 pb-8">
            {/* Visual */}
            <div className="relative order-2 md:order-1">
              <div className="card overflow-hidden p-3">
                <div className="aspect-[5/4] w-full rounded-xl bg-[color:var(--pb-bg)] grid place-items-center">
                  <div className="text-center">
                  </div>
                </div>
              </div>
            </div>

            {/* Texto */}
            <div className="order-1 md:order-2">
              <p className="inline-flex items-center gap-2 text-xs font-medium tracking-wide mb-3">
                <span className="h-2 w-2 rounded-full" style={{ background: "var(--pb-accent)" }} />
                Projeto acadêmico — MVP
              </p>

              <h1 id="hero-title" className="text-4xl/tight sm:text-5xl/tight font-extrabold">
                Conectando quem tem com quem precisa
                <span className="block" style={{ color: "var(--pb-primary)" }}>esporte transformando realidades</span>
              </h1>

              <p className="mt-4 text-[17px] opacity-90 max-w-prose">
                O Passa a Bola facilita o encontro entre doadores de materiais esportivos e projetos/ONGs que precisam,
                garantindo transparência, rastreio e impacto social mensurável.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a className="btn" href="#metas">Ver metas</a>
                <a className="btn-outline" href="#sobre">Como funciona</a>
              </div>

              {/* Stats */}
              <dl className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                {[
                  ["Entidades", "10+"],
                  ["Itens", "300+"],
                  ["Jovens", "200+"],
                ].map(([label, value]) => (
                  <div key={label} className="card px-4 py-3 rounded-xl">
                    <dt className="text-xs opacity-70">{label}</dt>
                    <dd className="text-2xl font-bold" style={{ color: "var(--pb-accent)" }}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" aria-labelledby="sobre-title" className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8">
            <div>
              <h2 id="sobre-title" className="text-2xl font-bold">Sobre o projeto</h2>
              <p className="mt-3 opacity-90">
                A plataforma lista demandas (tamanhos de chuteira, bolas, coletes, redes etc.), permite match inteligente e
                acompanha a entrega e o impacto de forma transparente.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Inclusão social por meio do esporte",
                  "Transparência nas doações e no impacto",
                  "Cadastro simples de pedidos e doações",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <IconCheck className="mt-0.5 text-[color:var(--pb-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["Cadastro de demandas", "Entidades criam pedidos detalhados (quantidade, tamanho, urgência)."],
                ["Match com doadores", "Doadores encontram pedidos compatíveis e confirmam doação."],
                ["Entrega e validação", "Logística combinada, entrega confirmada e impacto registrado."],
                ["Métricas públicas", "Indicadores de impacto visíveis para a comunidade."],
              ].map(([title, desc]) => (
                <article key={title} className="card p-5 rounded-2xl">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm opacity-80 mt-1">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* METAS / CRONOGRAMA */}
        <section id="metas" aria-labelledby="metas-title" className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8">
            <div>
              <h2 id="metas-title" className="text-2xl font-bold">Metas (MVP)</h2>
              <ul className="mt-4 space-y-2">
                {[
                  "Onboard de 10 entidades até o fim do semestre.",
                  "300 itens arrecadados (bolas, coletes, chuteiras, redes).",
                  "Relatório de impacto com métricas públicas.",
                ].map((m) => (
                  <li key={m} className="flex items-start gap-3">
                    <IconCheck className="mt-0.5 text-[color:var(--pb-accent)]" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Cronograma</h2>
              <div className="mt-4 space-y-3">
                {[
                  ["Setembro", "Descoberta, entrevistas, requisitos"],
                  ["Outubro", "Design do MVP e desenvolvimento"],
                  ["Novembro", "Testes com ONGs parceiras e ajustes"],
                  ["Dezembro", "Relatório final e apresentação"],
                ].map(([when, what]) => (
                  <div key={when} className="relative pl-8">
                    <div className="absolute left-0 top-1 h-2 w-2 rounded-full" style={{ background: "var(--pb-accent)" }} />
                    <p className="text-sm font-medium">{when}</p>
                    <p className="text-sm opacity-80">{what}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" aria-labelledby="contato-title" className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8">
            <div>
              <h2 id="contato-title" className="text-2xl font-bold">Entre em contato</h2>
              <p className="mt-2 opacity-90">Quer participar do piloto, apoiar o projeto ou tirar dúvidas?</p>
              <ul className="mt-4 space-y-1 text-sm opacity-80">
                <li>E-mail: contato@passaabola.org</li>
                <li>Local: São Paulo — SP</li>
              </ul>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); alert(`Obrigado! Em breve falamos com você: ${email}`); setEmail(""); }}
              className="card p-6 rounded-2xl"
              aria-label="Formulário de interesse"
            >
              <label htmlFor="email" className="text-sm font-medium">Seu melhor e-mail</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@exemplo.com"
                className="mt-1 w-full rounded-xl px-4 py-3 bg-black/40 outline-none ring-1 ring-white/10 focus:ring-2"
                style={{ caretColor: "var(--pb-accent)" }}
              />
              <button className="btn w-full mt-4">Quero participar</button>
              <p className="text-xs opacity-70 mt-2">Usaremos apenas para contato sobre o projeto.</p>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm opacity-80 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Passa a Bola. MVP acadêmico.</p>
          <p>
            Feito com <span style={{ color: "var(--pb-accent)" }}>Tailwind</span> + React.
          </p>
        </div>
      </footer>
    </>
  );
}
