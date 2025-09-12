export default class Validador {
  // ... => parâmetro rest, pega os argumentos, mas posso usar como array
  static combinaErros(...validacoes: (string | boolean)[]) {
    const msgErros = validacoes.filter((msgErro) => msgErro);
    return msgErros.length ? msgErros.join(", ") : false;
  }
  static nuloOuIndefinido(valor: any, msgErro: string): string | boolean {
    return valor === null || valor === undefined ? msgErro : false;
  }
  static vazia(valor: string, msgErro: string): string | boolean {
    if (Validador.nuloOuIndefinido(valor, msgErro)) return msgErro;
    if (valor.trim() === "") return msgErro;
    return false;
  }
  static isEmailValido(email: string) {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    return regex.test(email);
  }
}
