export default function Search() {
  const history = [
    { regiao: "Itaquera", data: "27/08/25", status: "pendente" },
    { regiao: "Vila Maria", data: "01/09/25", status: "marcado" },
  ];

  return (
    <section className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold mb-4">Buscar partida</h1>
      <form className="card p-6 rounded-2xl grid gap-3 mb-6">
        <input className="rounded-md px-3 py-2 bg-white/10" placeholder="Região" />
        <input className="rounded-md px-3 py-2 bg-white/10" placeholder="Posição" />
        <input className="rounded-md px-3 py-2 bg-white/10" placeholder="Telefone" />
        <button className="btn">Buscar</button>
      </form>

      <h2 className="font-semibold mb-2">Histórico</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="opacity-70">
            <th>Região</th><th>Data</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, i) => (
            <tr key={i}>
              <td>{h.regiao}</td><td>{h.data}</td><td>{h.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
