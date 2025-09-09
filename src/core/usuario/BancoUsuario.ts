import type Usuario from "./Usuario.js";

export default interface BancoUsuario {
  dados: Usuario[];
  salvar(dado: Usuario): Promise<void>;
  listar(): Promise<Usuario[]>;
  buscarPorEmail(email: string): Promise<Usuario | undefined>;
}
