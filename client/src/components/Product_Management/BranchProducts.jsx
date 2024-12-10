import React, { useEffect, useState } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import api from '../../api/api';


const BranchProducts = () => {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/api/product/AllApprovedProducts');
                console.log("Api response: ", response.data);
                setProducts(response.data);
                setErrorMessage('');
            } catch (error) {
                console.error('Error fetching products:', error);
                console.error(error.response?.data?.msg);
                setProducts([]);
                const errorMessage = error.response?.data?.msg || 'Error logging in';
                if (errorMessage === 'Access denied: Admins only') {
                    // Redirect to the unauthorized page
                    navigate('/unauthorized');
                } else {
                    setErrorMessage(errorMessage);
                }
            }
        };

        fetchProducts();
    }, [navigate]);
    

    return (
        <div>

        
        <div className="container mt-5">
            <h2 className="mb-4">Products</h2>
            {products.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.model}</td>
                                <td>{product.description}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <Link to={`/editProduct/${product._id}`} className="btn btn-primary btn-sm">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="alert alert-info">No products available</p>
            )}
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        </div>
        </div>
    );
};

export default BranchProducts;
