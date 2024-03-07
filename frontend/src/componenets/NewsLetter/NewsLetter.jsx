import React, { useState } from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:4000/subscribe", { // Update the URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        setSubscribed(true);
        alert("You have successfully subscribed!");
      } else {
        console.error("Failed to subscribe to the newsletter");
      }
    } catch (error) {
      console.error("Error subscribing to the newsletter:", error);
    }
  };

  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      {subscribed ? (
        <p className="success-message">You have successfully subscribed!</p>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Your Email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
      )}
    </div>
  );
};

export default NewsLetter;
