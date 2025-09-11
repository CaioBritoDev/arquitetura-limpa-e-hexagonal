export default interface ProvedorAutenticacao {
  autenticar(email: string, senha: string): Promise<string>;
}
