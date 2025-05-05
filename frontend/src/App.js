import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Restaurant from "./pages/Restaurant";
import Login from "./pages/Login";
import Favourites from "./pages/Favourites";  // New Favourites page
import Header from "./components/Header";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { useEffect } from "react";


const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/restaurant/:id" element={<Restaurant />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favourites" element={<Favourites />} />  {/* New Route */}
                <Route path="/forgot-password" element={<ForgotPassword />}/>
                <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
        </Router>
    );
};

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const HomePage = () =>{
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`${backendUrl}/api/restaurants`);
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return <div> Welcome to the Home Page</div>
};


export default App;
