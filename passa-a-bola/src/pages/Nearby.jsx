export default function Nearby() {
  return (
    <section className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Perto de você</h1>
      <div className="card p-6 rounded-2xl">
        <div className="grid grid-cols-3 gap-3">
          {["2h (14/22)", "1D (10/22)", "30min (20/22)"].map((txt, i) => (
            <div key={i} className="bg-[color:var(--pb-primary)] text-black rounded-lg p-3 text-center">
              {txt}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
