const games = [
  { id: 1, title: "Fut de segunda", arena: "Arena ZL", date: "20/09", vagas: "4/10" },
  { id: 2, title: "Amigas craques", arena: "Estrela Norte", date: "21/09", vagas: "2/12" },
];

export default function Feed() {
  return (
    <section>
      <h1 className="text-2xl font-extrabold mb-4">Jogos públicos</h1>
      <div className="grid gap-4">
        {games.map((g) => (
          <article key={g.id} className="card p-4 rounded-2xl">
            <h2 className="font-semibold">{g.title}</h2>
            <p className="text-sm opacity-80">{g.arena} — {g.date}</p>
            <p className="text-sm opacity-80">Vagas: {g.vagas}</p>
            <button className="btn mt-2">Quero jogar!</button>
          </article>
        ))}
      </div>
    </section>
  );
}
