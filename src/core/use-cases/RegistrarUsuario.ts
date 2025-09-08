import type Banco from "../ports/Banco.js";

export default class RegistrarUsuario {
  constructor(private banco: Banco) {}

  executar(usuario: any): void {
    this.banco.salvar(usuario);
  }
}
