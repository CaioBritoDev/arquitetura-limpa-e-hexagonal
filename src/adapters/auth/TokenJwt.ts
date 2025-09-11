import jwt from "jsonwebtoken";
import type Token from "../../core/usuario/Token.js";

export default class TokenJwt implements Token {
  private segredo: string;

  constructor(segredo: string) {
    this.segredo = segredo;
  }

  async gerar(usuario: {
    id: string;
    nome: string;
    email: string;
  }): Promise<string> {
    return jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email },
      this.segredo,
      {
        expiresIn: "1h",
      }
    );
  }

  async verificar(token: string): Promise<boolean> {
    try {
      jwt.verify(token, this.segredo);
      return true;
    } catch (e) {
      return false;
    }
  }
}
