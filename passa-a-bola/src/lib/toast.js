// micro-toaster sem dependências
let _id = 0;
const listeners = new Set();

export const toast = {
  show(message, type = "info", duration = 3000) {
    const t = { id: ++_id, message, type, duration };
    listeners.forEach((fn) => fn(t));
  },
  success(msg, d) { this.show(msg, "success", d); },
  error(msg, d) { this.show(msg, "error", d); },
  info(msg, d) { this.show(msg, "info", d); },

  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
};
