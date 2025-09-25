import { useEffect, useState } from "react";
import { Api } from "../services/api";
import PublishModal from "../features/publicar/PublishModal";

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

  function handleAddGame(payload) {
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
      {/* Header responsivo */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold">Jogos públicos</h1>

          {/* Ações — DESKTOP */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/buscar"
              className="text-sm opacity-80 hover:text-[color:var(--pb-accent)]"
            >
              Filtrar
            </a>
            <button onClick={() => setOpenPublish(true)} className="btn">
              + Publicar partida
            </button>
          </div>
        </div>

        {/* Ações — MOBILE */}
        <div className="mt-3 sm:hidden grid grid-cols-2 gap-2">
          <a
            href="/buscar"
            className="btn-outline w-full py-2 text-sm text-center"
          >
            Filtrar
          </a>
          <button
            onClick={() => setOpenPublish(true)}
            className="btn w-full py-2 text-sm"
          >
            + Publicar
          </button>
        </div>
      </div>

      {/* Estados */}
      {loading && <p>Carregando jogos…</p>}
      {!loading && err && <p className="text-red-400">Erro: {err}</p>}
      {!loading && !err && games.length === 0 && (
        <p className="opacity-70">Nenhum jogo no momento.</p>
      )}

      {/* Lista (cards menores) */}
      {!loading && !err && games.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {games.map((g) => (
            <article key={g.id ?? g.title} className="rounded-xl overflow-hidden card">
              <div className="aspect-[16/10] w-full bg-black/30">
                {g.image ? (
                  <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full grid place-items-center opacity-60 text-xs">
                    Sem imagem
                  </div>
                )}
              </div>

              <div className="p-3">
                <h3 className="font-semibold text-base truncate">{g.title}</h3>
                <p className="text-xs opacity-80 mt-1">{g.arena} • {g.city}</p>
                <p className="text-xs opacity-80">⏰ {g.date} • {g.time}</p>
                {g.slots && <p className="text-xs opacity-80">👥 {g.slots} vagas</p>}

                <div className="mt-2 flex gap-2">
                  <button className="btn px-3 py-1.5 text-sm" onClick={() => alert("Inscrição enviada!")}>
                    Quero jogar!
                  </button>
                  <button className="btn-outline px-3 py-1.5 text-sm">
                    Detalhes
                  </button>
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
