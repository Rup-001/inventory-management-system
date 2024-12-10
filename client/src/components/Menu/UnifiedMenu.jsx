import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../User_Management/Logout';
import useUserRole from '../../hooks/useUserRole';

const UnifiedMenu = () => {

    const { userRole, userBranch, username, loading, error} = useUserRole(); 
    console.log("userRole",userRole)
    console.log("error",error)
     if (loading) return <p>Loading...</p>;
     //if (error) return <p>Error: {error}</p>;
     
    if (error) return null;

    const isHeadAdmin = userRole === 'Administration' && userBranch === 'Head Office';
    const isBranchAdmin = userRole === 'Administration' && userBranch !== 'Head Office';
    const isEmployee = userRole !== 'Administration';

    console.log("menuuuuuuuuuuuuuuuu")

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    {isHeadAdmin ? 'Head Admin Dashboard' : isBranchAdmin ? 'Branch Admin Dashboard' : 'Employee Dashboard'}
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#unifiedNavbar" aria-controls="unifiedNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="unifiedNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                         {/* Users Menu (Admins only) */}
                         {(isBranchAdmin || isHeadAdmin) && (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Users
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/users/branch-user">User List</Link></li>
                                    {isHeadAdmin && <li><Link className="dropdown-item" to="/users/all-user-list">All User List</Link></li>}
                                    {isHeadAdmin && <li><Link className="dropdown-item" to="/users/register-Update-User">pending users</Link></li>}
                                </ul>
                            </li>
                        )}

                         {/* Location Menu */}
                         {isHeadAdmin && (
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Location
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/location/Add-Location">Add Location</Link></li>
                                <li><Link className="dropdown-item" to="/location/All-Location">All Location</Link></li>
                            </ul>
                        </li>
                         )} 

                        {/* Products Menu */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Products
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {isEmployee && <li><Link className="dropdown-item" to="/products/request-product">Request Product</Link></li>}
                                {(isBranchAdmin || isHeadAdmin) && <li><Link className="dropdown-item" to="/products/add-product">Add Product</Link></li>}
                                {(isHeadAdmin) && <li><Link className="dropdown-item" to="/products/pending-products">pending Product</Link></li>}
                                <li><Link className="dropdown-item" to="/products/products">Products</Link></li>
                            </ul>
                        </li>

                        {/* Inventory Menu */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Inventory
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/inventory/branch-inventory">Branch Inventory</Link></li>
                                {(isBranchAdmin || isHeadAdmin) && <li><Link className="dropdown-item" to="/inventory/add-inventory">Add Inventory</Link></li>}

                                {(isHeadAdmin) && <li><Link className="dropdown-item" to="/inventory/pending-inventory">pending Inventory</Link></li>}
                                {isHeadAdmin && <li><Link className="dropdown-item" to="/inventory/pending-inventory">All Inventory</Link></li>}
                            </ul>
                        </li>
                      
                        {/* Common Menu Items */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/assignments/Add-Transfer">Add Transfer</Link>
                        </li>


                        {/* Assignments Menu */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Assignments
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to={isHeadAdmin ? "/assignments/head-admin-add-assignment" : "/assignments/add-assignment"}>Add Assignment</Link></li>
                                {(isHeadAdmin) && <li><Link className="dropdown-item" to= "/assignments/head-admin-view-assignments" >View Assignments</Link></li>}
                                {(isBranchAdmin || isHeadAdmin) && <li><Link className="dropdown-item" to=  "/assignments/view-assignments">View Branch Assignments</Link></li>}
                                {(isBranchAdmin || isHeadAdmin) &&  <li><Link className="dropdown-item" to="/assignments/pending-Assignments">pending Assignments</Link></li>}
                                {(isHeadAdmin) &&  <li><Link className="dropdown-item" to="/assignments/all-returned-Assignments">returned Assignments</Link></li>}
                                {(isBranchAdmin) &&  <li><Link className="dropdown-item" to="/assignments/branch-returned-Assignments">branch returned Assignments</Link></li>}

                                {isEmployee && <li><Link className="dropdown-item" to="/assignments/return-assignments">Return Assignments</Link></li>}
                            </ul>
                        </li>
                    </ul>

                    {/* User Dropdown */}
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {username}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="userDropdown">
                                <li><Link className="dropdown-item" to="/users/profile">Profile</Link></li>
                                <li><Link className="dropdown-item" to="/users/MyAssignment">My Assignment</Link></li>
                                <li><Logout /></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default UnifiedMenu;
