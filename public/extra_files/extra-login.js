"use client";
import { signIn } from "next-auth/react"
import React, { useState } from "react";

const loginMethods =[
    {name: "Google", icon: "ri-google-fill"}, 
    {name: "Facebook", icon: "ri-facebook-fill"}, 
    {name: "Twitter", icon: "ri-twitter-fill"}
];

export default function Login() {
// STATES
  const [loginData, setloginData] = useState({
    name: "",
    password: ""
  });

  const [error, setError] = useState(null); // State for handling errors

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
        
        const res = await signIn("credentials", {
            redirect: false,
            name,
            password,
            })
      
        if (res?.error) {
            setError("Invalid credentials")
        }
        else {
            // Redirect or handle successful login here
            window.location.href = "/pages/dashboard"; // Redirect after successful login
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
  };

//LOGIN PAGE UI
    return (
        <div className="d-flex card login-card p-4">
            <div className="row">
                <div className="d-flex col-lg-12 justify-content-start">
                    <a href="#" onClick={() => window.history.back()}>
                        <i className="ri-arrow-left-line ri-lg"></i>
                    </a>
                </div>
            </div>
            <form  action="/api/authUser" method="POST" onSubmit={handleFormSubmission}>
                <div className="row pt-3">
                    <div className="d-flex col-lg-12 justify-content-center">
                        <h2 className="title">Admin</h2>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="d-flex col-lg-12 justify-content-center align-items-center">
                        <input type="text" className="form-control form-st" id="name" name="name" placeholder="Username"  onChange={handleChange} required />
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="d-flex col-lg-12 justify-content-center align-items-center">
                        <input type="password" className="form-control form-st" id="password" name="password" placeholder="Password" onChange={handleChange} required />
                    </div>
                </div>

                <div className="row">
                    <div className="d-flex col-lg-12 mt-3 align-items-center justify-content-center">
                        <input type="checkbox" id="remember" name="remember" />
                        <label className="ps-2 remember" htmlFor="remember">Remember me</label>
                        <a href="#" className="ms-auto remember">Forgot Password?</a>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                <div className="row">
                    <div className="d-flex col-lg-12 mt-3 justify-content-center">
                    <span className="text-danger">{error}</span> {/* Display error */}
                    </div>
                </div>
                )}

                <div className="row">
                    <div className="d-flex col-lg-12 mt-3 justify-content-center">
                        <button type="submit" className="login-btn mt-2">Login</button>
                    </div>
                </div>
            </form>

            <div className="row mt-4">
                <div className="d-flex col-lg-12 justify-content-center">
                    <p style={{ color: 'white' }}>Or continue with:</p>
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