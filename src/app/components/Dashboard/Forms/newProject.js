"use client";
import React, { useState } from "react";


export default function Forms() {
  const state = ["Completed", "In Progress", "Not Started", "Failed"];
  const tags = ["HTML", "CSS", "Javascript", "PHP", "Python", "Java", "C++", "C#", "Ruby", "React", "Angular"];

  const [selectedValue, setSelectedValue] = useState("default");

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className="d-flex col-lg-6 new-links">
      <div className="card flex-grow-1">
        <div className="card-header">
          <h5 className="card-title">Project</h5>
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
                  placeholder="Insert a name" required 
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="associateTo" className="form-label">State</label>
                <select 
                  className="form-select form-n1" 
                  id="associateTo" 
                  name="associateTo" 
                  aria-label="Associate to" 
                  value={selectedValue} 
                  onChange={(e) => handleChange(e.target.value)}
                >
                  <option value="default">Select a state</option>
                  {state.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row ">
              <div className="d-flex col-lg-12 overflow-auto tag-div mt-4">
                 {tags.map((tag, index) => (
                  <div className="form-check form-check-inline" key={index}>
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id={`tag${index}`} 
                      name={`tag${index}`} 
                      value={tag} 
                    />
                    <label className="form-check-label" htmlFor={`tag${index}`}>{tag}</label>
                  </div>
                 ))}
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-lg-12 d-flex align-items-center justify-content-center mt-4">
                <button type="submit" className="btn btn-primary insert-menu">Insert</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
