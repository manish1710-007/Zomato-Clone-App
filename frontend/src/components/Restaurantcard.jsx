import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RestaurantCard = ({ restaurant }) => {
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        const checkFavourite = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/favourites");
                const favourites = res.data.map((fav) => fav._id);
                setIsFavourite(favourites.includes(restaurant._id));
            } catch (error) {
                console.error("Error checking favourites:", error);
            }
        };
        checkFavourite();
    }, [restaurant._id]);

    const toggleFavourite = async () => {
        try {
            if (isFavourite) {
                await axios.delete(`http://localhost:5000/api/favourites/${restaurant._id}`);
            } else {
                await axios.post("http://localhost:5000/api/favourites", { restaurantId: restaurant._id });
            }
            setIsFavourite(!isFavourite);
        } catch (error) {
            console.error("Error updating favourites:", error);
        }
    };

    return (
        <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "10px", position: "relative" }}>
            <Link to={`/restaurant/${restaurant._id}`} style={{ textDecoration: "none", color: "black" }}>
                <img src={restaurant.image} alt={restaurant.name} style={{ width: "100%", borderRadius: "5px" }} />
                <h3>{restaurant.name}</h3>
                <p>{restaurant.cuisine}</p>
                <p>⭐ {restaurant.rating}</p>
                <p>💵 Price: {restaurant.price ? `$${restaurant.price}` : "N/A"}</p>
                <p>📍 Distance: {restaurant.distance ? `${restaurant.distance} km` : "N/A"}</p>
            </Link>
            <button onClick={toggleFavourite} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", position: "absolute", top: "10px", right: "10px" }}>
                {isFavourite ? "❤️" : "🤍"}
            </button>
        </div>
    );
};

export default RestaurantCard;
