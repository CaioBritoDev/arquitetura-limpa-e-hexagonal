import type Usuario from "./Usuario.js";

export default interface BancoUsuario {
  dados: Usuario[];
  salvar(dado: Usuario): void;
  listar(): Usuario[];
  buscarPorEmail(email: string): Promise<Usuario | undefined>;
}
