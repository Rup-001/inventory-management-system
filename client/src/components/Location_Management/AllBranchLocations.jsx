import React, { useState, useEffect } from 'react';
import api from '../../api/api';


const AllBranchLocations = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await api.get('/api/allLocation', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assumes JWT is stored in localStorage
                    }
                });
                setLocations(response.data);
            } catch (error) {
                setError(error.response?.data || 'Error fetching locations');
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    if (loading) {
        return <p>Loading locations...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>

        
        <div className="container mt-5">
            <h2>All Branch Locations</h2>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Contact Info</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location) => (
                        <tr key={location._id}>
                            <td>{location.name}</td>
                            <td>{location.address}</td>
                            <td>{location.contactInfo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default AllBranchLocations;
