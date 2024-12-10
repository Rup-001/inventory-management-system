import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';



const AllUserList = () => {
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserBranch, setCurrentUserBranch] = useState(null); // Store current user's branch
  const [searchTerm, setSearchTerm] = useState('');

  const decodeToken = (token) => {
    try {
      // Decode the token to get user information
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return {};
    }
  };

  useEffect(() => {
    const fetchUsersAndLocations = async () => {
      try {
        const [usersResponse, locationsResponse] = await Promise.all([
          api.get('/api/AllUser'),
          api.get('/api/allLocation'),
        ]);
  
        setUsers(usersResponse.data);
        console.log("user:", usersResponse.data  )
  
        if (Array.isArray(locationsResponse.data)) {
            const locationsMap = {};
            locationsResponse.data.forEach(location => {
              locationsMap[location.name] = location; // Use location name as key
            });
            setLocations(locationsMap);
          } else {
            throw new Error('Invalid locations data format');
          }
  
        const existingToken = localStorage.getItem('token');
        if (existingToken) {
          // Decode the token to get user information
          const decodedToken = decodeToken(existingToken);
          // Log the decoded token to verify
          console.log(decodedToken);
          // Set the current user's branch from the decoded token
          setCurrentUserBranch(decodedToken.branch);
        } else {
          console.warn('No user token found. Branch filtering disabled.');
        }
      } catch (err) {
        setError('Error fetching data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsersAndLocations();
  }, []);
  
  // Filter users by branch
  const filteredUsers = users
  // Filter users by search term
  const filteredUsersBySearch = filteredUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <div className="alert alert-info">Loading users...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>

    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Users List</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by username, full name, or email"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Department</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Branch</th>
                <th>Gender</th>
                <th>Profile Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsersBySearch.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.designation}</td>
                  <td>{user.isApproved ? 'Yes' : 'No'}</td>
                  <td>{user.department}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.address}</td>
                 
                  <td>{user.branchId && locations[user.branchId.name] ? locations[user.branchId.name].name : 'Unknown'}</td>
                  <td>{user.gender}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/profileImage/${user.profileImage}`}
                      alt={user.username}
                      width="50"
                      className="img-thumbnail"
                    />
                  </td>
                  <td>
                    <Link to={`/users/editUser/${user._id}`} className="btn btn-primary btn-sm">
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default AllUserList;
