export default function AppLoader({ text = "Carregando..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[80] grid place-items-center bg-[color:var(--pb-bg)]/95 backdrop-blur"
    >
      <div className="flex items-center gap-3">
        <img
          src="/images/imagem6.png"
          alt=""
          className="w-10 h-10 rounded-full animate-bounce motion-reduce:animate-none"
        />
        <span className="font-semibold">{text}</span>
      </div>
    </div>
  );
}
