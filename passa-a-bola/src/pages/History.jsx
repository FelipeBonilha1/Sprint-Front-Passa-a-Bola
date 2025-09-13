export default function History() {
  return (
    <section className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold mb-4">Histórico de Jogos</h1>
      <div className="card p-6 rounded-2xl">
        <div className="grid grid-cols-4 gap-3">
          {["MAIO", "JUNHO", "JUNHO", "JULHO"].map((m, i) => (
            <div key={i} className="card p-3 rounded-xl text-center">
              <p className="text-sm">{m}</p>
              <p className="text-2xl">⚽</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <a href="/publicar" className="btn">Marcar jogo</a>
        </div>
      </div>
    </section>
  );
}
