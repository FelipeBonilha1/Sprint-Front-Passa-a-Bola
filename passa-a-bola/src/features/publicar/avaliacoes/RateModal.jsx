import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "../../../lib/toast";

const MAX_COMMENT = 200;
const TAGS = [
  "marcou bem",
  "finalizou bem",
  "finalizou mal",
  "faltou fôlego",
  "ajudou na marcação",
  "boa saída de bola",
  "destaque defensivo",
  "destaque ofensivo",
];

export default function RateModal({ open, game, onClose, onSubmit }) {
  const dialogRef = useRef(null);

  // Protótipo: em breve vem da API de participantes confirmados
  const mockPlayers = useMemo(
    () => [
      { id: "1", name: "João" },
      { id: "2", name: "Felipe" },
      { id: "3", name: "Marcos" },
      { id: "4", name: "Goleiro Carlos" },
    ],
    []
  );

  const [playerId, setPlayerId] = useState("");
  const [score, setScore] = useState(7);
  const [criteria, setCriteria] = useState({
    tecnica: 7,
    intensidade: 7,
    tatica: 7,
    fairPlay: 8,
    impacto: 7,
  });
  const [tags, setTags] = useState([]);
  const [comment, setComment] = useState("");
  const [mvp, setMvp] = useState(null);
  const [fairPlay, setFairPlay] = useState(null);

  // 🔒 Travar o body ao abrir o modal (e restaurar ao fechar)
  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const scrollY = window.scrollY;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.touchAction = "none"; // ajuda no mobile/iOS

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflow = "";
      body.style.touchAction = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Resetar formulário quando abre
  useEffect(() => {
    if (!open) return;
    setPlayerId("");
    setScore(7);
    setCriteria({ tecnica: 7, intensidade: 7, tatica: 7, fairPlay: 8, impacto: 7 });
    setTags([]);
    setComment("");
    setMvp(null);
    setFairPlay(null);
  }, [open]);

  function toggleTag(t) {
    setTags((prev) => (prev.includes(t) ? prev.filter((i) => i !== t) : [...prev, t]));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!playerId) {
      toast.error("Selecione um jogador para avaliar.");
      return;
    }
    onSubmit({
      playerId,
      score,
      criteria,
      tags,
      comment: comment.trim() || undefined,
      mvp,
      fairPlay,
    });
  }

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] grid place-items-center p-4 overscroll-contain"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Content (scroll interno) */}
      <div className="relative w-full max-w-xl rounded-2xl card ring-1 ring-white/10 max-h-[80vh] overflow-y-auto overscroll-contain">
        <header className="px-5 pt-5 sticky top-0 bg-[color:var(--pb-bg)]/80 backdrop-blur z-10">
          <h2 className="text-lg font-bold">Avaliar partida</h2>
          <p className="text-sm opacity-80">
            {game?.title} — {game?.date} • {game?.time}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Jogador avaliado */}
          <div>
            <label className="block text-sm mb-1">Jogador</label>
            <select
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              className="w-full bg-white/5 rounded-lg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pb-accent)]"
            >
              <option value="" disabled>Selecione um jogador</option>
              {mockPlayers.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Nota geral */}
          <div>
            <label className="block text-sm mb-1">Nota geral: {score}</label>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Critérios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(criteria).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm mb-1 capitalize">
                  {key === "tatica" ? "tática" : key === "fairPlay" ? "fair play" : key}: {value}
                </label>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={value}
                  onChange={(e) => setCriteria((c) => ({ ...c, [key]: Number(e.target.value) }))}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          {/* Tags rápidas */}
          <div>
            <span className="block text-sm mb-2">Feedback rápido</span>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  className={`px-3 py-1.5 rounded-xl text-sm border transition ${
                    tags.includes(t)
                      ? "bg-[color:var(--pb-accent)] text-black border-transparent"
                      : "border-white/15 hover:bg-white/5"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Comentário */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm mb-1">Comentário (opcional)</label>
              <span className="text-xs opacity-70">
                {comment.length}/{MAX_COMMENT}
              </span>
            </div>
            <textarea
              value={comment}
              onChange={(e) => e.target.value.length <= MAX_COMMENT && setComment(e.target.value)}
              rows={3}
              placeholder="Escreva um elogio ou sugestão de melhoria, com respeito."
              className="w-full bg-white/5 rounded-lg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pb-accent)]"
            />
          </div>

          {/* MVP / Fair Play (opcional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">MVP (opcional)</label>
              <select
                value={mvp ?? ""}
                onChange={(e) => setMvp(e.target.value || null)}
                className="w-full bg-white/5 rounded-lg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pb-accent)]"
              >
                <option value="">Sem voto</option>
                {mockPlayers.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Fair Play (opcional)</label>
              <select
                value={fairPlay ?? ""}
                onChange={(e) => setFairPlay(e.target.value || null)}
                className="w-full bg-white/5 rounded-lg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pb-accent)]"
              >
                <option value="">Sem voto</option>
                {mockPlayers.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-outline px-4 py-2">
              Cancelar
            </button>
            <button type="submit" className="btn px-4 py-2">
              Enviar avaliação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
