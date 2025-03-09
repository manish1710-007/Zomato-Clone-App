import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Login from "./pages/Login";
import Favourites from "./pages/Favourites";  // New Favourites page
import Header from "./components/Header";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/restaurant/:id" element={<Restaurant />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favourites" element={<Favourites />} />  {/* New Route */}
                <Route path="/forgot-password" element={<ForgotPassword />}/>
                <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
        </Router>
    );
};

export default App;
