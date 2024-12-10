import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from './auth';

const PublicRoute = ({ element }) => {
    return isLoggedIn() ? <Navigate to="/" /> : element;
};

export default PublicRoute;