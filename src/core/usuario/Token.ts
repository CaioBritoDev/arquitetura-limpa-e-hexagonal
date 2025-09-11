import type Usuario from "./Usuario.js";

export default interface Token {
  gerar(usuario: Usuario): Promise<string>;
  verificar(token: string): Promise<boolean>;
}
