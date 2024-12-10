import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';

const EditProduct = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        brand: '',
        model: '',
        description: '',
        quantity: '',
        // other fields...
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/api/product/AllProducts/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/api/product/deleteProduct/${id}`);
            window.location.href = '/products';
            // history.push('/user-list'); // Redirect to user list page after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
            setMessage('Error deleting product');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/api/product/updateProduct/${id}`, formData);
            setMessage('Product updated successfully!');
        } catch (error) {
            setMessage('Error updating product');
        }
    };

    if (loading) {
        return <p>Loading product data...</p>;
    }

    return (
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" required />
                <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Model" required />
                <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="quantity" required />
                <button type="submit">Update Product</button>
                <button type="button" onClick={handleDelete}>Delete User</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EditProduct;