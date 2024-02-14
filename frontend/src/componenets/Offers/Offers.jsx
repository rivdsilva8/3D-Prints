import React from "react";
import "./Offers.css";
import exclusive_image from "../assets/exclusive_image.png";

export default function Offers() {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers for you</h1>
        <p>ONLY ON BEST SELLERS</p>
        <button onClick={() => window.scrollTo(0, 2275)}>Check Now</button>
      </div>
      <div className="offers-right">
        <iframe
          src="https://my.spline.design/molang3dcopy-e6c6afaffe4d8ed3aa409edea8e4018a/"
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  );
}
