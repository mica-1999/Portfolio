"use client";
import React, { useState } from "react";


export default function Forms() {
  const state = [
    {state_text: "Completed", state_value: 1}, 
    {state_text:"In Progress", state_value: 2}, 
    {state_text:"Not Started",state_value: 3},
    {state_text:"Failed", state_value: 0}
  ];

  const tagsWithColors = [
    { tag: "HTML", color: "primary" },
    { tag: "CSS", color: "primary" },
    { tag: "Javascript", color: "warning" },
    { tag: "PHP", color: "danger" },
    { tag: "Python", color: "success" },
    { tag: "Java", color: "success" },
    { tag: "C++", color: "dark" },
    { tag: "C#", color: "light" },
    { tag: "Ruby", color: "danger" },
    { tag: "React", color: "primary" },
    { tag: "Angular", color: "warning" }
  ];

  const [selectedValue, setSelectedValue] = useState("default");
  const [selectedTag, setSelectedTag] = useState([]);

  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const toggleTag = (tag) => {
    setSelectedTag((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag) // Remove tag if already selected
        : [...prevSelectedTags, tag] // Add tag if not selected
    );
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
                    <option key={index} value={state.state_value}>{state.state_text}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row ">
              <div className="d-flex col-lg-12 overflow-auto tag-div mt-4">
                 {tagsWithColors.map((tag, index) => (
                  <div className="form-check form-check-inline p-0 pb-2" key={index}>
                    <div className={`badge bg-label-${tag.color} rounded-pill tag-selection ${selectedTag.includes(tag.tag) ? "selected" : ""}`} style={{borderColor: selectedTag.includes(tag.tag) ? `var(--${tag.color})` : ""}} name={`tag${index}`} value={tag.tag} onClick={() => toggleTag(tag.tag)}>{tag.tag} </div>
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
