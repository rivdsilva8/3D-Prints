import React from "react";
import "./Banner.css";

export default function Banner(props) {
  return (
    <div className="banner">
      <h1>{props.name}</h1>
      <img src={props.image} alt="" />
    </div>
  );
}
