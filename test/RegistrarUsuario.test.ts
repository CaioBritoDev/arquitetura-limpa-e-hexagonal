import { test, expect, describe } from "vitest";

import BancoEmMemoria from "../src/adapters/db/BancoEmMemoria.js";
import CriptografiaBcrypt from "../src/adapters/auth/CriptografiaBcrypt.js";
import CriptografiaPlainText from "../src/adapters/auth/CriptografiaPlainText.js";

import RegistrarUsuario from "../src/core/usuario/RegistrarUsuario.js";
import type Usuario from "../src/core/usuario/Usuario.js";

describe("RegistrarUsuario (banco em memória)", () => {
  const criarUsuario = () =>
    ({
      nome: "Caio",
      senha: "123456",
      email: "caio@mail.com",
    } as Usuario);

  test("Deve registar um usuário usando criptografia bcrypt", async () => {
    const bancoEmMemoria = new BancoEmMemoria();
    const criptografiaBcrypt = new CriptografiaBcrypt();
    const casoDeUso = new RegistrarUsuario(bancoEmMemoria, criptografiaBcrypt);
    await casoDeUso.executar(criarUsuario());
    expect(bancoEmMemoria.dados).toHaveLength(1);
    expect(bancoEmMemoria.dados[0]).toBeDefined();
  });

  test("Deve registrar um usuário usando criptografia plain text", async () => {
    const bancoEmMemoria = new BancoEmMemoria();
    const criptografiaPlainText = new CriptografiaPlainText();
    const casoDeUso = new RegistrarUsuario(
      bancoEmMemoria,
      criptografiaPlainText
    );
    const usuario = criarUsuario();
    await casoDeUso.executar(usuario);
    expect(bancoEmMemoria.dados).toHaveLength(1);
    expect(bancoEmMemoria.dados[0]).toEqual({
      ...usuario,
      senha: "hash-123456",
    });
  });
});
