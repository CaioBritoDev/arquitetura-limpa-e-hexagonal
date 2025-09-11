import jwt from "jsonwebtoken";
import type Token from "../../core/usuario/Token.js";

export default class TokenJwt implements Token {
  private segredoAccess: string;
  private segredoRefresh: string;

  constructor(segredoAccess: string, segredoRefresh: string) {
    this.segredoAccess = segredoAccess;
    this.segredoRefresh = segredoRefresh;
  }

  async gerar(
    usuario: {
      id: string;
      nome: string;
      email: string;
    },
    tempoExpiracao: number,
    tipo: "access" | "refresh"
  ): Promise<string> {
    return jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email },
      tipo === "access" ? this.segredoAccess : this.segredoRefresh,
      {
        expiresIn: tempoExpiracao,
      }
    );
  }

  async verificar(token: string, tipo: "access" | "refresh"): Promise<boolean> {
    try {
      jwt.verify(
        token,
        tipo === "access" ? this.segredoAccess : this.segredoRefresh
      );
      return true;
    } catch (e) {
      return false;
    }
  }
}
