import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleLoginButton from "./GoogleLoginButton";

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/current_user", { withCredentials: true });
                setUser(res.data);
            } catch (error) {
                console.error("Not logged in");
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await axios.get("http://localhost:5000/api/logout", { withCredentials: true });
        setUser(null);
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#f8f8f8" }}>
            <h2>Zomato Clone</h2>
            <div>
                {user ? (
                    <div>
                        <img src={user.avatar} alt="Profile" style={{ width: "30px", borderRadius: "50%", marginRight: "10px" }} />
                        <span>{user.name}</span>
                        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
                    </div>
                ) : (
                    <GoogleLoginButton />
                )}
            </div>
        </div>
    );
};

export default Header;
