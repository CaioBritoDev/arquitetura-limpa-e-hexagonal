export default interface CasoDeUso<IN, OUT> {
  executar(props: IN): Promise<OUT>;
}
