const isAuthenticated = () => {
    // Check for a valid token, logged in user in session storage, etc.
    // Replace with your actual authentication mechanism
    const token = localStorage.getItem("authToken");
    return !!token; // Check if token exists
  };

  export {isAuthenticated}