import { useState, useEffect } from "react";
import axios from "axios";
import RestaurantCard from "../components/Restaurantcard";

const Favourites = () => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/favourites");
                setFavourites(res.data);
            }catch (error) {
                console.error("Error fetching favourites:", error);
            }
        };
        fetchFavourites();
    }, []);

    if (favourites.length === 0){
        return <p style={{ textAlign: "center", marginTop: "20px" }}>No favourites added yet! ❤</p>;   
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Your Favourites ❤️</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
                {favourites.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default Favourites;