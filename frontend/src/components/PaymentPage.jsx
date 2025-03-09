import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// Load Stripe using public key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState(500);  // Amount in INR
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Processing...");

        if (!stripe || !elements) return;

        // Create payment intent on backend
        const { data } = await axios.post("http://localhost:5000/api/payments/create-payment-intent", {
            amount,
            currency: "INR",
        });

        const result = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: "Manish Kumar",
                },
            },
        });

        if (result.error) {
            setMessage(`Payment failed: ${result.error.message}`);
        } else if (result.paymentIntent.status === "succeeded") {
            setMessage("Payment successful!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl mb-4">Pay ₹{amount}</h2>
            <CardElement className="border p-2 mb-4" />
            <button
                type="submit"
                disabled={!stripe}
                className="w-full bg-blue-500 text-white py-2 rounded"
            >
                Pay
            </button>
            {message && <p className="mt-4 text-center">{message}</p>}
        </form>
    );
};

const PaymentPage = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default PaymentPage;
