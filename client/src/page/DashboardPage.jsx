import React from 'react';
import HeadAdminDashboard from '../components/Dashboards/HeadAdminDashboard';
import BranchAdminDashboard from '../components/Dashboards/AdminDashboard';
import EmployeeDashboard from '../components/Dashboards/EmployeeDashboard';
import useUserRole from '../hooks/useUserRole';


const Dashboard = () => {

    const { userRole, userBranch, loading, error } = useUserRole();
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Errorrrrrrrrr: {error}</p>;

    
    const isHeadAdmin = userRole === 'Administration' && userBranch === 'Head Office';
    const isBranchAdmin = userRole === 'Administration' && userBranch !== 'Head Office';
    const isEmployee = userRole !== 'Administration';

    return (
        <>

            {isHeadAdmin && <HeadAdminDashboard />}
            {isBranchAdmin && <BranchAdminDashboard />}
            {isEmployee && <EmployeeDashboard />}
        </>
    );
};

export default Dashboard;
