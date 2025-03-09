import React from "react";

const GoogleLoginBUtton = () => {
    const handleLogin = () => {
        window.location.href= "http://localhost:5000/auth/google";
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

export default GoogleLoginBUtton;