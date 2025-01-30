"use client";
import React, { useState } from "react";

export default function Forms() {
  const [formState, setFormState] = useState({
    name: "",
    associateTo: "",
    type: ""
  });

  // STATE UPDATERS
  const handleInputChange = (field) => (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };
  
  // RESET FORM
  const handleReset = () => {
    setFormState({
      name: "",
      associateTo: "",
      type: "",
    });
  };

  return (
    <div className="d-flex col-lg-6 new-links">
      <div className="card flex-grow-1">
        {/* Card Header */}
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">Menu</h5>
            <i
              className="ri-refresh-line ri-lg pointer"
              onClick={handleReset}
            ></i>
          </div>
          <h6 className="card-subtitle">Insert new</h6>
        </div>

        {/* Card Body */}
        <div className="card-body p-0 p-3">
          <form action="/dashboard/insertForm" method="POST">
            {/* Name Input */}
            <div className="row pb-3">
              <div className="col-lg-12">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formState.name}
                  placeholder="Insert a name for the menu"
                  onChange={handleInputChange("name")}
                  required
                />
              </div>
            </div>

            {/* Select Inputs */}
            <div className="row pb-3">
              {/* Associate To */}
              <div className="col-lg-6">
                <label htmlFor="associateTo" className="form-label">
                  Associate to
                </label>
                <select
                  className="form-select"
                  id="associateTo"
                  name="associateTo"
                  aria-label="Associate to"
                  value={formState.associateTo}
                  onChange={handleInputChange("associateTo")}
                >
                  <option value="">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>

              {/* Type */}
              <div className="col-lg-6">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <select
                  className="form-select"
                  id="type"
                  name="type"
                  aria-label="Type"
                  value={formState.type}
                  onChange={handleInputChange("type")}
                >
                  <option value="">Select a type</option>
                  <option value="main">Main Menu</option>
                  <option value="sub">Sub Menu</option>
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
  );
}
