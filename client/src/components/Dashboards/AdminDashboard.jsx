// AdminDashboard.jsx
import React from 'react';

import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div>

            <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1>Admin Dashboard</h1>
          <div className="row">
            {/* Overview/Statistics */}
            {/* <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">100</p>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Products</h5>
                  <p className="card-text">50</p>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Orders</h5>
                  <p className="card-text">200</p>
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
            {/* <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  Order Management
                </div>
                <div className="card-body">
                  <Link to="/orders" className="btn btn-primary">View Orders</Link>
                </div>
              </div>
            </div> */}

            {/* Settings */}
            {/* <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  Settings
                </div>
                <div className="card-body">
                  <Link to="/settings" className="btn btn-primary">Manage Settings</Link>
                </div>
              </div>
            </div> */}
          </div>

          <div className="row mt-4">
            {/* Reports */}
            {/* <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  Reports
                </div>
                <div className="card-body">
                  <Link to="/reports" className="btn btn-primary">Generate Reports</Link>
                </div>
              </div>
            </div> */}

            {/* Notifications */}
            {/* <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  Notifications
                </div>
                <div className="card-body">
                  <Link to="/notifications" className="btn btn-primary">View Notifications</Link>
                </div>
              </div>
            </div> */}
          </div>

        </div>
      </div>
    </div>
        </div>
    );
};

export default AdminDashboard;