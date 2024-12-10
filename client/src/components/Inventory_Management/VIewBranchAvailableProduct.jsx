import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api'; // Import your axios instance
import 'bootstrap/dist/css/bootstrap.min.css';

const VIewBranchAvailableProductPage = () => {
    const { locationId } = useParams(); // Get locationId from URL parameters
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInventory = async () => {
            if (!locationId) {
                setError('Location ID is required');
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(`/api/inventory/location/${locationId}`);
                setInventory(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching inventory');
                setLoading(false);
            }
        };

        fetchInventory();
    }, [locationId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Inventory for Location ID: {inventory[0].locationId.name}</h2>
            {inventory.length === 0 ? (
                <div>No inventory found for this location.</div>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((item) => (
                            <tr key={item._id}>
                                <td>{item.productId.name}</td>
                                <td>{item.productId.description}</td>
                                <td>{item.productId.category}</td>
                                <td>{item.productId.subcategory}</td>
                                <td>{item.productId.brand}</td>
                                <td>{item.productId.model}</td>
                                <td>{item.quantity}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default VIewBranchAvailableProductPage;
