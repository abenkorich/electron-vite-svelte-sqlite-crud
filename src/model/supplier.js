const { db } = require('./db');

// Function to add a new supplier
const addSupplier = (supplier) => {
  const sql = `
    INSERT INTO suppliers (name, email, phone, address)
    VALUES (?,?,?,?)
  `;
  db.run(sql, [
    supplier.name,
    supplier.email,
    supplier.phone,
    supplier.address
  ], (err) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      console.log('Supplier added successfully!');
    }
  });
};

// Function to update an existing supplier
const updateSupplier = (supplierId, updatedSupplier) => {
  const sql = `
    UPDATE suppliers
    SET name = ?
    WHERE id = ?
  `;
  db.run(sql, [updatedSupplier.name, supplierId], (err) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      console.log('Supplier updated successfully!');
    }
  });
};

// Function to get all suppliers
const getAllSuppliers = (callback) => {
  const sql = 'SELECT * FROM suppliers';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      callback(rows);
    }
  });
};

// Function to get a specific supplier by ID
const getSupplierById = (supplierId, callback) => {
  const sql = 'SELECT * FROM suppliers WHERE id = ?';
  db.get(sql, [supplierId], (err, row) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      callback(row);
    }
  });
};

// Function to delete a supplier by ID
const deleteSupplier = (supplierId) => {
    const sql = `
      DELETE FROM suppliers
      WHERE id = ?
    `;
    db.run(sql, [supplierId], (err) => {
      if (err) {
        console.error(err);
        // Handle error
      } else {
        console.log('Supplier deleted successfully!');
      }
    });
  };

// Export category management functions
module.exports = {
    addSupplier,
    updateSupplier,
    getAllSuppliers,
    getSupplierById,
    deleteSupplier
};
