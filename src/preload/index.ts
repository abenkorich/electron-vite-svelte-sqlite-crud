import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  //Products logic
  getAllProducts: () => {
    console.log('Preload >> getAllProducts Recieved from Rendrer')
    ipcRenderer.send('getAllProducts')
  },
  getProductById: (productId) => {
    console.log('Preload >> getProductById Recieved from Rendrer')
    ipcRenderer.send('getProductById', productId)
  },
  addProduct: (productData) => {
    console.log('Preload >> addProduct Recieved from Rendrer')
    ipcRenderer.send('addProduct', productData)
  },
  updateProduct: (productId, productData) => {
    console.log('Preload >> updateProduct Recieved from Rendrer')
    ipcRenderer.send('updateProduct', productId, productData)
  },

  // Category Logics
  getAllCategories: () => ipcRenderer.send('getAllCategories'),
  getCategoryById: (categoryId) => ipcRenderer.send('getCategoryById', categoryId),
  addCategory: (categoryData) => ipcRenderer.send('addCategory', categoryData),
  updateCategory: (categoryId, categoryData) =>
    ipcRenderer.send('updateCategory', categoryId, categoryData),

  // Supplier Logic
  getAllSuppliers: () => ipcRenderer.send('getAllSuppliers'),
  getSupplierById: (supplierId) => ipcRenderer.send('getSupplierById', supplierId),
  addSupplier: (supplierData) => ipcRenderer.send('addSupplier', supplierData),
  updateSupplier: (supplierId, supplierData) =>
    ipcRenderer.send('updateSupplier', supplierId, supplierData)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
