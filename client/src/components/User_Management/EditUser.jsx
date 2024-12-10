import React, { useState, useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import api from '../../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
// import AdminMenu from '../Menu/AdminMenu';


const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
  
        designation: '',
        isApproved: false,
        department: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        branchId: '',
        gender: '',
        profileImage: null,
    });
    const [branches, setBranches] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserAndBranches = async () => {
            try {
                const [userResponse, branchesResponse] = await Promise.all([
                    api.get(`/api/AllUser/${id}`),
                    api.get('/api/AllLocation')
                ]);

                setFormData(userResponse.data);
                console.log(setFormData)
                setBranches(branchesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndBranches();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // const handleChange = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     setFormData({ 
    //         ...formData, 
    //         [name]: type === 'checkbox' ? checked : value 
    //     });
    // };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profileImage: file });
    
        // Convert image file to data URL
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-image-preview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    };
    

    const handleDelete = async () => {
        try {
            if (window.confirm('Are you sure you wish to delete this user?')) {
                await api.delete(`/api/deleteUsers/${id}`);
                navigate('/All-user-list');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            setMessage('Error deleting user');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            if (window.confirm('Are you sure you wish to update this user?')) {
                const response = await api.put(`/api/registerUpdateUser/${id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setMessage(response.data.msg);
                navigate('/users/All-user-list');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error updating user');
        }
    };

    if (loading) {
        return <p>Loading user data...</p>;
    }
    const departments = ['Administration', 'HR', 'Finance', 'Technology', 'Marketing', 'Sales', 'Support'];

    return (
        <div>

        
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2 className="mb-0">Update User</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username:</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} className="form-control" required />
                        </div>
                       
                        <div className="mb-3">
                            <label className="form-label">Designation:</label>
                            <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="form-control" required />
                        </div>
                       
                        
                        <div className="mb-3">
                            <label className="form-label">Department:</label>
                            <input type="text" name="department" value={formData.department} onChange={handleChange} className="form-control" required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Full Name:</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone Number:</label>
                            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address:</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gender:</label>
                            <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Branch:</label>
                            <select name="branchId" value={formData.branchId} onChange={handleChange} className="form-select">
                                {branches.length === 0 ? (
                                    <option value="">Loading branches...</option>
                                ) : (
                                    branches.map(branch => (
                                        <option key={branch._id} value={branch._id}>
                                            {branch.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <input type="checkbox" name="isApproved" checked={formData.isApproved} onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })} className="form-check-input" />
                                <label className="form-check-label">Approve</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Profile Image:</label>
                            <input type="file" name="profileImage" onChange={handleFileChange} className="form-control" />
                            {formData.profileImage && (
                                <img id="profile-image-preview" src={`http://localhost:5000/profileImage/${formData.profileImage}`} alt="Profile" className="img-thumbnail mt-2" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                            )}
                        </div>
                        <div className="mb-3">
                            
                            <button type="button" onClick={handleDelete} className="btn btn-danger me-2">Delete User</button>
                            <button type="submit" className="btn btn-primary">Update User</button>
                        </div>
                    </form>
                    {message && <p className="mt-3">{message}</p>}
                </div>
            </div>
        </div>
        </div>
    );
};

export default EditUser;
