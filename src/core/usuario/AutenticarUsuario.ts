import type CasoDeUso from "../shared/CasoDeUso.js";
import type ProvedorAutenticacao from "./ProvedorAutenticacao.js";

export default class AutenticarUsuario
  implements CasoDeUso<{ email: string; senha: string }, string>
{
  constructor(private readonly autenticacao: ProvedorAutenticacao) {}
  async executar(dto: { email: string; senha: string }): Promise<string> {
    return await this.autenticacao.autenticar(dto.email, dto.senha);
  }
}
