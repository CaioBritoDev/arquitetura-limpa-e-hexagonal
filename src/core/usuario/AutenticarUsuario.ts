import type CasoDeUso from "../shared/CasoDeUso.js";
import type ProvedorAutenticacao from "./ProvedorAutenticacao.js";
import type {
  PropsAutenticacao,
  TokensAutenticacao,
} from "./dtos/Autenticacao.dto.js";

export default class AutenticarUsuario
  implements CasoDeUso<PropsAutenticacao, TokensAutenticacao>
{
  constructor(private readonly autenticacao: ProvedorAutenticacao) {}
  async executar(props: PropsAutenticacao): Promise<TokensAutenticacao> {
    return await this.autenticacao.autenticar(props.email, props.senha);
  }
}
