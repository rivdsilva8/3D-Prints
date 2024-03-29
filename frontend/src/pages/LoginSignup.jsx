import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { useEffect } from "react";

export default function LoginSignup() {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  // const change = useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const login = async () => {
    try {
      if (!formData.email || !formData.password) {
        throw "all fields have not been filled";
      }
      console.log("Login funct exec", formData);
      let responseData;
      await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => (responseData = data));

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        throw "either username or password is incorrect";
      }
    } catch (e) {
      alert(e);
    }
  };

  const signup = async () => {
    try {
      if (!formData.username || !formData.email || !formData.password) {
        throw "all fields have not been filled";
      }
      console.log("Signup funct exec", formData);
      let responseData;
      await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => (responseData = data));

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.error);
      }
    } catch (e) {
      alert(e);
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email Address"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>

        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login"); // Change the state to "Login" for the login link
              }}
            >
              Login
            </span>
          </p>
        ) : state === "Login" ? ( // Check if the state is "Login"
          <p className="loginsignup-login">
            Need to create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up"); // Change the state to "Sign Up" for the signup link
              }}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <></> // Render nothing if the state is neither "Sign Up" nor "Login"
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
}
