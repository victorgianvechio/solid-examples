/*
  O Open/Closed Principle (OCP) que afirma que as classes devem ser abertas para 
  extensão, mas fechadas para modificação. 

  Isso significa que devemos ser capazes de adicionar novas funcionalidades a uma 
  classe sem alterar seu código existente.

  No exemplo abaixo, temos uma função `processarPagamento` que processa 
  pagamentos com base no tipo de pagamento. Se quisermos adicionar um novo 
  tipo de pagamento, como boleto, teríamos que modificar a função, o 
  que viola o OCP.
*/

// SEM APLICAR OCP
function processarPagamento(tipo, valor) {
  if (tipo === 'cartao') {
    // Lógica para processar pagamento com cartão
    console.log('Processando pagamento com cartão.');
  } else if (tipo === 'pix') {
    // Lógica para processar pagamento com pix
    console.log('Processando pagamento com pix.');
  }
}
  
/*
  Para corrigir isso, podemos usar o conceito de interfaces ou classes abstratas 
  para definir um contrato para os tipos de pagamento.  

  Dessa forma, podemos adicionar novos tipos de pagamento sem modificar o código 
  existente, mantendo o código aberto para extensão, mas fechado para modificação.
*/

// APLICANDO OCP
// Classes
class IPagamento {
  pagar(valor) {}
}

class PagamentoCartao extends IPagamento {
  pagar(valor) {
    // Lógica para processar pagamento com cartão
    console.log(`Pagamento de R$${valor} no cartão`);
  }
}

class PagamentoPix extends IPagamento {
  pagar(valor) {
    // Lógica para processar pagamento com pix
    console.log(`Pagamento de R$${valor} no  pix.`);
  }
}

// FORMA DE USAR
function processarPagamento(pagamento, valor) {
  pagamento.pagar(valor);
  //salvar no banco
  // enviar email
  // gerar log
}

const pagamento = new PagamentoCartao();
processarPagamento(pagamento, 100);

const pagamento2 = new PagamentoPix();
processarPagamento(pagamento2, 200);