import type Banco from "../core/ports/Banco.js";

export default class BancoEmMemoria implements Banco {
  dados: any[] = [];

  salvar(dado: any): void {
    this.dados.push(dado);
  }
  listar(): any[] {
    return this.dados;
  }
}
