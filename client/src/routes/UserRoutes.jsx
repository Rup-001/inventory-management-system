// src/routes/UserRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from '../components/User_Management/Register';
import LoginPage from '../components/User_Management/Login';
import RegisterUpdateUserPage from '../components/User_Management/RegisterUpdateUser';
import EditUserPage from '../components/User_Management/EditUser';
import AllUserListPage from '../components/User_Management/AllUserList';
import BranchUserListPage from '../page/BranchUserListPage';
import PendingUsersComponent from '../components/User_Management/PendingUsersComponent';
import PublicRoute from '../components/Auth/PublicRoute';
import PrivateRoute from '../components/Auth/PrivateRoute';
import ProfilePage from '../components/Menu/Profile';
import MyAssignmentPage from '../components/Assignment_Management/MyAssgnmnt'

const UserRoutes = () => (
  <Routes>
    <Route path="/register" element={<PublicRoute element={<RegisterPage />} />} />
    <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
    <Route path="/register-Update-User" element={<PrivateRoute element={<RegisterUpdateUserPage />} allowedRoles={['Administration']} />} />
    <Route path="/All-user-list" element={<PrivateRoute element={<AllUserListPage />} allowedRoles={['Administration']} />} />
    <Route path="/branch-user" element={<PrivateRoute element={<BranchUserListPage />} allowedRoles={['Administration']} />} />
    <Route path="/editUser/:id" element={<PrivateRoute element={<EditUserPage />} allowedRoles={['Administration']} />} />
    {/* <Route path="/pending-user/:branchId" element={<PrivateRoute element={<PendingUsersComponent />} />} /> */}
    <Route path="/profile"  element={<PrivateRoute element={<ProfilePage />} />}  />
    <Route path="/MyAssignment"  element={<PrivateRoute element={<MyAssignmentPage />} />}  />

  </Routes>
);

export default UserRoutes;
