// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { isLoggedIn, getUserRole } from './auth';

// const PrivateRoute = ({ element, allowedRoles, disallowedRoles }) => {
//   const userRole = getUserRole();
//   if (!isLoggedIn()) {
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(userRole)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   if (disallowedRoles && disallowedRoles.includes(userRole)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return element;
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, getUserRole, getUserBranch } from './auth';

const PrivateRoute = ({ element, allowedRoles, allowedBranch }) => {
    const userRole = getUserRole();
    const userBranch = getUserBranch();
    
    if (!isLoggedIn()) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" />;
    }

    if (allowedBranch && allowedBranch !== userBranch) {
        return <Navigate to="/unauthorized" />;
    }

    return element;
};

export default PrivateRoute;

