"use client";
import React, { useState } from "react";

export default function Forms() {
  const [selectedValue, setSelectedValue] = useState("default");

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className="d-flex col-lg-6 new-links">
      <div className="card flex-grow-1">
        <div className="card-header">
          <h5 className="card-title">Menu</h5>
          <h6 className="card-subtitle">Insert new</h6>
        </div>
        <div className="card-body p-0 ps-3 pt-2">
          <form action="/dashboard/insertForm" method="POST">
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-control form-n1" 
                  id="name" 
                  name="name" 
                  required 
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="associateTo" className="form-label">Associate to</label>
                <select 
                  className="form-select form-n1" 
                  id="associateTo" 
                  name="associateTo" 
                  aria-label="Associate to" 
                  value={selectedValue} 
                  onChange={(e) => handleChange(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-lg-6">
                <label htmlFor="type" className="form-label">Type</label>
                <select 
                  className="form-select form-n1" 
                  id="type" 
                  name="type" 
                  aria-label="Type"
                >
                  <option value="">Select a type</option>
                  <option value="main">Main Menu</option>
                  <option value="sub">Sub Menu</option>
                </select>
              </div>
              <div className="col-lg-6 d-flex align-items-end">
                <button type="submit" className="btn btn-primary insert-menu">Insert</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
