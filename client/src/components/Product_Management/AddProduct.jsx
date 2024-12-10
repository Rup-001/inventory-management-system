import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';


const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    brand: '',
    model: '',
    quantity: '',
    status: 'pending',
    productCode: '',
    price: '',
  });
  const [buyingMemo, setBuyingMemo] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newSubcategory, setNewSubcategory] = useState('');
  const [showNewSubcategoryInput, setShowNewSubcategoryInput] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [branch, setBranch] = useState({});
  const [department, setDepartment] = useState({});
  
  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return {};
    }
  };

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      setLoading(true);
      try {
        const categoriesResponse = await api.get('/api/product/categories');
        const subcategoriesResponse = await api.get('/api/product/SubCategories');
        setCategories(categoriesResponse.data);
        setSubcategories(subcategoriesResponse.data);
      } catch (error) {
        console.error('Error fetching categories and subcategories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoriesAndSubcategories();

    const existingToken = localStorage.getItem('token');
    if (existingToken) {
      const decodedToken = decodeToken(existingToken);
      setUser(decodedToken);
      setBranch(decodedToken);
      setDepartment(decodedToken);
    }
  }, []);

  useEffect(() => {
    if (formData.subcategory && !showNewSubcategoryInput) {
      fetchNextProductCode(formData.subcategory);
    }
  }, [formData.subcategory, showNewSubcategoryInput]);

  const fetchNextProductCode = async (subcategory) => {
    try {
      const response = await api.get('/api/product/nextProductCode', { params: { subcategory } });
      const nextCode = response.data.nextCode;
      const productCode = `${subcategory}-${nextCode}`;
      setFormData((prevData) => ({ ...prevData, productCode }));
    } catch (error) {
      console.error('Error fetching next product code:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'category') {
      setShowNewCategoryInput(value === 'new');
    }
    if (name === 'subcategory') {
      setShowNewSubcategoryInput(value === 'new');
    }
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleNewSubcategoryChange = (e) => {
    setNewSubcategory(e.target.value);
  };

  const handleFileChange = (e) => {
    setBuyingMemo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // If the subcategory is new, set the product code to "subcategory-1"
    if (showNewSubcategoryInput && newSubcategory) {
      setFormData((prevData) => ({ ...prevData, productCode: `${newSubcategory}-1` }));
    }
  
    // Ensure that the productCode is always included in the form data
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
  
    // Append productCode to form data if it's not already included
    if (!formData.productCode) {
      data.append('productCode', formData.productCode);
    }
  
    // Append buyingMemo, username, branch, and department to form data
    data.append('purchaseDetails.0.buyingMemo', buyingMemo);
    data.append('username', user.username);
    data.append('branch', branch.branch);
    data.append('department', department.department);
    
    if (showNewCategoryInput && newCategory) {
      data.set('category', newCategory);
    }
    if (showNewSubcategoryInput && newSubcategory) {
      data.set('subcategory', newSubcategory);
    }
  
    try {
      const response = await api.post('/api/product/addProductWithImage', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      if (window.confirm('Product added successfully! Proceed to product list?')) {
        navigate('/products/products');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding product');
    }
  };
  
  return (
    <div>

    
    <div className="container mt-5">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
            <option value="new">Add new category</option>
          </select>
          {showNewCategoryInput && (
            <div className="form-group mt-2">
              <label htmlFor="newCategory">New Category</label>
              <input
                type="text"
                className="form-control"
                id="newCategory"
                value={newCategory}
                onChange={handleNewCategoryChange}
                required
              />
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="subcategory">Subcategory</label>
          <select
            className="form-control"
            id="subcategory"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            required
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory, index) => (
              <option key={index} value={subcategory}>
                {subcategory}
              </option>
            ))}
            <option value="new">Add new subcategory</option>
          </select>
          {showNewSubcategoryInput && (
            <div className="form-group mt-2">
              <label htmlFor="newSubcategory">New Subcategory</label>
              <input
                type="text"
                className="form-control"
                id="newSubcategory"
                value={newSubcategory}
                onChange={handleNewSubcategoryChange}
                required
              />
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            className="form-control"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productCode">Product Code</label>
          <input
            type="text"
            className="form-control"
            id="productCode"
            name="productCode"
            value={formData.productCode}
            readOnly
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Added By:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={user.username}
            readOnly
            disabled
          />
          <input
            type="text"
            className="form-control mt-2"
            id="branch"
            name="branch"
            value={branch.branch}
            readOnly
            disabled
          />
          <input
            type="text"
            className="form-control mt-2"
            id="department"
            name="department"
            value={department.department}
            readOnly
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="buyingMemo">Buying Memo</label>
          <input
            type="file"
            className="form-control"
            id="buyingMemo"
            name="buyingMemo"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Product
        </button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
    </div>
  );
};

export default AddProduct;
