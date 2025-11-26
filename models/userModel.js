const db = require('../database/db');

class UserModel {
	static createUser(username, phone, email, password) {
		return new Promise((resolve, reject) => {
			const sql = `
				INSERT INTO users (username, phone, email, password)
				VALUES (?, ?, ?, ?)
			`

			db.run(sql, [username, phone, email, password], function (err) {
				if (err) {
					return reject(err);
				}
				resolve({ id: this.lastID, username, phone, email });
			});
		})
	}

	static findUser(username) {
		return new Promise((resolve, reject) => {
			const sql = `
				SELECT * FROM users WHERE username = ?
			`

			db.get(sql, [username], (err, row) => {
				if (err) {
					return reject(err);
				}
				resolve(row);
			});
		})
	}
}

module.exports = UserModel;