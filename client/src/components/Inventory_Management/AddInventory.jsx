
import React, { useState, useEffect } from 'react';
import api from '../../api/api';



const AddInventory = () => {
    const [formData, setFormData] = useState({
        productId: '',
        locationId: '',
        quantity: 1, // Set default quantity to 1
        username: '',
        branch: '',
        department: ''
    });
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [branchName, setBranchName] = useState(''); 
    const [message, setMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    
    // const [user, setUser] = useState([]);
    // const [branch, setbranch] = useState([]);
    // const [department, setdepartment] = useState([]);
    
    // const decodeToken = (token) => {
    //     try {
    //         return JSON.parse(atob(token.split('.')[1]));
    //     } catch (error) {
    //         console.error('Error decoding token:', error);
    //         return {};
    //     }
    // };
    const decodeToken = (token) => {
        try {
            // Decode the token to get user information
            return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
            console.error('Error decoding token:', error);
            return {};
        }
    };
    
    const existingToken = localStorage.getItem('token');
    let branchId,department,username;
    
    // if (existingToken) {
    //     // Get the branchId from the decoded token
    //     const decodedToken = decodeToken(existingToken);
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         username: decodedToken.username,
    //         branch: decodedToken.branch,
    //         department: decodedToken.department
    //     }));
    // } else {
    //     console.error('Token not found in localStorage');
    // }
    
    // console.log(branchId);
    // console.log(department);
    // console.log(username);
    // const pendingUserLink = `/pending-user/${branchId}`;

    useEffect(() => {
        const existingToken = localStorage.getItem('token');
        if (existingToken) {
            const decodedToken = decodeToken(existingToken);
            setFormData((prevFormData) => ({
                ...prevFormData,
                username: decodedToken.username,
                branch: decodedToken.branch,
                department: decodedToken.department
            }));
        } else {
            console.error('Token not found in localStorage');
        }
    }, []); // Add an empty dependency array
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await api.get('/api/product/AllApprovedProducts');
                const locationResponse = await api.get('/api/allLocation');
                
                // Filter products to include only those with quantity > 0
                const availableProducts = productResponse.data.filter(product => product.quantity > 0);

                setProducts(availableProducts);
                setFilteredProducts(availableProducts); // Set filtered products initially to all available products

                const token = localStorage.getItem('token');
                if (token) {
                    const decodedToken = decodeToken(token);
                    const branch = decodedToken.branch;
        //             username = decodedToken.username;
        // department = decodedToken.department;
        // branch = decodedToken.branchId.name;
        // console.log(username);
                    const matchedLocation = locationResponse.data.find(location => location.name === branch);
                    if (matchedLocation) {
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            locationId: matchedLocation._id
                        }));
                        setBranchName(branch);
                    } else {
                        setMessage('Branch not found in database');
                    }
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchQuery(value);

        // Filter products based on search term (name, product code, subcategory)
        const filtered = products.filter(product => 
            (product.name && product.name.toLowerCase().includes(value.toLowerCase())) ||
            (product.productCode && product.productCode.toLowerCase().includes(value.toLowerCase())) ||
            (product.subcategory && product.subcategory.toLowerCase().includes(value.toLowerCase()))
        );
        setFilteredProducts(filtered);
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setFormData({ ...formData, productId: product._id });
    };

    const handleChangeProduct = () => {
        setSelectedProduct(null);
        setFormData({ ...formData, productId: '', locationId:'',quantity:'' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
          data.append(key, formData[key]);
    
        }

        if (!formData.productId || !formData.locationId || !formData.quantity ) {
            setMessage('All fields are required');
            return;
        }

        try {
            if (window.confirm('Request product to inventory')){
                const response = await api.post('/api/addInventory',  formData,{
                    // headers: {
                    //   'Content-Type': 'multipart/form-data',
                    // },
                  }); 
                setMessage('Inventory added successfully');
            }
            
        } catch (error) {
            setMessage(error.response?.data || 'Error adding inventory');
        }
    };

    return (
        <div>

        

        <div className="container mt-5">
            <h2>Add Inventory</h2>
            <form onSubmit={handleSubmit}>
                
                {!selectedProduct && (
                    <div>
<div className="form-group">
                    <label htmlFor="productSearch">Search Product</label>
                    <input
                        className="form-control"
                        type="text"
                        id="productSearch"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by name, product code or subcategory"
                    />
                </div>
                    
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
                            {filteredProducts.map(Product => (
                                <tr key={Product._id}>
                                    <td>{Product.name}</td>
                                    <td>{Product.category}</td>
                                    <td>{Product.brand}</td>
                                    <td>{Product.model}</td>
                                    <td>{Product.description}</td>
                                    <td>{Product.quantity}</td>
                                    <td>
                                        <button 
                                            type="button" 
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleProductSelect(Product)}
                                        >
                                            Select
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                )}
                {selectedProduct && (
                    <>
                        <div className="card mt-3">
                            <div className="card-header">
                                Selected Product
                                <button 
                                    type="button" 
                                    className="btn btn-link btn-sm float-right"
                                    onClick={handleChangeProduct}
                                >
                                    Change Product
                                </button>
                            </div>
                            <div className="card-body">
                                <p><strong>Name:</strong> {selectedProduct.name}</p>
                                <p><strong>Category:</strong> {selectedProduct.category}</p>
                                <p><strong>Subcategory:</strong> {selectedProduct.subcategory}</p>
                                <p><strong>Product Code:</strong> {selectedProduct.productCode}</p>
                                <p><strong>Brand:</strong> {selectedProduct.brand}</p>
                                <p><strong>Model:</strong> {selectedProduct.model}</p>
                                <p><strong>Description:</strong> {selectedProduct.description}</p>
                                <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="branchName">Location <span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                type="text"
                                id="branchName"
                                value={branchName}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Quantity <span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                type="number"
                                id="quantity"
                                name="quantity"
                                value= '1'
                                onChange={handleChange}
                                min="1" // Minimum quantity of 1
                                max="1" // Maximum quantity of 1
                                // readOnly // Make it read-only
                                // required
                            />
                        </div>
                        <div className="form-group">
          <label>Added By:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
           value={formData.username}
            readOnly
            disabled
          />
          <input
            type="text"
            className="form-control mt-2"
            id="branch"
            name="branch"
            value={formData.branch}
            readOnly
            disabled
          />
          <input
            type="text"
            className="form-control mt-2"
            id="department"
            name="department"
           value={formData.department}
            readOnly
            disabled
          />
                        {/* <input
                type="text"
                className="form-control"
                id="username"
                name="username"
             
                value={formData.username} // Using user.username from state
                readOnly
                disabled
                onChange={handleChange}
                />

                <input
                type="text"
                className="form-control mt-2"
                id="branch"
                name="branch"
                value={branch} // Using branch.branch from state
                readOnly
                disabled
                />

                <input
                type="text"
                className="form-control mt-2"
                id="department"
                name="department"
                value={department} // Using department.department from state
                readOnly
                disabled
                /> */}

        </div>
       
                        <button type="submit" className="btn btn-primary">Add Inventory</button>
                    </>
                )}
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
        </div>
    );
};

export default AddInventory;
