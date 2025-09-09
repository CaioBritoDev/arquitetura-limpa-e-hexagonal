import { v4 as uuidv4 } from "uuid";

// É direto um adapter, pois não teremos outro provedor de ID, e isso não trará grandes prejuízos
// para a arquitetura do sistema.
// Se tivéssemos mais de um provedor, aí sim seria interessante criar uma porta (interface) para isso.
// Exemplo: Id (interface) e IdUUID (implementação concreta)
// Assim, o core dependeria da abstração (interface) e não da implementação concreta (UUID).
// Mas como não é o caso, podemos simplificar.
// Além disso, o UUID é um padrão muito utilizado e dificilmente será substituído por outro.
// Então, nesse caso, não há tanto risco de acoplamento.

// Outra consideração é que o UUID é um gerador de ID que não depende de estado.
// Ou seja, não precisamos manter uma instância da classe para gerar IDs.
// Por isso, podemos utilizar métodos estáticos.

// Se fosse um gerador de ID que dependesse de estado (ex: auto-incremento em banco de dados),
// aí sim seria interessante criar uma instância da classe e manter o estado.
export default class Id {
  static gerar(): string {
    return uuidv4();
  }
}
