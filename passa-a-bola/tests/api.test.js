import { describe, it, expect } from "vitest";

// função simples simulando algo que você já usa
function soma(a, b) {
  return a + b;
}

describe("Funções utilitárias", () => {
  it("soma dois números corretamente", () => {
    expect(soma(2, 3)).toBe(5);
  });
});
