import { useState, useEffect } from "react";
import axios from "axios";
import RestaurantCard from "../components/Restaurantcard";
import Header from "../components/Header";


const backendUrl = process.env.REACT_APP_BACKEND_URL; 
const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [search, setSearch] = useState("");
    const [filterCuisine, setFilterCuisine] = useState("");
    const [sortBy, setSortBy] = useState("rating");
    const [order, setOrder] = useState("desc");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = "manish123";  

    useEffect(() => {
        const fetchData = async () => {
            console.log("backend URL:", backendUrl)
            
            try {
                setLoading(true);

                // Fetch restaurants
                const restaurantsRes = await axios.get(`${backendUrl}/api/restaurants?sortBy=${sortBy}&order=${order}`);
                setRestaurants(restaurantsRes.data);
                console.log("Restaurants:", restaurantsRes.data);

                // Fetch recommendations if userId exists
                if (userId) {
                    const recommendationsRes = await axios.get(`${backendUrl}/api/recommendations?userId=${userId}`);
                    setRecommendations(recommendationsRes.data);
                    console.log("Recommendations:", recommendationsRes.data);
                }

                setError(null); // Clear previous errors
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data. Please check your internet connection or try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sortBy, order, userId]);

    const filteredRestaurants = restaurants.filter((restaurant) => {
        return (
            restaurant.name.toLowerCase().includes(search.toLowerCase()) &&
            (filterCuisine ? restaurant.cuisine === filterCuisine : true)
        );
    });

    return (
        <div>
            <Header />
            <div style={{ padding: "20px", textAlign: "center" }}>
                <input
                    type="text"
                    placeholder="Search by name..."
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: "5px", marginRight: "10px" }}
                />
                <select onChange={(e) => setFilterCuisine(e.target.value)} style={{ marginRight: "10px" }}>
                    <option value="">All Cuisines</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Italian">Italian</option>
                </select>

                {/* Sort Dropdown */}
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ marginRight: "10px" }}>
                    <option value="rating">Rating</option>
                    <option value="price">Price</option>
                    <option value="distance">Distance</option>
                </select>
                <select value={order} onChange={(e) => setOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {/* Loading and Error States */}
            {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
            {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

            {!loading && !error && filteredRestaurants.length === 0 && (
                <p style={{ textAlign: "center" }}>No restaurants found. Try adjusting your search or filters.</p>
            )}

            {/* Recommended Dishes Section */}
            {userId && recommendations.length > 0 && (
                <div style={{ padding: "20px" }}>
                    <h3>Recommended Dishes for You</h3>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: "15px",
                        }}
                    >
                        {recommendations.map((dish) => (
                            <div
                                key={dish.id}
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    textAlign: "center",
                                }}
                            >
                                <h4>{dish.name}</h4>
                                <p>{dish.description}</p>
                                <p><strong>Rating:</strong> {dish.rating} ⭐</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "15px",
                    padding: "20px",
                }}
            >
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default Home;
