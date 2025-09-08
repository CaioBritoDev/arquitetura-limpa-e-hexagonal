import BancoEmMemoria from "../src/adapters/BancoEmMemoria.js";
import { test, expect } from "vitest";
import RegistrarUsuario from "../src/core/use-cases/RegistrarUsuario.js";

test("Deve registar um usuário usando o banco em memória", () => {
  const usuario = { nome: "Caio" };
  const bancoEmMemoria = new BancoEmMemoria();
  const casoDeUso = new RegistrarUsuario(bancoEmMemoria);
  casoDeUso.executar(usuario);
  expect(bancoEmMemoria.dados).toHaveLength(1);
  expect(bancoEmMemoria.dados[0]).toEqual(usuario);
});
