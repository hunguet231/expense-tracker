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

  static create(data) {
    return db.execute(
      `INSERT INTO users (firstName, lastName, birthday, sex, address, balance, username, password) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      data
    );
  }

  static update(data) {
    return db.execute(
      `UPDATE users 
      SET firstName = ?, lastName = ?, birthday = ?, sex = ?, address = ?, balance = ?, username = ?, password = ?`,
      data
    );
  }
};
