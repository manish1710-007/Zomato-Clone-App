import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GoogleMap, Marker, useLoadScripts } from "@react-google-maps/api";
import Header from "../components/Header";

const Restaurant = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
                setRestaurant(res.data);
                
                const reviewsRes = await axios.get(`http://localhost:5000/api/reviews/${id}`);
                setReviews(reviewsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
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

    const mapSrc = `https://www.google.com/maps/embed/v1/place?key=GOOGLE_MAPS_API_KEY=${encodeURIComponent(restaurant.location)}`;

    return (
        <div>
            <Header />
            <div style={{ padding: "20px", textAlign: "center" }}>
                <h2>{restaurant.name}</h2>
                <img src={restaurant.image} alt={restaurant.name} style={{ width: "80%", height: "300px", borderRadius: "10px", margin: "10px 0" }} />
                <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
                <p><strong>Location:</strong> {restaurant.location}</p>
                <iframe src={mapSrc} width="80%" height="300" style={{ border: "0", borderRadius: "10px", margin: "10px 0" }} allowFullScreen loading="lazy"></iframe>
                <p><strong>Rating:</strong> {restaurant.rating} ⭐</p>

                <h3>Reviews:</h3>
                {reviews.map((review, index) => (
                    <div key={index} style={{ border: "1px solid #ddd", padding: "10px", margin: "5px 0", borderRadius: "5px" }}>
                        <p><strong>{review.user}</strong> ({new Date(review.date).toLocaleDateString()}): {review.rating} ⭐</p>
                        <p>{review.comment}</p>
                    </div>
                ))}

                <h3>Leave a Review:</h3>
                <form onSubmit={handleReviewSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px", margin: "0 auto" }}>
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
                    <button type="submit" style={{ padding: "5px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px" }}>
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Restaurant;
