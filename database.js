const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'metro.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_admin INTEGER NOT NULL DEFAULT 0
  );
`);

console.log("Database initialized and `users` table is ready.")

module.exports = db;