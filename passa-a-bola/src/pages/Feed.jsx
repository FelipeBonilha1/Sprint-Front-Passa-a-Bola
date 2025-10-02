import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Api } from "../services/api";
import PublishModal from "../features/publicar/PublishModal";
import { toast } from "../lib/toast";

export default function Feed() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [openPublish, setOpenPublish] = useState(false);
  const [showFab, setShowFab] = useState(true);

  // 3 imagens padrão para os cards (altere os caminhos conforme seu projeto)
  const fallbackImages = [
    "/images/fut1.jpg",
    "/images/fut2.jpg",
    "/images/fut3.jpg",
  ];

  // direção do scroll (mostra FAB quando sobe)
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setShowFab(y < 64 || y < last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Api.listGames()
      .then((data) => { if (alive) setGames(data || []); })
      .catch((e) => { if (alive) setErr(e?.message || "Falha ao carregar"); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
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
      image: null, // se quiser, passe uma URL aqui ao publicar
    };
    setGames((s) => [mapped, ...s]);
    toast.success("Partida publicada!");
  }

  return (
    <section>
      {/* Header responsivo */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold">Jogos públicos</h1>

          {/* Ações — DESKTOP */}
          <div className="hidden sm:flex items-center gap-3">
            <NavLink
              to="/buscar"
              className="text-sm opacity-80 hover:text-[color:var(--pb-accent)]"
            >
              Filtrar
            </NavLink>
            <button onClick={() => setOpenPublish(true)} className="btn">
              + Publicar partida
            </button>
          </div>
        </div>

        {/* Ações — MOBILE */}
        <div className="mt-3 sm:hidden grid grid-cols-2 gap-2">
          <NavLink to="/buscar" className="btn-outline w-full py-2 text-sm text-center">
            Filtrar
          </NavLink>
          <button onClick={() => setOpenPublish(true)} className="btn w-full py-2 text-sm">
            + Publicar
          </button>
        </div>
      </div>

      {/* Estados */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden card animate-pulse">
              <div className="aspect-[16/10] bg-white/5" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-white/10 rounded" />
                <div className="h-3 bg-white/10 rounded w-2/3" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
                <div className="h-8 bg-white/10 rounded w-3/4 mt-3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && err && <p className="text-red-400">Erro: {err}</p>}
      {!loading && !err && games.length === 0 && (
        <p className="opacity-70">Nenhum jogo no momento.</p>
      )}

      {/* Lista (cards menores + profundidade/hover) */}
      {!loading && !err && games.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {games.map((g, idx) => {
            // usa g.image se existir; senão alterna entre as 3 imagens
            const imgSrc = g.image || fallbackImages[idx % fallbackImages.length];

            return (
              <article
                key={g.id ?? g.title ?? idx}
                className="group rounded-xl overflow-hidden card transition
                           ring-1 ring-white/10 hover:ring-[color:var(--pb-accent)]/40
                           hover:shadow-[0_0_0_1px_rgba(255,43,135,.35),0_20px_40px_-16px_rgba(255,43,135,.25)]
                           motion-reduce:transition-none"
              >
                <div className="relative aspect-[16/10] w-full bg-black/30">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={g.title || "Partida"}
                      loading="lazy"
                      width={1280}
                      height={800}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center opacity-60 text-xs">
                      Sem imagem
                    </div>
                  )}
                  {/* overlay de degradê sutil no hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-base truncate">{g.title}</h3>
                  <p className="text-xs opacity-80 mt-1">
                    {g.arena} • {g.city}
                  </p>
                  <p className="text-xs opacity-80">⏰ {g.date} • {g.time}</p>
                  {g.slots && <p className="text-xs opacity-80">👥 {g.slots} vagas</p>}

                  <div className="mt-2 flex gap-2">
                    <button
                      className="btn px-3 py-1.5 text-sm"
                      onClick={() => toast.success("Inscrição enviada!")}
                    >
                      Quero jogar!
                    </button>
                    <button className="btn-outline px-3 py-1.5 text-sm">
                      Detalhes
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* FAB móvel (+ Publicar) */}
      {showFab && (
        <button
          onClick={() => setOpenPublish(true)}
          className="md:hidden fixed right-4 bottom-20 z-50 rounded-full px-5 py-3
                     bg-[color:var(--pb-accent)] text-black font-semibold
                     shadow-[0_10px_30px_-10px_rgba(255,43,135,.6)]
                     ring-1 ring-[color:var(--pb-accent)]/40"
          aria-label="Publicar partida"
        >
          + Publicar
        </button>
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
