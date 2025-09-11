import "dotenv/config";
import { test, expect, describe, beforeAll } from "vitest";

import AutenticarUsuario from "../../src/core/usuario/AutenticarUsuario.js";
import AutenticacaoInterna from "../../src/adapters/auth/AutenticacaoInterna.js";
import TokenJwt from "../../src/adapters/auth/TokenJwt.js";
import Usuario from "../../src/core/usuario/Usuario.js";
import UsuarioEmMemoria from "../../src/adapters/db/UsuarioEmMemoria.js";
import CriptografiaBcrypt from "../../src/adapters/auth/CriptografiaBcrypt.js";
import RegistrarUsuario from "../../src/core/usuario/RegistrarUsuario.js";

import { Erros } from "../../src/constants/Erros.js";

describe("Autentica usuário com autenticação interna", () => {
  const usuario = {
    nome: "Caio",
    senha: "123456",
    email: "caio@mail.com",
  } as Usuario;

  const usuarioEmMemoria = new UsuarioEmMemoria();
  const criptografiaBcrypt = new CriptografiaBcrypt();
  const jwtToken = new TokenJwt(
    process.env.ACCESS_TOKEN_SECRET!,
    process.env.REFRESH_TOKEN_SECRET!
  );

  beforeAll(async () => {
    const registrarUsuario = new RegistrarUsuario(
      usuarioEmMemoria,
      criptografiaBcrypt
    );
    await registrarUsuario.executar(usuario);
  });

  test("Deve autenticar o usuário com credenciais válidas", async () => {
    const autenticacaoInterna = new AutenticacaoInterna(
      jwtToken,
      usuarioEmMemoria,
      criptografiaBcrypt
    );
    const casoDeUso = new AutenticarUsuario(autenticacaoInterna);
    const execucao = await casoDeUso.executar({
      email: usuario.email,
      senha: usuario.senha,
    });
    expect(execucao).toHaveProperty("accessToken");
    expect(execucao).toHaveProperty("refreshToken");
  });

  test("Não deve autenticar o usuário com senha incorreta", async () => {
    const autenticacaoInterna = new AutenticacaoInterna(
      jwtToken,
      usuarioEmMemoria,
      criptografiaBcrypt
    );
    const casoDeUso = new AutenticarUsuario(autenticacaoInterna);
    await expect(
      casoDeUso.executar({
        email: usuario.email,
        senha: "SENHA_INCORRETA",
      })
    ).rejects.toThrow(new Error(Erros.EMAIL_OU_SENHA_INVALIDOS));
  });

  test("Não deve autenticar o usuário com e-mail incorreto", async () => {
    const autenticacaoInterna = new AutenticacaoInterna(
      jwtToken,
      usuarioEmMemoria,
      criptografiaBcrypt
    );
    const casoDeUso = new AutenticarUsuario(autenticacaoInterna);
    await expect(
      casoDeUso.executar({
        email: "E-MAIL_INCORRETO",
        senha: usuario.senha,
      })
    ).rejects.toThrow(new Error(Erros.EMAIL_OU_SENHA_INVALIDOS));
  });
});
