import React, { useState, useEffect } from "react";
import api from '../../api/api';




const HeadAdminAddAssignment = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [filteredUser, setFilteredUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchUserTerm, setSearchUserTerm] = useState('');

    const [formData, setFormData] = useState({
        productId: "",
        employeeId: "",
        branchId: "",
        assignedDate: "",
        returnedDate: "",
        currentStatus: "assigned",
        quantity: 1,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const existingToken = localStorage.getItem('token');
                if (!existingToken) {
                    throw new Error("Token not found");
                }

                const decodedToken = decodeToken(existingToken);
                const branchId = decodedToken.branchId;
                setFormData((prevFormData) => ({ ...prevFormData, branchId }));

                const productResponse = await api.get("/api/getAllInventory");
                const inventoryData = productResponse.data;
                const filterBranch = inventoryData.filter(item => item.locationId._id === branchId);
                setFilteredData(filterBranch);
                setInventoryData(filterBranch);

                const userResponse = await api.get("/api/AllUser");
                const userData = userResponse.data;
                const filterUser = userData.filter(item => item.branchId._id === branchId);
                setUser(filterUser);
                setFilteredUser(filterUser);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const decodeToken = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
            console.error('Error decoding token:', error);
            return {};
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        const lowercasedSearchTerm = e.target.value.toLowerCase();
        setFilteredData(
            inventoryData.filter(item =>
                item.productId?.name?.toLowerCase().includes(lowercasedSearchTerm) ||
                item.productId?.productCode?.toLowerCase().includes(lowercasedSearchTerm) ||
                item.productId?.subcategory?.toLowerCase().includes(lowercasedSearchTerm)
            )
        );
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setFormData({ ...formData, productId: product.productId._id }); // Ensure the correct productId is set
    };

    const handleDeselectProduct = () => {
        setSelectedProduct(null);
        setFormData({ ...formData, productId: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedUser) {
                setFormData((prevFormData) => ({ ...prevFormData, employeeId: selectedUser._id }));
            }

            console.log("Form Data before submission:", formData); // Debug log

            const response = await api.post('/api/addAssignment', formData);
            console.log(response.data);
            setFormData({
                productId: "",
                employeeId: "",
                branchId: formData.branchId, // Keep branchId from token
                assignedDate: "",
                returnedDate: "",
                currentStatus: "assigned",
                quantity: 1,
            });
            setSelectedProduct(null);
            setSelectedUser(null);
        } catch (error) {
            console.error("Error adding assignment", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleSearchUserChange = (e) => {
        setSearchUserTerm(e.target.value);
        const lowercasedSearchTerm = e.target.value.toLowerCase();
        setFilteredUser(
            user.filter(user =>
                user.username?.toLowerCase().includes(lowercasedSearchTerm) ||
                user.department?.toLowerCase().includes(lowercasedSearchTerm) ||
                user.designation?.toLowerCase().includes(lowercasedSearchTerm)
            )
        );
    };

    return (
        <div>

            <div className="container mt-5">
                <h2>Add Assignment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by product name, product code, or subcategory"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {selectedProduct ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product Code</th>
                                    <th>Category</th>
                                    <th>Subcategory</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={selectedProduct._id}>
                                    <td>{selectedProduct.productId?.name || 'N/A'}</td>
                                    <td>{selectedProduct.productId?.productCode || 'N/A'}</td>
                                    <td>{selectedProduct.productId?.category || 'N/A'}</td>
                                    <td>{selectedProduct.productId?.subcategory || 'N/A'}</td>
                                    <td>{selectedProduct.productId?.brand || 'N/A'}</td>
                                    <td>{selectedProduct.productId?.model || 'N/A'}</td>
                                    <td>{selectedProduct.productId?.description || 'N/A'}</td>
                                    <td>{selectedProduct.quantity}</td>
                                    <td>{selectedProduct.status}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" onClick={handleDeselectProduct}>Deselect</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product Code</th>
                                    <th>Category</th>
                                    <th>Subcategory</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Status</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map(product => (
                                    <tr key={product._id}>
                                        <td>{product.productId?.name || 'N/A'}</td>
                                        <td>{product.productId?.productCode || 'N/A'}</td>
                                        <td>{product.productId?.category || 'N/A'}</td>
                                        <td>{product.productId?.subcategory || 'N/A'}</td>
                                        <td>{product.productId?.brand || 'N/A'}</td>
                                        <td>{product.productId?.model || 'N/A'}</td>
                                        <td>{product.productId?.description || 'N/A'}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.status}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm" onClick={() => handleSelectProduct(product)}>Select</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by username, department, or designation"
                            value={searchUserTerm}
                            onChange={handleSearchUserChange}
                        />
                    </div>
                    {selectedUser ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={selectedUser._id}>
                                    <td>{selectedUser.username || 'N/A'}</td>
                                    <td>{selectedUser.department || 'N/A'}</td>
                                    <td>{selectedUser.designation || 'N/A'}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" onClick={() => setSelectedUser(null)}>Deselect</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUser.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.username || 'N/A'}</td>
                                        <td>{user.department || 'N/A'}</td>
                                        <td>{user.designation || 'N/A'}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm" onClick={() => handleSelectUser(user)}>Select</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <div className="form-group">
                        <label htmlFor="assignedDate">Assigned Date</label>
                        <input
                            type="date"
                            name="assignedDate"
                            value={formData.assignedDate}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="returnedDate">Returned Date</label>
                        <input
                            type="date"
                            name="returnedDate"
                            value={formData.returnedDate}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="form-control"
                            min="1"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Assignment</button>
                </form>
            </div>
        </div>
    );
};

export default HeadAdminAddAssignment;
