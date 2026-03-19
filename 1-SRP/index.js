/*
  Essa classe tem várias responsábilidades, como criar um pedido, calcular o 
  total, salvar o pedido e enviar um email. 

  Isso viola o princípio de responsabilidade única (SRP) e torna a classe 
  difícil de manter e testar. 
*/

// SEM APLICAR SRP
class OrderService {
  createOrder(orderData) {
    // 1. Criar pedido
    const order = {
      ...orderData,
      createdAt: new Date()
    };

    // 2. Calcular total
    const total = this.calculateTotal(order);
    order.total = total;

    // 3. Salvar no banco
    this.saveOrder(order);

    // 4. Enviar email
    this.sendEmail(order);

    return order;
  }

  calculateTotal(order) {
    // regra de negócio
  }

  saveOrder(order) {
    // simulação de banco
  }

  sendEmail(order) {
    // simulação de envio
  }
}

/*
  Para corrigir isso, podemos dividir essas responsabilidades em classes 
  separadas, cada uma com uma única responsabilidade. 

  Injetando as dependências necessárias para o CONTRUCTOR, podemos garantir 
  que cada classe tenha apenas uma razão para mudar, tornando o código mais
  modular e fácil de manter.
*/

// APLICANDO SRP
// CRIA O USE CASE
class CreateOrderUseCase {
  constructor(priceService, orderRepository) {
    this.priceService = priceService;
    this.orderRepository = orderRepository;
  }

  execute(orderData) {
    // 1. Criar pedido
    const order = new Order(orderData);

    // 2. Calcular total
    order.total = this.priceService.calculate(order);

    // 3. Salvar no banco
    this.orderRepository.save(order);

    return order;
  }
}

// CRIA O SERVICE QUE CHAMA O USE CASE E DEPOIS ENVIA EMAIL
class OrderService {
  constructor(createOrderUseCase, sendOrderEmailHandler) {
    this.createOrderUseCase = createOrderUseCase;
    this.sendOrderEmailHandler = sendOrderEmailHandler;
  }

  create(orderData) {
    const order = this.createOrderUseCase.execute(orderData);

    // 4. Enviar email
    this.sendOrderEmailHandler.handle(order);

    return order;
  }
}