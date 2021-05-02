const db = require("../utils/db");

module.exports = class Transaction {
  static getAll() {
    return db.execute("SELECT * FROM transactions");
  }

  static getSingle(id) {
    return db.execute(`SELECT * FROM transactions WHERE TID = ${id}`);
  }

  static create(reqBody, userId) {
    const { amount, type, title, description } = reqBody;
    return db.execute(
      `INSERT INTO transactions (amount, type, title, description, TRANUID) 
       VALUES (${amount}, ${type}, ${title}, ${description}, ${userId})`
    );
  }

  static async updateById(id, reqBody) {
    const [transaction] = await this.getSingle(id);

    const amount = reqBody.amount || transaction.amount;
    const type = reqBody.type || transaction.type;
    const title = reqBody.title || transaction.title;
    const description = reqBody.description || transaction.description;

    return db.execute(
      `UPDATE transactions 
       SET amount = ${amount}, type = ${type}, title = ${title}, description = ${description}  
       WHERE TID = ${id}`
    );
  }

  static deleteById(id) {
    return db.execute(`DELETE FROM transactions WHERE TID = ${id}`);
  }
};
