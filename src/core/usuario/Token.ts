import type Usuario from "./Usuario.js";

export default interface Token {
  gerar(
    usuario: Usuario,
    tempoExpiracao: number,
    tipo: "access" | "refresh"
  ): Promise<string>;
  verificar(token: string, tipo: "access" | "refresh"): Promise<boolean>;
}
