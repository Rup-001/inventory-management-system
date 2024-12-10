export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; // returns true if token exists, false otherwise
  };
  
//   export const getUserRole = () => {
//     const token = localStorage.getItem('token');
//     return token ? JSON.parse(atob(token.split('.')[1])).department : null;
//   };


export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.department;
    } catch (e) {
        return null;
    }
};


export const getUserBranch = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.branch;
    } catch (e) {
        return null;
    }
};
  