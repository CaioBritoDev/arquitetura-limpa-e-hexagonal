import type {
  PropsAutenticacao,
  TokensAutenticacao,
} from "./dtos/Autenticacao.dto.js";
export default interface ProvedorAutenticacao {
  autenticar(props: PropsAutenticacao): Promise<TokensAutenticacao>;
}
