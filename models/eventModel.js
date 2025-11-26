const db = require('../database/db');

class EventModel {
	static createEvent(title, date, description, price) {
		return new Promise((resolve, reject) => {
			const sql = `
				INSERT INTO events (title, date, description, price)
				VALUES (?, ?, ?, ?)
			`

			db.run(sql, [title, date, description, price], function (err) {
				if (err) {
					return reject(err);
				}
				resolve({ id: this.lastID, title, date, description, price });
			});
		})
	}
}

module.exports = EventModel;