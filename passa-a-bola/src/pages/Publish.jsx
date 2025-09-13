export default function Publish() {
  return (
    <section className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold mb-4">Publique sua partida</h1>
      <div className="card p-6 rounded-2xl">
        <form className="grid gap-3">
          {["Endereço da quadra", "Responsável", "Quantas pessoas", "Meio de comunicação", "Horário"].map((label) => (
            <div key={label}>
              <label className="text-sm">{label}</label>
              <input className="w-full rounded-md px-3 py-2 bg-white/10" />
            </div>
          ))}
          <button className="btn mt-3">Publicar</button>
        </form>
      </div>
    </section>
  );
}
