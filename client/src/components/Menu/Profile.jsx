import React, { useEffect, useState } from "react";
import api from '../../api/api';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("Token not found");
        }

        const decodedToken = decodeToken(token);
        const userId = decodedToken.id;
        const branch = decodedToken.branch;
        //const branch = decodeToken.branch;
        setBranch(branch);

        const response = await api.get(`/api/AllUser/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return {};
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">User Profile</h2>
          <div className="mb-3">
            <img
              src={`http://localhost:5000/profileImage/${user.profileImage}`}
              alt={user.username}
              width="100"
              className="img-thumbnail mb-3"
            />
          </div>
          <table className="table table-striped">
            <tbody>
              <tr>
                <td><strong>Username:</strong></td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td><strong>Full Name:</strong></td>
                <td>{user.fullName}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{user.email}</td>
              </tr>
              {/* <tr>
                <td><strong>Role:</strong></td>
                <td>{user.role}</td>
              </tr> */}
              <tr>
                <td><strong>Status:</strong></td>
                <td>{user.isApproved ? 'Approved' : 'Not Approved'}</td>
              </tr>
              <tr>
                <td><strong>Department:</strong></td>
                <td>{user.department}</td>
              </tr>
              <tr>
                <td><strong>Phone Number:</strong></td>
                <td>{user.phoneNumber}</td>
              </tr>
              <tr>
                <td><strong>Address:</strong></td>
                <td>{user.address}</td>
              </tr>
              <tr>
                <td><strong>Branch:</strong></td>
                <td>{branch}</td>
                {/* <td>{user.branchId && locations[user.branchId.name] ? locations[user.branchId.name].name : 'Unknown'}</td> */}

              </tr>
              <tr>
                <td><strong>Gender:</strong></td>
                <td>{user.gender}</td>
              </tr>
              <tr>
                <td><strong>Designation:</strong></td>
                <td>{user.designation}</td>
              </tr>
              <tr>
                <td><strong>Created At:</strong></td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <Link to={`/users/editUser/${user._id}`} className="btn btn-primary btn-sm">
                    Edit Profile
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
