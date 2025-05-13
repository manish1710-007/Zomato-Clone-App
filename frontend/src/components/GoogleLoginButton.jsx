import React from "react";

const GoogleLoginButton = () => {
    const handleLogin = () => {
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
    };

    return (
        <button
            onClick={handleLogin}
            style={{
                padding: "10px",
                background: "#4285F4",
                color:"white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                margin: "20px"
            }}
        >
            sign in with Google
        </button>    
    );
};

export default GoogleLoginButton;