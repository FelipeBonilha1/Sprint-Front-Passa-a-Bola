export default function Login() {
  return (
    <section className="grid place-items-center min-h-[70dvh]">
      <div className="w-full max-w-sm p-6 rounded-2xl shadow-lg card">
        <h1 className="text-3xl font-extrabold text-center mb-4">
          <span className="text-[color:var(--pb-primary)]">Passa</span>{" "}
          <span className="text-[color:var(--pb-accent)]">a Bola</span>
        </h1>

        <form className="space-y-3">
          <label className="block text-sm">E-mail</label>
          <input className="w-full rounded-md px-3 py-2 bg-white/10" placeholder="email" />

          <label className="block text-sm">Senha</label>
          <input type="password" className="w-full rounded-md px-3 py-2 bg-white/10" />

          <button className="btn w-full mt-4">Entrar</button>
        </form>
      </div>
    </section>
  );
}
