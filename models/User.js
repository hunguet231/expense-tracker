const db = require("../utils/db");

module.exports = class User {
  static getAll() {
    return db.execute("SELECT * FROM users");
  }

  static getSingleById(id) {
    return db.execute(`SELECT * FROM users WHERE UID = ${id}`);
  }

  static getSingleByUsername(username) {
    return db.execute(`SELECT * FROM users WHERE username = '${username}'`);
  }

  static create(reqBody) {
    const {
      firstName,
      lastName,
      birthday,
      sex,
      address,
      balance,
      username,
      password,
    } = reqBody;

    return db.execute(
      `INSERT INTO users (firstName, lastName, birthday, sex, address, balance, username, password)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?);
       `,
      [firstName, lastName, birthday, sex, address, balance, username, password]
    );
  }

  static getLastInsertedRow() {
    return db.execute(`SELECT * FROM users WHERE UID = LAST_INSERT_ID();`);
  }

  static update(data) {
    return db.execute(
      `UPDATE users 
      SET firstName = ?, lastName = ?, birthday = ?, sex = ?, address = ?, balance = ?, username = ?, password = ?`,
      data
    );
  }
};
