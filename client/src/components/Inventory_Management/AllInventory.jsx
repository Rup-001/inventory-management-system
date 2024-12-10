import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';


const AllInventory = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [error, setError] = useState(null);
    const [currentUserBranch, setCurrentUserBranch] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch inventory data
                const inventoryResponse = await api.get('/api/getAllInventory');
                const inventoryData = inventoryResponse.data;

                // Decode the token to get user information
                // const token = localStorage.getItem('token');
                // if (!token) {
                //     throw new Error('No token found');
                // }

                // const decodedToken = JSON.parse(atob(token.split('.')[1]));

                // // Set the current user's branch
                // setCurrentUserBranch(decodedToken.branch);

                // // Filter inventory items by the current user's branch
                // const filteredInventory = inventoryData.filter(item =>
                //     item.locationId?.name === decodedToken.branch
                // );

                setInventoryItems(inventoryData);
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.response?.status === 403) {
                    navigate('/unauthorized');
                } else {
                    setError(error.response?.data?.msg || error.message || 'Error fetching data');
                }
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div>

            <div className="container mt-5">
                <h1>Inventory Items</h1>
                {error ? (
                    <div className="alert alert-danger" role="alert">
                        <p>Error: {error}</p>
                    </div>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Location Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryItems.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.productId?.name || 'Unknown'}</td>
                                    <td>{item.locationId?.name || 'Unknown'}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AllInventory;
