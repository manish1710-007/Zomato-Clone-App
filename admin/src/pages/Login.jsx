import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/admin/login", {
                email,
                password,
            });
            localStorage.setItem("adminToken", res.data.token);
            window.location.href = "/dashboard";
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl">Admin Login</h2>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
