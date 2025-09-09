export default interface Criptografia {
  criptografar(valor: string): Promise<string>;
  comparar(valor: string, hash: string): Promise<boolean>;
}