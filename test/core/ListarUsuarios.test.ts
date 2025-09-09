import { test, expect, describe, beforeAll } from "vitest";

import UsuarioEmMemoria from "../../src/adapters/db/UsuarioEmMemoria.js";
import ListarUsuarios from "../../src/core/usuario/ListarUsuarios.js";

describe("ListarUsuario (banco em memória)", () => {
  let bancoEmMemoria: UsuarioEmMemoria;

  beforeAll(async () => {
    bancoEmMemoria = new UsuarioEmMemoria();
    bancoEmMemoria.dados = [
      {
        nome: "Caio",
        senha: "123456",
        email: "caio@mail.com",
        id: "teste-id",
      },
    ];
  });

  test("Deve listar usuários", async () => {
    const casoDeUso = new ListarUsuarios(bancoEmMemoria);
    const usuarios = await casoDeUso.executar();
    expect(usuarios).toHaveLength(1);
  });
});
