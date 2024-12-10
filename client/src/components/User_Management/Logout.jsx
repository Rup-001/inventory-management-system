import React from 'react';

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        window.location.href = '/login'; // Redirect to the login page
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
