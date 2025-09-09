import type Criptografia from "./Criptografia.js";
import type Usuario from "./Usuario.js";
import type BancoUsuario from "./BancoUsuario.js";
import Id from "../shared/Id.js";

export default class RegistrarUsuario {
  constructor(private banco: BancoUsuario, private cripto: Criptografia) {}

  async executar(nome: string, email: string, senha: string): Promise<void> {
    if (!senha) throw new Error("Senha obrigatória");
    const usuarioExistente = await this.banco.buscarPorEmail(email);
    if (usuarioExistente)
      throw new Error("Usuário com esse e-mail já cadastrado");
    const usuario: Usuario = {
      id: Id.gerar(),
      nome,
      email,
      senha: await this.cripto.criptografar(senha),
    };
    this.banco.salvar(usuario);
  }
}
