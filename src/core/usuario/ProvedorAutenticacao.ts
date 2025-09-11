import type { TokensAutenticacao } from "./dtos/Autenticacao.dto.js";
export default interface ProvedorAutenticacao {
  autenticar(email: string, senha: string): Promise<TokensAutenticacao>;
}
