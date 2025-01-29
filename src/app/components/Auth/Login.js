"use client";
import React, { useState } from "react";

const loginMethods =[
    {name: "Google", icon: "ri-google-fill"}, 
    {name: "Facebook", icon: "ri-facebook-fill"}, 
    {name: "Twitter", icon: "ri-twitter-fill"}
];

export default function Login() {
// SINGLE STATE OBJECT FOR FORM DATA
  const [loginData, setloginData] = useState({
    name: "",
    password: ""
  });

// STATE UPDATERS
const handleChange = (e) => {
    const { name, value } = e.target;
    setloginData((prev) => ({
        ...prev,
        [name]: value,
    }));
};

// FORM SUBMISSION
  const handleFormSubmission = async (e) => {
    e.preventDefault();

    const { name, password } = loginData;


    if (name === "" ||password === "") {
      alert("Please fill all the fields");
      return;
    }

    try {
        console.log(JSON.stringify(loginData));
        const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        });

        const result = await response.json();

        if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
        }

        if (typeof window !== "undefined") {
            // Use window.location for client-side navigation
            window.location.href = '/pages/dashboard';
          }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
  };

//LOGIN PAGE UI
    return (
        <div className="card login-card p-4">
            <div className="row">
                <div className="d-flex col-lg-12 justify-content-start">
                    <a href="#" onClick={() => window.history.back()}>
                        <i className="ri-arrow-left-line ri-lg"></i>
                    </a>
                </div>
            </div>
            <form action="/api/authUser" method="POST" onSubmit={handleFormSubmission}>
                <div className="row">
                    <div className="d-flex col-lg-12 pt-3 justify-content-center">
                        <img src="../assets/images/logo.png" alt="logo" width="50" height="50" />
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex col-lg-12 pt-3 justify-content-center">
                        <h2>Welcome Back</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex col-lg-12 justify-content-center">
                        <p>Enter your credentials to access your account</p>
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex flex-column pt-3 col-lg-12 justify-content-center">
                        <label htmlFor="name" className="form-label">Username</label>
                        <input type="text" className="form-control form-st" id="name" name="name" placeholder="Enter your username"  onChange={handleChange} required />
                    </div>
                </div>

                <div className="row">
                    <div className="d-flex flex-column pt-3 col-lg-12 justify-content-center">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control form-st" id="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
                    </div>
                </div>

                <div className="row">
                    <div className="d-flex col-lg-12 mt-3 justify-content-center">
                        <input type="checkbox" id="remember" name="remember" />
                        <label className="ps-2" htmlFor="remember">Remember me</label>
                        <a href="#" className="ms-auto">Forgot Password?</a>
                    </div>
                </div>

                <div className="row">
                    <div className="d-flex col-lg-12 mt-3 justify-content-center">
                        <button type="submit" className="login-btn mt-2">Login</button>
                    </div>
                </div>
            </form>

            <div className="row">
                <div className="d-flex col-lg-12 mt-3 justify-content-center">
                    <p>Or continue with</p>
                </div>
            </div>

            <div className="row">
                <div className="d-flex col-lg-12 justify-content-center gap-3">
                    {loginMethods.map((method, index) => {
                        return (
                            <a href="#" key={index}>
                                <div className="d-flex align-items-center justify-content-center sign-in-btn">
                                    <i className={`${method.icon}`} style={{ fontSize: '1.35rem' }}></i>
                                </div>
                            </a>
                        )})
                    }
                </div>
            </div>
        </div>
    );
}