import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Header from "../components/Header";

const socket = io("http://localhost:5000"); 

const OrderTracking = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        socket.emit("track-order", orderId);
        socket.on("order-update", (order) => {
            setOrder(order);
        });

        return () => {
            socket.off("order-update");
        };
    }, [orderId]);
    
    if(!order) return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading..</p>;

        const { status, deliveryPerson } = order;

        return (
            <div> 
                <Header />
                <div style={{ padding: "20px", textAlign: "center" }}>
                    <h2>Order Tracking 📍</h2>
                    <p><strong>Status:</strong> {status}</p>

                    {deliveryPerson?.name && (
                        <>
                            <p><strong>Delivery Person:</strong> {deliveryPerson.name}</p>
                            <p><strong>Contact:</strong> {deliveryPerson.contact}</p>
                        </>
                    )}

                    {deliveryPerson?.location && (
                        <iframe
                            title="Delivery Location"
                            src={`https://www.google.com/maps?q=${deliveryPerson.location.lat},${deliveryPerson.location.lng}&z=15&output=embed`}
                            style={{ width: "100%", height: "300px", borderRadius: "100px", margin: "10px"}}
                        />     
                    )}                    
            </div>
        </div>
    );
};  

export default OrderTracking;