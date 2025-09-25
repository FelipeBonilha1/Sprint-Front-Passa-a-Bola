// src/features/publicar/PublishModal.jsx
import React, { useState } from "react";
import Modal from "../../ui/Modal";

export default function PublishModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    titulo: "",
    arena: "",
    cidade: "",
    vagas: "",
    data: "",
    hora: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.titulo.trim()) e.titulo = "Informe o título";
    if (!form.arena.trim()) e.arena = "Informe a arena/quadra";
    if (!form.cidade.trim()) e.cidade = "Informe a cidade";
    if (!form.data.trim()) e.data = "Informe a data";
    if (!form.hora.trim()) e.hora = "Informe a hora";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError("");
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      setLoading(true);

      //Apenas simula envio 
      await new Promise((r) => setTimeout(r, 800));

      // Devolve dados para o Feed atualizar o estado local
      onSubmit?.(form);

      // Reseta/fecha
      setLoading(false);
      setForm({ titulo: "", arena: "", cidade: "", vagas: "", data: "", hora: "" });
      onClose?.();

      // Feedback simples 
      setTimeout(() => alert("Partida publicada (simulado). ✅"), 0);
    } catch {
      setLoading(false);
      setServerError("Falha ao simular o envio. Tente novamente.");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Publique sua partida">
      <form onSubmit={handleSubmit} className="grid gap-4">
        {serverError ? (
          <div className="rounded-lg bg-red-500/10 text-red-300 px-3 py-2 text-sm">
            {serverError}
          </div>
        ) : null}

        <div>
          <label className="text-sm text-gray-300">Título</label>
          <input
            className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2 outline-none focus-visible:ring focus-visible:ring-pink-500"
            placeholder="Ex.: Fut de Quarta"
            value={form.titulo}
            onChange={update("titulo")}
          />
          {errors.titulo && <p className="mt-1 text-xs text-red-300">{errors.titulo}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-300">Arena / Quadra</label>
          <input
            className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2 outline-none focus-visible:ring focus-visible:ring-pink-500"
            placeholder="Ex.: Fênix Arena"
            value={form.arena}
            onChange={update("arena")}
          />
          {errors.arena && <p className="mt-1 text-xs text-red-300">{errors.arena}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-300">Cidade</label>
            <input
              className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2 outline-none focus-visible:ring focus-visible:ring-pink-500"
              placeholder="Ex.: São Paulo"
              value={form.cidade}
              onChange={update("cidade")}
            />
            {errors.cidade && <p className="mt-1 text-xs text-red-300">{errors.cidade}</p>}
          </div>
          <div>
            <label className="text-sm text-gray-300">Vagas (opcional)</label>
            <input
              className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2 outline-none focus-visible:ring focus-visible:ring-pink-500"
              placeholder="Ex.: 4/10"
              value={form.vagas}
              onChange={update("vagas")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-300">Data</label>
            <input
              type="text"
              inputMode="numeric"
              className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2 outline-none focus-visible:ring focus-visible:ring-pink-500"
              placeholder="Ex.: 20/09"
              value={form.data}
              onChange={update("data")}
            />
            {errors.data && <p className="mt-1 text-xs text-red-300">{errors.data}</p>}
          </div>
          <div>
            <label className="text-sm text-gray-300">Hora</label>
            <input
              type="text"
              inputMode="numeric"
              className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2 outline-none focus-visible:ring focus-visible:ring-pink-500"
              placeholder="Ex.: 19:30"
              value={form.hora}
              onChange={update("hora")}
            />
            {errors.hora && <p className="mt-1 text-xs text-red-300">{errors.hora}</p>}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 bg-white/5 hover:bg-white/10 focus-visible:ring focus-visible:ring-pink-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl px-5 py-2.5 bg-pink-500 hover:bg-pink-600 disabled:opacity-60 focus-visible:ring focus-visible:ring-pink-300"
          >
            {loading ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
