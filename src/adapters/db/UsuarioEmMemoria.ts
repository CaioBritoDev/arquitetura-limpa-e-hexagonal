import type BancoUsuario from "../../core/usuario/BancoUsuario.js";
import type Usuario from "../../core/usuario/Usuario.js";

export default class UsuarioEmMemoria implements BancoUsuario {
  dados: Usuario[] = [];

  salvar(dado: Usuario): void {
    this.dados.push(dado);
  }
  listar(): Usuario[] {
    return this.dados;
  }
  async buscarPorEmail(email: string): Promise<Usuario | undefined> {
    return this.dados.find((usuario) => usuario.email === email);
  }
}
