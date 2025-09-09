import type BancoUsuario from "./BancoUsuario.js";
import type Usuario from "./Usuario.js";

export default class ListarUsuarios {
  constructor(private readonly banco: BancoUsuario) {}

  async executar(): Promise<Usuario[]> {
    const usuarios = await this.banco.listar();
    return usuarios;
  }
}
