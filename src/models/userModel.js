const db = require('../database/db'); // Importer database forbindelse

// UserModel klasse til at håndtere bruger relaterede database operationer
class UserModel {
	// Opret en ny bruger i databasen
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
		});
	};

	// Find en bruger i databasen baseret på brugernavn
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
		});
	};
};

module.exports = UserModel;