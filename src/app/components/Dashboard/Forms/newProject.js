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
  // SINGLE STATE OBJECT FOR FORM DATA
  const [formState, setFormState] = useState({
    projectName: "",
    projectDescription: "",
    selectedState: "default",
    selectedTags: [],
  });

  // RESET FORM
  const handleReset = () => {
    setFormState({
      projectName: "",
      projectDescription: "",
      selectedState: "default",
      selectedTags: [],
    });
  };
  
  // STATE UPDATERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const toggleTag = (tag) => {
    setFormState((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag) // Remove tag
        : [...prev.selectedTags, tag], // Add tag
    }));
  };

  // FORM SUBMISSION
  const handleFormSubmission = async (e) => {
    e.preventDefault();

    const { projectName, projectDescription, selectedState, selectedTags } = formState;

    if (
      projectName === "" ||
      projectDescription === "" ||
      selectedState === "default" ||
      selectedTags.length === 0
    ) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch("/api/getProjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
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
            <i
              className="ri-refresh-line ri-lg pointer"
              onClick={handleReset}
            ></i>
          </div>
          <h6 className="card-subtitle">Insert new</h6>
        </div>
        <div className="card-body p-0 p-3">
          <form
            action="/dashboard/insertForm"
            method="POST"
            onSubmit={handleFormSubmission}
          >
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="projectName"
                  value={formState.projectName}
                  placeholder="Insert name for project"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <select
                  className="form-select"
                  id="state"
                  name="selectedState"
                  aria-label="state"
                  value={formState.selectedState}
                  onChange={handleChange}
                >
                  <option value="default">Select a state</option>
                  {STATES.map((state, index) => (
                    <option key={index} value={state.value}>
                      {state.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mt-2">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="projectDescription"
                  placeholder="Add a brief description"
                  value={formState.projectDescription}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="d-flex col-lg-12 overflow-auto tag-div mt-4">
                {TAGS_WITH_COLORS.map((tag, index) => (
                  <div
                    className="form-check form-check-inline p-0 pb-1"
                    key={index}
                  >
                    <div
                      className={`badge bg-label-${tag.color} rounded-pill tag-selection ${
                        formState.selectedTags.includes(tag.tag) ? "selected" : ""
                      }`}
                      style={{
                        borderColor: formState.selectedTags.includes(tag.tag)
                          ? `var(--${tag.color})`
                          : "",
                      }}
                      name={`tag${index}`}
                      value={tag.tag}
                      onClick={() => toggleTag(tag.tag)}
                    >
                      {tag.tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 d-flex align-items-center justify-content-center mt-4">
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
