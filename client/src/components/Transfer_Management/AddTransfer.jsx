import React, { useState, useEffect } from "react";
import api from '../../api/api';

const AddTransfer = () => {
  const [formData, setFormData] = useState({
    productId: "",
    fromUserId: "",
    toUserId: "",
    fromBranchId: "",
    toBranchId: "",
    transferDate: "",
    requestedBy: "",
    approvedBy: "",
    approvalDate: "",
    status: "pending",
  });

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await api.get("/api/getAllInventory");
        const userResponse = await api.get("/api/AllUser");
        const branchResponse = await api.get("/api/allLocation");

        setProducts(productResponse.data);
        setUsers(userResponse.data);
        setBranches(branchResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/addTransfer", formData);
      alert("Transfer record added successfully");
    } catch (error) {
      console.error("Error adding transfer", error);
      alert("Error adding transfer");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
            <div className="form-group">
                <label>Product</label>
                <select
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    className="form-control"
                    required
                >
                    <option value="" disabled>Select a product</option>
                    {products.map((product) => (
                        <option key={product._id} value={product._id}>{product.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>From User</label>
                <select
                    name="fromUserId"
                    value={formData.fromUserId}
                    onChange={handleChange}
                    className="form-control"
                    required
                >
                    <option value="" disabled>Select a user</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>To User</label>
                <select
                    name="toUserId"
                    value={formData.toUserId}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="" disabled>Select a user</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>From Branch</label>
                <select
                    name="fromBranchId"
                    value={formData.fromBranchId}
                    onChange={handleChange}
                    className="form-control"
                    required
                >
                    <option value="" disabled>Select a branch</option>
                    {branches.map((branch) => (
                        <option key={branch._id} value={branch._id}>{branch.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>To Branch</label>
                <select
                    name="toBranchId"
                    value={formData.toBranchId}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="" disabled>Select a branch</option>
                    {branches.map((branch) => (
                        <option key={branch._id} value={branch._id}>{branch.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Transfer Date</label>
                <input
                    type="date"
                    name="transferDate"
                    value={formData.transferDate}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="form-group">
                <label>Requested By</label>
                <select
                    name="requestedBy"
                    value={formData.requestedBy}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="" disabled>Select a user</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Approved By</label>
                <select
                    name="approvedBy"
                    value={formData.approvedBy}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="" disabled>Select a user</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Approval Date</label>
                <input
                    type="date"
                    name="approvalDate"
                    value={formData.approvalDate}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label>Status</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-control"
                    required
                >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary mt-3">Add Transfer</button>
        </form>
  );
};

export default AddTransfer;
