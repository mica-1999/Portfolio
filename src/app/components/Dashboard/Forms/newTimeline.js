"use client";
import React, { useState } from "react";

// Constants for options and tags
const STATES = [
    { text: "Completed", value: 1 },
    { text: "In Progress", value: 2 },
    { text: "Not Started", value: 3 },
    { text: "Failed", value: 0 },
  ];

export default function Forms() {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    state: "",
    project: "",
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
        title: "",
        description: "",
        state: "",
        project: "",
    });
  };

  //FORM SUBMISSION 
  const handleFormSubmission = async (e) => {
    e.preventDefault();

    const { title, description, state, project } = formState;

    if (!title || !description || !state) {
      alert("Please fill all the fields");
      return;
    }
    
    try {
        const response = await fetch("/api/getTimeline", {
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
    } catch (error) {
        throw new Error(result.message || "Something went wrong");
    }
  }

  return (
    <div className="d-flex col-lg-6 new-links">
      <div className="card flex-grow-1">
        {/* Card Header */}
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">Timeline</h5>
            <i
              className="ri-refresh-line ri-lg pointer"
              onClick={handleReset}
            ></i>
          </div>
          <h6 className="card-subtitle">Insert new</h6>
        </div>

        {/* Card Body */}
        <div className="card-body p-0 p-4">
          <form action="/api/getTimeline" method="POST" onSubmit={handleFormSubmission}>
            {/* Name Input */}
            <div className="row pb-3">
              <div className="col-lg-12">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formState.title}
                  placeholder="Insert a title for the new event"
                  onChange={handleInputChange("title")}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 mt-1">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  placeholder="Add a brief description"
                  value={formState.description}
                  onChange={handleInputChange("description")}
                  required
                />
              </div>
            </div>

            <div className="d-flex row mt-2 align-items-center">
              <div className="col-lg-6">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  id="state"
                  name="state"
                  value={formState.state}
                  onChange={handleInputChange("state")}
                >
                  <option value="default">Select a project</option>
                  {STATES.map((state,index) => {
                    return(
                        <option value={state.value} key={index}>{state.text}</option>
                    )
                  })}
                </select>
              </div>

              <div className="col-lg-6">
                <label htmlFor="project" className="form-label">
                  Project (optional)
                </label>
                <select
                  className="form-control"
                  id="project"
                  name="project"
                  value={formState.project}
                  onChange={handleInputChange("project")}
                >
                  <option value="">Select a project</option>
                  <option value="project1">Project 1</option>
                  <option value="project2">Project 2</option>
                </select>
              </div>
            </div>



            {/* Submit Button */}
            <div className="row mt-3">
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