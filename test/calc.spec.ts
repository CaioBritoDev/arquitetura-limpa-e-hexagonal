import { describe, expect, it } from "vitest";
import { add } from "../src/calc.js";

describe("Módulo de Cálculo", () => {
  it("deve adicionar dois números corretamente", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });
});
