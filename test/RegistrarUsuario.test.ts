import { test, expect, describe } from "vitest";

import BancoEmMemoria from "../src/adapters/BancoEmMemoria.js";
import CriptografiaBcrypt from "../src/adapters/CriptografiaBcrypt.js";
import CriptografiaPlainText from "../src/adapters/CriptografiaPlainText.js";

import RegistrarUsuario from "../src/core/use-cases/RegistrarUsuario.js";

describe("RegistrarUsuario (banco em memória)", () => {
  test("Deve registar um usuário usando criptografia bcrypt", async () => {
    const usuario = { nome: "Caio", senha: "123456" };
    const bancoEmMemoria = new BancoEmMemoria();
    const criptografiaBcrypt = new CriptografiaBcrypt();
    const casoDeUso = new RegistrarUsuario(bancoEmMemoria, criptografiaBcrypt);
    await casoDeUso.executar(usuario);
    expect(bancoEmMemoria.dados).toHaveLength(1);
    expect(bancoEmMemoria.dados[0]).toEqual(usuario);
  });

  test("Deve registrar um usuário usando criptografia plain text", async () => {
    const usuario = { nome: "Caio", senha: "123456" };
    const bancoEmMemoria = new BancoEmMemoria();
    const criptografiaPlainText = new CriptografiaPlainText();
    const casoDeUso = new RegistrarUsuario(
      bancoEmMemoria,
      criptografiaPlainText
    );
    await casoDeUso.executar(usuario);
    expect(bancoEmMemoria.dados).toHaveLength(1);
    expect(bancoEmMemoria.dados[0]).toEqual({
      nome: "Caio",
      senha: "hash-123456",
    });
  });
});
