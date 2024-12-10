import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';



const PendingProductsComponent = () => {
    const [pendingProducts, setPendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
   //const [userInfo, setUserInfo] = useState(null); // State to store user information

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
        const fetchPendingProducts = async () => {
            try {
                const response = await api.get('/api/product/pending');
                setPendingProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pending products:', error);
                setLoading(false);
            }

    //         const existingToken = localStorage.getItem('token');
    //   if (existingToken) {
    //     // Redirect to the appropriate dashboard or display a message
    //     const decodedToken = decodeToken(existingToken);
    //     console.log(decodedToken.branch)
    //     console.log(decodedToken.department)
    //     console.log(decodedToken.username)
    //     setUser(decodedToken)
    //     const username = (setUser); 
    //     console.log(username)
    //     setbranch(decodedToken)
    //     setdepartment(decodedToken)
    //    // username, branch, department, designation, email, phoneNumber
     // }
        };

        // const token = localStorage.getItem('token'); // Get token from localStorage
        // if (token) {
        //     const decoded = jwt_decode(token); // Decode JWT token
        //     setUserInfo(decoded); // Set user information
        // }

        fetchPendingProducts();
    }, []);

    const handleApprove = async (productId) => {
        try {
                        const existingToken = localStorage.getItem('token');
                        const decodedToken = decodeToken(existingToken);
                        const approvedBy = {
                            username: decodedToken.username,
                            department: decodedToken.department,
                            branch: decodedToken.branch
                          };
    //   if (existingToken) {
    //     // Redirect to the appropriate dashboard or display a message
    //     const decodedToken = decodeToken(existingToken);
    //     console.log(decodedToken.branch)
    //     console.log(decodedToken.department)
    //     console.log(decodedToken.username)
    //     setUser(decodedToken)
    //     const username = (setUser); 
    //     console.log(username)
    //     setbranch(decodedToken)
    //     setdepartment(decodedToken)
            await api.put(`/api/product/approve/${productId}`, { approvedBy });
            // Update the state to remove the approved product
            setPendingProducts(pendingProducts.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Error approving product:', error);
        }
    };

    const handleReject = async (productId) => {
        try {
            await api.delete(`/api/product/reject/${productId}`); // Use DELETE method
            // Update the state to remove the rejected product
            setPendingProducts(pendingProducts.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Error rejecting product:', error);
        }
    };

    return (
        <div>

        
        <div className="container mt-5">
            <h2>Pending Products</h2>
            {loading ? (
                <div>Loading...</div>
            ) : pendingProducts.length === 0 ? (
                <div>No pending products</div>
            ) : (
                <ul className="list-group mt-3">
                    {pendingProducts.map(product => (
                        <li key={product._id} className="list-group-item">
                            <h5>{product.name}</h5>
                            <p>{product.description}</p>
                            <p>Category: {product.category}</p>
                            <p>Subcategory: {product.subcategory}</p>
                            <p>Brand: {product.brand}</p>
                            <p>Model: {product.model}</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>Status: {product.status}</p>
                            <p>Product Code: {product.productCode}</p>
                            {/* Display user information */}
                            {product.addedBy && (
                                <p>Requested by: {product.addedBy.username}, 
                                {product.addedBy.branch},
                                {product.addedBy.department}</p>
                            )}
                            <button className="btn btn-success mr-2" onClick={() => handleApprove(product._id)}>Approve</button>
                            <button className="btn btn-danger" onClick={() => handleReject(product._id)}>Reject</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </div>
    );
};

export default PendingProductsComponent;
