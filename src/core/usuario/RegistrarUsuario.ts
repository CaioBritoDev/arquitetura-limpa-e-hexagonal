import type Banco from "../ports/Banco.js";
import type Criptografia from "../ports/Criptografia.js";

export default class RegistrarUsuario {
  constructor(private banco: Banco, private cripto: Criptografia) {}

  async executar(usuario: any): Promise<void> {
    if (!usuario.senha) throw new Error("Senha obrigatória");
    usuario.senha = await this.cripto.criptografar(usuario.senha);
    this.banco.salvar(usuario);
  }
}
