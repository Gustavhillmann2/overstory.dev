const db = require('../database/db');

class UserModel {
	static createUser(username, email, password) {
		return new Promise((resolve, reject) => {
			const sql = `
				INSERT INTO users (username, email, password)
				VALUES (?, ?, ?)
			`

			db.run(sql, [username, email, password], function (err) {
				if (err) {
					return reject(err);
				}
				resolve({ id: this.lastID, username, email });
			});
		})
	}
}

module.exports = UserModel;