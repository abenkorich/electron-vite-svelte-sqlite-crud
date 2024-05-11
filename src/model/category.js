const { db } = require('./db');

// Function to add a new category
const addCategory = (category) => {
  const sql = `
    INSERT INTO categories (name)
    VALUES (?)
  `;
  db.run(sql, [category.name], (err) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      console.log('Category added successfully!');
    }
  });
};

// Function to update an existing category
const updateCategory = (categoryId, updatedCategory) => {
  const sql = `
    UPDATE categories
    SET name = ?
    WHERE id = ?
  `;
  db.run(sql, [updatedCategory.name, categoryId], (err) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      console.log('Category updated successfully!');
    }
  });
};

// Function to get all categories
const getAllCategories = (callback) => {
  const sql = 'SELECT * FROM categories';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      callback(rows);
    }
  });
};

// Function to get a specific category by ID
const getCategoryById = (categoryId, callback) => {
  const sql = 'SELECT * FROM categories WHERE id = ?';
  db.get(sql, [categoryId], (err, row) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      callback(row);
    }
  });
};

// Function to delete a category by ID
const deleteCategory = (categoryId) => {
  const sql = `
    DELETE FROM categories
    WHERE id = ?
  `;
  db.run(sql, [categoryId], (err) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      console.log('Category deleted successfully!');
    }
  });
};

// Export category management functions
module.exports = {
  addCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
};
