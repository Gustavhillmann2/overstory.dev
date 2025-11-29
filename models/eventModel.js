const db = require('../database/db');

class EventModel {
	static createEvent(title, date, description, price, imageUrl) {
		return new Promise((resolve, reject) => {
			const sql = `
				INSERT INTO events (title, date, description, price, imageUrl)
				VALUES (?, ?, ?, ?, ?)
			`

			db.run(sql, [title, date, description, price, imageUrl], function (err) {
				if (err) {
					return reject(err);
				}
				resolve({ id: this.lastID, title, date, description, price, imageUrl });
			});
		})
	};

	static getEvents() {
		return new Promise((resolve, reject) => {
			const sql = `SELECT * FROM events`;

			db.all(sql, [], (err, rows) => {
				if (err) {
					return reject(err);
				}
				resolve(rows);
			});
		})
	}
}

module.exports = EventModel;