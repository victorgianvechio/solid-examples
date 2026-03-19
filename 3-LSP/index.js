/*
O Princípio de Substituição de Liskov (LSP) afirma que objetos de uma classe 
derivada devem ser substituíveis por objetos da classe base sem alterar o 
comportamento do programa. 

Em outras palavras, se uma classe A é uma subclasse de B, então os objetos de A 
devem poder ser usados no lugar dos objetos de B sem causar erros ou 
comportamentos inesperados.

No exemplo abaixo, temos uma classe base `Pagamento` e duas subclasses 
`PagamentoCartao` e `PagamentoPix`. 

A classe `Pagamento` tem um método `estornar`, mas a classe `PagamentoPix` 
não pode estornar pagamentos, o que viola o LSP.
*/

// SEM APLICAR LSP
class Pagamento {
  pagar(valor) {
    console.log(`Pagando R$${valor}`);
  }

  estornar(valor) {
    console.log(`Estornando R$${valor}`);
  }
}

class PagamentoCartao extends Pagamento {
  pagar(valor) {
    console.log(`Cartão: R$${valor}`);
  }

  estornar(valor) {
    console.log(`Estorno no cartão: R$${valor}`);
  }
}

class PagamentoPix extends Pagamento {
  pagar(valor) {
    console.log(`Pix: R$${valor}`);
  }

  estornar(valor) {
    throw new Error('Pix não pode ser estornado'); // 💥
  }
}

function processarEstorno(pagamento) {
  pagamento.estornar(100);
}

processarEstorno(new PagamentoCartao()); // OK
processarEstorno(new PagamentoPix());    // 💥 quebra
  
/*
Para corrigir isso, podemos criar uma interface ou classe base que defina apenas os 
métodos que são comuns a todos os tipos de pagamento, e as subclasses podem 
implementar apenas os métodos relevantes para elas.
*/

// APLICANDO LSP
class Pagamento {
  pagar(valor) {
    console.log(`Pagando R$${valor}`);
  }
}

class PagamentoComEstorno extends Pagamento {
  estornar(valor) {
    console.log(`Estornando R$${valor}`);
  }
}

class PagamentoCartao extends PagamentoComEstorno {
  pagar(valor) {
    console.log(`Cartão: R$${valor}`);
  }

  estornar(valor) {
    console.log(`Estorno no cartão: R$${valor}`);
  }
}

// A classe PagamentoPix não tem o método estornar, então não viola o LSP
class PagamentoPix extends Pagamento {
  pagar(valor) {
    console.log(`Pix: R$${valor}`);
  }
}

