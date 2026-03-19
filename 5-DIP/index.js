/*
  DIP - Dependency Inversion Principle (Princípio da Inversão de Dependência) 
  afirma que os módulos de alto nível não devem depender de módulos de 
  baixo nível. Ambos devem depender de abstrações. 

  Isso significa que devemos depender de interfaces ou classes abstratas, em vez 
  de depender de implementações concretas.

  “Essa classe está acoplada a algo específico?”
 */

// SEM APLICAR DIP
  class MySQLDatabase {
  salvar(dados) {
    console.log('Salvando no MySQL');
  }
}

class UserService {
  constructor() {
    this.db = new MySQLDatabase(); // 💥 dependência direta
  }

  criarUsuario(user) {
    this.db.salvar(user);
  }
}

// APLICANDO DIP
class Database {
  salvar(dados) {
    throw new Error('Implementar salvar');
  }
}

class MySQLDatabase extends Database {
  salvar(dados) {
    console.log('Salvando no MySQL');
  }
}
class MongoDatabase extends Database {
  salvar(dados) {
    console.log('Salvando no MongoDB');
  }
}

class UserService {
  constructor(database) {
    this.db = database; // ✅ recebe abstração
  }

  criarUsuario(user) {
    this.db.salvar(user);
  }
}

const db = new MySQLDatabase();
const db2 = new MongoDatabase();

const service = new UserService(db);
const service2 = new UserService(db2);

service.criarUsuario();