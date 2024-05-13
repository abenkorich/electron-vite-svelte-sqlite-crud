import { db } from './db'
import { productsTableColumns } from './db';

// Function to add a new product
export const addProductToDB = (product) => {
  console.log('Model >> Product >> addProductToDB Called')
  

  const placeholders = productsTableColumns.map(() => '?').join(', ');

  // INSERT INTO products ('id','ref','image','nom_commercial','matiere_active','formulation','concentration','category_id','famille_id','fabricant_id','representant_id','fournisseur_id','description','descriptio')

  const sql = `INSERT INTO products VALUES (${placeholders})`;

  db.run(sql, product, (err) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      console.log('Product added successfully!');
    }
  });
};

// Function to update an existing product
export const updateProductToDB = (productId, updatedProduct) => {
  const sql = `
    UPDATE products
    SET image = ?, name = ?, model = ?, cost = ?, price = ?, quantity = ?, supplier_id = ?, category_id = ?, description = ?
    WHERE id = ?
  `;
  db.run(sql, [
    updatedProduct.image,
    updatedProduct.name,
    updatedProduct.model,
    updatedProduct.cost,
    updatedProduct.price,
    updatedProduct.quantity,
    updatedProduct.supplierId,
    updatedProduct.categoryId,
    updatedProduct.description,
    productId
  ], (err) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      console.log('Product updated successfully!');
    }
  });
};

// Function to get all products
export const getAllProductsFromDB = (callback) => {
  const sql = 'SELECT * FROM products';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      callback(rows);
    }
  });
};

// Function to get a specific product by ID
export const getProductByIdFromDB = (productId, callback) => {
  const sql = 'SELECT * FROM products WHERE id = ?';
  db.get(sql, [productId], (err, row) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      callback(row);
    }
  });
};

// Function to delete a supplier by ID
export const deleteProductFromDB = (productId) => {
    const sql = `
      DELETE FROM products
      WHERE id = ?
    `;
    db.run(sql, [productId], (err) => {
      if (err) {
        console.error(err);
        // Handle error
      } else {
        console.log('Product deleted successfully!');
      }
    });
  };

