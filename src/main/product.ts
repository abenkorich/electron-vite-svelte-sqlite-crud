// const { addProduct, updateProduct, getAllProducts, getProductById, deleteProduct } = require('../../model/product');
import { ipcMain } from 'electron'
import * as productModal from '../model/product';
const fs = require('fs');
import XLSX from 'xlsx';

const getAllProducts = ipcMain.on('getAllProducts', (event) => {
    console.log('ipcMain >> getAllProducts Action Recieved')
    productModal.getAllProductsFromDB( rows => {
        event.reply('getAllProductsResponse', {
            message: 'Products fetched successfully',
            products: rows
        });
    });
});

const addProduct = ipcMain.on('addProduct', (event, data) => {
    console.log('ipcMain >> addProduct Action Recieved!', data)
    productModal.addProductToDB(data);
    event.reply('addProductResponse', {
        message: 'Product added successfully',
    });
});

const updateProduct = ipcMain.on('updateProduct', (event, productId, data) => {
    console.log(`ipcMain >> updateProduct Action Recieved for product ID:`, productId  , `with Data :`, data );
    productModal.updateProductToDB( productId, data );
    event.reply('updateProductResponse', {
        message: 'Product Updated Successfully',
    });
});

const getProductById = ipcMain.on('getProductById', (event, productId) => {
    console.log('ipcMain >> getProductById Action Recieved', productId)
    productModal.getProductByIdFromDB(productId, product => {
        event.reply('getProductByIdResponse', {
            message: 'Product Fetched Successfully',
            data: product 
        }
    );
});
});

const deleteProduct= ipcMain.on('deleteProduct', (event, productId) => {
    console.log('ipcMain >> deleteProduct Action Recieved', productId)
    let res = productModal.deleteProductFromDB(productId);
    event.reply('deleteProductResponse', {
        message: 'Product Deleted Successfully',
    });
});

const importProducts = ipcMain.on('importProducts', (event, data) => {
    console.log('ipcMain >> importProduct Action Recieved:', data )
    //const formData = new FormData();
    const formData = new FormData(data);
    console.log(formData.get('file'))
    //parseFle(data);
});

let fileData = "";

const parseFle = (formData) => {
    const file = formData.get('file');
    console.log('parseFle >>>> ', file)
    const filePath = './file.txt';
    fs.writeFileSync(filePath, file);
    // const reader = new FileReader();

    // reader.onload = function(event) {
    //   const arrayBuffer = event.target.result;
    //   const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    //   const firstSheetName = workbook.SheetNames[0];
    //   const worksheet = workbook.Sheets[firstSheetName];
    //   const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    //   fileData = sheetData.map(row => row.join('\t')).join('\n');
    // };

    // reader.readAsArrayBuffer(file);
    // console.log(fileData);


    // const file = data.file;
    // const workbook = XLSX.readFile(file.path);
    // const sheetName = workbook.SheetNames[0];
    // const worksheet = workbook.Sheets[sheetName];
    // const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // const db = new sqlite3.Database(':memory:');

    // const headers = data[0].map(header => `${header} TEXT`);
    // const createTableSQL = `CREATE TABLE IF NOT EXISTS excel_data (${headers.join(', ')})`;
    // db.run(createTableSQL, err => {
    //   if (err) {
    //     res.statusCode = 500;
    //     res.end('Internal Server Error');
    //     return;
    //   }

    //   const placeholders = data[0].map(() => '?').join(', ');
    //   const insertSQL = `INSERT INTO excel_data VALUES (${placeholders})`;
    //   db.serialize(() => {
    //     const stmt = db.prepare(insertSQL);
    //     data.slice(1).forEach(row => stmt.run(row));
    //     stmt.finalize();
    //   }); 
    // }
  }

export default {
    getAllProducts,
    addProduct,
    updateProduct,
    getProductById,
    deleteProduct,
    importProducts
}