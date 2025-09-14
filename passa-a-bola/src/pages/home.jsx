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
      {/* Visual mock */}
          <div className="order-2 md:order-1">
            <div className="card overflow-hidden p-3">
              <div className="aspect-[5/4] w-full rounded-xl bg-[color:var(--pb-bg)]">
                <img
                   src="/images/imagem4.jpg"
                   alt="Imagem de destaque do projeto Passa a Bola"
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
              Conectando quem tem com quem precisa
              <span className="block" style={{ color: "var(--pb-primary)" }}>esporte transformando realidades</span>
            </h1>

            <p className="mt-4 text-[17px] opacity-90 max-w-prose">
              O Passa a Bola facilita o encontro entre doadores de materiais esportivos e projetos/ONGs que precisam,
              garantindo transparência, rastreio e impacto social mensurável.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn" href="/feed">Ver jogos</a>
              <a className="btn-outline" href="/publicar">Publicar partida</a>
            </div>

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
      <section id="sobre" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold">Sobre o projeto</h2>
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

      {/* CONTATO */}
      <section id="contato" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold">Entre em contato</h2>
            <p className="mt-2 opacity-90">Quer participar do piloto, apoiar o projeto ou tirar dúvidas?</p>
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
