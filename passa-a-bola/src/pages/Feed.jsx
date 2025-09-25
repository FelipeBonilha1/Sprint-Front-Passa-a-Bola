import { useEffect, useState } from "react";
import { Api } from "../services/api";
import PublishModal from "../features/publicar/PublishModal"; // <- ajuste o caminho se necessário

export default function Feed() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [openPublish, setOpenPublish] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    Api.listGames()
      .then((data) => {
        if (alive) setGames(data || []);
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

  // callback quando o modal enviar com sucesso
  function handleAddGame(payload) {
    // mapeia campos do modal -> estrutura do feed
    const mapped = {
      id: crypto?.randomUUID?.() || Date.now(),
      title: payload.titulo,
      arena: payload.arena,
      city: payload.cidade,
      slots: payload.vagas,
      date: payload.data,
      time: payload.hora,
      image: null,
    };
    setGames((s) => [mapped, ...s]);
  }

  return (
    <section>
      {/* Header do feed sempre visível */}
      <div className="flex items-baseline justify-between mb-4">
        <h1 className="text-2xl font-extrabold">Jogos públicos</h1>

        <div className="flex items-center gap-3">
          <a
            href="/buscar"
            className="text-sm opacity-80 hover:text-[color:var(--pb-accent)]"
          >
            Filtrar
          </a>
          <button
            onClick={() => setOpenPublish(true)}
            className="btn"
            // se não tiver .btn no projeto, pode usar:
            // className="rounded-2xl px-4 py-2 bg-pink-500 hover:bg-pink-600 focus-visible:ring focus-visible:ring-pink-300"
          >
            + Publicar partida
          </button>
        </div>
      </div>

      {/* Estados de carregamento/erro/empty */}
      {loading && <p>Carregando jogos…</p>}
      {!loading && err && <p className="text-red-400">Erro: {err}</p>}
      {!loading && !err && games.length === 0 && (
        <p className="opacity-70">Nenhum jogo no momento.</p>
      )}

      {/* Lista */}
      {!loading && !err && games.length > 0 && (
        <div className="grid gap-4">
          {games.map((g) => (
            <article key={g.id ?? g.title} className="rounded-2xl overflow-hidden card">
              <div className="aspect-[16/9] w-full bg-black/30">
                {g.image ? (
                  <img
                    src={g.image}
                    alt={g.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center opacity-60 text-sm">
                    Sem imagem
                  </div>
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
                {g.slots && (
                  <p className="text-sm opacity-80">👥 {g.slots} vagas</p>
                )}

                <div className="mt-3 flex gap-2">
                  <button
                    className="btn"
                    onClick={() => alert("Inscrição enviada!")}
                  >
                    Quero jogar!
                  </button>
                  <button className="btn-outline">Detalhes</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal de publicação */}
      <PublishModal
        open={openPublish}
        onClose={() => setOpenPublish(false)}
        onSubmit={handleAddGame}
      />
    </section>
  );
}
