import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';




const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/api/product/AllApprovedProducts');
                console.log("Api response: ", response.data);
                setProducts(response.data);
                setFilteredProducts(response.data);
                setErrorMessage('');
            } catch (error) {
                console.error('Error fetching products:', error);
                console.error(error.response?.data?.msg);
                setProducts([]);
                setFilteredProducts([]);
                const errorMessage = error.response?.data?.msg || 'Error logging in';
                if (errorMessage === 'Access denied: Admins only') {
                    navigate('/unauthorized');
                } else {
                    setErrorMessage(errorMessage);
                }
            }
        };

        fetchProducts();
    }, [navigate]);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(lowerCaseQuery) ||
            product.productCode.toLowerCase().includes(lowerCaseQuery) ||
            product.subcategory.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    return (
        <div>

            <div className="container mt-5">
                <h2 className="mb-4">Products</h2>
                <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Search by product code, name or subcategory"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                {filteredProducts.length > 0 ? (
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Product Code</th>
                                <th>Category</th>
                                <th>Subcategory</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Added By</th>
                                <th>Branch</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody> 
                            {filteredProducts.map(product => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.productCode}</td>
                                    <td>{product.category}</td>
                                    <td>{product.subcategory}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.model}</td>
                                    <td>{product.description}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.addedBy.username}</td>
                                    <td>{product.addedBy.branch}</td>
                                    {/* <td>
                                        <Link to={`/editProduct/${product._id}`} className="btn btn-primary btn-sm">Edit</Link>
                                    </td> */}
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

export default Products;




// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/api';
// import HeadAdminMenu from '../Menu/HeadAdminMenu';
// import EmployeeMenu from '../Menu/EmployeeMenu'; // Assuming you have a menu for employees

// const Products = () => {
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [userRole, setUserRole] = useState(null);
//     const [userBranch, setUserBranch] = useState('');

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUserRole = async () => {
//             try {
//                 const response = await api.get('/api/AllUser'); // Replace with actual endpoint
//                // setUserRole(response.data.department);
//                 console.log("aaa",response.data[0].branchId.name)
//                 //setUserBranch(response.data.branch);
//                 console.log("bbbb", response)
//                 const users = response.data;

//                 // Assuming you want to check the first user (you can adjust as needed)
//                 const user = users[0];
//                 const branchName = user.branchId.name;
//                 const department = user.department;

//                 console.log("Branch Name:", branchName);
//                 console.log("Department:", department);
//                 setUserRole(department);
//                 setUserBranch(branchName);
//             } catch (error) {
//                 console.error('Error fetching user role:', error);
//                 navigate('/unauthorized');
//             }
//         };
        
//         const fetchProducts = async () => {
//             try {
//                 const response = await api.get('/api/product/AllApprovedProducts');
//                 setProducts(response.data);
//                 setFilteredProducts(response.data);
                
//                 setErrorMessage('');
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//                 setProducts([]);
//                 setFilteredProducts([]);
//                 const errorMessage = error.response?.data?.msg || 'Error logging in';
//                 if (errorMessage === 'Access denied: Admins only') {
//                     navigate('/unauthorized');
//                 } else {
//                     setErrorMessage(errorMessage);
//                 }
//             }
//         };

//         fetchUserRole();
//         fetchProducts();
//     }, [navigate]);

//     useEffect(() => {
//         const lowerCaseQuery = searchQuery.toLowerCase();
//         const filtered = products.filter(product =>
//             product.name.toLowerCase().includes(lowerCaseQuery) ||
//             product.productCode.toLowerCase().includes(lowerCaseQuery) ||
//             product.subcategory.toLowerCase().includes(lowerCaseQuery)
//         );
//         setFilteredProducts(filtered);
//     }, [searchQuery, products]);

//     const isHeadAdmin = userRole === 'Administration' || userBranch === 'Head Office';


//     return (
//         <div>
//             {isHeadAdmin ? <HeadAdminMenu /> : <EmployeeMenu />}
            
//             <div className="container mt-5">
//                 <h2 className="mb-4">Products</h2>
//                 <input
//                     type="text"
//                     className="form-control mb-4"
//                     placeholder="Search by product code, name or subcategory"
//                     value={searchQuery}
//                     onChange={e => setSearchQuery(e.target.value)}
//                 />
//                 {filteredProducts.length > 0 ? (
//                     <table className="table table-striped table-bordered">
//                         <thead className="thead-dark">
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Product Code</th>
//                                 <th>Category</th>
//                                 <th>Subcategory</th>
//                                 <th>Brand</th>
//                                 <th>Model</th>
//                                 <th>Description</th>
//                                 <th>Quantity</th>
//                                 <th>Added By</th>
//                                 <th>Branch</th>
//                                 {/* <th>Action</th> */}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredProducts.map(product => (
//                                 <tr key={product._id}>
//                                     <td>{product.name}</td>
//                                     <td>{product.productCode}</td>
//                                     <td>{product.category}</td>
//                                     <td>{product.subcategory}</td>
//                                     <td>{product.brand}</td>
//                                     <td>{product.model}</td>
//                                     <td>{product.description}</td>
//                                     <td>{product.quantity}</td>
//                                     <td>{product.addedBy.username}</td>
//                                     <td>{product.addedBy.branch}</td>
//                                     {/* <td>
//                                         <Link to={`/editProduct/${product._id}`} className="btn btn-primary btn-sm">Edit</Link>
//                                     </td> */}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p className="alert alert-info">No products available</p>
//                 )}
//                 {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
//             </div>
//         </div>
//     );
// };

// export default Products;
