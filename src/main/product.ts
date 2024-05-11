// const { addProduct, updateProduct, getAllProducts, getProductById, deleteProduct } = require('../../model/product');
import { ipcMain } from 'electron'
import * as productModal from '../model/product';

const getAllProducts = ipcMain.on('getAllProducts', (event) => {
    console.log('getAllProducts Action Recieved')
    productModal.getAllProductsFromDB( rows => {
        event.reply('getAllProductsResponse', {
            message: 'Products fetched successfully',
            products: rows
        });
    });
});

const addProduct = ipcMain.on('addProduct', (event, data) => {
    console.log('addProduct Action Recieved!', data)
    productModal.addProductToDB(data);
    event.reply('addProductResponse', {
        message: 'Product added successfully',
    });
});

const updateProduct = ipcMain.on('updateProduct', (event, productId, data) => {
    console.log(`updateProduct Action Recieved for product ID:`, productId  , `with Data :`, data );
    productModal.updateProductToDB( productId, data );
    event.reply('updateProductResponse', {
        message: 'Product Updated Successfully',
    });
});

const getProductById = ipcMain.on('getProductById', (event, productId) => {
    console.log('getProductById Action Recieved', productId)
    productModal.getProductByIdFromDB(productId, product => {
        event.reply('getProductByIdResponse', {
            message: 'Product Fetched Successfully',
            data: product 
        }
    );
});
});

const deleteProduct= ipcMain.on('deleteProduct', (event, productId) => {
    console.log('deleteProduct Action Recieved', productId)
    let res = productModal.deleteProductFromDB(productId);
    event.reply('deleteProductResponse', {
        message: 'Product Deleted Successfully',
    });
});

export default {
    getAllProducts,
    addProduct,
    updateProduct,
    getProductById,
    deleteProduct
}