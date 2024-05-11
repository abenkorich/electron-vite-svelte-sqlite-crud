const sqlite3 = require('sqlite3').verbose();

export const db = new sqlite3.Database('./inventory.db', () => {
  console.log('Database Created and Opened successfully on: ./inventory.db')
});

// Create tables for products, suppliers, and categories
db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    name TEXT NOT NULL,
    model TEXT,
    cost REAL,
    price REAL,
    quantity INTEGER,
    supplier_id INTEGER REFERENCES suppliers(id),
    category_id INTEGER REFERENCES categories(id),
    description TEXT
  );
`);
 
db.run(`
  CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
  );
`);

// Export database functions
// export default {
//   db,
//   // Add functions for CRUD operations on products, suppliers, and categories
// };
