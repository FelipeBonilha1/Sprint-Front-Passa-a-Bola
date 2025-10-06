import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Api } from "../services/api";
import PublishModal from "../features/publicar/PublishModal";
import { toast } from "../lib/toast";
import RateModal from "../features/publicar/avaliacoes/RateModal";

const PLACEHOLDERS = [
  "/images/imagem1.jpg",
  "/images/imagem2.jpg",
  "/images/imagem3.jpg",
  
];

export default function Feed() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [openPublish, setOpenPublish] = useState(false);
  const [showFab, setShowFab] = useState(true);
  const [openRate, setOpenRate] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  // mostra FAB quando sobe a página
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

  // carrega jogos
  useEffect(() => {
    let alive = true;
    setLoading(true);
    Api.listGames()
      .then((data) => {
        if (!alive) return;
        const list = (data || []).map((g, i) => ({
          ...g,
          // se não vier imagem da API, usa placeholder
          image: g.image || PLACEHOLDERS[i % PLACEHOLDERS.length],
        }));
        setGames(list);
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

  // publicar novo jogo -> garante imagem fixa
  function handleAddGame(payload) {
    const idx = Math.floor(Math.random() * PLACEHOLDERS.length);
    const mapped = {
      id: crypto?.randomUUID?.() || Date.now(),
      title: payload.titulo,
      arena: payload.arena,
      city: payload.cidade,
      slots: payload.vagas,
      date: payload.data,
      time: payload.hora,
      image: PLACEHOLDERS[idx], // 👈 adiciona foto fixa
    };
    setGames((s) => [mapped, ...s]);
    toast.success("Partida publicada!");
  }

  function handleSubmitRating(form) {
    console.log("rating-submitted", { gameId: selectedGame?.id, ...form });
    toast.success("Avaliação enviada! Obrigado por avaliar sua partida.");
    setOpenRate(false);
    setSelectedGame(null);
  }

  return (
    <section>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold">Jogos públicos</h1>

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

      {/* Lista de jogos */}
      {!loading && !err && games.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {games.map((g, idx) => {
            const cover = g.image || PLACEHOLDERS[idx % PLACEHOLDERS.length];
            return (
              <article
                key={g.id ?? g.title}
                className="group rounded-xl overflow-hidden card transition
                           ring-1 ring-white/10 hover:ring-[color:var(--pb-accent)]/40
                           hover:shadow-[0_0_0_1px_rgba(255,43,135,.35),0_20px_40px_-16px_rgba(255,43,135,.25)]"
              >
                <div className="relative aspect-[16/10] w-full bg-black/30">
                  <img
                    src={cover}
                    alt={g.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-base truncate">{g.title}</h3>
                  <p className="text-xs opacity-80 mt-1">{g.arena} • {g.city}</p>
                  <p className="text-xs opacity-80">⏰ {g.date} • {g.time}</p>
                  {g.slots && <p className="text-xs opacity-80">👥 {g.slots} vagas</p>}

                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      className="btn px-3 py-1.5 text-sm"
                      onClick={() => toast.success("Inscrição enviada!")}
                    >
                      Quero jogar!
                    </button>
                    <button className="btn-outline px-3 py-1.5 text-sm">Detalhes</button>
                    <button
                      className="btn-outline px-3 py-1.5 text-sm"
                      onClick={() => {
                        setSelectedGame(g);
                        setOpenRate(true);
                      }}
                    >
                      Avaliar
                    </button>
                </div>
              </div>
            </article>
          )})}
        </div>
      )}

      {/* FAB (mobile) */}
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

      {/* Modal de avaliação */}
      <RateModal
        open={openRate}
        game={selectedGame}
        onClose={() => {
          setOpenRate(false);
          setSelectedGame(null);
        }}
        onSubmit={handleSubmitRating}
      />
    </section>
  );
}
