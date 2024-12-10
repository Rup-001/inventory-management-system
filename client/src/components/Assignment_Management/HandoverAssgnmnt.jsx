import React, { useState, useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import api from '../../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import useUserRole from '../../hooks/useUserRole'

const HandoverAssgnmnt = () => {

    const { userRole, userBranch, username, branchId,  loading, error} = useUserRole(); 
    console.log("branchifrom handover",branchId)

    //const branchIdd = branchId;

    const { id } = useParams();

    const [locationData, setLocationData] = useState([]);
    const [assignmentData, setAssignmentData] = useState([]);


    console.log("idddddddd", id)
    useEffect(() => {
        const fetchHandover = async () => {
            try {
                const response = await api.get(`/api/getAllAssignmentById/${id}`)

                const responselocation = await api.get(`/api/locationwithUser/${branchId}`)


                setAssignmentData(response.data)

                console.log("response", response)
                console.log("responselocation", responselocation)
                if (Array.isArray(responselocation.data)) {
                    // Transform array into a map object
                    const locationsMap = responselocation.data.reduce((map, location) => {
                        map[location._id] = location; // Use a unique property as the key
                        return map;
                    }, {});
        
                    console.log('Transformed locations map:', locationsMap);
        
                    // Set the transformed data
                    setLocationData(locationsMap);
                } else {
                    console.warn('Location data is not an array:', responselocation.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHandover();
    }, [id, branchId]);


    const handleSelectUser = async (location, assignmentData) => {
        if (window.confirm('Confirm Handover')) {
            console.log("select user")
            console.log("user id", location)
            console.log("assignmentData", assignmentData)
        try {
             await api.post(`/api/addTransfer`, {
                User: location,
                assignment: assignmentData,
                
            })
            
            
        } catch (error) {
            console.error(`Error:`, error);
        }
        }
        

    }


  return (
    <div>
        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Product Code</th>
                                    <th>description</th>
                                    <th>Current Status</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            {                       
                            <tr key={assignmentData._id}>
                                <td>{assignmentData.productId?.productCode || 'N/A'}</td>
                                <td>{assignmentData.productId?.description || 'N/A'}</td>
                                <td>{assignmentData.currentStatus || 'N/A'}</td>
                            </tr>
                            }          
                            </tbody>
                        </table>
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
                        {Object.keys(locationData).length > 0 ? (
                            Object.values(locationData).map((location) => (
                                <tr key={location._id}>
                                    <td>{location.username || 'N/A'}</td>
                                    <td>{location.department || 'N/A'}</td>
                                    <td>{location.designation || 'N/A'}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleSelectUser(location, assignmentData)}
                                        >
                                            Select
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No data available for this branch.</td>
                            </tr>
                        )}
                    </tbody>
                        </table>
    </div>
  )
}

export default HandoverAssgnmnt

