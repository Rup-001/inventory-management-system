import React, { useState, useEffect } from "react";
import api from '../../api/api';


const HeadAdminViewAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await api.get("/api/getAllAssignment");
        console.log("Fetched Assignments Data:", response.data);
        setAssignments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching assignments", error);
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
     
      <div className="container mt-5">
        <h2>Assignment Records</h2>
        {assignments.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Employee Name</th>
                <th>Branch Name</th>
                <th>Assigned Date</th>
                <th>Returned Date</th>
                <th>Status</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment._id}>
                  <td>{assignment.productId ? assignment.productId.name : "Product not found"}</td>
                  <td>{assignment.employeeId ? assignment.employeeId.username : "Employee not found"}</td>
                  <td>{assignment.branchId ? assignment.branchId.name : "Branch not found"}</td>
                  <td>{new Date(assignment.assignedDate).toLocaleDateString()}</td>
                  <td>{assignment.returnedDate ? new Date(assignment.returnedDate).toLocaleDateString() : "N/A"}</td>
                  <td>{assignment.currentStatus}</td>
                  <td>{assignment.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No assignments found.</p>
        )}
      </div>
    </div>
  );
};

export default HeadAdminViewAssignment;
