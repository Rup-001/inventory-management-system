import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminProductRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/admin/productRequests');
            setRequests(response.data);
            setLoading(false);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error fetching requests');
            setLoading(false);
        }
    };

    const handleApprove = async (requestId) => {
        try {
            await api.post(`/api/admin/approveRequest/${requestId}`);
            setMessage('Request approved successfully.');
            fetchRequests();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error approving request');
        }
    };

    const handleReject = async (requestId) => {
        try {
            await api.post(`/api/admin/rejectRequest/${requestId}`);
            setMessage('Request rejected successfully.');
            fetchRequests();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error rejecting request');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Pending Product Requests</h2>
            {loading ? (
                <p>Loading requests...</p>
            ) : (
                <>
                    {message && <div className="alert alert-info mt-3">{message}</div>}
                    <table className="table table-striped mt-4">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request._id}>
                                    <td>{request.employeeId.name}</td>
                                    <td>{request.productId.name}</td>
                                    <td>{request.quantity}</td>
                                    <td>
                                        <button
                                            className="btn btn-success mr-2"
                                            onClick={() => handleApprove(request._id)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleReject(request._id)}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default AdminProductRequests;
