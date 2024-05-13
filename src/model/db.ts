const sqlite3 = require('sqlite3').verbose();
//import sqlite3 from 'sqlite3';

const dbName = "inventory2.db";

export const db = new sqlite3.Database(dbName, () => {
  console.log(`Database Created and Opened successfully on: ${dbName}`)
});

export const productsTableColumns =[
  'id',
  'ref',
  'image',
  'nom_commercial',
  'matiere_active',
  'formulation',
  'concentration',
  'category_id',
  'famille_id',
  'fabricant_id',
  'description'
]

// Create tables for products, suppliers, and categories
db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT,
    image TEXT,
    nom_commercial TEXT,
    matiere_active TEXT NOT NULL,
    formulation TEXT,
    concentration TEXT,
    category_id INTEGER REFERENCES category(id),
    famille_id INTEGER REFERENCES famille(id),
    fabricant_id INTEGER REFERENCES fabricant(id),
    description TEXT
  );
`);
 
db.run(`
  CREATE TABLE IF NOT EXISTS fabricant (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    representant TEXT NOT NULL,
    address TEXT NOT NULL
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS fournisseur (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    RC TEXT NOT NULL,
    NIF TEXT NOT NULL,
    NIS TEXT NOT NULL,
    AI TEXT NOT NULL,
    Comptes TEXT NOT NULL
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS famille (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS category (
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
