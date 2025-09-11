import type BancoUsuario from "../../core/usuario/BancoUsuario.js";
import type ProvedorAutenticacao from "../../core/usuario/ProvedorAutenticacao.js";
import type Token from "../../core/usuario/Token.js";
import { Erros } from "../../constants/Erros.js";
import type Criptografia from "../../core/usuario/Criptografia.js";
import type { TokensAutenticacao } from "../../core/usuario/dtos/Autenticacao.dto.js";

export default class AutenticacaoInterna implements ProvedorAutenticacao {
  constructor(
    private readonly token: Token,
    private readonly banco: BancoUsuario,
    private readonly cripto: Criptografia
  ) {}
  async autenticar(email: string, senha: string): Promise<TokensAutenticacao> {
    const usuarioCadastrado = await this.banco.buscarPorEmail(email);
    if (!usuarioCadastrado) throw new Error(Erros.EMAIL_OU_SENHA_INVALIDOS);
    const senhaValida = await this.cripto.comparar(
      senha,
      usuarioCadastrado.senha
    );
    if (!senhaValida) throw new Error(Erros.EMAIL_OU_SENHA_INVALIDOS);
    return {
      accessToken: await this.token.gerar(usuarioCadastrado, 60 * 15, "access"),
      refreshToken: await this.token.gerar(
        usuarioCadastrado,
        60 * 60 * 24 * 7,
        "refresh"
      ),
    };
  }
}
