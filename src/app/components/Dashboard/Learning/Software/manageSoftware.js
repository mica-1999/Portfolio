"use client";
import { useEffect, useState, useRef } from "react";
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { getRoleClass, getActiveColor, filterByTimeRange } from '/src/utils/mainContentUtil';
import { Modal } from '/src/app/components/utility/Modal';

// CONSTANTS FOR FILTERS 
const mainCategories = ["Programming", "Web Development", "OS", "Cybersecurity"];
const programmingSubcategories = ["Languages", "Paradigms", "Data Structures", "Databases", "Software Engineering", "Machine Learning", "Game Development"];
const statusOptions = ["Learned", "Mastered", "In Progress", "Trying", "Completed", "On Hold", "Abandoned"];
const subCategoriesforWebDevelopment = [];
const subCategoriesforOS = [];
const subCategoriesforCybersecurity = [];
const TAGS = [
    'HTML', 'CSS', 'Javascript', 'PHP', 'Python', 'Java', 'C++', 'C#', 'Ruby',  
    'React', 'Angular', 'Node.js', 'Express', 'MongoDB', 'Vue.js', 'Firebase',  
    'Tailwind CSS', 'Next.js', 'Bootstrap', 'API', 'Socket.IO', 'Material UI'
  ];

export default function ManageSoftware() {    

// STATE VARIABLES
const [formtagBtn, setformTagBtn] = useState(false);
const [formData, setFormData] = useState({title: '', description: '', tags: [], state: '', version: ''}); // Form data
const [isformDropdownOpen, setIsformDropdownOpen] = useState(false);

const [filters, setFilters] = useState({ mainCategory: 'Programming', subCategory: '', tags: [], status: '' }); // Filters

const handleCategoryChange = (event) => {
  setFilters(prevFilters => ({
    ...prevFilters, // Keep the previous filter values
    mainCategory: event.target.value, // Update the selected category
  }));
};

const handlesubCategoryChange = (subCategory) => {
  setFilters(prevFilters => ({
    ...prevFilters, // Keep the previous filter values
    subCategory: subCategory, // Update the subcategory
  }));
};

const handleTagChange = (tag) => {
    const updatedTags = filters.tags.includes(tag)
        ? filters.tags.filter((t) => t !== tag)
        : [...filters.tags, tag];
    setFilters({ ...filters, tags: updatedTags });
}


useEffect(() => {
  console.log('Filters:', filters); 
},[filters.status])

return (
    <>
      <div className="d-flex col-lg-12 mt-4">
        {/* Filters Section */}
        <div className="card flex-grow-1 p-0">
          <div className="card-header filters">
            <div className="row d-flex align-items-center p-2">
              <h5 className="card-title">Filters</h5>
            </div>
  
            {/* Filter Rows */}
            <div className="row d-flex align-items-center ps-2 pe-2 pb-4 border-bottom">
              {/* Main Category Filter */}
              <div className="col-lg-4">
                <div className="select-wrapper">
                  <select className="form-select" value={filters.mainCategory.toLowerCase()} onChange={handleCategoryChange}>
                    <option key="default" value=''>Select a category</option>
                    {mainCategories.map((cat) => (
                      <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags Filter */}
              < div className="col-lg-4">
                <div className="select-wrapper">
                  <button className={`btn dropdown-toggle w-100 tagButton ${formtagBtn ? 'setBorder' : ''} ${formData.tags.length > 0 ? 'selected-tags' : ''}`}
                    type="button" id="dropdownForm"
                    onClick={() => { setformTagBtn(!formtagBtn); setIsformDropdownOpen(!isformDropdownOpen); }}>
                    {formData.tags.length === 0 ? 'Select tags' : formData.tags.join(';')}
                  </button>
  
                  <ul className={`dropdown-menu w-100 ulTag ${isformDropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownForm">
                    {TAGS.map((tag) => (
                      <li key={tag} onClick={() => handleTagChange(tag)} className="custom-tag-li p-2">
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id={tag + 'form'}
                            checked={formData.tags.includes(tag)} onChange={() => handleTagChange(tag)} />
                          <label className="form-check-label" htmlFor={tag + 'form'}>
                            {tag}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
  
              {/* Status Filter */}
              <div className="col-lg-4">
                <div className="select-wrapper">
                  <select className="form-select" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                    <option key="default" value="">Select a status</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status.toLowerCase()}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
  
            {/* Search and Add Section */}
            <div className="row d-flex mt-3 pb-3 ps-2 pe-2 border-bottom">
              <div className="col-lg-12 d-flex align-items-center justify-content-between">
                <button className="btn btn-secondary dropdown-toggle exportBtn">Export </button>
                <div className="d-flex gap-3">
                  <input type="text" className="form-control searchInput" placeholder="Search Info" onChange={(e) => setFilters({ ...filters, name: e.target.value })} />
                  <button className="btn btn-primary addBtn" onClick={() => setAddUserDiv(true)}>Add New Info</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Subcategories and Cards */}
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="subCategories">
            <div className="col-lg-12 d-flex gap-5">
              {programmingSubcategories.map((subcat) => (
                  <button key={subcat} className={`btn ${filters.subCategory === subcat ? 'active': ''}`} name={subcat} onClick={() => handlesubCategoryChange(subcat)}>{subcat}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
  
      {/* Cards Section */}
      <div className="card-body d-flex flex-wrap p-0 mb-1">
        <div className="row p-3">
          {[...Array(9)].map((_, idx) => (
            <div className="col-lg-4" key={idx}>
              <div className="card softwareCard">
                <div className="card-header align-items-center justify-content-between d-flex">
                    <div className="d-flex align-items-center">
                        <img className="subcatIcon" src="#"></img>
                        <div className="d-flex flex-column ps-2">
                            <span>Title</span>
                            <span>Subtitle</span>
                        </div>
                    </div>
                    <i className="ri-more-2-line ri-22px text-muted"></i>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Programming</h5>
                  <p className="card-text">Languages, Paradigms, Data Structures & Algorithms, Databases, Software Engineering, Development Tools, AI & Machine Learning, Embedded Systems, Game Development</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}