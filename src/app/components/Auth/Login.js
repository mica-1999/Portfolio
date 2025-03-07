"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { loginMethods } from "../../data/loginmethodsData";

export default function Login() {
  const [loginData, setLoginData] = useState({ name: "", password: "" });
  const [error, setError] = useState(null);

  // Router IN NEXT.JS
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // FORM SUBMISSION
  const handleFormSubmission = async (e) => {
    e.preventDefault();

    const { name, password } = loginData;

    if (!name || !password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const res = await signIn("credentials", { redirect: false, name, password });

      if (res?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/pages/dashboard");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  // LOGIN PAGE UI
  return (
    <div className="d-flex card login-card p-4">
      <div className="row">
        <div className="d-flex col-lg-12 justify-content-start">
          <a href="#" onClick={() => window.history.back()} className="back-link">
            <i className="ri-arrow-left-line ri-lg"></i>
          </a>
        </div>
      </div>
      
      <form onSubmit={handleFormSubmission}>
        <div className="row pt-3">
          <div className="d-flex col-lg-12 justify-content-center flex-column align-items-center">
            <h2 className="title">Welcome Back</h2>
            <p className="subtitle">Sign in to your account</p>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="d-flex col-lg-12 justify-content-center align-items-center">
            <div className="input-group">
              <i className="ri-user-line input-icon"></i>
              <input 
                type="text" 
                className="form-control form-st" 
                id="name" 
                name="name" 
                placeholder="Username" 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="d-flex col-lg-12 justify-content-center align-items-center">
            <div className="input-group">
              <i className="ri-lock-line input-icon"></i>
              <input 
                type="password" 
                className="form-control form-st" 
                id="password" 
                name="password" 
                placeholder="Password" 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="d-flex col-lg-12 mt-4 align-items-center justify-content-center ps-5 pe-5">
            <div className="checkbox-wrapper">
              <input type="checkbox" id="remember" name="remember" className="custom-checkbox" />
              <label className="ps-2 remember" htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="ms-auto forgot-link">Forgot Password?</a>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="row">
            <div className="d-flex col-lg-12 mt-3 justify-content-center">
              <div className="error-message">
                <i className="ri-error-warning-line me-2"></i>
                {error}
              </div>
            </div>
          </div>
        )}
        
        <div className="row">
          <div className="d-flex col-lg-12 mt-4 justify-content-center">
            <button type="submit" className="login-btn">
              Sign In <i className="ri-login-box-line ms-2"></i>
            </button>
          </div>
        </div>
      </form>
      
      <div className="row mt-4">
        <div className="d-flex col-lg-12 justify-content-center">
          <div className="divider">
            <span>Or continue with</span>
          </div>
        </div>
      </div>
      
      <div className="row mt-3">
        <div className="d-flex col-lg-12 justify-content-center gap-4">
          {loginMethods.map((method, index) => (
            <a href="#" key={index} className="social-login-link">
              <div className="sign-in-btn pulse-on-hover">
                <i className={`${method.icon}`}></i>
              </div>
            </a>
          ))}
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="d-flex col-lg-12 justify-content-center">
          <p className="signup-text">Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}