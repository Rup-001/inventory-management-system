import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    // Check if user came from a valid path and avoid redirecting to unauthorized pages
    const referrer = document.referrer; // Get the referring URL
    const allowedPaths = ['/login', '/signup']; // Array of allowed previous pages

    if (referrer && allowedPaths.includes(referrer)) {
      // If referrer is in allowedPaths, go back
      navigate(-1); // Go back one step in history
    } else {
      // If referrer is not allowed, redirect to a designated default page
      navigate('/'); // Or any other default route
      // Optionally, display a message explaining the redirection
    }
  };

  return (
    <div className="unauthorized-container">
      <h1>Unauthorized Access</h1>
      <p>You are not authorized to view this page.</p>
      <button onClick={handleReturn}>Return to a Safe Location</button>
    </div>
  );
};

export default Unauthorized;

