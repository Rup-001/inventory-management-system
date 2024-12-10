import React, { useState } from 'react';
import api from '../../api/api';


const AddLocation = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contactInfo: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/location', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Assumes JWT is stored in localStorage
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error adding location');
        }
    };

    return (
        <div>

        
        <div className="container mt-5">
            <h2>Add Location</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Branch Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Branch Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactInfo">Contact Info</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactInfo"
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleChange}
                        placeholder="Contact Info"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Location</button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
        </div>
    );
};

export default AddLocation;
