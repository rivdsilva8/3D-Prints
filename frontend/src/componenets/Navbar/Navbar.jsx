import React from "react";
import logo from "../assets/logo.png";
import cart from "../assets/cart_icon.png";
import { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { ShopContext } from "../../context/ShopContext";
import dropdown from "../assets/dropdown_icon.png";

export default function Navbar() {
  const [menu, setMenu] = useState("");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuref = useRef();

  const dropdown_toggle = (e) => {
    menuref.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>3D SILVA</p>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={dropdown}
        alt=""
      />
      <ul ref={menuref} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            shop{" "}
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("category");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/category">
            Category{" "}
          </Link>
          {menu === "category" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("custom");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/custom">
            Custom Print
          </Link>{" "}
          {menu === "custom" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("about");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/about">
            About{" "}
          </Link>
          {menu === "about" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("contact");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/contactus">
            Contact Us{" "}
          </Link>
          {menu === "contact" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to="cart">
          <img src={cart} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}
