import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import api from '../../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    designation: '', // Changed from 'role' to 'designation' to match the backend
    department: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    branchId: '',
    gender: '' // Added gender field
  });
  const [profileImage, setProfileImage] = useState(null);
  const [Locations, setLocations] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationResponse = await api.get('/api/allLocation'); // Fetch locations
        setLocations(locationResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('profileImage', profileImage);

    try {
      const response = await api.post('/api/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      if (window.confirm('User registered successfully! Proceed to login?')) {
        navigate('/login'); // Navigate to login page on confirmation
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error registering user');
    }
  };

  if (loading) {
    return <p>Loading data...</p>; // Display a loading message while fetching data
  }

  // Hardcoded options for departments and genders
  const departments = ['Administration', 'HR', 'Finance', 'Technology', 'Marketing', 'Sales', 'Support'];
  const genders = ['Male', 'Female'];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
           
<div className="mb-3">
  <label htmlFor="password" className="form-label">Password</label>
  <input
    type="password"
    id="password"
    name="password"
    className="form-control"
    placeholder="Password"
    onChange={handleChange}
    required
  />
</div>

<div className="mb-3">
  <label htmlFor="email" className="form-label">Email</label>
  <input
    type="email"
    id="email"
    name="email"
    className="form-control"
    placeholder="Email"
    onChange={handleChange}
    required
  />
</div>

<div className="mb-3">
  <label htmlFor="designation" className="form-label">Designation</label>
  <input
    type="text"
    id="designation"
    name="designation"
    className="form-control"
    placeholder="Designation"
    onChange={handleChange}
    required
  />
</div>

<div className="mb-3">
  <label htmlFor="department" className="form-label">Department</label>
  <select
    id="department"
    name="department"
    className="form-control"
    onChange={handleChange}
    required
  >
    <option value="">Select Department</option>
    {departments.map((dept, index) => (
      <option key={index} value={dept}>{dept}</option>
    ))}
  </select>
</div>

<div className="mb-3">
  <label htmlFor="fullName" className="form-label">Full Name</label>
  <input
    type="text"
    id="fullName"
    name="fullName"
    className="form-control"
    placeholder="Full Name"
    onChange={handleChange}
    required
  />
</div>

<div className="mb-3">
  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
  <input
    type="text"
    id="phoneNumber"
    name="phoneNumber"
    className="form-control"
    placeholder="Phone Number"
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label htmlFor="address" className="form-label">Address</label>
  <input
    type="text"
    id="address"
    name="address"
    className="form-control"
    placeholder="Address"
    onChange={handleChange}
    required
  />
</div>

<div className="mb-3">
  <label htmlFor="branchId" className="form-label">Branch</label>
  <select
    id="branchId"
    name="branchId"
    className="form-control"
    onChange={handleChange}
    required
  >
    <option value="">Select Branch</option>
    {Locations.map(location => (
      <option key={location._id} value={location._id}>{location.name}</option>
    ))}
  </select>
</div>

<div className="mb-3">
  <label htmlFor="gender" className="form-label">Gender</label>
  <select
    id="gender"
    name="gender"
    className="form-control"
    onChange={handleChange}
    required
  >
    <option value="">Select Gender</option>
    {genders.map((gender, index) => (
      <option key={index} value={gender}>{gender}</option>
    ))}
  </select>
</div>

<div className="mb-3">
  <label htmlFor="profileImage" className="form-label">Profile Image</label>
  <input
    type="file"
    id="profileImage"
    name="profileImage"
    className="form-control"
    onChange={handleFileChange}
    required
  />
</div>


            <button type="submit" className="btn btn-primary">Register</button>
          </form>
          {message && (
            <div className="alert mt-3 alert-success">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
