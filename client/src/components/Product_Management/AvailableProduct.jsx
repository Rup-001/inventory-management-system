import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';


const AvailableProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/api/product/AllApprovedProducts');
                const availableProducts = response.data.filter(product => product.quantity > 0);
                setProducts(availableProducts);
                setFilteredProducts(availableProducts);
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

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = products.filter(product => 
            (product.name && product.name.toLowerCase().includes(query)) ||
            (product.subcategory && product.subcategory.toLowerCase().includes(query)) ||
            (product.productCode && product.productCode.toLowerCase().includes(query))
        );
        setFilteredProducts(filtered);
    };

    return (
        <div>

        

        <div className="container mt-5">
            <h2 className="mb-4">Products</h2>
            <input 
                type="text" 
                className="form-control mb-3" 
                placeholder="Search by name, subcategory, or product code"
                value={searchQuery}
                onChange={handleSearch}
            />
            {filteredProducts.length > 0 ? (
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
                        {filteredProducts.map(product => (
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

export default AvailableProduct;
