import type Criptografia from "../../core/usuario/Criptografia.js";

export default class CriptografiaPlainText implements Criptografia {
  async criptografar(valor: string): Promise<string> {
    return `hash-${valor}`;
  }
  async comparar(valor: string, hash: string): Promise<boolean> {
    return hash === `hash-${valor}`;
  }
}
