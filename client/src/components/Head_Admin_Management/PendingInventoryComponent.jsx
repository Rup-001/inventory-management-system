




import React, { useEffect, useState } from 'react';
import api from '../../api/api';


const PendingInventoryComponent = () => {
    const [pendingInventory, setPendingInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

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
        const fetchPendingInventory = async () => {
            try {
                const response = await api.get('/api/pending');
                if (Array.isArray(response.data)) {
                    setPendingInventory(response.data);
                    
                } else {
                    console.error('Unexpected response data format:', response.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pending inventory:', error);
                setLoading(false);
            }
        };

        fetchPendingInventory();
    }, []);

    const handleApprove = async (inventoryId) => {
        if (window.confirm('Approve the product')) {
            try {
                const existingToken = localStorage.getItem('token');
                            const decodedToken = decodeToken(existingToken);
                            const approvedBy = {
                                username: decodedToken.username,
                                department: decodedToken.department,
                                branch: decodedToken.branch
                              };
                await api.put(`/api/approve/${inventoryId}`, { approvedBy });
                // Update the state to remove the approved inventory
                setPendingInventory(pendingInventory.filter(inventory => inventory._id !== inventoryId));
            } catch (error) {
                console.error('Error approving inventory:', error);
                const errorMessage = error.response?.data || 'Error approving inventory';
                setErrorMessage(errorMessage);
                //console.error('Error approving inventory:', error);
            }
        }
        
    };

    const handleReject = async (inventoryId) => {

        if (window.confirm('Reject the product')) {
            try {
                await api.delete(`/api/reject/${inventoryId}`);
                // Update the state to remove the rejected inventory
                setPendingInventory(pendingInventory.filter(inventory => inventory._id !== inventoryId));
            } catch (error) {
                console.error('Error rejecting inventory:', error);
            }
        }
        
    };

    return (
        <div>

            <div className="container mt-5">
                <h2>Pending Inventory</h2>
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

                {loading ? (
                    <div>Loading...</div>
                ) : pendingInventory.length === 0 ? (
                    <div>No pending inventory</div>
                ) : (
                    <ul className="list-group mt-3">
                        {pendingInventory.map(inventory => (
                            <li key={inventory._id} className="list-group-item">
                                <h5>Product: {inventory.productId?.name || 'Unknown'}</h5>
                                <p>category: {inventory.productId?.category || 'Unknown'}</p>
                                <p>subcategory: {inventory.productId?.subcategory || 'Unknown'}</p>
                                <p>Brand: {inventory.productId?.brand || 'Unknown'}</p>
                                <p>model: {inventory.productId?.model || 'Unknown'}</p>
                                <p>quantity: {inventory.productId?.quantity || 'Unknown'}</p>
                                <p>productCode: {inventory.productId?.productCode || 'Unknown'}</p>
                                <p>Status: {inventory.status || 'Unknown'}</p>
                                
                                <p>Requested by: {inventory.addedBy.username}, 
                                {inventory.addedBy.branch},
                                {inventory.addedBy.department}</p>
                                
                                <button className="btn btn-success mr-2" onClick={() => handleApprove(inventory._id)}>Approve</button> 
                                <button className="btn btn-danger" onClick={() => handleReject(inventory._id)}>Reject</button>
                            </li>
                        ))}
                    </ul>
                )}

            </div>
        </div>
    );
};

export default PendingInventoryComponent;
