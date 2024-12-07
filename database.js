const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS results (id INTEGER PRIMARY KEY, code TEXT, score INTEGER, feedback TEXT)");
});

module.exports = db;