import { useState } from "react";

const IconCheck = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <>
      {/* HERO */}
      <section aria-labelledby="hero-title" className="relative">
        <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visual */}
          <div className="order-2 md:order-1">
            <div className="card overflow-hidden p-3">
              <div className="aspect-[5/4] w-full rounded-xl bg-[color:var(--pb-bg)]">
                <img
                  src="/images/imagem4.jpg"
                  alt="Atletas se preparando para uma partida de futebol feminino — Passa a Bola"
                  className="w-full h-full object-cover rounded-xl"
                />
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
              Do campo à conquista o jogo<span style={{ color: "var(--pb-primary)" }}> começa aqui </span>
            </h1>

            <p className="mt-4 text-[17px] opacity-90 max-w-prose">
              O Passa a Bola facilita a organização e a descoberta de <strong>jogos de futebol feminino</strong>. 
              Crie partidas em minutos, defina nível, posições e vagas, confirme atletas e mantenha o foco em 
              <strong> segurança</strong>, <strong>fair play</strong> e <strong>visibilidade</strong> para o feminino.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn" href="/feed">Ver jogos femininos</a>
              <a className="btn-outline" href="/publicar">Criar jogo</a>
            </div>

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
      <section id="sobre" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold">Feito para o futebol feminino</h2>
            <p className="mt-3 opacity-90">
              Centralizamos a agenda do feminino: <strong>organizadoras</strong> criam jogos com regras claras, 
              <strong> atletas</strong> encontram partidas por nível, posição e localização, e todas avaliam a experiência. 
              Assim, a comunidade cresce com dados de <strong>reputação</strong> e boas práticas de <strong>segurança</strong>.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Filtros pensados no feminino: nível, posição (G, Z, LA/LD, ME, ATA), local e horário",
                "Publicação rápida com vagas por posição, taxa (se houver) e regras de jogo",
                "Chat do jogo: combine uniforme, chegada, caronas e material",
                "Reputação transparente: organização, fair play, estrutura e segurança",
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
              ["Descubra e confirme", "Veja partidas femininas próximas, com nível indicado e vagas por posição. Confirme presença em um toque."],
              ["Organize em 1 minuto", "Defina local, vagas por posição, nível e regras (tempo, contato, goleiras). Acompanhe confirmações em tempo real."],
              ["Avalie e dê visibilidade", "Avalie organização, fair play e segurança. Quanto mais jogos, mais destaque para o feminino na sua região."],
              ["Ambiente seguro", "Regras claras, denúncias moderadas e sinalização de condutas inadequadas para proteger a comunidade feminina."],
            ].map(([title, desc]) => (
              <article key={title} className="card p-5 rounded-2xl">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm opacity-80 mt-1">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold">Quer fortalecer o feminino com a gente?</h2>
            <p className="mt-2 opacity-90">
              Participe do piloto, traga seu time, organize jogos na sua região ou envie melhorias. Vamos dar mais 
              <strong>espaço e estrutura</strong> para o futebol feminino.
            </p>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); alert(`Obrigado! Em breve falamos com você: ${email}`); setEmail(""); }}
            className="card p-6 rounded-2xl"
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
    </>
  );
}
