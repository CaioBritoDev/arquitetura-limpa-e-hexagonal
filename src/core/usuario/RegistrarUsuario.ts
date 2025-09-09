import type Criptografia from "./Criptografia.js";
import type Usuario from "./Usuario.js";
import type BancoUsuario from "./BancoUsuario.js";

export default class RegistrarUsuario {
  constructor(private banco: BancoUsuario, private cripto: Criptografia) {}

  async executar(usuario: Usuario): Promise<void> {
    if (!usuario.senha) throw new Error("Senha obrigatória");
    const usuarioExistente = await this.banco.buscarPorEmail(usuario.email);
    if (usuarioExistente)
      throw new Error("Usuário com esse e-mail já cadastrado");
    usuario.senha = await this.cripto.criptografar(usuario.senha);
    this.banco.salvar(usuario);
  }
}
