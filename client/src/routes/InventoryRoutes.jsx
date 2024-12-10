// src/routes/InventoryRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InventoryPage from '../components/Inventory_Management/Inventory';
import AddInventoryPage from '../components/Inventory_Management/AddInventory';
import AdminInventoryPage from '../components/Inventory_Management/AdminInventory';
import AdminAddInventoryPage from '../components/Inventory_Management/AdminAddInventory';
import AllInventoryPage from '../components/Inventory_Management/AllInventory';
import VIewBranchAvailableProductPage from '../components/Inventory_Management/VIewBranchAvailableProduct';
import PrivateRoute from '../components/Auth/PrivateRoute';
import PendingInventoryPage from '../components/Head_Admin_Management/PendingInventoryComponent';

const InventoryRoutes = () => (
  <Routes>
    <Route path="/branch-inventory" element={<PrivateRoute element={<InventoryPage />} />} />
    <Route path="/Add-inventory" element={<PrivateRoute element={<AddInventoryPage />} allowedRoles={['Administration']} />} />
    <Route path="/admin-add-inventory" element={<PrivateRoute element={<AdminAddInventoryPage />} allowedRoles={['Administration']} />} />
    <Route path="/All-inventory" element={<PrivateRoute element={<AllInventoryPage />} />} />
    <Route path="/branch-inventory-admin" element={<PrivateRoute element={<AdminInventoryPage />} />} />
    <Route path="/Branch-Available-ProductPage/:locationId" element={<PrivateRoute element={<VIewBranchAvailableProductPage />} />} />
    <Route path="/pending-inventory" element={<PrivateRoute element={<PendingInventoryPage />} />} />

  </Routes>
);

export default InventoryRoutes;
