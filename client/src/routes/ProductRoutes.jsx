// src/routes/ProductRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddProductPage from '../components/Product_Management/AddProduct';
import AdminAddProductPage from '../components/Product_Management/AdminAddProduct';
import ProductsPagee from '../components/Product_Management/Products';
import BranchProductPage from '../components/Product_Management/AvailableProduct';
import EditProductPage from '../components/Product_Management/EditProduct';
import BranchProducts from '../components/Product_Management/BranchProducts';
import AddEmployeeRequestPage from '../components/Product_Management/AddEmployeeRequest';
import PendingProductsPage from '../components/Head_Admin_Management/PendingProductsComponent';
import PrivateRoute from '../components/Auth/PrivateRoute';
import AddTransferPage from '../components/Transfer_Management/AddTransfer';

const ProductRoutes = () => (
  <Routes>
    <Route path="/add-product" element={<PrivateRoute element={<AddProductPage />} allowedRoles={['Administration']} />} />
    <Route path="/admin-add-product" element={<PrivateRoute element={<AdminAddProductPage />} allowedRoles={['Administration']} />} />
    <Route path="/products" element={<PrivateRoute element={<ProductsPagee />} />} />
    <Route path="/branch-products" element={<PrivateRoute element={<BranchProducts />} />} />
    <Route path="/All-Available-products" element={<PrivateRoute element={<BranchProductPage />} />} />
    <Route path="/editProduct/:id" element={<PrivateRoute element={<EditProductPage />} allowedRoles={['Administration']} />} />
    <Route path="/request-product" element={<PrivateRoute element={<AddEmployeeRequestPage />} />} />
    <Route path="/pending-products" element={<PrivateRoute element={<PendingProductsPage />} />} />
    <Route path="/Add-Transfer" element={<PrivateRoute element={<AddTransferPage />} allowedRoles={['Administration']} />} />

  </Routes>
);

export default ProductRoutes;
