// src/routes/ProductRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/Auth/PrivateRoute';
import AddLocationPage from '../components/Location_Management/AddLocation';
import AllBranchLocationsPage from '../components/Location_Management/AllBranchLocations';


const LocationRoutes = () => (
  <Routes>
    <Route path="/Add-Location" element={<PrivateRoute element={<AddLocationPage />} allowedRoles={['Administration']} />} />
    <Route path="/All-Location" element={<PrivateRoute element={<AllBranchLocationsPage />} />} />
  </Routes>
);

export default LocationRoutes;
