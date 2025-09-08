import type Criptografia from "../core/ports/Criptografia.js";
import bcrypt from "bcrypt";

export default class CriptografiaBcrypt implements Criptografia {
  async criptografar(valor: string): Promise<string> {
    return bcrypt.hash(valor, 10);
  }
  async comparar(valor: string, hash: string): Promise<boolean> {
    return bcrypt.compare(valor, hash);
  }
}