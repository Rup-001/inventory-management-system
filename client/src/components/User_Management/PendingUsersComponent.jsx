import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/api';

const PendingUsersComponent = () => {
  const { branchId } = useParams(); // Get branchId from URL parameters
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await api.get(`/api/pending/${branchId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add authorization header
          },
        });
        setPendingUsers(response.data);
      } catch (err) {
        console.error('Error fetching pending users:', err);
        setError(err.response ? err.response.data.message : 'Error fetching pending users');
      }
    };

    fetchPendingUsers();
  }, [branchId]);

  return (
    <div className="container">
      <h1>Pending Users for Branch: {branchId}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {pendingUsers.length > 0 ? (
          pendingUsers.map(user => (
            <div key={user._id} className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.fullName}</h5>
                  <p className="card-text">{user.email}</p>
                  <p className="card-text">Department: {user.department}</p>
                  <p className="card-text">Address: {user.address}</p>
                  <p className="card-text">Branch: {user.branchId.name}</p>
                  <button className="btn btn-primary">Approve</button>
                  <button className="btn btn-danger">Reject</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No pending users found for this branch.</p>
        )}
      </div>
    </div>
  );
};

export default PendingUsersComponent;
