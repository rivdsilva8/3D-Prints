import React from "react";
import "./Hero.css";
import Spline from "../Spline/Spline";

import arrow_icon from "../assets/arrow.png";
import hero_image from "../assets/hero_image.png";
export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>The Latest Prints Are In!</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            {/* <img src={hand_icon} alt="" /> */}
          </div>
          <p>3D Prints</p>
          <p>for everyone</p>
        </div>
        <div
          onClick={() => window.scrollTo(0, 700)}
          className="hero-latest-btn"
        >
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <Spline />
      </div>
    </div>
  );
}
