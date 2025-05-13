import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Restaurant from "./pages/Restaurant";
import Favourites from "./pages/Favourites";
import Header from "./components/Header";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Login from "./pages/Login";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const HomePage = () => {
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/restaurants`);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>Welcome to the Home Page</p>}
    </div>
  );
};

// Simple component
const About = () => <div>About Page</div>;

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path ="/login" element={<Login />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/favourites" element={<Favourites />} />  {/* New Route */}
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;