import { useState } from "react";
import { Api } from "../services/api";

const initial = { title: "", arena: "", city: "", date: "", time: "", slots: "" };

export default function Publish() {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);
  const [ok, setOk] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    if (!form.title || !form.arena || !form.city || !form.date || !form.time) {
      setErr("Preencha título, arena, cidade, data e horário.");
      return false;
    }
    setErr(null);
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSaving(true);
      await Api.createGame(form);
      setOk(true);
      setForm(initial);
    } catch (e) {
      setErr(e?.message || "Erro ao publicar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mx-auto max-w-lg">
      <article className="card p-6 rounded-2xl border-l-4" style={{ borderLeftColor: "var(--pb-primary)" }}>
        <h1 className="text-xl font-bold">Publique sua partida… 📌</h1>

        <form onSubmit={submit} className="mt-4 grid gap-3">
          <Field label="Título" value={form.title} onChange={set("title")} placeholder="Ex.: Fut das Amigas" />
          <Field label="Arena / Quadra" value={form.arena} onChange={set("arena")} placeholder="Ex.: Fênix Arena" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Cidade" value={form.city} onChange={set("city")} placeholder="Ex.: São Paulo" />
            <Field label="Vagas (opcional)" value={form.slots} onChange={set("slots")} placeholder="Ex.: 4/10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Data" value={form.date} onChange={set("date")} placeholder="20/09" />
            <Field label="Hora" value={form.time} onChange={set("time")} placeholder="19:30" />
          </div>

          {err && <p className="text-sm text-red-400">{err}</p>}
          {ok && <p className="text-sm text-[color:var(--pb-accent)]">Jogo publicado!</p>}

          <button type="submit" className="btn mt-2" disabled={saving}>
            {saving ? "Publicando..." : "Publicar"}
          </button>
        </form>
      </article>
    </section>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="text-sm">
      <span className="block mb-1">{label}</span>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md px-3 py-2 bg-white/10 border border-white/15 placeholder:opacity-60"
      />
    </label>
  );
}
