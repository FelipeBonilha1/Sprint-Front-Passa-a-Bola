import { useEffect, useState } from "react";

const LS_KEY = "a11y:prefs";

function loadPrefs() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }
  catch { return {}; }
}
function savePrefs(p) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(p)); }
  catch { /* no-op */ }
}

export default function AccessibilityBar() {
  const [fontScale, setFontScale] = useState(1);             // 0.9 ~ 1.4
  const [contrast, setContrast]   = useState("normal");      // "normal" | "high"
  const [motion, setMotion]       = useState("auto");        // "auto" | "reduce"
  const [theme, setTheme]         = useState("dark");        // "dark" | "light"  ⭐

  // carregar prefs 1x
  useEffect(() => {
    const p = loadPrefs();
    if (p.fontScale) setFontScale(p.fontScale);
    if (p.contrast) setContrast(p.contrast);
    if (p.motion)   setMotion(p.motion);
    if (p.theme)    setTheme(p.theme);          // ⭐
  }, []);

  // aplicar no <html> e persistir
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--font-scale", String(fontScale));
    root.dataset.contrast = contrast;
    root.dataset.motion   = motion;
    root.dataset.theme    = theme;              // ⭐ "dark" | "light"
    savePrefs({ fontScale, contrast, motion, theme });
  }, [fontScale, contrast, motion, theme]);

  // atalhos: Alt+= / Alt+- / Alt+0 / Alt+S / Alt+L(toggle light)
  useEffect(() => {
    function onKey(e) {
      if (!e.altKey) return;
      if (["=", "+"].includes(e.key)) { e.preventDefault(); setFontScale(v => Math.min(1.4, +(v+0.1).toFixed(2))); }
      else if (e.key === "-")         { e.preventDefault(); setFontScale(v => Math.max(0.9, +(v-0.1).toFixed(2))); }
      else if (e.key === "0")         { e.preventDefault(); setFontScale(1); }
      else if (e.key.toLowerCase() === "s") {
        const el = document.getElementById("main");
        if (el) { e.preventDefault(); el.tabIndex = -1; el.focus(); el.scrollIntoView({ block: "start" }); }
      } else if (e.key.toLowerCase() === "l") {
        e.preventDefault(); setTheme(t => (t === "light" ? "dark" : "light"));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const inc = () => setFontScale(v => Math.min(1.4, +(v + 0.1).toFixed(2)));
  const dec = () => setFontScale(v => Math.max(0.9, +(v - 0.1).toFixed(2)));
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
            {/* A− A A+ */}
            <div className="inline-flex rounded-lg overflow-hidden border border-white/15">
              <button onClick={dec}   className="px-2 py-1 bg-white/5 hover:bg-white/10">A−</button>
              <button onClick={reset} className="px-2 py-1 bg-white/5 hover:bg-white/10">A</button>
              <button onClick={inc}   className="px-2 py-1 bg-white/5 hover:bg-white/10">A+</button>
            </div>

            {/* Alto contraste */}
            <button
              aria-pressed={contrast === "high"}
              onClick={() => setContrast(c => (c === "high" ? "normal" : "high"))}
              className={`px-3 py-1 rounded-lg border border-white/15 hover:bg-white/10 ${
                contrast === "high" ? "bg-white/10 ring-1 ring-pink-400/40" : ""
              }`}
              title="Alto contraste"
            >
              Contraste
            </button>

            {/* Reduzir animações */}
            <button
              aria-pressed={motion === "reduce"}
              onClick={() => setMotion(m => (m === "reduce" ? "auto" : "reduce"))}
              className={`px-3 py-1 rounded-lg border border-white/15 hover:bg-white/10 ${
                motion === "reduce" ? "bg-white/10 ring-1 ring-pink-400/40" : ""
              }`}
              title="Reduzir animações"
            >
              Movimento
            </button>

            {/* ⭐ Modo claro */}
            <button
              aria-pressed={theme === "light"}
              onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}
              className={`px-3 py-1 rounded-lg border border-white/15 hover:bg-white/10 ${
                theme === "light" ? "bg-white/10 ring-1 ring-pink-400/40" : ""
              }`}
              title="Alternar modo claro (Alt+L)"
            >
              Modo claro
            </button>
          </div>

          {/* Mobile */}
          <details className="md:hidden group">
            <summary className="list-none cursor-pointer rounded-lg px-3 py-1 bg-white/10 hover:bg-white/15 select-none">
               Opções
            </summary>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="col-span-2 inline-flex rounded-lg overflow-hidden border border-white/15">
                <button onClick={dec}   className="flex-1 px-2 py-1 bg-white/5 hover:bg-white/10">A−</button>
                <button onClick={reset} className="flex-1 px-2 py-1 bg-white/5 hover:bg-white/10">A</button>
                <button onClick={inc}   className="flex-1 px-2 py-1 bg-white/5 hover:bg-white/10">A+</button>
              </div>

              <button
                aria-pressed={contrast === "high"}
                onClick={() => setContrast(c => (c === "high" ? "normal" : "high"))}
                className={`px-3 py-2 rounded-lg border border-white/15 hover:bg-white/10 ${
                  contrast === "high" ? "bg-white/10 ring-1 ring-pink-400/40" : ""
                }`}
              >
                Contraste
              </button>

              <button
                aria-pressed={motion === "reduce"}
                onClick={() => setMotion(m => (m === "reduce" ? "auto" : "reduce"))}
                className={`px-3 py-2 rounded-lg border border-white/15 hover:bg-white/10 ${
                  motion === "reduce" ? "bg-white/10 ring-1 ring-pink-400/40" : ""
                }`}
              >
                Movimento
              </button>

              <button
                aria-pressed={theme === "light"}
                onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}
                className={`col-span-2 px-3 py-2 rounded-lg border border-white/15 hover:bg-white/10 ${
                  theme === "light" ? "bg-white/10 ring-1 ring-pink-400/40" : ""
                }`}
              >
                Modo claro
              </button>
            </div>
          </details>
        </div>
      </div>
    </>
  );
}
