import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            alert("Login successful");
            navigate("/");
        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <div>
            <Header />
            <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
                <h2 style={{ textAlign: "center" }}>Login</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px" }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
