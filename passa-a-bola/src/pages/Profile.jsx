export default function Profile() {
  return (
    <section className="mx-auto max-w-md">
      <h1 className="text-2xl font-extrabold text-center mb-4">Seu Perfil</h1>
      <div className="card p-6 rounded-2xl">
        <form className="grid gap-3">
          {["Nome Completo", "Apelido", "Celular", "E-mail", "Idade"].map((label) => (
            <div key={label}>
              <label className="text-sm">{label}</label>
              <input className="w-full rounded-md px-3 py-2 bg-white/10" />
            </div>
          ))}
          <button className="btn mt-3">Salvar</button>
        </form>
      </div>
    </section>
  );
}
