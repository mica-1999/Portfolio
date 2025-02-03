"use client"

import { useState } from "react";

export default function newUser() {
  const ROLES = ["Admin", "Viewer", "Editor", "Author"];

  const [formState, setFormState] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });

  const handleInputChange = (field) => (e) => {
    setFormState({
        ...formState,
        [field]: e.target.value,
    });
  } 

  const handleReset = () => {
    setFormState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        role: "",
    });
  }

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if(!formState.username || !formState.first_name || !formState.last_name || !formState.email || !formState.role) {
      alert("Please fill all the fields");
      return;
    }

    console.log("entrei aqui");
  }

  return(

  <div className="d-flex col-lg-6 new-links">
    <div className="card flex-grow-1">
      {/* Card Header */}
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">User</h5>
          <i
            className="ri-refresh-line ri-lg pointer"
            onClick={handleReset}
          ></i>
        </div>
        <h6 className="card-subtitle">Insert new</h6>
      </div>

      {/* Card Body */}
      <div className="card-body p-0 p-3">
        <form onSubmit={handleFormSubmission}>
          {/* Name Input */}
          <div className="row pb-3">
            <div className="col-lg-4">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formState.username}
                placeholder="Insert a username"
                onChange={handleInputChange("username")}
                required
              />
            </div>
            <div className="col-lg-4">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={formState.first_name}
                placeholder="First-name"
                onChange={handleInputChange("first_name")}
                required
              />
            </div>
            <div className="col-lg-4">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={formState.last_name}
                placeholder="Last Name"
                onChange={handleInputChange("last_name")}
                required
              />
            </div>
          </div>

          {/* Select Inputs */}
          <div className="row pb-3">
              <div className="col-lg-8">
                  <label htmlFor="email" className="form-label">
                  E-mail
                  </label>
                  <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formState.email}
                  placeholder="Insert your email"
                  onChange={handleInputChange("email")}
                  required
                  />
              </div>
            {/* Role */}
            <div className="col-lg-4">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                id="role"
                name="role"
                aria-label="Type"
                value={formState.role}
                onChange={handleInputChange("role")}
              >
                <option value="">Select a type</option>
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="row mt-4">
            <div className="col-lg-12 d-flex align-items-center justify-content-center">
              <button type="submit" className="btn btn-primary insert-menu">
                Insert
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
};