import type Criptografia from "./Criptografia.js";
import type Usuario from "./Usuario.js";
import type BancoUsuario from "./BancoUsuario.js";
import Id from "../shared/Id.js";
import type CasoDeUso from "../shared/CasoDeUso.js";

type RegistrarUsuarioDto = {
  nome: string;
  email: string;
  senha: string;
};
export default class RegistrarUsuario
  implements CasoDeUso<RegistrarUsuarioDto, void>
{
  constructor(private banco: BancoUsuario, private cripto: Criptografia) {}

  async executar({ nome, email, senha }: RegistrarUsuarioDto): Promise<void> {
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
