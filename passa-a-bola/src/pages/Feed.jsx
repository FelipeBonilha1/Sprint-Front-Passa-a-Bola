import { useEffect, useState } from "react";
import { Api } from "../services/api";

export default function Feed() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    Api.listGames()
      .then((data) => {
        if (alive) setGames(data);
      })
      .catch((e) => {
        if (alive) setErr(e?.message || "Falha ao carregar");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <p>Carregando jogos…</p>;
  if (err) return <p className="text-red-400">Erro: {err}</p>;
  if (!games.length) return <p className="opacity-70">Nenhum jogo no momento.</p>;

  return (
    <section>
      <div className="flex items-baseline justify-between mb-4">
        <h1 className="text-2xl font-extrabold">Jogos públicos</h1>
        <a href="/buscar" className="text-sm opacity-80 hover:text-[color:var(--pb-accent)]">
          Filtrar
        </a>
      </div>

      <div className="grid gap-4">
        {games.map((g) => (
          <article key={g.id ?? g.title} className="rounded-2xl overflow-hidden card">
            <div className="aspect-[16/9] w-full bg-black/30">
              {g.image ? (
                <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center opacity-60 text-sm">Sem imagem</div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg">{g.title}</h3>
              <p className="text-sm opacity-80 mt-1">
                {g.arena} • {g.city}
              </p>
              <p className="text-sm opacity-80">
                ⏰ {g.date} • {g.time}
              </p>
              {g.slots && <p className="text-sm opacity-80">👥 {g.slots} vagas</p>}

              <div className="mt-3 flex gap-2">
                <button className="btn" onClick={() => alert("Inscrição enviada!")}>
                  Quero jogar!
                </button>
                <button className="btn-outline">Detalhes</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
