// AddEmployeeRequest.js
import React, { useState, useEffect } from 'react';
import api from '../../api/api';

const AddEmployeeRequest = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [filteredUser, setFilteredUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [user, setUser] = useState({});
    const [branch, setBranch] = useState({});
    const [department, setDepartment] = useState({});

    const [formData, setFormData] = useState({
        productId: "",
        employeeId: "",
        branchId: "",
        assignedDate: "",
        returnedDate: "",
        currentStatus: "pending",
        quantity: 1,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const existingToken = localStorage.getItem('token');
                if (!existingToken) {
                    throw new Error("Token not found");
                }
    
                // Decode the token
                const decodedToken = decodeToken(existingToken);
                const branchId = decodedToken.branchId;
                const employeeId = decodedToken.id;
                //console.log("empid",employeeId)
    
                // Set branch and department directly from the token
                setBranch({ branch: decodedToken.branch });
                setDepartment({ department: decodedToken.department });
                setUser({ username: decodedToken.username }); // Set username
    
                // Set branchId in formData
                setFormData((prevFormData) => ({ ...prevFormData, branchId,employeeId }));
    
                // Fetch inventory data
                const productResponse = await api.get("/api/getAllInventory");
                const inventoryData = productResponse.data;
                const filterBranch = inventoryData.filter(item => item.locationId._id === branchId);
                setFilteredData(filterBranch);
                setInventoryData(filterBranch);
    
                // Fetch user data
                const userResponse = await api.get("/api/AllUser");
                const userData = userResponse.data;
                const filterUser = userData.filter(item => item.branchId._id === branchId);
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
        console.log("Product selected:", product);
        setSelectedProduct(product);
    };
    
    const handleDeselectProduct = () => {
        console.log("Product deselected");
        setSelectedProduct(null);
    };

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProduct) {
            alert("Please select a product before submitting.");
            return;
        }
    
       
    
        // Prepare formData based on selectedProduct and selectedUser
        const preparedFormData = {
            productId: selectedProduct.productId._id,
            employeeId: formData.employeeId,
            branchId: formData.branchId,
            assignedDate: formData.assignedDate,
            returnedDate: formData.returnedDate,
            currentStatus: "pending",
            quantity: formData.quantity,
        };
    
        try {
            // Debugging: Log the final formData before submission
            console.log("Submitting form with data:", preparedFormData);
    
            // Make the API request
            const response = await api.post('/api/requestAssignment', preparedFormData);
            console.log("Response:", response.data);
    
            // Reset state after successful submission
            setSelectedProduct(null);
            setSelectedUser(null);
            setFormData({
                productId: "",
                employeeId: "",
                branchId: formData.branchId,
                assignedDate: "",
                returnedDate: "",
                currentStatus: "pending",
                quantity: 1,
            });
    
            alert("Assignment successfully added.");
        } catch (error) {
            console.error("Error adding assignment:", error);
            alert("Failed to add assignment. Please try again.");
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

  

    return (
        <div>
          
            <div className="container mt-5">
                <h2>Add Request</h2>
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
                                        <button className="btn btn-warning btn-sm" type="button" onClick={handleDeselectProduct}>Deselect</button>

                                        
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
                                        <button
                                            className="btn btn-primary btn-sm"
                                            type="button" // Fix here
                                            onClick={() => handleSelectProduct(product)}
                                            >
                                            Select
                                        </button>
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

                    
                    <button type="submit" className="btn btn-primary">Add Assignment</button>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeRequest;






// import React, { useState, useEffect } from "react";
// import api from '../../api/api';

// const AddEmployeeRequest = () => {
//     const [inventoryData, setInventoryData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [formData, setFormData] = useState({
//         productId: "",
//         branchId: "",
//         quantity: 1,
//         status: "pending",
//     });
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) throw new Error("Token not found");

//                 const decodedToken = decodeToken(token);
//                 const branchId = decodedToken.branchId;

//                 setFormData(prev => ({ ...prev, branchId }));

//                 const response = await api.get("/api/getAllInventory");
//                 const inventory = response.data;
//                 const filteredInventory = inventory.filter(item => item.locationId._id === branchId);

//                 setInventoryData(filteredInventory);
//                 setFilteredData(filteredInventory);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching inventory data:", error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const decodeToken = (token) => {
//         try {
//             return JSON.parse(atob(token.split('.')[1]));
//         } catch (error) {
//             console.error("Error decoding token:", error);
//             return {};
//         }
//     };

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//         const searchValue = e.target.value.toLowerCase();
//         setFilteredData(
//             inventoryData.filter(item =>
//                 item.productId?.name?.toLowerCase().includes(searchValue) ||
//                 item.productId?.productCode?.toLowerCase().includes(searchValue) ||
//                 item.productId?.subcategory?.toLowerCase().includes(searchValue)
//             )
//         );
//     };

//     const handleSelectProduct = (product) => {
//         setSelectedProduct(product);
//         setFormData(prev => ({ ...prev, productId: product.productId._id }));
//     };

//     const handleDeselectProduct = () => {
//         setSelectedProduct(null);
//         setFormData(prev => ({ ...prev, productId: "" }));
//     };

//     const handleQuantityChange = (e) => {
//         const { value } = e.target;
//         setFormData(prev => ({ ...prev, quantity: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (!formData.productId) {
//                 alert("Please select a product before submitting.");
//                 return;
//             }

//             const response = await api.post("/api/addEmployeeRequest", formData);
//             console.log("Request submitted successfully:", response.data);

//             // Reset form state
//             setFormData(prev => ({
//                 productId: "",
//                 branchId: prev.branchId,
//                 quantity: 1,
//                 status: "pending",
//             }));
//             setSelectedProduct(null);
//         } catch (error) {
//             console.error("Error submitting request:", error);
//         }
//     };

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div className="container mt-5">
//             <h2>Add Employee Request</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search by product name, code, or subcategory"
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                     />
//                 </div>
//                 {selectedProduct ? (
//                     <div>
//                         <h4>Selected Product</h4>
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>Product Name</th>
//                                     <th>Product Code</th>
//                                     <th>Category</th>
//                                     <th>Subcategory</th>
//                                     <th>Quantity</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>{selectedProduct.productId?.name || "N/A"}</td>
//                                     <td>{selectedProduct.productId?.productCode || "N/A"}</td>
//                                     <td>{selectedProduct.productId?.category || "N/A"}</td>
//                                     <td>{selectedProduct.productId?.subcategory || "N/A"}</td>
//                                     <td>
//                                         <input
//                                             type="number"
//                                             value={formData.quantity}
//                                             onChange={handleQuantityChange}
//                                             min="1"
//                                             className="form-control"
//                                             required
//                                         />
//                                     </td>
//                                     <td>
//                                         <button
//                                             type="button"
//                                             className="btn btn-warning btn-sm"
//                                             onClick={handleDeselectProduct}
//                                         >
//                                             Deselect
//                                         </button>
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 ) : (
//                     <table className="table table-striped">
//                         <thead>
//                             <tr>
//                                 <th>Product Name</th>
//                                 <th>Product Code</th>
//                                 <th>Category</th>
//                                 <th>Subcategory</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredData.map(product => (
//                                 <tr key={product._id}>
//                                     <td>{product.productId?.name || "N/A"}</td>
//                                     <td>{product.productId?.productCode || "N/A"}</td>
//                                     <td>{product.productId?.category || "N/A"}</td>
//                                     <td>{product.productId?.subcategory || "N/A"}</td>
//                                     <td>
//                                         <button
//                                             type="button"
//                                             className="btn btn-primary btn-sm"
//                                             onClick={() => handleSelectProduct(product)}
//                                         >
//                                             Select
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//                 <button
//                     type="submit"
//                     className="btn btn-primary mt-3"
//                     disabled={!formData.productId}
//                 >
//                     Submit Request
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddEmployeeRequest;
