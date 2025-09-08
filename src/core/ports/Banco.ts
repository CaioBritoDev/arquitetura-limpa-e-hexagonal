export default interface Banco {
  dados: any[];
  salvar(dado: any): void;
  listar(): any[];
}
