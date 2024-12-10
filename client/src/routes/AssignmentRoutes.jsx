// src/routes/AssignmentRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddAssignmentPage from '../components/Assignment_Management/AddAssignment';
import HeadAdminAddAssignmentPage from '../components/Assignment_Management/HeadAdminAddAssignment';
import HeadAdminViewAssignmentPage from '../components/Assignment_Management/HeadAdminViewAssignment';
import ViewAssignmentsPage from '../components/Assignment_Management/ViewAssignments';
import AddTransferPage from '../components/Transfer_Management/AddTransfer';
import PrivateRoute from '../components/Auth/PrivateRoute';
import PendingEmpAddAssgnmnt from '../components/Head_Admin_Management/PendingEmpAddAssgnmnt';
import AllReturnedAssignment from '../components/Assignment_Management/AllReturendAssgnmnt'
import BranchReturnedAssignment from '../components/Assignment_Management/BranchReturnAssignment';
import HandoverAssgnmnt from '../components/Assignment_Management/HandoverAssgnmnt';
const AssignmentRoutes = () => (
  <Routes>
    <Route path="/Add-Assignment" element={<PrivateRoute element={<AddAssignmentPage />} allowedRoles={['Administration']} />} />
    <Route path="/head-admin-Add-Assignment" element={<PrivateRoute element={<HeadAdminAddAssignmentPage />} allowedRoles={['Administration']} />} />
    <Route path="/head-admin-View-Assignments" element={<PrivateRoute element={<HeadAdminViewAssignmentPage />} allowedRoles={['Administration']} />} />
    <Route path="/View-Assignments" element={<PrivateRoute element={<ViewAssignmentsPage />} />} />
    <Route path="/pending-Assignments" element={<PrivateRoute element={<PendingEmpAddAssgnmnt />} />} />
    <Route path="/all-returned-Assignments" element={<PrivateRoute element={<AllReturnedAssignment />} />} />
    <Route path="/branch-returned-Assignments" element={<PrivateRoute element={<BranchReturnedAssignment />} />} />
    <Route path="/Add-Transfer" element={<PrivateRoute element={<AddTransferPage />} allowedRoles={['Administration']} />} />
    <Route path="/handover-assignment/:id" element={<PrivateRoute element={<HandoverAssgnmnt />} />} />
  </Routes>
);

export default AssignmentRoutes;
