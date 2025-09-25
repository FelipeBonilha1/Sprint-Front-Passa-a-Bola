// src/components/AccessibilityBar.jsx
import { useEffect, useState } from "react";

const LS_KEY = "a11y:prefs";

function loadPrefs() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || {};
  } catch (_e) {
    // storage indisponível (quota / modo privado) — ignorar
    void _e;
    return {};
  }
}
function savePrefs(p) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(p));
  } catch (_e) {
    // não logar no console; apenas consumir o erro para satisfazer o linter
    void _e;
  }
}

export default function AccessibilityBar() {
  const [fontScale, setFontScale] = useState(1);      // 0.9 ~ 1.4
  const [contrast, setContrast] = useState("normal"); // "normal" | "high"
  const [motion, setMotion] = useState("auto");       // "auto" | "reduce"
  const [legible, setLegible] = useState(false);      // fonte legível

  // carrega prefs salvas uma única vez
  useEffect(() => {
    const p = loadPrefs();
    if (p.fontScale) setFontScale(p.fontScale);
    if (p.contrast) setContrast(p.contrast);
    if (p.motion) setMotion(p.motion);
    if (typeof p.legible === "boolean") setLegible(p.legible);
  }, []);

  // aplica no <html> e persiste (dependências explícitas)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--font-scale", String(fontScale));
    root.dataset.contrast = contrast;
    root.dataset.motion = motion;
    root.dataset.legible = legible ? "on" : "off";

    savePrefs({ fontScale, contrast, motion, legible });
  }, [fontScale, contrast, motion, legible]);

  // atalhos: Alt+= / Alt+- / Alt+0 / Alt+S
  useEffect(() => {
    function onKey(e) {
      if (!e.altKey) return;

      if (["=", "+"].includes(e.key)) {
        e.preventDefault();
        setFontScale((v) => Math.min(1.4, +(v + 0.1).toFixed(2)));
      } else if (e.key === "-") {
        e.preventDefault();
        setFontScale((v) => Math.max(0.9, +(v - 0.1).toFixed(2)));
      } else if (e.key === "0") {
        e.preventDefault();
        setFontScale(1);
      } else if (e.key.toLowerCase() === "s") {
        const el = document.getElementById("main");
        if (el) {
          e.preventDefault();
          el.tabIndex = -1;
          el.focus();
          el.scrollIntoView({ block: "start" });
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []); // setState é estável

  const inc = () => setFontScale((v) => Math.min(1.4, +(v + 0.1).toFixed(2)));
  const dec = () => setFontScale((v) => Math.max(0.9, +(v - 0.1).toFixed(2)));
  const reset = () => setFontScale(1);

  return (
    <>
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only fixed left-3 top-3 z-[60] rounded-xl px-3 py-2 bg-[color:var(--pb-accent)] text-black font-semibold shadow"
      >
        Pular para o conteúdo
      </a>

      {/* Top Bar */}
      <div
        role="region"
        aria-label="Ferramentas de acessibilidade"
        className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/40"
      >
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-3 justify-between text-sm">
          <div className="font-medium opacity-90">Acessibilidade</div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <div className="inline-flex rounded-lg overflow-hidden border border-white/15">
              <button onClick={dec} className="px-2 py-1 bg-white/5 hover:bg-white/10">A−</button>
              <button onClick={reset} className="px-2 py-1 bg-white/5 hover:bg-white/10">A</button>
              <button onClick={inc} className="px-2 py-1 bg-white/5 hover:bg-white/10">A+</button>
            </div>

            <button
              aria-pressed={contrast === "high"}
              onClick={() => setContrast((c) => (c === "high" ? "normal" : "high"))}
              className={`px-3 py-1 rounded-lg border border-white/15 hover:bg-white/10 ${
                contrast === "high" ? "bg-white/10 ring-1 ring-pink-400/40" : ""
              }`}
              title="Alto contraste"
            >
              Contraste
            </button>

            <button
              aria-pressed={motion === "reduce"}
              onClick={() => setMotion((m) => (m === "reduce" ? "auto" : "reduce"))}
              className={`px-3 py-1 rounded-lg border border-white/15 hover:bg-white/10 ${
                motion === "reduce" ? "bg-white/10 ring-1 ring-pink-400/40" : ""
              }`}
              title="Reduzir animações"
            >
              Movimento
            </button>

            <button
              aria-pressed={legible}
              onClick={() => setLegible((v) => !v)}
              className={`px-3 py-1 rounded-lg border border-white/15 hover:bg-white/10 ${
                legible ? "bg-white/10 ring-1 ring-pink-400/40" : ""
              }`}
              title="Fonte mais legível"
            >
              Fonte
            </button>
          </div>

          {/* Mobile */}
          <details className="md:hidden group">
            <summary className="list-none cursor-pointer rounded-lg px-3 py-1 bg-white/10 hover:bg-white/15 select-none">
               Opções
            </summary>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="col-span-2 inline-flex rounded-lg overflow-hidden border border-white/15">
                <button onClick={dec} className="flex-1 px-2 py-1 bg-white/5 hover:bg-white/10">A−</button>
                <button onClick={reset} className="flex-1 px-2 py-1 bg-white/5 hover:bg-white/10">A</button>
                <button onClick={inc} className="flex-1 px-2 py-1 bg-white/5 hover:bg-white/10">A+</button>
              </div>

              <button
                aria-pressed={contrast === "high"}
                onClick={() => setContrast((c) => (c === "high" ? "normal" : "high"))}
                className={`px-3 py-2 rounded-lg border border-white/15 hover:bg-white/10 ${
                  contrast === "high" ? "bg-white/10 ring-1 ring-pink-400/40" : ""
                }`}
              >
                Contraste
              </button>
              <button
                aria-pressed={motion === "reduce"}
                onClick={() => setMotion((m) => (m === "reduce" ? "auto" : "reduce"))}
                className={`px-3 py-2 rounded-lg border border-white/15 hover:bg-white/10 ${
                  motion === "reduce" ? "bg-white/10 ring-1 ring-pink-400/40" : ""
                }`}
              >
                Movimento
              </button>
              <button
                aria-pressed={legible}
                onClick={() => setLegible((v) => !v)}
                className={`col-span-2 px-3 py-2 rounded-lg border border-white/15 hover:bg-white/10 ${
                  legible ? "bg-white/10 ring-1 ring-pink-400/40" : ""
                }`}
              >
                Fonte legível
              </button>
            </div>
          </details>
        </div>
      </div>
    </>
  );
}
