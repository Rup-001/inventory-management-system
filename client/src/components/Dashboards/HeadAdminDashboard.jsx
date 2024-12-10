// src/components/AdminHeadOfficeComponent.jsx

import React ,{ useEffect, useState } from 'react';
// import HeadAdminMenu from '../Menu/HeadAdminMenu';
//import UnifiedMenu from '../Menu/UnifiedMenu';
import { Link } from 'react-router-dom';
import api from '../../api/api';
const HeadAdminDashboard = () => {

    
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0); 
    const [pendingProductCount, setPendingProductCount] = useState(0); // Initialize as number
    const [pendingProductUser, setPendingUser] = useState(0); // Initialize as number

    useEffect(() => {
      const fetchUserCount = async () => {
        try {
          const response = await api.get('/api/count');
          setUserCount(response.data.count);
          const productResponse = await api.get('/api/product/count');
        setProductCount(productResponse.data.count);
        // const locationResponse = await api.get('/api/count');
        // setLocation(locationResponse.data.count);
        const productPendingResponse = await api.get('/api/product/countPending');
        setPendingProductCount(productPendingResponse.data.count);
        const userPendingResponse = await api.get('/api/pendingCount');
        setPendingUser(userPendingResponse.data.count);
        } catch (error) {
          console.error('Error fetching user count:', error);
        }
      };
  
      fetchUserCount();
    }, []);

    return (
        <div>
                    {/* <HeadAdminMenu /> */}
                    {/* <UnifiedMenu /> */}
                    

                    <div>
            <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1>Admin head Dashboard</h1>
          <div className="row">
            {/* Overview/Statistics */}
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">{userCount}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Products</h5>
                  <p className="card-text">{productCount}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total pending Products</h5>
                  <p className="card-text">{pendingProductCount}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total pending User</h5>
                  <p className="card-text">{pendingProductUser}</p>
                </div>
              </div>
            </div>
            {/* <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total branches</h5>
                  <p className="card-text">{locationCount}</p>
                </div>
              </div>
            </div> */}
          </div>

          <div className="row mt-4">
            {/* User Management */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  User Management
                </div>
                <div className="card-body">
                  <Link to="/user-list" className="btn btn-primary">View Users</Link>
                </div>
              </div>
            </div>

            {/* Product Management */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  Product Management
                </div>
                <div className="card-body">
                  <Link to="/products" className="btn btn-primary">View Products</Link>
                </div>
              </div>
            </div>
            
          </div>

          <div className="row mt-4">
            {/* Order Management */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  Inventory Management
                </div>
                <div className="card-body">
                  <Link to="/inventory" className="btn btn-primary">View Inventory</Link>
                </div>
              </div>
            </div>

            

            
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                Pending Products
                </div>
                <div className="card-body">
                  <Link to="/pending-products" className="btn btn-primary">View Pending Products</Link>
                </div>
              </div>
            </div>

            
          </div>

          <div className="row mt-4">
            {/* Reports */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                Pending Inventory
                </div>
                <div className="card-body">
                  <Link to="/pending-inventory" className="btn btn-primary">View Pending Inventory</Link>
                </div>
              </div>
            
            </div>
            
           
            {/* <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                pending User
                </div>
                <div className="card-body">
                  <Link to={pendingUserLink} className="btn btn-primary">pending User</Link>
                  <Link to="/user-list" className="btn btn-primary">pending User</Link>
                </div>
              </div>
            </div> */}
          </div>

        </div>
      </div>
    </div>
        </div>
        </div>
    );
}

export default HeadAdminDashboard;
