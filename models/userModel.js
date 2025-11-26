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
}

module.exports = UserModel;