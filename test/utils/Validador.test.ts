import { test, expect, describe, beforeAll } from "vitest";
import Validador from "../../src/utils/Validador.js";

const erroDeValorNuloOuIndefinido = "Valor nulo ou indefinido não é permitido!";
const erroDeStringVazia = "Não é permitido inserir valores vazios!";

describe("Teste dos métodos atômicos da classe validador", () => {
  test("Deve mostrar erro de valor nulo", () => {
    const valorNulo = null;
    expect(
      Validador.nuloOuIndefinido(valorNulo, erroDeValorNuloOuIndefinido)
    ).toBe(erroDeValorNuloOuIndefinido);
  });
  test("Deve mostrar erro de valor indefinido", () => {
    const valorNulo = undefined;
    expect(
      Validador.nuloOuIndefinido(valorNulo, erroDeValorNuloOuIndefinido)
    ).toBe(erroDeValorNuloOuIndefinido);
  });
  test("Deve passar no teste de valor nulo ou indefinido, retornando falso", () => {
    const valorNaoNuloENaoIndefinido = "Teste de valor.";
    expect(
      Validador.nuloOuIndefinido(
        valorNaoNuloENaoIndefinido,
        erroDeValorNuloOuIndefinido
      )
    ).toBe(false);
  });
  test("Deve mostrar erro de string vazia", () => {
    const stringVazia = "     ";
    expect(Validador.vazia(stringVazia, erroDeStringVazia)).toBe(
      erroDeStringVazia
    );
  });
  test("Deve mostrar erro de string vazia", () => {
    const stringVazia = "";
    expect(Validador.vazia(stringVazia, erroDeStringVazia)).toBe(
      erroDeStringVazia
    );
  });
  test("Deve passar no teste de string vazia, retornando falso", () => {
    const str = "String preenchida";
    expect(Validador.vazia(str, erroDeStringVazia)).toBe(false);
  });
});

describe("Teste dos métodos estáticos de combinação de erros da classe validador", () => {
  test("Deve combinar os erros corretamente (1/2 passa na validação)", () => {
    const str = "String preenchida";
    const valorNulo = null;
    expect(
      Validador.combinaErros(
        Validador.vazia(str, erroDeStringVazia),
        Validador.nuloOuIndefinido(valorNulo, erroDeValorNuloOuIndefinido)
      )
    ).toBe(erroDeValorNuloOuIndefinido);
  });
  test("Deve combinar os erros corretamente (1/2 passa na validação)", () => {
    const valorIndefinido = undefined;
    const valorPreenchido = 23;
    const stringVazia = "                      ";
    expect(
      Validador.combinaErros(
        Validador.nuloOuIndefinido(
          valorIndefinido,
          erroDeValorNuloOuIndefinido
        ),
        Validador.nuloOuIndefinido(
          valorPreenchido,
          erroDeValorNuloOuIndefinido
        ),
        Validador.vazia(stringVazia, erroDeStringVazia)
      )
    ).toBe(`${erroDeValorNuloOuIndefinido}, ${erroDeStringVazia}`);
  });
});
