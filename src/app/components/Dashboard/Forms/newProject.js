"use client";
import React, { useState } from "react";

// Constants for options and tags
const STATES = [
  { text: "Completed", value: 1 },
  { text: "In Progress", value: 2 },
  { text: "Not Started", value: 3 },
  { text: "Failed", value: 0 },
];

const TAGS_WITH_COLORS = [
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
  { tag: "Angular", color: "warning" },
];

export default function Forms() {

  // STATES FOR FORM DATA
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedValue, setSelectedValue] = useState("default");
  const [selectedTag, setSelectedTag] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    state: "",
    tags: []
  });

  // RESET FORM
  const handleReset = () => {
    setProjectName("");
    setProjectDescription("");
    setSelectedValue("default");
    setSelectedTag([]);
  };
  
  // STATE UPDATERS 
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
  const handle_ProjectName = (e) => {
    setProjectName(e);
  }
  const handle_ProjectDescription = (e) => {
    setProjectDescription(e);
  }

  // FORM SUBMISSION
  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if(projectName === "" || selectedValue === "default" || selectedTag.length === 0) {
      alert("Pleasse fill all the fields");
      return;
    }

      // Create a new object for the form data
    const formDataToSend = {
      name: projectName,
      description: projectDescription,
      state: selectedValue,
      tags: selectedTag,
    };

    try {
      const response = await fetch("/api/getProjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataToSend),
      });
      const result = await response.json();
      
      if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
      }
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="d-flex col-lg-6 new-links">
      <div className="card flex-grow-1">
        <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">Project</h5>
          <i className="ri-refresh-line ri-lg pointer" onClick={handleReset}></i>
        </div>
          <h6 className="card-subtitle">Insert new</h6>
        </div>
        <div className="card-body p-0 ps-3 pt-2">
          <form action="/dashboard/insertForm" method="POST" onSubmit={handleFormSubmission}>
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-control form-n1" 
                  id="name" 
                  name="name" 
                  value={projectName}
                  placeholder="Insert name for project" 
                  onChange={(e) => (handle_ProjectName(e.target.value))}
                  required 
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="state" className="form-label">State</label>
                <select 
                  className="form-select form-n1" 
                  id="state" 
                  name="state" 
                  aria-label="state" 
                  value={selectedValue}   
                  onChange={(e) => handleChange(e.target.value)}
                >
                  <option value="default">Select a state</option>
                  {STATES.map((state, index) => (
                    <option key={index} value={state.state_value}>{state.state_text}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mt-2">
                <label htmlFor="name" className="form-label">Description</label>
                  <input 
                    type="text" 
                    className="form-control form-n2" 
                    id="description" 
                    name="description" 
                    placeholder="Add a brief description" 
                    value={projectDescription} 
                    onChange={(e) => (handle_ProjectDescription(e.target.value))}
                    required 
                  />
              </div>
            </div>
            <div className="row ">
              <div className="d-flex col-lg-12 overflow-auto tag-div mt-4">
                 {TAGS_WITH_COLORS.map((tag, index) => (
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
