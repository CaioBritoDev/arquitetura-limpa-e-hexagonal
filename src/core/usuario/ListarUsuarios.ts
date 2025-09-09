import type CasoDeUso from "../shared/CasoDeUso.js";
import type BancoUsuario from "./BancoUsuario.js";
import type Usuario from "./Usuario.js";

export default class ListarUsuarios implements CasoDeUso<void, Usuario[]> {
  constructor(private readonly banco: BancoUsuario) {}

  async executar(): Promise<Usuario[]> {
    const usuarios = await this.banco.listar();
    return usuarios;
  }
}
