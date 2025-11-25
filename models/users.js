const db = require('../config/db');

class User {
  static create(username, email, password) {
    const stmt = db.prepare(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`
    );

    const info = stmt.run(username, email, password);

    return {
      id: info.lastInsertRowid,
      username,
      email
    };
  }
}

module.exports = User;