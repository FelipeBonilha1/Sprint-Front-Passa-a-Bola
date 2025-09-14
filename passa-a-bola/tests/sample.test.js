import { describe, it, expect } from "vitest";

describe("Exemplo de teste", () => {
  it("soma dois números", () => {
    const soma = (a, b) => a + b;
    expect(soma(2, 3)).toBe(5);
  });
});
