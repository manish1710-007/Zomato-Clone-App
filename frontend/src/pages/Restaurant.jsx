import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Header from "../components/Header";

const Restaurant = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });

    // Load Google Maps API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
                setRestaurant(res.data);

                const reviewsRes = await axios.get(`http://localhost:5000/api/reviews/${id}`);
                setReviews(reviewsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setRestaurant(null);
                setReviews([]);
            }
        };
        fetchData();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/reviews", { ...newReview, restaurantId: id });
            setReviews([...reviews, { ...newReview, date: new Date().toISOString() }]);
            setNewReview({ user: "", rating: 5, comment: "" });
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    if (!restaurant) return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>;

    return (
        <div>
            <Header />
            <div style={{ padding: "20px", textAlign: "center" }}>
                <h2>{restaurant.name}</h2>
                <img
                    src={restaurant.png}
                    alt={restaurant.name}
                    style={{ width: "80%", height: "300px", borderRadius: "10px", margin: "10px 0" }}
                />
                <p>
                    <strong>Cuisine:</strong> {restaurant.cuisine}
                </p>
                <p>
                    <strong>Location:</strong> {restaurant.location}
                </p>
                <p>
                    <strong>Rating:</strong> {restaurant.rating} ⭐
                </p>

                {/* Google Map */}
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={{ width: "80%", height: "300px", margin: "10px auto", borderRadius: "10px" }}
                        center={{
                            lat: restaurant.coordinates.lat,
                            lng: restaurant.coordinates.lng,
                        }}
                        zoom={15}
                    >
                        <Marker
                            position={{
                                lat: restaurant.coordinates.lat,
                                lng: restaurant.coordinates.lng,
                            }}
                        />
                    </GoogleMap>
                ) : (
                    <p>Loading map...</p>
                )}

                <h3>Reviews:</h3>
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ddd",
                            padding: "10px",
                            margin: "5px 0",
                            borderRadius: "5px",
                        }}
                    >
                        <p>
                            <strong>{review.user}</strong> ({new Date(review.date).toLocaleDateString()}): {review.rating} ⭐
                        </p>
                        <p>{review.comment}</p>
                    </div>
                ))}

                <h3>Leave a Review:</h3>
                <form
                    onSubmit={handleReviewSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "400px",
                        margin: "0 auto",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={newReview.user}
                        onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                        required
                        style={{ padding: "5px", marginBottom: "5px" }}
                    />
                    <input
                        type="number"
                        placeholder="Rating (1-5)"
                        value={newReview.rating}
                        min="1"
                        max="5"
                        onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                        required
                        style={{ padding: "5px", marginBottom: "5px" }}
                    />
                    <textarea
                        placeholder="Comment"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        required
                        style={{ padding: "5px", marginBottom: "5px" }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: "5px",
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                        }}
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Restaurant;
