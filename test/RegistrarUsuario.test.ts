import { test, expect, describe } from "vitest";

import UsuarioEmMemoria from "../src/adapters/db/UsuarioEmMemoria.js";
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
    const bancoEmMemoria = new UsuarioEmMemoria();
    const criptografiaBcrypt = new CriptografiaBcrypt();
    const casoDeUso = new RegistrarUsuario(bancoEmMemoria, criptografiaBcrypt);
    const usuario = criarUsuario();
    await casoDeUso.executar(usuario.nome, usuario.email, usuario.senha);
    expect(bancoEmMemoria.dados).toHaveLength(1);
    expect(bancoEmMemoria.dados[0]).toBeDefined();
  });

  test("Deve registrar um usuário usando criptografia plain text", async () => {
    const bancoEmMemoria = new UsuarioEmMemoria();
    const criptografiaPlainText = new CriptografiaPlainText();
    const casoDeUso = new RegistrarUsuario(
      bancoEmMemoria,
      criptografiaPlainText
    );
    const usuario = criarUsuario();
    await casoDeUso.executar(usuario.nome, usuario.email, usuario.senha);
    expect(bancoEmMemoria.dados).toHaveLength(1);
    expect(bancoEmMemoria.dados[0].senha).toBe("hash-123456");
  });

  test("Não deve registrar um usuário sem senha", async () => {
    const bancoEmMemoria = new UsuarioEmMemoria();
    const criptografiaBcrypt = new CriptografiaBcrypt();
    const casoDeUso = new RegistrarUsuario(bancoEmMemoria, criptografiaBcrypt);
    const usuario = criarUsuario();
    usuario.senha = "";
    await expect(
      casoDeUso.executar(usuario.nome, usuario.email, usuario.senha)
    ).rejects.toThrow("Senha obrigatória");
    expect(bancoEmMemoria.dados).toHaveLength(0);
  });

  test("Não deve registrar um usuário com email já cadastrado", async () => {
    const bancoEmMemoria = new UsuarioEmMemoria();
    const criptografiaBcrypt = new CriptografiaBcrypt();
    const casoDeUso = new RegistrarUsuario(bancoEmMemoria, criptografiaBcrypt);
    const usuario = criarUsuario();
    await casoDeUso.executar(usuario.nome, usuario.email, usuario.senha);
    await expect(
      casoDeUso.executar(usuario.nome, usuario.email, usuario.senha)
    ).rejects.toThrow("Usuário com esse e-mail já cadastrado");
    expect(bancoEmMemoria.dados).toHaveLength(1);
  });
});
