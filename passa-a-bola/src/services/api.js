const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function req(path, init) {
  const r = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.status === 204 ? null : r.json();
}

export const Api = {
  listGames: () => req("/games"),
  createGame: (data) => req("/games", { method: "POST", body: JSON.stringify(data) }),
  me: () => req("/me")
};
