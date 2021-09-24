const db = require("../utils/db");

module.exports = class Transaction {
  static getAll() {
    return db.execute("SELECT * FROM transactions");
  }

  static getSingle(tid) {
    return db.execute(`SELECT * FROM transactions WHERE TID = '${tid}'`);
  }

  static getAllByUserId(uid) {
    return db.execute(
      `SELECT TID, amount, type, title, description, createdDate, modifiedDate, TRANUID
      FROM transactions INNER JOIN users ON transactions.TRANUID = ${uid} `
    );
  }

  static create(reqBody) {
    const { amount, type, title, description, TRANUID } = reqBody;
    return db.execute(
      `INSERT INTO transactions (amount, type, title, description, TRANUID) 
       VALUES (?, ?, ?, ?, ?)`,
      [amount, type, title, description, TRANUID]
    );
  }

  static async update(id, reqBody) {
    const [transaction] = await this.getSingle(id);

    const amount = reqBody.amount || transaction[0].amount;
    const type = reqBody.type || transaction[0].type;
    const title = reqBody.title || transaction[0].title;
    const description = reqBody.description || transaction[0].description;

    return db.execute(
      `UPDATE transactions 
       SET amount = ?, type = ?, title = ?, description = ? 
       WHERE TID = '${id}'`,
      [amount, type, title, description]
    );
  }

  static deleteById(id) {
    return db.execute(`DELETE FROM transactions WHERE TID = '${id}'`);
  }
};
