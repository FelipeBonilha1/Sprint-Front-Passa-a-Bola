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
            <span
              className="inline-grid place-items-center h-9 w-9 rounded-lg"
              style={{ background: "var(--pb-primary)", color: "#0A0A0A", fontWeight: 800 }}
            >
              PB
            </span>
            <span className="font-semibold tracking-tight">Passa a Bola</span>
          </a>

          {/* Navegação alinhada ao produto */}
          <nav className="hidden md:flex gap-6 text-sm">
            <a className="hover:text-[color:var(--pb-accent)]" href="#sobre">Sobre</a>
            <a className="hover:text-[color:var(--pb-accent)]" href="#funcionalidades">Funcionalidades</a>
            <a className="hover:text-[color:var(--pb-accent)]" href="#metas">Roadmap</a>
            <a className="hover:text-[color:var(--pb-accent)]" href="#contato">Contato</a>
          </nav>

          <a href="#contato" className="btn">Participar do piloto</a>
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
                  {/* Coloque aqui sua imagem do feminino se quiser */}
                  {/* <img src="/images/imagem4.jpg" alt="Partida de futebol feminino" className="w-full h-full object-cover rounded-xl" /> */}
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
                Organize e encontre <span style={{ color: "var(--pb-primary)" }}>partidas de futebol feminino</span>
                <span className="block">com rapidez, segurança e fair play</span>
              </h1>

              <p className="mt-4 text-[17px] opacity-90 max-w-prose">
                Crie jogos em minutos com vagas por posição, nível e regras claras. Encontre partidas próximas,
                confirme presença, use o chat do jogo e ajude a dar mais visibilidade ao <strong>futebol feminino</strong>.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a className="btn" href="#funcionalidades">Ver como funciona</a>
                <a className="btn-outline" href="#contato">Criar jogo no piloto</a>
              </div>

              {/* Stats alinhadas ao piloto do feminino */}
              <dl className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                {[
                  ["Jogos femininos", "48"],
                  ["Organizadoras", "22"],
                  ["Avaliações", "612"],
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
              <h2 id="sobre-title" className="text-2xl font-bold">Feito para o futebol feminino</h2>
              <p className="mt-3 opacity-90">
                O Passa a Bola centraliza partidas do feminino: <strong>organizadoras</strong> criam jogos com vagas por
                posição (G, Z, LA/LD, ME, ATA), nível e regras; <strong>atletas</strong> encontram jogos por localização e
                confirmam presença; no fim, todo mundo avalia organização, fair play, estrutura e segurança — fortalecendo a
                reputação de quem faz o futebol feminino acontecer.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Filtros pensados no feminino: posição, nível, local e horário",
                  "Publicação rápida com regras claras e lista de espera",
                  "Chat do jogo para combinar uniforme, chegada e caronas",
                  "Reputação transparente para organizadoras e atletas",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <IconCheck className="mt-0.5 text-[color:var(--pb-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cards de valor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["Descubra e confirme", "Veja partidas femininas próximas com vagas por posição. Confirme presença em um toque."],
                ["Publique em 1 minuto", "Defina local, nível, vagas por posição e regras. Acompanhe confirmações em tempo real."],
                ["Avalie e dê visibilidade", "Notas em organização, fair play e segurança aumentam a visibilidade do feminino."],
                ["Ambiente seguro", "Regras claras, denúncias moderadas e sinalização de condutas inadequadas."],
              ].map(([title, desc]) => (
                <article key={title} className="card p-5 rounded-2xl">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm opacity-80 mt-1">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FUNCIONALIDADES */}
        <section id="funcionalidades" aria-labelledby="funcionalidades-title" className="py-12 md:py-4">
          <div className="mx-auto max-w-6xl px-4">
            <h2 id="funcionalidades-title" className="text-2xl font-bold">Funcionalidades do MVP</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                ["Vagas por posição", "Controle de goleira, zaga, laterais, meio e ataque, deixando o jogo equilibrado."],
                ["Nível do jogo", "Sinalize o nível (iniciante, intermediário, avançado) para alinhamento de expectativas."],
                ["Confirmações e fila", "Confirmações em tempo real e lista de espera automática quando encher."],
                ["Chat do jogo", "Canal para combinar uniforme, caronas e horário de chegada."],
                ["Regras e fair play", "Tempo de jogo, contato permitido e orientações de segurança visíveis para todas."],
                ["Avaliações e reputação", "Feedback após a partida para evoluir a comunidade do feminino."],
              ].map(([title, desc]) => (
                <article key={title} className="card p-5 rounded-2xl">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm opacity-80 mt-1">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ROADMAP / METAS */}
        <section id="metas" aria-labelledby="metas-title" className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8">
            <div>
              <h2 id="metas-title" className="text-2xl font-bold">Roadmap do MVP</h2>
              <ul className="mt-4 space-y-2">
                {[
                  "Piloto com 20–30 jogos femininos em SP capital.",
                  "Reputação com métricas públicas (organização, fair play, segurança).",
                  "Lançamento do feed de jogos e perfil de organizadora.",
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
                  ["Outubro", "Design e implementação do MVP focado no feminino"],
                  ["Novembro", "Teste com times e coletivos; ajustes de UX e segurança"],
                  ["Dezembro", "Relatório do piloto e planejamento de expansão"],
                ].map(([when, what]) => (
                  <div key={when} className="relative pl-8">
                    <div
                      className="absolute left-0 top-1 h-2 w-2 rounded-full"
                      style={{ background: "var(--pb-accent)" }}
                    />
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
              <h2 id="contato-title" className="text-2xl font-bold">Quer fortalecer o feminino com a gente?</h2>
              <p className="mt-2 opacity-90">
                Traga seu time, organize partidas na sua região ou envie sugestões. Vamos dar mais{" "}
                <strong>visibilidade e estrutura</strong> ao futebol feminino.
              </p>
              <ul className="mt-4 space-y-1 text-sm opacity-80">
                <li>E-mail: contato@passaabola.org</li>
                <li>Local: São Paulo — SP</li>
              </ul>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Obrigado! Em breve falamos com você: ${email}`);
                setEmail("");
              }}
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
              <button className="btn w-full mt-4">Participar do piloto</button>
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
