// src/hooks/useUserRole.js
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useUserRole = () => {

    const [userRole, setUserRole] = useState('');
    const [userBranch, setUserBranch] = useState('');
    const [username, setUsername] = useState('');
    const [branchId, setbranchId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchUserRole = () => {
            try {
                const token = localStorage.getItem('token');
                console.log("tokennnnnn", token)
                if (!token) {
                    throw new Error('No token found');
                }
                
                const decodedToken = jwtDecode(token);
                const role = decodedToken.department; 
                const branch = decodedToken.branch; 
                const username = decodedToken.username;
                const branchId = decodedToken.branchId;

                console.log("tokennnnnn", decodedToken)
                console.log("tokennnnnn", role)
                console.log("tokennnnnn", branch)
                console.log("tokennnnnn", username)
                console.log("token branch id", branchId)
                
                setUserRole(role);
                setUserBranch(branch);
                setUsername(username);
                setbranchId(branchId);
            } catch (error) {
                console.error('Error decoding token:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, []);

    return { userRole, userBranch, username,branchId,  loading, error };
};

export default useUserRole;
