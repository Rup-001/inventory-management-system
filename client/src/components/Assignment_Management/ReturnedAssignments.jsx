


import React, { useEffect, useState } from "react";
import api from "../../api/api";


const ReturnedAssignments = () => {
  const [returnedAssignments, setReturnedAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturnedAssignments = async () => {
      try {
        const response = await api.get("/api/returnedAssignments");
        setReturnedAssignments(response.data);
      } catch (error) {
        console.error("Error fetching returned assignments:", error);
        setError("Error fetching returned assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchReturnedAssignments();
  }, []);

  const handleApproveReject = async (assignmentId, action) => {
    try {
      await api.put(`/api/admin/approveRequest/${assignmentId}`, { action });

      // Update the local state to remove the assignment if approved, or update the status if rejected
      if (action === "approve") {
        setReturnedAssignments(prevAssignments => prevAssignments.filter(assignment => assignment._id !== assignmentId));
      } else {
        setReturnedAssignments(prevAssignments => 
          prevAssignments.map(assignment => 
            assignment._id === assignmentId ? { ...assignment, currentStatus: "assigned" } : assignment
          )
        );
      }
    } catch (error) {
      console.error(`Error ${action} assignment:`, error);
      setError(`Error ${action} assignment`);
    }
  };

  return (
    <div>

      <div className="container mt-5">
        <h2>Returned Assignments</h2>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        {loading ? (
          <div>Loading...</div>
        ) : returnedAssignments.length === 0 ? (
          <div>No returned assignments</div>
        ) : (
          <ul className="list-group mt-3">
            {returnedAssignments.map((assignment) => (
              <li key={assignment._id} className="list-group-item">
                <h5>Product: {assignment.productId?.name || "Unknown"}</h5>
                <p>Branch: {assignment.branchId?.name || "Unknown"}</p>
                <p>Assigned Date: {new Date(assignment.assignedDate).toLocaleDateString()}</p>
                <p>Returned Date: {assignment.returnedDate ? new Date(assignment.returnedDate).toLocaleDateString() : "N/A"}</p>
                <p>Status: {assignment.currentStatus}</p>
                <p>Quantity: {assignment.quantity}</p>
                <button className="btn btn-success mr-2" onClick={() => handleApproveReject(assignment._id, "approve")}>
                  Approve
                </button>
                <button className="btn btn-danger" onClick={() => handleApproveReject(assignment._id, "reject")}>
                  Reject
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReturnedAssignments;
