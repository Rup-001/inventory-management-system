import React, { useState, useEffect } from "react";
import api from '../../api/api';
import { Link } from 'react-router-dom';


const MyAssgnmnt = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [selectedUSer, setSelectedUser] = useState(null);

  
    useEffect(() => {
      const fetchAssignments = async () => {
        try {
          const response = await api.get("/api/getEmpAllAssignment", {
            headers: {
              Authorization: `${localStorage.getItem('token')}`, 
            }
          });
          
          console.log("Fetched Assignments Data:", response.data);
          setAssignments(response.data);
        } catch (error) {
          console.error("Error fetching assignments", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAssignments();
    }, []);


    // const handleReturn = async(AssgnmntId) => {
    //     console.log("first", AssgnmntId)
    // }

    const handleReturn = async (assignmentId) => {

        
        console.log("Initiating return for Assignment ID:", assignmentId);
      
        try {
            if (window.confirm('return the product')) {
                const response = await fetch(`/api/returnedAssignments/${assignmentId}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      quantity: 1, // Pass the quantity being returned
                    }),
                  });
              
                  if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Failed to return assignment:", errorText);
                    alert(`Error: ${errorText}`);
                    return;
                  }
              
                  const result = await response.json();
                  console.log("Return successful:", result);
                  alert("Assignment returned successfully and inventory updated");
                }
            }
           catch (error) {
          console.error("An error occurred while returning the assignment:", error);
          alert("An error occurred. Please try again.");
        }
      };
      
  
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
                  <th>Action</th>
                  <th>Action</th>
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
                    <td>
                    <button className="btn btn-success mr-2" onClick={() => handleReturn(assignment._id)}>Return</button>
                    </td>
                    <td>
                    <Link to={`/assignments/handover-assignment/${assignment._id}`} className="btn btn-primary btn-sm">
                      Handover
                    </Link>
                    </td>
                    
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
}

export default MyAssgnmnt